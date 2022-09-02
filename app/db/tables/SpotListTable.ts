import { z } from "@/deps.ts";

import { generatedNumber, timestamps } from "../zod-utils.ts";

const SpotListTable = z.object({
  id: generatedNumber(),
  name: z.string(),
  description: z.string(),
  public: z.boolean(),
  published: z.boolean(),
  user_id: z.number(),
  ...timestamps(),
});

type SpotListTable = z.infer<typeof SpotListTable>;

export default SpotListTable;
