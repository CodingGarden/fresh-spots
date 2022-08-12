import { HandlerContext } from "$fresh/server.ts";

import db from "@/db/db.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const user = await db.insertInto("user").values({
    display_name: "w3cj",
  }).returningAll().executeTakeFirst();
  return Response.json(user);
};
