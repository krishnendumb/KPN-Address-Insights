export interface EnrichmentVariable {
  id: string;
  label: string;
}

export interface EnrichmentCollection {
  collectionId: string;
  label: string;
  variables: EnrichmentVariable[];
}

// Sourced directly from the account's enabled data collections (Esri
// India hierarchy) -- no invented IDs or labels here.
export const ENRICHMENT_COLLECTIONS: EnrichmentCollection[] = [
  {
    collectionId: "PopulationEsriIndia",
    label: "Population",
    variables: [
      { id: "TOTPOP_CY", label: "2024 Total Population" },
      { id: "POPDENS_CY", label: "2024 Population Density (per km²)" },
      { id: "POPPRM_CY", label: "2024 Population Per Mill" },
      { id: "MALES_CY", label: "2024 Total Male Population" },
      { id: "FEMALES_CY", label: "2024 Total Female Population" },
      { id: "TOT_P_2011", label: "2011 Total Population" },
      { id: "TOT_M_2011", label: "2011 Male Population" },
      { id: "TOT_F_2011", label: "2011 Female Population" },
      { id: "P_06_2011", label: "2011 Total Population 0-6 Yrs" },
      { id: "M_06_2011", label: "2011 Male Population 0-6 Yrs" },
      { id: "F_06_2011", label: "2011 Female Population 0-6 Yrs" },
      // Scheduled Caste/Tribe fields intentionally left out of this
      // client-facing picker -- see earlier note. Add here if you have a
      // specific, compliant reason to.
    ],
  },
  {
    collectionId: "15YearIncrementsEsriIndia",
    label: "Age (15-Year Increments)",
    variables: [
      { id: "PAGE01_CY", label: "2024 Total Population Age 0-14" },
      { id: "PAGE02_CY", label: "2024 Total Population Age 15-29" },
      { id: "PAGE03_CY", label: "2024 Total Population Age 30-44" },
      { id: "PAGE04_CY", label: "2024 Total Population Age 45-59" },
      { id: "AGE_T15PL", label: "2024 Total Population Age 15+" },
      { id: "PAGE05_CY", label: "2024 Total Population Age 60+" },
      { id: "MAGE01_CY", label: "2024 Male Population Age 0-14" },
      { id: "MAGE02_CY", label: "2024 Male Population Age 15-29" },
      { id: "MAGE03_CY", label: "2024 Male Population Age 30-44" },
      { id: "MAGE04_CY", label: "2024 Male Population Age 45-59" },
      { id: "MAGE05_CY", label: "2024 Male Population Age 60+" },
      { id: "FAGE01_CY", label: "2024 Female Population Age 0-14" },
      { id: "FAGE02_CY", label: "2024 Female Population Age 15-29" },
      { id: "FAGE03_CY", label: "2024 Female Population Age 30-44" },
      { id: "FAGE04_CY", label: "2024 Female Population Age 45-59" },
      { id: "FAGE05_CY", label: "2024 Female Population Age 60+" },
    ],
  },
  {
    collectionId: "PurchasingPowerEsriIndia",
    label: "Purchasing Power",
    variables: [
      { id: "PP_CY", label: "2024 Purchasing Power: Total" },
      { id: "PPPRM_CY", label: "2024 Purchasing Power: Per Mill" },
      { id: "PPPC_CY", label: "2024 Purchasing Power: Per Capita" },
      { id: "PPIDX_CY", label: "2024 Purchasing Power: Index" },
    ],
  },
  {
    collectionId: "ConsumerStylesEsriIndia",
    label: "Consumer Styles",
    variables: [
      { id: "TYPE_A", label: "Type A: High Earning Urban Professionals" },
      { id: "TYPE_B", label: "Type B: Comfortably Off Empty Nesters" },
      { id: "TYPE_C", label: "Type C: Modern and Pragmatic Over 50s" },
      { id: "TYPE_D", label: "Type D: Well Informed Modern Consumers" },
      { id: "TYPE_E", label: "Type E: Affluent Highly Educated Urban Families" },
      { id: "TYPE_F", label: "Type F: Security-Oriented Seniors" },
      { id: "TYPE_G", label: "Type G: Orientation Seeking Lower and Middle Class Consumers" },
      { id: "TYPE_H", label: "Type H: Younger Lower and Middle Class Consumers" },
      { id: "TYPE_I", label: "Type I: Modern Younger Families" },
      { id: "TYPE_J", label: "Type J: Low-Income Younger Consumers" },
    ],
  },
  {
    collectionId: "Spending",
    label: "Consumer Spending (Global collection)",
    variables: [{ id: "CS01_CY", label: "Total Consumer Spending" }],
  },
];