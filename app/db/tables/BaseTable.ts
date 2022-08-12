import { ColumnType } from "kysely";

export default interface BaseTable {
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}
