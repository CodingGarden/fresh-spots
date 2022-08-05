import { DataTypes, Model } from "denodb";
import User from "./User.ts";

export default class SpotList extends Model {
  static table = "spot_list";
  static timestamps = true;
  static fields = {
    id: {
      // TODO: do this in the DB instead of on create
      type: DataTypes.UUID,
      primaryKey: true,
      // TODO: not needed, but might be a bug in denodb
      // unique: true,
      allowNull: false,
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
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // TODO: add center coordinates
  };

  static user() {
    return this.hasOne(User);
  }

  static defaults = {
    public: false,
    published: false,
  };
}
