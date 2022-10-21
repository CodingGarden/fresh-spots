import { z } from "@/deps.ts";

import { generatedNumber, timestamps } from "../zod-utils.ts";
import SpotTable from "./SpotTable.ts";

const SpotListValidators = {
  name: z
    .string()
    .trim()
    .min(1, "Name cannot be blank.")
    .regex(/[^\d]+/i, "List name must include a letter."),
  description: z.string().trim().min(1, "Description cannot be blank."),
  public: z.boolean(),
  published: z.boolean(),
};

export const SpotList = z.object(SpotListValidators);
export type SpotList = z.infer<typeof SpotList>;

export const SpotListWithIdAndSpots = z.object({
  id: z.number(),
  ...SpotListValidators,
  slug: z.string(),
  spots: z.array(SpotTable),
});
export type SpotListWithIdAndSpots = z.infer<typeof SpotListWithIdAndSpots>;

const SpotListTable = z.object({
  id: generatedNumber(),
  ...SpotListValidators,
  slug: z.string(),
  user_id: z.number(),
  ...timestamps(),
});

type SpotListTable = z.infer<typeof SpotListTable>;

export default SpotListTable;
