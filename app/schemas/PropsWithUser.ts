import { UserWithSocialProfiles } from "../db/tables/CombinedTables.ts";

export default interface PropsWithUser {
  user?: UserWithSocialProfiles | null;
}
