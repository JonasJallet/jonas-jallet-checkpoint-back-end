import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { CreateOrUpdateCountry } from "../types/country.args";

@Entity()
@ObjectType()
@Unique("custom_unique_country", ["code", "name"])
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  code!: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  emoji!: string;

  @Column()
  @Field()
  continentCode!: string;

  constructor(country?: CreateOrUpdateCountry) {
    super();
    if (country) {
      if (!country.code) {
        throw new Error("Country iso code cannot be empty.");
      }
      this.code = country.code;

      if (!country.name) {
        throw new Error("Country name cannot be empty.");
      }
      this.name = country.name;

      if (!country.emoji) {
        throw new Error("Country name cannot be empty.");
      }
      this.emoji = country.emoji;

      if (!country.continentCode) {
        throw new Error("Country name cannot be empty.");
      }
      this.continentCode = country.continentCode;
    }
  }

  static async saveNewCountry(countryData: CreateOrUpdateCountry) {
    const newCountry = new Country(countryData);
    return await newCountry.save();
  }

  static async getCountries(): Promise<Country[]> {
    return await Country.find();
  }

  static async getCountriesByContinentCode(
    continentCode: string
  ): Promise<Country[]> {
    const countries = await Country.findBy({ continentCode });
    if (countries.length === 0) {
      throw new Error(
        `No countries found for continent with code ${continentCode}.`
      );
    }
    return countries;
  }

  static async getCountryByCode(code: string): Promise<Country> {
    const country = await Country.findOneBy({ code });
    if (!country) {
      throw new Error(`Country with code ${code} does not exist.`);
    }
    return country;
  }
}
