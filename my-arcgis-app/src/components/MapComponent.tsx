import baseMapConfig from "@/config/mapConfig.json"
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import MapView from "@arcgis/core/views/MapView";

export default function MapCanvas({onViewReady}: {onViewReady : (view:MapView) => void}){
    return (
        <arcgis-map
        basemap={baseMapConfig.baseMap}
        center={baseMapConfig.center}
        zoom={baseMapConfig.zoom}
        onarcgisViewReadyChange={(event:any) => {
            onViewReady(event.target.view);
            // console.log("ready!",event.target.view)
        }}
        />
    )
}