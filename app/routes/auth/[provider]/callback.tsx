import { Handlers } from "$fresh/server.ts";
import { setCookie } from "cookie";
import { Providers } from "deno_grant";
import DiscordProfile from "deno_grant/interfaces/profiles/DiscordProfile.ts";
import { RequestCookieStore } from "request_cookie_store";
import { SignedCookieStore } from "signed_cookie_store";

import db from "@/db/db.ts";
import ProviderType from "@/constants/ProviderType.ts";
import config from "@/utils/config.ts";
import denoGrant from "@/utils/denoGrant.ts";

function getDiscordAvatar(profile: DiscordProfile) {
  return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`;
}

// TODO: refactor this when we have more than 1 provider
async function upsertDiscordProfile(request: Request, accessToken: string) {
  const profile = await denoGrant.getProfile(Providers.discord, accessToken);
  const socialProfile = await db
    .selectFrom("social_profile")
    .select([
      "provider_id",
      "user_id",
    ])
    .where("provider_id", "=", profile.id)
    .executeTakeFirst();
  let id = "";
  if (socialProfile) {
    id = socialProfile.user_id.toString();
    await db.updateTable("social_profile")
      .set({
        username: profile.username,
        avatar_url: getDiscordAvatar(profile),
        updated_at: new Date(),
      })
      .where("provider_id", "=", profile.id)
      .execute();
  } else {
    const result = await db.transaction().execute(async (trx) => {
      const user = await trx
        .insertInto("user")
        .values({
          display_name: profile.username,
        })
        .returningAll()
        .executeTakeFirst();

      if (user) {
        const socialProfile = await trx
          .insertInto("social_profile")
          .values({
            user_id: user.id,
            provider_type: ProviderType.discord,
            provider_id: profile.id,
            username: profile.username,
            avatar_url: getDiscordAvatar(profile),
          })
          .returningAll()
          .executeTakeFirst();

        if (socialProfile) {
          return {
            user,
            socialProfile,
          };
        }
        return null;
      }
      return null;
    });
    if (result) {
      id = result.user.id.toString();
    }
  }
  const resp = new Response("", {
    status: 302,
    headers: {
      Location: config.base_url,
    },
  });
  if (id) {
    const requestStore = new RequestCookieStore(request);
    const secret = "keyboard_cat";
    const keyPromise = SignedCookieStore.deriveCryptoKey({ secret });
    const cookieStore = new SignedCookieStore(requestStore, await keyPromise, {
      keyring: [await keyPromise],
    });
    await cookieStore.set({
      name: "id",
      value: id,
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      // TODO: get these values to actually set...
      // TODO: maybe combine this with setCookie
      // @ts-ignore
      secure: config.environment === "production",
      maxAge: 60 * 60 * 24,
    });
    console.log(requestStore.headers);
    requestStore.headers.forEach(([key, value]) => {
      if (key === "Set-Cookie") {
        resp.headers.append(key, value);
      }
    });
  }
  return resp;
}

export const handler: Handlers = {
  async GET(request, ctx) {
    const providerType = ctx.params.provider.toLowerCase();
    switch (providerType) {
      case Providers.discord: {
        const tokens = await denoGrant.getToken(Providers.discord, request.url);
        if (tokens) {
          return upsertDiscordProfile(request, tokens.accessToken);
        }
      }
    }
    // TODO: show error message instead of instant redirect
    return Response.redirect(config.base_url);
  },
};
