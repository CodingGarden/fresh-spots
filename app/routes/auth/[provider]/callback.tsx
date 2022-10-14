import { Handlers } from "$fresh/server.ts";
import { Providers } from "deno_grant";
import DiscordProfile from "deno_grant/interfaces/profiles/DiscordProfile.ts";
import { squishyCookies } from "@/deps.ts";

import db from "@/db/db.ts";
import ProviderType from "@/constants/ProviderType.ts";
import config from "@/utils/config.ts";
import denoGrant from "@/utils/denoGrant.ts";

function getDiscordAvatar(profile: DiscordProfile) {
  return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`;
}

async function upsertDiscordProfile(request: Request, accessToken: string) {
  const profile = await denoGrant.getProfile(Providers.discord, accessToken);
  const socialProfile = await db
    .selectFrom("social_profile")
    .select(["provider_id", "user_id"])
    .where("provider_id", "=", profile.id)
    .executeTakeFirst();
  let id = "";
  if (socialProfile) {
    id = socialProfile.user_id.toString();
    await db
      .updateTable("social_profile")
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
  if (id) {
    const { cookie } = await squishyCookies.createSignedCookie(
      "id",
      id,
      config.cookie_secret,
      {
        path: "/",
        httpOnly: true,
        // sameSite: "Strict",
        secure: config.environment === "production",
        maxAge: 60 * 60 * 24,
      }
    );
    return new Response("", {
      status: 302,
      headers: {
        Location: config.base_url,
        "set-cookie": cookie,
      },
    });
  }
  return Response.redirect(config.base_url);
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
    return Response.redirect(config.base_url);
  },
};
