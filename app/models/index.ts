import { Relationships } from "denodb";

import SocialProfile from "./SocialProfile.ts";
import Spot from "./Spot.ts";
import SpotList from "./SpotList.ts";
import User from "./User.ts";

const models = [
  User,
  SocialProfile,
  SpotList,
  Spot,
];

Relationships.belongsTo(
  SocialProfile,
  User,
  { foreignKey: "user_id" }
);

Relationships.belongsTo(
  SpotList,
  User,
  { foreignKey: "user_id" }
);

Relationships.belongsTo(
  Spot,
  User,
  { foreignKey: "user_id" }
);

Relationships.belongsTo(
  Spot,
  SpotList,
  { foreignKey: "list_id" }
);

export default models;
