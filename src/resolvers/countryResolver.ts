import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/country";
import { CreateOrUpdateCountry } from "../types/country.args";

@Resolver(Country)
export class CountryResolver {
  @Mutation(() => Country)
  createCountry(@Args() args: CreateOrUpdateCountry) {
    return Country.saveNewCountry(args);
  }

  @Query(() => [Country])
  countries() {
    return Country.getCountries();
  }

  @Query(() => [Country])
  countriesByContinentCode(
    @Arg("continentCode", () => String) continentCode: string
  ) {
    return Country.getCountriesByContinentCode(continentCode);
  }

  @Query(() => Country)
  countryByIsoCode(@Arg("code", () => String) code: string) {
    return Country.getCountryByCode(code);
  }
}
