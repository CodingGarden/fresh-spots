import SocialProfileTable from "./SocialProfileTable.ts";
import UserTable from "./UserTable.ts";

export interface UserWithSocialProfiles extends UserTable {
  social_profiles: SocialProfileTable[];
}
