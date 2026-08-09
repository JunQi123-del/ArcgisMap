import baseMapConfig from "@/config/mapConfig.json"
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";

export default function MapCanvas(){
    return (
        <arcgis-map
        basemap={baseMapConfig.baseMap}
        center={baseMapConfig.center}
        zoom={baseMapConfig.zoom}
        // style={{ position: "absolute", inset: 0 }}
        />
    )
}