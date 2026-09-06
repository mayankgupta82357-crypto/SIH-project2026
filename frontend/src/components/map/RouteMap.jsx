import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

const createPointIcon = (color, text) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        background: ${color};
        color: white;
        font-weight: bold;
        border: 2px solid white;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.5);
      ">${text}</div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

export const RouteMap = ({ routeData }) => {
  const center = [12.9690, 77.5920];

  if (!routeData) {
    return (
      <div className="w-full h-full min-h-[420px] rounded-2xl border border-white/10 bg-dark-900 flex items-center justify-center text-slate-400 text-xs">
        Select starting point & destination to visualize optimized emergency corridor.
      </div>
    );
  }

  const { recommendedRoute, alternativeRoute, blockedRoute } = routeData;
  const startCoord = recommendedRoute?.path[0] || center;
  const endCoord = recommendedRoute?.path[recommendedRoute.path.length - 1] || center;

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-2xl overflow-hidden border border-white/10 bg-dark-900 shadow-2xl">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Blocked Corridor (Dotted Red) */}
        {blockedRoute?.path && (
          <Polyline
            positions={blockedRoute.path}
            pathOptions={{
              color: "#ef4444",
              weight: 4,
              opacity: 0.6,
              dashArray: "6, 8"
            }}
          />
        )}

        {/* Alternative Route (Yellow) */}
        {alternativeRoute?.path && (
          <Polyline
            positions={alternativeRoute.path}
            pathOptions={{
              color: "#eab308",
              weight: 5,
              opacity: 0.8
            }}
          />
        )}

        {/* Recommended Green Corridor (Bright Emerald Pulsing) */}
        {recommendedRoute?.path && (
          <Polyline
            positions={recommendedRoute.path}
            pathOptions={{
              color: "#10b981",
              weight: 7,
              opacity: 0.95
            }}
          />
        )}

        {/* Start Point */}
        <Marker position={startCoord} icon={createPointIcon("#3b82f6", "A")}>
          <Popup>
            <div className="text-left p-1 text-xs">
              <span className="font-bold text-blue-400">Emergency Origin</span>
              <p className="text-white mt-1">{routeData.startLocation}</p>
            </div>
          </Popup>
        </Marker>

        {/* Destination Point */}
        <Marker position={endCoord} icon={createPointIcon("#10b981", "B")}>
          <Popup>
            <div className="text-left p-1 text-xs">
              <span className="font-bold text-emerald-400">Target Hospital / Base</span>
              <p className="text-white mt-1">{routeData.destination}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
