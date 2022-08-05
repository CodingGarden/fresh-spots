import { HandlerContext } from "$fresh/server.ts";

import User from "@/models/User.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const users = await User.all();
  return Response.json(users);
};
