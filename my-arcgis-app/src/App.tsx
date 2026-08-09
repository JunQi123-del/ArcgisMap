import { useState } from "react";

// Optional: If you're loading secure web maps
// import { configureOAuth } from "./auth/configureOAuth";
// configureOAuth({
//   // Default portalUrl is ArcGIS Online
//   // Only set if using other portals
//   portalUrl: "YOUR_PORTAL_URL",
//   appId: "YOUR_APP_ID",
// });


// Individual imports for each Map, Chart and Calcite component
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/charts-components/components/arcgis-chart";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-navigation";
import "@esri/calcite-components/components/calcite-navigation-logo";

// Import modules and types from the SDK's core API
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import {useEffect,useRef} from "react";
import {Search,Ruler,Pencil} from "lucide-react";
import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D";
import mapView from "@arcgis/core/views/MapView";
import MapCanvas from "@/components/MapComponent"

export default function App() {

  const mapDivRef = useRef<HTMLDivElement>(null);

  const [view, setView] = useState<MapView | null>(null)

  const [activeTool, setActiveTool] = useState<"measure" | "draw" | null>(null);


  useEffect(() =>{
     if (!mapDivRef.current) return;

     const map = new Map({
      basemap: "hybrid"
     });

     const view = new MapView({
      container: mapDivRef.current,
      map: map,
      center: [103.8198, 1.3521],
      zoom: 11,
     });

     setView(view)

     return () => view.destroy(); // This is the clean up after use effect runs 

  },[]);

  useEffect(() =>{
    if (!view) return;
    if (activeTool !== "measure") return;
    
    const measurement = new DistanceMeasurement2D({view});
    view.ui.add(measurement, "top-right");

    return () => {
      view.ui.remove(measurement);
      measurement.destroy();
    };
  },[view,activeTool])

  return (
    <div className="app-shell">
      <header className="app-toolbar">
        <span>GeoOps</span>

        <div className="toolbar-search">
          <Search size={16}/>
          <input type = "text" placeholder="Search location or feature"/>
        </div>

        <div className="toolbar-tools">
          <button 
          aria-label="Measure" 
          className={activeTool === "measure" ? "active" : ""} 
          onClick={() => setActiveTool(activeTool === "measure" ? null : "measure")}>
          <Ruler size={16}/></button>
          <button aria-label="Draw"><Pencil size={16}/></button>
        </div>
      </header>

      <div className="app-body">
        <div className = "app-map"><MapCanvas/></div>
      </div>
  <footer className= "app-statusbar">status bar</footer>
  </div>


  
  );

}

