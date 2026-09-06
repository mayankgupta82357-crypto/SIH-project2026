import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { incidentAPI, alertAPI, unitAPI, facilityAPI, simulationAPI } from "../services/api";

const IncidentContext = createContext(null);

export const IncidentProvider = ({ children }) => {
  const [incidents, setIncidents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [units, setUnits] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Simulation modal & progress state
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulationStage, setSimulationStage] = useState(0);
  const [simulationStages, setSimulationStages] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);

  const refreshData = useCallback(async () => {
    try {
      const [incRes, altRes, unitRes, facRes] = await Promise.allSettled([
        incidentAPI.getAll(),
        alertAPI.getAll(),
        unitAPI.getAll(),
        facilityAPI.getAll()
      ]);

      if (incRes.status === "fulfilled" && incRes.value?.data) {
        setIncidents(incRes.value.data);
        if (!selectedIncident && incRes.value.data.length > 0) {
          setSelectedIncident(incRes.value.data[0]);
        }
      }
      if (altRes.status === "fulfilled" && altRes.value?.data) {
        setAlerts(altRes.value.data);
      }
      if (unitRes.status === "fulfilled" && unitRes.value?.data) {
        setUnits(unitRes.value.data);
      }
      if (facRes.status === "fulfilled" && facRes.value?.data) {
        setFacilities(facRes.value.data);
      }
    } catch (e) {
      console.warn("Telemetry refresh warning:", e);
    } finally {
      setLoading(false);
    }
  }, [selectedIncident]);

  useEffect(() => {
    refreshData();
    const timer = setInterval(refreshData, 5000);
    return () => clearInterval(timer);
  }, [refreshData]);

  const createIncident = async (data) => {
    const res = await incidentAPI.create(data);
    if (res.success) {
      await refreshData();
      return res.data;
    }
    return null;
  };

  const updateIncidentStatus = async (id, status) => {
    const res = await incidentAPI.updateStatus(id, status);
    if (res.success) {
      await refreshData();
      return res.data;
    }
    return null;
  };

  const assignUnit = async (incidentId, unitId) => {
    const res = await incidentAPI.assignUnit(incidentId, unitId);
    if (res.success) {
      await refreshData();
      return res.data;
    }
    return null;
  };

  const acknowledgeAlert = async (id, operatorName) => {
    const res = await alertAPI.acknowledge(id, operatorName);
    if (res.success) {
      await refreshData();
      return res.data;
    }
    return null;
  };

  // Run the 13-stage automated cascade simulation
  const startUrbanSimulation = async () => {
    setSimulationActive(true);
    setSimulationStage(0);
    try {
      const res = await simulationAPI.run();
      if (res.success) {
        setSimulationStages(res.stages || []);
        setSimulationResult(res);
        // Sync local incident selection to the demo incident
        if (res.incident) {
          setSelectedIncident(res.incident);
        }
        await refreshData();
      }
    } catch (e) {
      console.error("Simulation error:", e);
    }
  };

  const resetSimulation = async () => {
    try {
      await simulationAPI.reset();
      setSimulationActive(false);
      setSimulationStage(0);
      setSimulationResult(null);
      await refreshData();
    } catch (e) {
      console.error("Reset error:", e);
    }
  };

  // Aggregates for Command Center cards
  const activeIncidents = incidents.filter(i => i.status !== "Resolved");
  const criticalIncidents = activeIncidents.filter(i => i.severity === "Critical");
  const totalAffectedPopulation = activeIncidents.reduce((sum, i) => sum + (i.affectedPopulation || 0), 0);
  const activeUnitsCount = units.filter(u => u.status !== "Available").length;
  const overallRiskScore = activeIncidents.length > 0
    ? Math.max(...activeIncidents.map(i => i.riskScore || 50))
    : 35;

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        activeIncidents,
        criticalIncidents,
        alerts,
        units,
        facilities,
        loading,
        selectedIncident,
        setSelectedIncident,
        refreshData,
        createIncident,
        updateIncidentStatus,
        assignUnit,
        acknowledgeAlert,
        // Simulation
        simulationActive,
        setSimulationActive,
        simulationStage,
        setSimulationStage,
        simulationStages,
        simulationResult,
        startUrbanSimulation,
        resetSimulation,
        // Metrics
        metrics: {
          activeIncidentsCount: activeIncidents.length,
          criticalCount: criticalIncidents.length,
          affectedPopulation: totalAffectedPopulation,
          activeUnits: activeUnitsCount,
          totalUnits: units.length,
          avgResponseTime: "11.8m",
          overallRiskScore,
          monitoredZones: 12
        }
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidents = () => useContext(IncidentContext);
