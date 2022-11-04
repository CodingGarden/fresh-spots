import db, { jsonb_agg } from "@/db/db.ts";

export function getUserWithSocialProfiles(userId: number) {
  return db
    .selectFrom("user")
    .selectAll()
    .select((qb) =>
      jsonb_agg(
        qb
          .selectFrom("social_profile")
          .selectAll()
          .whereRef("social_profile.user_id", "=", "user.id")
      ).as("social_profiles")
    )
    .where("id", "=", userId)
    .executeTakeFirst();
}
