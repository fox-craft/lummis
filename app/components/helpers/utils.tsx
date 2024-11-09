import {any} from "prop-types";
import {GeoJSON} from "geojson";

export const prepareFiltersQueryParams = (filters: { [key: string]: any}): any =>  {
    const f =  Object.entries(filters).map(([key, value]) => `${key}=${value}`).join('&')
    console.info(`Prepared filter string ${f}`)
    return f
}

export function isValidGeoJsonObject(obj: any): obj is GeoJSON {
    return (
        obj &&
        obj.type === "FeatureCollection" &&
        Array.isArray(obj.features) &&
        obj.features.every(
            (feature: { type: string; geometry: { type: string } }) =>
                feature.type === "Feature" &&
                feature.geometry &&
                [
                    "Point",
                    "LineString",
                    "Polygon",
                    "MultiPoint",
                    "MultiLineString",
                    "MultiPolygon",
                ].includes(feature.geometry.type)
        )
    );
}

// Helper function to generate grid based on bounding box and cell size
function generateGrid(
    bbox: [number, number, number, number],
    cellSize: number
): GeoJSON.FeatureCollection {
    const [xmin, ymin, xmax, ymax] = bbox;
    const rows = Math.ceil((ymax - ymin) / cellSize);
    const cols = Math.ceil((xmax - xmin) / cellSize);

    const features = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x0 = xmin + j * cellSize;
            const y0 = ymin + i * cellSize;
            const x1 = x0 + cellSize;
            const y1 = y0 + cellSize;

            const polygon: GeoJSON.Feature<
                GeoJSON.Geometry,
                GeoJSON.GeoJsonProperties
            > = {
                type: "Feature",
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [x0, y0],
                            [x1, y0],
                            [x1, y1],
                            [x0, y1],
                            [x0, y0],
                        ],
                    ],
                },
                properties: {},
            };

            features.push(polygon);
        }
    }

    return {
        type: "FeatureCollection",
        features,
    };
}