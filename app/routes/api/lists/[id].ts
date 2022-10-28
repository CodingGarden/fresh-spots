import { HandlerContext, Handlers } from "$fresh/server.ts";
import { http } from "@/deps.ts";

import State from "@/schemas/State.ts";
import { SpotList } from "@/db/tables/SpotListTable.ts";
import {
  updateOne,
  deleteOne,
  findOneById,
  findOneBySlug,
} from "@/db/queries/SpotList.ts";

export const handler: Handlers = {
  async GET(_req, ctx: HandlerContext<SpotList, State>) {
    try {
      let list;
      const idAsNumber = Number(ctx.params.id);
      if (isNaN(idAsNumber)) {
        list = await findOneBySlug(ctx.params.id, ctx.state.userId);
      } else {
        list = await findOneById(idAsNumber, ctx.state.userId);
      }
      if (!list) {
        throw new Error("Not found.");
      }
      return Response.json(list);
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
  async DELETE(_req, ctx: HandlerContext<never, State>) {
    if (!ctx.state.userId) {
      return Response.json(
        {
          message: "Un-Authorized",
        },
        {
          status: http.Status.Unauthorized,
        }
      );
    }
    try {
      await deleteOne(Number(ctx.params.id), ctx.state.userId);
      return new Response(null, {
        status: http.Status.NoContent,
      });
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
  async PUT(_req, ctx: HandlerContext<SpotList, State>) {
    if (!ctx.state.userId) {
      return Response.json(
        {
          message: "Un-Authorized",
        },
        {
          status: http.Status.Unauthorized,
        }
      );
    }
    try {
      const body = await _req.json();
      const validatedList = await SpotList.parseAsync(body);
      const updatedList = await updateOne(
        Number(ctx.params.id),
        ctx.state.userId,
        validatedList
        // TODO TODAY... update slug
      );
      return Response.json(updatedList);
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
