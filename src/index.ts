import { DataSource } from "typeorm";
import { Country } from "./country";

async function main() {
  const dataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    entities: [Country],
    synchronize: true,
  });
  await dataSource.initialize();
}

main();
