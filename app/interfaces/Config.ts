import { PostgresOptions } from "denodb";

export default interface Config {
  base_url: string;
  environment: string;
  db: PostgresOptions;
  oauth: {
    discord: {
      client_id: string;
      client_secret: string;
    }
  }
}