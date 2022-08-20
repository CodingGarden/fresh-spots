import { Generated } from "kysely";
import BaseTable from "./BaseTable.ts";

export default interface UserTable extends BaseTable {
  id: Generated<number>;
  display_name: string;
}
