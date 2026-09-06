import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import {
  AlertTriangle,
  Flame,
  Droplets,
  ShieldAlert,
  Building2,
  Shield,
  Truck,
  HeartPulse,
  Filter,
  Eye,
  Info,
  Layers,
  Search,
  CheckCircle2,
  Navigation,
  Globe
} from "lucide-react";
import { SeverityPill, StatusPill } from "../common/StatusPill";
import { mapAPI } from "../../services/api";

// Helper to create glowing HTML SVG markers
const createCustomIcon = (bgColor, borderColor, symbolSvg) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${bgColor};
        border: 2px solid ${borderColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 15px ${borderColor};
        color: white;
        cursor: pointer;
        position: relative;
      ">
        <span style="display: inline-block; transform: scale(0.9);">${symbolSvg}</span>
        <div style="
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid ${borderColor};
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          opacity: 0.6;
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
};

const createFacilityIcon = (bgColor, borderColor, textSymbol) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        width: 28px;
        height: 28px;
        background: ${bgColor};
        border: 1.5px solid ${borderColor};
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.4);
        color: white;
        font-weight: bold;
        font-size: 13px;
        cursor: pointer;
      ">
        ${textSymbol}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

const searchPinIcon = L.divIcon({
  className: "custom-div-icon",
  html: `
    <div style="
      width: 36px;
      height: 36px;
      background: #06b6d4;
      border: 3px solid #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px #06b6d4;
      color: #060913;
      font-weight: bold;
      font-size: 14px;
      position: relative;
    ">
      📍
      <div style="
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid #06b6d4;
        animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
      "></div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20]
});

const getIncidentIcon = (type, severity) => {
  if (type === "Accident") {
    return createCustomIcon(
      severity === "Critical" ? "#dc2626" : "#b91c1c",
      "#f87171",
      "💥"
    );
  }
  if (type === "Fire") {
    return createCustomIcon("#ea580c", "#fb923c", "🔥");
  }
  if (type === "Flood") {
    return createCustomIcon("#0284c7", "#38bdf8", "🌊");
  }
  if (type === "Road Blockage") {
    return createCustomIcon("#d97706", "#fbbf24", "🚧");
  }
  return createCustomIcon("#7c3aed", "#c084fc", "⚠️");
};

// Component to handle map camera flying to searched coordinates
function MapFlyTo({ targetCoords }) {
  const map = useMap();
  useEffect(() => {
    if (targetCoords) {
      map.flyTo(targetCoords, 15, { duration: 1.5 });
    }
  }, [targetCoords, map]);
  return null;
}

export const CityMap = ({
  incidents = [],
  units = [],
  facilities = [],
  onSelectIncident,
  selectedIncidentId
}) => {
  const [filterType, setFilterType] = useState("all");
  const [showCircles, setShowCircles] = useState(true);
  const [showUnits, setShowUnits] = useState(true);
  const [showFacilities, setShowFacilities] = useState(true);

  // 100% Free Public Tile Layers (ZERO API KEY REQUIRED)
  const [tileProvider, setTileProvider] = useState("osm_standard");

  // Map Search / Geocoding state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTarget, setSearchTarget] = useState(null);
  const [searchSearching, setSearchSearching] = useState(false);

  // Default Bengaluru center
  const center = [12.9716, 77.6046];

  // Guaranteed 100% Key-Free Public Tile Layers
  const tileLayers = {
    osm_standard: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
      name: "OpenStreetMap (Standard)",
      className: ""
    },
    dark_mode: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
      name: "OpenStreetMap (Dark Mode)",
      className: "dark-tiles"
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "Tiles &copy; Esri World Imagery",
      name: "Satellite",
      className: ""
    }
  };

  const currentTile = tileLayers[tileProvider] || tileLayers.osm_standard;

  const handleLocationSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchSearching(true);
    try {
      const res = await mapAPI.search(searchQuery);
      if (res.success && res.results && res.results.length > 0) {
        const first = res.results[0];
        setSearchTarget({
          name: first.name,
          displayName: first.displayName,
          coordinates: first.coordinates,
          source: res.source
        });
      }
    } catch (err) {
      console.error("Map search error:", err);
    } finally {
      setSearchSearching(false);
    }
  };

  const filteredIncidents = incidents.filter((i) => {
    if (filterType === "all") return true;
    return i.type.toLowerCase() === filterType.toLowerCase();
  });

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-dark-900 shadow-2xl">
      {/* Top Map Control Bar */}
      <div className="absolute top-4 left-4 z-[400] flex flex-wrap items-center gap-2 bg-dark-950/90 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-xl max-w-[calc(100%-2rem)]">
        {/* Map Location Search Form */}
        <form onSubmit={handleLocationSearch} className="relative flex items-center">
          <input
            type="text"
            placeholder="Search: e.g. Victoria Hospital, MG Road..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 sm:w-64 pl-8 pr-7 py-1 text-xs bg-dark-900 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSearchTarget(null);
              }}
              className="absolute right-2 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </form>

        <button
          type="button"
          onClick={handleLocationSearch}
          disabled={searchSearching}
          className="px-2.5 py-1 rounded-lg bg-cyan-500 text-dark-950 text-xs font-bold hover:bg-cyan-400 transition"
        >
          {searchSearching ? "..." : "Locate"}
        </button>

        <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block"></div>

        {/* Tile Provider Switcher (All 100% Free / No Key) */}
        <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
          <button
            type="button"
            onClick={() => setTileProvider("osm_standard")}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
              tileProvider === "osm_standard" ? "bg-cyan-500 text-dark-950 font-bold" : "text-slate-300 hover:text-white"
            }`}
          >
            OSM Map
          </button>
          <button
            type="button"
            onClick={() => setTileProvider("dark_mode")}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
              tileProvider === "dark_mode" ? "bg-cyan-500 text-dark-950 font-bold" : "text-slate-300 hover:text-white"
            }`}
          >
            Dark Mode
          </button>
          <button
            type="button"
            onClick={() => setTileProvider("satellite")}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
              tileProvider === "satellite" ? "bg-cyan-500 text-dark-950 font-bold" : "text-slate-300 hover:text-white"
            }`}
          >
            Satellite
          </button>
        </div>

        {/* Free Map Confirmation Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>OpenStreetMap (100% Free • No Key Needed)</span>
        </div>

        <div className="h-4 w-px bg-white/10 mx-1 hidden lg:block"></div>

        {/* Category Filter Pills */}
        <div className="hidden xl:flex items-center gap-1">
          <button
            type="button"
            onClick={() => setFilterType("all")}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
              filterType === "all" ? "bg-cyan-500 text-dark-950" : "text-slate-400 hover:text-white"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilterType("accident")}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
              filterType === "accident" ? "bg-red-500 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            💥 Accidents
          </button>
          <button
            type="button"
            onClick={() => setFilterType("fire")}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
              filterType === "fire" ? "bg-orange-500 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            🔥 Fires
          </button>
          <button
            type="button"
            onClick={() => setFilterType("flood")}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
              filterType === "flood" ? "bg-blue-500 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            🌊 Floods
          </button>
        </div>
      </div>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-5 right-5 z-[400] bg-dark-950/90 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-2xl text-xs space-y-1.5 pointer-events-auto max-w-xs">
        <div className="font-bold text-slate-200 uppercase tracking-wider font-mono text-[10px] pb-1 border-b border-white/10 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Info className="w-3 h-3" />
            Active Map Telemetry
          </span>
          <span className="text-[9px] text-emerald-400 font-mono font-bold">100% FREE ACTIVE</span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] pt-1">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Accident 💥
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Active Fire 🔥
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Flood / Water 🌊
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Blockage 🚧
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded bg-emerald-700 text-[9px] flex items-center justify-center">🏥</span> Hospital
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded bg-amber-700 text-[9px] flex items-center justify-center">🚑</span> Ambulance
          </div>
        </div>
      </div>

      {/* Leaflet Map */}
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution={currentTile.attribution}
          url={currentTile.url}
          className={currentTile.className}
        />

        {/* Fly to searched coordinates */}
        {searchTarget && <MapFlyTo targetCoords={searchTarget.coordinates} />}

        {/* Searched Location Pin */}
        {searchTarget && (
          <Marker position={searchTarget.coordinates} icon={searchPinIcon}>
            <Popup>
              <div className="p-1 text-left text-xs">
                <span className="font-bold text-cyan-400 font-mono">📍 Located Landmark</span>
                <h4 className="font-extrabold text-white mt-0.5">{searchTarget.name}</h4>
                <p className="text-[11px] text-slate-300 mt-1">{searchTarget.displayName}</p>
                <div className="mt-2 text-[10px] text-emerald-400 font-mono">
                  Coordinates: {searchTarget.coordinates[0]?.toFixed(4)}, {searchTarget.coordinates[1]?.toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Incident Markers & Risk Radii */}
        {filteredIncidents.map((incident) => {
          const coords = incident.coordinates || [12.9716, 77.6046];
          const radiusMeters = (incident.impactRadiusKm || 1.5) * 1000;
          const isSelected = selectedIncidentId === incident.id;

          const circleColor =
            incident.severity === "Critical" ? "#ef4444" :
            incident.severity === "High" ? "#f97316" : "#eab308";

          return (
            <React.Fragment key={incident.id}>
              {showCircles && (
                <Circle
                  center={coords}
                  radius={radiusMeters}
                  pathOptions={{
                    color: circleColor,
                    fillColor: circleColor,
                    fillOpacity: isSelected ? 0.25 : 0.12,
                    weight: isSelected ? 2.5 : 1.2,
                    dashArray: isSelected ? "4, 6" : undefined
                  }}
                />
              )}

              <Marker
                position={coords}
                icon={getIncidentIcon(incident.type, incident.severity)}
                eventHandlers={{
                  click: () => {
                    if (onSelectIncident) onSelectIncident(incident);
                  }
                }}
              >
                <Popup>
                  <div className="w-64 text-left p-1">
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                      <span className="font-mono text-[10px] text-cyan-400 font-bold">{incident.id}</span>
                      <SeverityPill severity={incident.severity} />
                    </div>
                    <h4 className="font-bold text-sm text-white mt-1.5 leading-snug">{incident.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 font-mono flex items-center gap-1">
                      <span>📍</span> {incident.location}
                    </p>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">{incident.description}</p>
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-mono">Risk: <b className="text-rose-400">{incident.riskScore}/100</b></span>
                      <span className="text-slate-400 font-mono">Pop: <b className="text-slate-200">{incident.affectedPopulation?.toLocaleString()}</b></span>
                    </div>
                    {incident.roadBlocked && (
                      <div className="mt-2 text-[10px] bg-red-500/20 text-red-300 px-2 py-1 rounded font-bold text-center border border-red-500/30">
                        ⚠️ CORRIDOR IMPASSABLE
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}

        {/* Facilities (Hospitals, Police, Fire) */}
        {showFacilities && facilities.map((fac) => {
          const coords = fac.coordinates || [12.97, 77.60];
          let symbol = "🏥";
          let bg = "#047857";
          let border = "#34d399";

          if (fac.category === "police_station") {
            symbol = "🚓";
            bg = "#1d4ed8";
            border = "#60a5fa";
          } else if (fac.category === "fire_station") {
            symbol = "🚒";
            bg = "#b91c1c";
            border = "#f87171";
          }

          return (
            <Marker
              key={fac.id}
              position={coords}
              icon={createFacilityIcon(bg, border, symbol)}
            >
              <Popup>
                <div className="p-1 text-left">
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">{fac.id}</div>
                  <h4 className="font-bold text-sm text-white">{fac.name}</h4>
                  <p className="text-xs text-slate-300 mt-0.5">{fac.address}</p>
                  {fac.capacity && <p className="text-xs text-emerald-400 mt-1 font-semibold">{fac.capacity}</p>}
                  {fac.status && <p className="text-[10px] text-slate-400 mt-0.5">Status: {fac.status}</p>}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Response Units (Ambulances, Fire, Police) */}
        {showUnits && units.map((u) => {
          const coords = u.coordinates || [12.97, 77.60];
          let symbol = "🚑";
          let bg = "#0369a1";
          let border = "#38bdf8";

          if (u.type === "Fire Truck") {
            symbol = "🚒";
            bg = "#c2410c";
            border = "#fb923c";
          } else if (u.type === "Police Vehicle") {
            symbol = "🚓";
            bg = "#4338ca";
            border = "#818cf8";
          } else if (u.type === "Rescue Team") {
            symbol = "🛟";
            bg = "#0f766e";
            border = "#2dd4bf";
          }

          return (
            <Marker
              key={u.id}
              position={coords}
              icon={createFacilityIcon(bg, border, symbol)}
            >
              <Popup>
                <div className="p-1 text-left">
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">{u.id} • {u.callsign}</div>
                  <h4 className="font-bold text-sm text-white">{u.subType || u.type}</h4>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <StatusPill status={u.status} />
                    <span className="text-[10px] text-slate-400 font-mono">Fuel: {u.fuelLevel}%</span>
                  </div>
                  {u.assignedIncident && (
                    <p className="text-xs text-amber-400 mt-2 font-mono">
                      Assigned: {u.assignedIncident} (ETA: {u.etaMinutes}m)
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};