import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import SmartStreetLight from './pages/SmartStreetLight';
import SolarStreetLight from './pages/SolarStreetLight';
import FeeManagement from './pages/FeeManagement';
import WasteCollectionFee from './pages/WasteCollectionFee';
import CCTVAI from './pages/CCTVAI';
import ElderlyCare from './pages/ElderlyCare';

// CCTV-AI sub-pages (catalog + 6 apps + technical overview)
import TechnicalOverview from './pages/cctv-ai/TechnicalOverview';
import PublicAreaWatch from './pages/cctv-ai/PublicAreaWatch';
import RestrictedZone from './pages/cctv-ai/RestrictedZone';
import CrowdDensity from './pages/cctv-ai/CrowdDensity';
import RoadSafety from './pages/cctv-ai/RoadSafety';
import VehicleCheck from './pages/cctv-ai/VehicleCheck';
import ParkingManagement from './pages/cctv-ai/ParkingManagement';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 pt-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/smart-street-light" element={<SmartStreetLight />} />
            <Route path="/solar-street-light" element={<SolarStreetLight />} />
            <Route path="/fee-management" element={<FeeManagement />} />
            <Route path="/waste-fee" element={<WasteCollectionFee />} />
            <Route path="/elderly-care" element={<ElderlyCare />} />

            {/* CCTV + AI catalog + 6 detail apps + technical overview */}
            <Route path="/cctv-ai" element={<CCTVAI />} />
            <Route path="/cctv-ai/technical-overview" element={<TechnicalOverview />} />
            <Route path="/cctv-ai/public-area-watch" element={<PublicAreaWatch />} />
            <Route path="/cctv-ai/restricted-zone" element={<RestrictedZone />} />
            <Route path="/cctv-ai/crowd-density" element={<CrowdDensity />} />
            <Route path="/cctv-ai/road-safety" element={<RoadSafety />} />
            <Route path="/cctv-ai/vehicle-check" element={<VehicleCheck />} />
            <Route path="/cctv-ai/parking-management" element={<ParkingManagement />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
