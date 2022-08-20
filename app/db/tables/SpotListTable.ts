import BaseTable from "./BaseTable.ts";

// TODO: use zod!
export default interface SpotListTable extends BaseTable {
  id: string; // TODO: uuid... maybe have some sort of checker for that...
  name: string;
  description: string;
  public: boolean;
  published: boolean;
  user_id: number;
}
