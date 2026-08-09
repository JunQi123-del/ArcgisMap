import { useState } from "react";

// Optional: If you're loading secure web maps
// import { configureOAuth } from "./auth/configureOAuth";
// configureOAuth({
//   // Default portalUrl is ArcGIS Online
//   // Only set if using other portals
//   portalUrl: "YOUR_PORTAL_URL",
//   appId: "YOUR_APP_ID",
// });




// Import modules and types from the SDK's core API
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import {useEffect,useRef} from "react";
import {Search,Ruler,Pencil} from "lucide-react";
import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D";
import "@arcgis/map-components/components/arcgis-sketch";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

import MapCanvas from "@/components/MapComponent"

export default function App() {

  const [view, setView] = useState<MapView | null>(null)

  const [activeTool, setActiveTool] = useState<"measure" | "draw" | null>(null);



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

          <button aria-label="Draw"
          className={activeTool === "draw" ? "active" : ""}
          onClick={() => setActiveTool(activeTool === "draw" ? null : "draw")}>
          <Pencil size={16}/>
          </button>
        </div>
      </header>

      <div className="app-body">
        <div className = "app-map"><MapCanvas onViewReady={setView} activeTool={activeTool} /></div>
      </div>
  <footer className= "app-statusbar">status bar</footer>
  </div>


  
  );

}

