declare module "leaflet-omnivore" {
  import L from "leaflet";

  function omnivore(
    url: string,
    options?: L.Omnivore.Options,
    callback?: (layer: L.Layer) => void
  ): L.Layer;

  namespace omnivore {
    interface Options {
      format?: string;
      layerName?: string;
      icon?: string;
      minZoom?: number;
      maxZoom?: number;
      detectBounds?: boolean;
      detectFeatures?: boolean;
      unique?: boolean;
      filter?: (layer: L.Layer) => boolean;
      onEachFeature?: (feature: any, layer: L.Layer) => void;
      style?: (feature: any) => L.PathOptions;
      pointToLayer?: (feature: any, latlng: L.LatLng) => L.Path;
    }
  }
}
