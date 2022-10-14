import { HandlerContext, Handlers } from "$fresh/server.ts";

import db from "@/db/db.ts";
import State from "@/schemas/State.ts";
import { SpotList } from "@/db/tables/SpotListTable.ts";
import { createOne, findAll } from "@/db/queries/SpotList.ts";

export const handler: Handlers = {
  async GET(_req, ctx: HandlerContext<SpotList, State>) {
    if (!ctx.state.userId) {
      return Response.json(
        {
          message: "Un-Authorized",
        },
        {
          status: 401,
        }
      );
    }
    try {
      const lists = await findAll(ctx.state.userId);
      return Response.json(lists);
    } catch (error) {
      return Response.json(
        {
          message: error.message || "Unknown Error",
        },
        {
          status: 500,
        }
      );
    }
  },
  async POST(req, ctx: HandlerContext<SpotList, State>) {
    if (!ctx.state.userId) {
      return Response.json(
        {
          message: "Un-Authorized",
        },
        {
          status: 401,
        }
      );
    }
    try {
      const body = await req.json();
      const validatedResult = await SpotList.parseAsync(body);
      const inserted = await createOne(validatedResult, ctx.state.userId);
      return Response.json(inserted);
    } catch (error) {
      return Response.json(
        {
          message: error.message || "Unknown Error",
        },
        {
          status: 500,
        }
      );
    }
  },
};
