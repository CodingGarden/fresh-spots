import { Database, PostgresConnector } from "denodb";
import config from "./config.ts";
import models from "@/models/index.ts";

const connector = new PostgresConnector(config.db);

const db = new Database({
  connector,
  // TODO: load this value from env
  // debug: true,
});

db.link(models);

export default () => {
  db.sync({
    // TODO: enable this when there is a model change...
    drop: config.environment === 'development',
  });
};
