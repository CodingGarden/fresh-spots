import { HandlerContext, Handlers } from "$fresh/server.ts";

import State from "@/schemas/State.ts";
import { Spot } from "@/db/tables/SpotTable.ts";
import { findOne, updateOne } from "@/db/queries/Spot.ts";

export const handler: Handlers = {
  async GET(_req, ctx: HandlerContext<Spot, State>) {
    try {
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
      const spot = await findOne(
        Number(ctx.params.id),
        Number(ctx.state.userId)
      );
      if (!spot) {
        throw new Error("Not found.");
      }
      return Response.json(spot);
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
  async PUT(_req, ctx: HandlerContext<Spot, State>) {
    try {
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
      const body = await _req.json();
      const validated = await Spot.parseAsync(body);
      const spot = await updateOne(
        Number(ctx.params.id),
        Number(ctx.state.userId),
        validated
      );
      if (!spot) {
        throw new Error("Not found.");
      }
      return Response.json(spot);
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
