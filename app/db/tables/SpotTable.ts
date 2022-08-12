import { Generated, Selectable } from "kysely";
import BaseTable from "./BaseTable.ts";

export interface SpotTable extends BaseTable {
  id: Generated<number>;
  name: string;
  list_id: number;
  user_id: number;
  description: string;
  latitude: number;
  longitude: number;
}

type Spots = Selectable<SpotTable>;
export default Spots;
