import baseMapConfig from "@/config/mapConfig.json"
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-distance-measurement-2d";
import MapView from "@arcgis/core/views/MapView";
import type { ArcgisDistanceMeasurement2d } from "@arcgis/map-components/components/arcgis-distance-measurement-2d";

interface MapCanvasProps {
    onViewReady: (view: MapView) => void;
    activeTool: "measure" | "draw" | null;
}

export default function MapCanvas({onViewReady,activeTool}: MapCanvasProps){
    return (
        <arcgis-map
        basemap={baseMapConfig.baseMap}
        center={baseMapConfig.center}
        zoom={baseMapConfig.zoom}
        onarcgisViewReadyChange={(event:any) => {
            onViewReady(event.target.view);
            // console.log("ready!",event.target.view)
        }}
        >
            {activeTool === "measure" && (
                <arcgis-distance-measurement-2d
                    hideStartButton
                    onarcgisReady={(event: any) => {
                        (event.target as ArcgisDistanceMeasurement2d).start();
                    }}
                    onarcgisPropertyChange={(event: any) => {
                        const el = event.target as ArcgisDistanceMeasurement2d;
                        if (event.detail?.name === "state" && el.state === "measured") {
                            el.start();
                        }
                    }}
                />
            )}

            {activeTool === "draw" && (
                <arcgis-sketch
                    onarcgisReady={(event: any) => {
                        (event.target as any).start();
                    }}
                />
            )}
    )
        </arcgis-map>
    )
}