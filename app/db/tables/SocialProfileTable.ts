import { z } from "@/deps.ts";

import ProviderType from "@/constants/ProviderType.ts";
import { generatedNumber, timestamps } from "../zod-utils.ts";

const SocialProfileTable = z.object({
  id: generatedNumber(),
  provider_type: z.nativeEnum(ProviderType),
  provider_id: z.string(),
  username: z.string(),
  avatar_url: z.string(),
  user_id: z.number(),
  ...timestamps(),
});

type SocialProfileTable = z.infer<typeof SocialProfileTable>;

export default SocialProfileTable;
