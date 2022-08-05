import { HandlerContext } from "$fresh/server.ts";

import User from "@/models/User.ts";

class JsonResponse extends Response {
  // deno-lint-ignore ban-types
  constructor(body?: Object | BodyInit | null, init?: ResponseInit) {
    if (!init) {
      init = {};
    }
    if (!init.headers) {
      init.headers = {};
    }
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    init.headers["content-type"] = "application/json";
    super(JSON.stringify(body), init);
  }
}

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const user = await User.create({});
  return new JsonResponse(user);
};
