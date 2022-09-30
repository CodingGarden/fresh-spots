import { HandlerContext, Handlers } from "$fresh/server.ts";

import db from "@/db/db.ts";
import State from "@/schemas/State.ts";
import { SpotList } from "@/db/tables/SpotListTable.ts";
import { findOne } from "@/db/queries/SpotList.ts";

export const handler: Handlers = {
  async GET(
    _req,
    ctx: HandlerContext<SpotList, State>,
  ) {
    try {
      const list = await findOne(ctx.params.id, ctx.state.userId);
      if (!list) {
        throw new Error("Not found.");
      }
      return Response.json(list);
    } catch (error) {
      return Response.json({
        message: error.message || "Unknown Error",
      }, {
        status: 500,
      });
    }
  },
};
