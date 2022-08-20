import { Generated } from "kysely";
import BaseTable from "./BaseTable.ts";
import ProviderType from "@/constants/ProviderType.ts";

export default interface SocialProfileTable extends BaseTable {
  id: Generated<number>;
  provider_type: ProviderType;
  provider_id: string;
  username: string;
  avatar_url: string;
  user_id: number;
}
