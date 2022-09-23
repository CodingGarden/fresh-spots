import { kysely, z } from "@/deps.ts";

import { generatedNumber, timestamps } from "../zod-utils.ts";

const SpotListValidators = {
  name: z.string(),
  description: z.string(),
};

export const SpotList = z.object(SpotListValidators);
export type SpotList = z.infer<typeof SpotList>;

const SpotListTable = z.object({
  id: generatedNumber(),
  ...SpotListValidators,
  public: z.boolean(),
  published: z.boolean(),
  user_id: z.number(),
  ...timestamps(),
});

type SpotListTable = z.infer<typeof SpotListTable>;

export default SpotListTable;
