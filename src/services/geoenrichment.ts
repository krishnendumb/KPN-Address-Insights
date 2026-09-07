// import { ARCGIS_API_KEY } from "../config";

// const ENRICH_URL =
//   "https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/GeoEnrichment/enrich";

// // Trimmed to exactly what the cards display -- GeoEnrichment bills per
// // attribute returned (10 credits / 1000 attributes), so nothing is
// // requested as a whole collection anymore. IDs are the India-specific
// // ("Esri India" hierarchy) ones confirmed against this account's enabled
// // data collections.
// const ANALYSIS_VARIABLES = [
//   // Population (Esri India)
//   "PopulationEsriIndia.TOTPOP_CY",
//   "PopulationEsriIndia.POPDENS_CY",
//   "PopulationEsriIndia.MALES_CY",
//   "PopulationEsriIndia.FEMALES_CY",
//   // 15 Year Increments (Esri India) -- male/female by age bracket for the
//   // population pyramid. Total-per-bracket (PAGE0x_CY) isn't needed since
//   // only the male/female split is plotted.
//   "15YearIncrementsEsriIndia.MAGE01_CY",
//   "15YearIncrementsEsriIndia.MAGE02_CY",
//   "15YearIncrementsEsriIndia.MAGE03_CY",
//   "15YearIncrementsEsriIndia.MAGE04_CY",
//   "15YearIncrementsEsriIndia.MAGE05_CY",
//   "15YearIncrementsEsriIndia.FAGE01_CY",
//   "15YearIncrementsEsriIndia.FAGE02_CY",
//   "15YearIncrementsEsriIndia.FAGE03_CY",
//   "15YearIncrementsEsriIndia.FAGE04_CY",
//   "15YearIncrementsEsriIndia.FAGE05_CY",
//   // Purchasing Power (Esri India)
//   "PurchasingPowerEsriIndia.PP_CY",
//   "PurchasingPowerEsriIndia.PPPC_CY",
//   "PurchasingPowerEsriIndia.PPIDX_CY",
//   // Consumer Styles (Esri India) -- all 10 needed to determine which
//   // segment is dominant in the buffer area.
//   "ConsumerStylesEsriIndia.TYPE_A",
//   "ConsumerStylesEsriIndia.TYPE_B",
//   "ConsumerStylesEsriIndia.TYPE_C",
//   "ConsumerStylesEsriIndia.TYPE_D",
//   "ConsumerStylesEsriIndia.TYPE_E",
//   "ConsumerStylesEsriIndia.TYPE_F",
//   "ConsumerStylesEsriIndia.TYPE_G",
//   "ConsumerStylesEsriIndia.TYPE_H",
//   "ConsumerStylesEsriIndia.TYPE_I",
//   "ConsumerStylesEsriIndia.TYPE_J",
//   // Global Spending -- kept to one field (previously the entire ~80-field
//   // collection was requested for a single displayed stat).
//   "Spending.CS01_CY",
// ];

// export async function enrichPoint(x: number, y: number, bufferMiles = 1) {
//   const studyAreas = [
//     {
//       geometry: { x, y },
//       attributes: { id: "1" },
//       areaType: "RingBuffer",
//       bufferUnits: "esriMiles",
//       bufferRadii: [bufferMiles],
//     },
//   ];

//   const params = new URLSearchParams({
//     f: "json",
//     token: ARCGIS_API_KEY,
//     studyAreas: JSON.stringify(studyAreas),
//     analysisVariables: JSON.stringify(ANALYSIS_VARIABLES),
//     // Selects the India ("EsriIndia") hierarchy explicitly rather than
//     // relying on auto-detection from the study area. If any of the new
//     // fields come back missing while TOTPOP_CY etc. work, this is the
//     // first thing to check/remove.
//     sourceCountry: "IN",
//   });

//   const res = await fetch(`${ENRICH_URL}?${params}`);
//   const json = await res.json();

//   const attributes = json?.results?.[0]?.value?.FeatureSet?.[0]?.features?.[0]?.attributes ?? null;
//   if (!attributes) console.error("GeoEnrichment response shape unexpected or errored:", json);
//   return attributes;
// }
import { ARCGIS_API_KEY } from "../config";

const ENRICH_URL =
  "https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/GeoEnrichment/enrich";

export async function enrichPoint(x: number, y: number, variableKeys: string[], bufferMiles = 1) {
  // Nothing selected -- skip the call entirely rather than billing a
  // request for zero attributes.
  if (variableKeys.length === 0) return null;

  const studyAreas = [
    {
      geometry: { x, y },
      attributes: { id: "1" },
      areaType: "RingBuffer",
      bufferUnits: "esriMiles",
      bufferRadii: [bufferMiles],
    },
  ];

  const params = new URLSearchParams({
    f: "json",
    token: ARCGIS_API_KEY,
    studyAreas: JSON.stringify(studyAreas),
    analysisVariables: JSON.stringify(variableKeys),
    sourceCountry: "IN",
  });

  const res = await fetch(`${ENRICH_URL}?${params}`);
  const json = await res.json();

  const attributes = json?.results?.[0]?.value?.FeatureSet?.[0]?.features?.[0]?.attributes ?? null;
  if (!attributes) console.error("GeoEnrichment response shape unexpected or errored:", json);
  return attributes;
} 