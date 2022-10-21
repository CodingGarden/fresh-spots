import { HandlerContext, Handlers } from "$fresh/server.ts";

import db from "@/db/db.ts";
import State from "@/schemas/State.ts";
import { Spot } from "@/db/tables/SpotTable.ts";
import * as SpotList from "@/db/queries/SpotList.ts";
import { createOne } from "@/db/queries/Spot.ts";

export const handler: Handlers = {
  async POST(req, ctx: HandlerContext<Spot, State>) {
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
      const validatedResult = await Spot.parseAsync(body);
      const list = await SpotList.findOne(
        { id: validatedResult.list_id },
        ctx.state.userId
      );
      if (!list) {
        throw new Error("List not found.");
      }
      const inserted = await createOne({
        ...validatedResult,
        user_id: ctx.state.userId,
      });
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
