import { Generated } from "kysely";
import BaseTable from "./BaseTable.ts";

export default interface SpotTable extends BaseTable {
  id: Generated<number>;
  name: string;
  list_id: number;
  user_id: number;
  description: string;
  // TODO: use point type...
  latitude: number;
  longitude: number;
}
