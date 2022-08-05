import { DataTypes, Model } from "denodb";

export default class User extends Model {
  static table = "user";
  static timestamps = true;
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
  };
}
