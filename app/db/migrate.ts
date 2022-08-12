import * as path from "path";

import { FileMigrationProvider, Migration, Migrator } from "kysely";
import db from "./db.ts";

class DenoFileMigrationProvider extends FileMigrationProvider {
  folder: string;
  constructor() {
    super({
      fs: {
        readdir(path) {
          console.log("calling readdir", path);

          return Promise.resolve(
            [...Deno.readDirSync(path)].map((file) => file.name),
          );
        },
      },
      path: {
        join(...path) {
          // TODO: windows / cross platform friendly path combine
          return path.join("/");
        },
      },
      migrationFolder: "./db/migrations",
    });
    this.folder = "./db/migrations";
  }

  async getMigrations(): Promise<Record<string, Migration>> {
    const migrations: Record<string, Migration> = {};
    const files = await Deno.readDir(this.folder);

    // ASSUMES ALL FILES ARE MIGRATION FILES...
    for await (const file of files) {
      // MORE ASSUMPTIONS..
      migrations[file.name] = await import(
        ["./migrations", file.name].join("/")
      );
    }

    return migrations;
  }
}

const migrator = new Migrator({
  db,
  provider: new DenoFileMigrationProvider(),
});

// TODO: accept command line arg for up / down

// const { error, results } = await migrator.migrateDown();
// console.log(error);
// console.log(results);

const { error, results } = await migrator.migrateToLatest();
if (error) {
  console.error(error);
} else {
  console.log(results);
}
