import "reflect-metadata";
import { DataSource } from "typeorm";
import { Country } from "./entities/country";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/countryResolver";

async function main() {
  const dataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    entities: [Country],
    synchronize: true,
  });
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main();
