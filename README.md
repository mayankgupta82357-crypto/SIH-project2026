# ðŸš¨ Urban Cascade Intelligence & Response System

> **Predict Urban Disruptions Before They Become Cascades.**  
> An intelligent emergency response platform that detects disruptions, analyzes cascading systemic impacts across urban corridors, and coordinates rapid emergency responses with automated green corridors.

---

## ðŸŒŸ Presentation & Hackathon Overview

In major metropolises (calibrated for the **Bengaluru Central Metropolitan Grid**), emergency systems often operate in isolated silos: traffic control, ambulance dispatch, municipal works, and fire services do not share real-time predictive intelligence. A single localized disruption (e.g. a tanker collision on MG Road) rapidly creates arterial closures, severe traffic queues, delayed ambulance response times, and compromised trauma center access.

**Urban Cascade Intelligence & Response System** solves this crisis by:
1. **Detecting** disruptions via integrated telemetry and verified citizen reports.
2. **Analyzing** systemic failure propagation through multi-tier cascade graphs.
3. **Predicting** secondary bottlenecks before gridlock metastasizes.
4. **Responding** with optimized bypass routing, automated traffic signal preemption, and priority fleet dispatch.
5. **Monitoring** hospital trauma corridors and citywide resilience in real-time.

---

## âš¡ Tech Stack

- **Frontend**: React 18, Tailwind CSS, Vite, React Router v6, Lucide React icons, Recharts, Leaflet & React-Leaflet
- **Backend**: Node.js v24 LTS, Express.js REST APIs, Socket.IO real-time stream, Mongoose & hybrid resilient in-memory database engine
- **Map & GIS**: OpenStreetMap, CartoDB Dark Matter tiles, Leaflet custom SVG div-icons & dynamic risk-radius geofences
- **Intelligence**: Autonomous rule-based heuristic cascade modeling engine & emergency corridor optimizer

---

## ðŸŽ¯ Key Features & System Modules

### 1. ðŸ  Home Landing Website (`/`)
- Dark modern command aesthetic with glowing glassmorphic panels.
- Animated hero cascade visualizer with live telemetry counters.
- **Why Urban Cascade?** explaining silo failures and domino collapses.
- **5-Step Workflow**: Detect âž” Analyze âž” Predict âž” Respond âž” Monitor.
- **8 Core Feature Showcase Cards** with responsive layouts.
- **The Urban Cascade Chain**: Interactive visual walkthrough of the Road Accident âž” Hospital Access Risk chain.
- System prototype baseline statistics and technology badges.

### 2. ðŸ” Authentication Portal (`/login`, `/register`)
- **Fast 1-Click Demo Logins** with zero manual configuration:
  - **Demo Admin**: Dr. Rajeshwar Rao (Full command & admin privileges)
  - **Demo Emergency Operator**: Priya Sharma (Central Dispatch & unit allocation)
  - **Demo Citizen**: Arjun Verma (Public safety advisories & incident reporting)
- Role-based automatic routing (Admin/Operator âž” Command Center, Citizen âž” Citizen Portal).

### 3. ðŸŽ›ï¸ Central Command Center (`/command-center`)
- Left navigation sidebar with real-time incident, unit, and alert counter badges.
- Top bar with global search, live Indian Standard Time (IST) clock, real-time alert popover, and personnel profile.
- 6 Key Performance Metric cards (Active Incidents, Critical Threats, Affected Zones, Emergency Units, Avg Response Time, Overall Risk Score).
- Embedded live mini-map with real-time marker synchronization.

### 4. ðŸ—ºï¸ Live City Geospatial Map (`/command-center/map`)
- Full interactive Leaflet map calibrated for Bengaluru (MG Road, Brigade Rd, Indiranagar, Silk Board, Hebbal, Victoria & Manipal Hospitals).
- Custom glowing markers for Accidents (ðŸ”´), Fires (ðŸ”¥), Floods (ðŸŒŠ), Road Blockages (ðŸš§), Hospitals (ðŸ¥), Police (ðŸš“), Fire Stations (ðŸš’), and Ambulances (ðŸš‘).
- Dynamic impact radius heat circles, incident inspection drawer, category filters, and search.

### 5. ðŸ“‹ Incident Registry & Escalation (`/command-center/incidents`)
- Filterable, searchable incident table.
- Direct modal to **Add New Incident** (with automatic risk score computation and alert broadcasting).
- Inline status transitions: *Detected âž” Investigating âž” Responding âž” Contained âž” Resolved*.
- Direct **Dispatch Response Unit** modal assigning ambulances or fire tenders with dynamic ETAs.

### 6. ðŸ§  Cascade Intelligence Analyzer (`/command-center/cascade`) â€” *The Star Feature*
- Interactive primary disruption selector (Accident, Fire, Flood, Blockage).
- Visual animated **Cascade Failure Vector Diagram**:
  $$\text{Collision} \longrightarrow \text{Road Closure} \longrightarrow \text{Traffic Gridlock} \longrightarrow \text{Ambulance Delay} \longrightarrow \text{Hospital Risk} \longrightarrow \text{Intersection Overload}$$
- Tactical parameters: Cascade Risk (0-100), Impact Radius (km), Affected Population, Cascade Depth (Tiers), Confidence Rating (%).
- **AI Situation Analysis Engine**: Executive Summary, Immediate Critical Threats, Projected Secondary Cascades, and Prioritized Action Protocols.

### 7. ðŸš‘ Emergency Route Optimizer (`/command-center/routes`)
- Calculates dynamic bypass corridors avoiding active road closures.
- Interactive side-by-side comparison:
  - **Green Emergency Corridor (Richmond Flyover)**: Saves 19 critical minutes with automated signal preemption.
  - **Compromised Direct Route**: Blocked by incident gridlock.
  - **Secondary Bypass**: Alternative route through Cubbon Park.
- Visual polyline rendering on Leaflet with route waypoints.

### 8. ðŸ”” Active Alert Center (`/command-center/alerts`)
- Categorized priority alert feed (Critical Incident, Cascade Risk, Flood Warning, Vehicle Delay, Infrastructure Failure).
- Operator one-click alert acknowledgement with audit logging.
- "SIMULATE NEW EMERGENCY" trigger.

### 9. ðŸš’ Emergency Fleet Management (`/command-center/units`)
- Real-time fleet tracking for Advanced Life Support Ambulances, Heavy Rescue Fire Tenders, Traffic Interceptors, and SDRF Rescue Teams.
- Statuses: *Available*, *Dispatched*, *En Route*, *On Scene*, *Returning*.

### 10. ðŸ“Š Analytics Dashboard (`/command-center/analytics`)
- High-density Recharts data visualizations:
  - Disruptions vs Cascade Multipliers Over Time (Area chart)
  - Incidents by Category (Bar chart)
  - Average Response Time by Zone vs 8-minute Target (Bar chart)
  - Cascade Progression Depth vs Risk Index (Bar chart)
- Timeframe toggles: **Today**, **7 Days**, **30 Days**.

### 11. ðŸ‘¥ Citizen Public Safety Portal (`/citizen`)
- Citizen-friendly safety advisories and real-time roadblock warnings.
- Interactive **Report Civic Disruption Form**: Immediately verifies and injects citizen-reported hazards into the Command Center queue.
- Recommended safer civilian routes avoiding active cascade zones.

### 12. âš™ï¸ Administration & Audit Trail (`/command-center/admin`)
- Real-time system health diagnostics: Database Engine status, Node.js memory heap usage, WebSocket telemetry status, and API uptime.
- Role management table for operators, admins, and civic personnel.
- Chronological immutable activity log recording all dispatches, escalations, and simulations.

### 13. ðŸš€ The 13-Stage Automated Cascade Simulation Engine
- Prominently accessible via **"RUN URBAN CASCADE SIMULATION"** from the dashboard or sidebar.
- Automatically orchestrates the complete 13-step cascade lifecycle:
  1. Sudden Incident Inception (MG Road LPG Tanker Collision)
  2. Real-Time Dashboard Ingestion
  3. Live Map Pinpoint & Geolocation
  4. Roadway Arterial Closure (6 lanes blocked)
  5. Traffic Risk Spike (+65% density on radials)
  6. Secondary Cascade Event Triggered (Ambulance AMB-102 delayed +18 min)
  7. Prototype Risk Score Recalculation (Surges to 94/100)
  8. Critical Alert Broadcast to Dispatch
  9. Affected Impact Zone Expansion (2.8 km, 45,000 citizens)
  10. Intelligent Ambulance Dispatch (AMB-101 allocated)
  11. Green Emergency Corridor Computed (Saves 19 mins via Richmond Flyover)
  12. Dashboard Live Statistics Synchronized
  13. Cascade Chain Finalized & Multi-Agency Action Plan Published
- Interactive playback controls: Pause, Play, Stage Selector, and Reset.

---

## ðŸƒ Quick Start Guide

### Prerequisites
- Node.js (v18+ or v24 LTS recommended)
- npm (v9+)

### 1. Installation

```bash
# Clone or navigate to the project directory
cd urban-cascade-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Launching the Application

**Terminal 1 (Backend API & Socket Server):**
```bash
cd backend
npm start
# Server starts on http://localhost:5000
```

**Terminal 2 (Frontend Dev Server):**
```bash
cd frontend
npm run dev
# Application available on http://localhost:5173
```

---

## ðŸ” Demo Credentials

Use any of the 1-click demo login buttons on `/login` or enter credentials manually:

| Role | Email | Password | Target Dashboard |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@urbancascade.gov` | `password123` | `/command-center` |
| **Emergency Operator** | `operator@urbancascade.gov` | `password123` | `/command-center` |
| **Citizen** | `citizen@urbancascade.gov` | `password123` | `/citizen` |

---

## ðŸŽ¤ 5â€“10 Minute Presentation / Hackathon Script

1. **Minute 1: The Hook (Landing Page `/`)**
   - Open `http://localhost:5173`.
   - Explain the core thesis: modern cities fail because emergency systems are reactive and siloed.
   - Highlight the animated hero visualizer showing how an accident cascades into hospital trauma risk.

2. **Minute 2: The 1-Click Demo Login (`/login`)**
   - Click "Get Started" or "Login", click **Demo Admin**. Show instant authentication without database hurdles.

3. **Minute 3: Command Center Overview (`/command-center`)**
   - Show the 6 KPI cards, live IST clock, and the active Bengaluru city map.
   - Highlight that the system monitors 12 arterial zones in real time.

4. **Minute 4: The 13-Stage Live Simulation (Click "RUN URBAN CASCADE SIMULATION")**
   - Trigger the simulation. Walk the judges through the progression:
     - Incident created âž” Road blocked âž” Traffic spike âž” Ambulance delayed âž” Risk rises to 94 âž” Green corridor calculated âž” Recommended multi-agency response.

5. **Minute 5: Cascade Intelligence Deep-Dive (`/command-center/cascade`)**
   - Show the animated multi-tier node diagram (Collision âž” Closure âž” Congestion âž” Delay âž” Hospital Risk âž” Overload).
   - Click on nodes to show live metric contributions.
   - Showcase the AI Situation Analysis Engine with prioritized response protocols (P1, P2, P3).

6. **Minute 6: Emergency Route Optimization (`/command-center/routes`)**
   - Show how the routing algorithm bypasses blocked MG Road to route AMB-101 to Victoria Hospital, saving 19 minutes of critical Golden Hour transit time.

7. **Minute 7: Incident Management & Citizen Reporting (`/command-center/incidents` & `/citizen`)**
   - Open the Citizen Portal. Submit an emergency report. Show how high-severity citizen reports instantly reflect in the Command Center queue.

8. **Minute 8: Analytics & Conclusion (`/command-center/analytics`)**
   - Show Recharts performance trends across Today, 7 Days, and 30 Days.
   - Conclude with the vision of integrated, predictive urban resilience.

---

## ðŸ“„ License & Academic Disclosure

Built as a prototype demonstration for emergency management and urban resilience presentations. Predictions are computed using autonomous heuristic graph analysis for decision-support and academic simulation purposes.