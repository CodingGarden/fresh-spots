import { Generated, Selectable } from "kysely";
import BaseTable from "./BaseTable.ts";

export interface UserTable extends BaseTable {
  id: Generated<number>;
  display_name: string;
}

// TODO: users have many social profiles...

type Users = Selectable<UserTable>;
export default Users;
