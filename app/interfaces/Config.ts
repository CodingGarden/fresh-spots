import { PostgresOptions } from "https://deno.land/x/denodb@v1.0.39/mod.ts";

export default interface Config {
  environment: string;
  db: PostgresOptions;
}