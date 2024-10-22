export type Border = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  flag: string | null;
};

export type Borders = Border[];
export type PopulationCounts = {
  year: number;
  value: number;
};
export type Population = {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationCounts[];
};
export interface Country {
  countryCode: string;
  commonName: string;
  officialName: string;
  borders: Borders;
  flag: string | null;
  population: Population;
}

export type Countries = {
  countryCode: string;
  name: string;
}[];
