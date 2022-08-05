import { DataTypes, Model } from "denodb";
import User from "./User.ts";

export default class Spot extends Model {
  static table = "spot";
  static timestamps = true;
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      length: 255,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      length: 2000,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  };

  static user() {
    return this.hasOne(User);
  }
}
