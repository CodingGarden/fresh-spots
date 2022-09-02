import { z } from "@/deps.ts";

import { generatedNumber, timestamps } from "../zod-utils.ts";

const UserTable = z.object({
  id: generatedNumber(),
  display_name: z.string(),
  ...timestamps(),
});

type UserTable = z.infer<typeof UserTable>;

export default UserTable;
