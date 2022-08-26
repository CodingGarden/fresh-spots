import { join } from "path";
import { flags, kysely } from "@/deps.ts";

import db from "./db.ts";

const { FileMigrationProvider, Migrator } = kysely;

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
        join,
      },
      migrationFolder: "./db/migrations",
    });
    this.folder = "./db/migrations";
  }

  async getMigrations(): Promise<Record<string, kysely.Migration>> {
    const migrations: Record<string, kysely.Migration> = {};
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

const args = flags.parse(Deno.args, {
  boolean: ["up", "down"],
});

if (!args.up && !args.down) {
  throw new Error("up or down flag missing");
}

if (args.up && args.down) {
  throw new Error("Can only migrate up or down... not both");
}

if (args.up) {
  const { error, results } = await migrator.migrateToLatest();
  if (error) {
    console.error(error);
  } else {
    console.log(results);
  }  
}

if (args.down) {
  const { error, results } = await migrator.migrateDown();
  console.log(error);
  console.log(results);
}
