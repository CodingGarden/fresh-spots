import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";

export default interface State {
  userId?: number;
  user?: UserWithSocialProfiles;
}
