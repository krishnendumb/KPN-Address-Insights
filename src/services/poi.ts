import Query from "@arcgis/core/rest/support/Query";
import * as query from "@arcgis/core/rest/query";

// TODO: replace with your actual hosted Feature Service URL + layer index,
// e.g. "https://services-eu1.arcgis.com/<orgId>/arcgis/rest/services/IndiaBA_POIs/FeatureServer/0"
// Layer ID confirmed as 0 from the service's metadata.
export const POI_LAYER_URL = "https://services8.arcgis.com/S3JihvJw7nZLbh8R/arcgis/rest/services/IndiaBA_POIs/FeatureServer/0";

const CATEGORY_FIELD = "ESRI_IND_1";


export interface PoiResult {
  name: string;
  category: string;
  x: number;
  y: number;
}

let categoriesPromise: Promise<string[]> | null = null;

// Distinct values are fetched once and cached for the session -- this is
// layer metadata, not a per-search cost, so it doesn't need repeating on
// every address search.
export function fetchPoiCategories(): Promise<string[]> {
  if (!categoriesPromise) {
    categoriesPromise = (async () => {
      const q = new Query({
        where: `${CATEGORY_FIELD} IS NOT NULL`,
        outFields: [CATEGORY_FIELD],
        returnDistinctValues: true,
        returnGeometry: false,
        orderByFields: [CATEGORY_FIELD],
      });
      const result = await query.executeQueryJSON(POI_LAYER_URL, q);
      return result.features
        .map((f) => f.attributes[CATEGORY_FIELD] as string)
        .filter(Boolean);
    })().catch((err) => {
      console.error("Failed to fetch POI categories -- check POI_LAYER_URL and item access on the API key:", err);
      return [];
    });
  }
  return categoriesPromise;
}

export async function queryNearbyPois(
  x: number,
  y: number,
  category: string,
  radiusMeters = 1500
): Promise<PoiResult[]> {
  const q = new Query({
    geometry: { type: "point", x, y, spatialReference: { wkid: 4326 } } as any,
    distance: radiusMeters,
    units: "meters",
    spatialRelationship: "intersects",
    where: `${CATEGORY_FIELD} = '${category.replace(/'/g, "''")}'`,
    outFields: ["NAME", CATEGORY_FIELD],
    returnGeometry: true,
    outSpatialReference: { wkid: 4326 } as any,
  });

  console.log(`[poi] querying category "${category}" — where: ${q.where}`);
  const result = await query.executeQueryJSON(POI_LAYER_URL, q);
  console.log(`[poi] "${category}" returned ${result.features.length} feature(s)`);
  if (result.features[0]) {
    console.log(`[poi] sample geometry for "${category}":`, result.features[0].geometry);
  }

  const mapped = result.features
    .map((f) => {
      const pt = f.geometry as __esri.Point;
      return { name: (f.attributes.NAME as string) || category, category, x: pt?.x, y: pt?.y };
    })
    .filter((p): p is PoiResult => p.x != null && p.y != null);

  console.log(`[poi] "${category}" usable after geometry filter: ${mapped.length}`);
  return mapped;
}