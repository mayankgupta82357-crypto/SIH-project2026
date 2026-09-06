import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./components/common/Sidebar";
import { Header } from "./components/common/Header";
import { SimulationModal } from "./components/simulation/SimulationModal";

// Pages
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { DashboardOverview } from "./pages/DashboardOverview";
import { LiveMapPage } from "./pages/LiveMapPage";
import { IncidentsPage } from "./pages/IncidentsPage";
import { CascadePage } from "./pages/CascadePage";
import { EmergencyRoutesPage } from "./pages/EmergencyRoutesPage";
import { AlertsPage } from "./pages/AlertsPage";
import { ResponseUnitsPage } from "./pages/ResponseUnitsPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { CitizenPortal } from "./pages/CitizenPortal";
import { AdminPage } from "./pages/AdminPage";

// Command Center Layout Wrapper
const CommandCenterLayout = () => {
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto bg-grid-pattern bg-radial-glow">
          <Outlet />
        </main>
      </div>
      <SimulationModal />
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/citizen" element={<CitizenPortal />} />

      {/* Command Center Authenticated Portal */}
      <Route path="/command-center" element={<CommandCenterLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="map" element={<LiveMapPage />} />
        <Route path="incidents" element={<IncidentsPage />} />
        <Route path="cascade" element={<CascadePage />} />
        <Route path="routes" element={<EmergencyRoutesPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="units" element={<ResponseUnitsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
