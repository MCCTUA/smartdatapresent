import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Overview from './pages/Overview';
import SmartStreetLight from './pages/SmartStreetLight';
import SolarStreetLight from './pages/SolarStreetLight';
import FeeManagement from './pages/FeeManagement';
import WasteCollectionFee from './pages/WasteCollectionFee';
import CCTVAI from './pages/CCTVAI';
import ElderlyCareStory from './pages/ElderlyCareStory';
import ElderlyCare from './pages/ElderlyCare';
import ElderlyCareLegacy from './pages/ElderlyCareLegacy';
import SmartTraffic from './pages/SmartTraffic';
import AboutUs from './pages/AboutUs';

// CCTV-AI sub-pages (catalog + 6 apps + technical overview)
import TechnicalOverview from './pages/cctv-ai/TechnicalOverview';
import PublicAreaWatch from './pages/cctv-ai/PublicAreaWatch';
import RestrictedZone from './pages/cctv-ai/RestrictedZone';
import CrowdDensity from './pages/cctv-ai/CrowdDensity';
import RoadSafety from './pages/cctv-ai/RoadSafety';
import VehicleCheck from './pages/cctv-ai/VehicleCheck';
import ParkingManagement from './pages/cctv-ai/ParkingManagement';
import BridgeTunnelWatch from './pages/cctv-ai/BridgeTunnelWatch';
import CCTVAIPitchDeck from './pages/cctv-ai/PitchDeck';
import SmartLightStory from './pages/smartlight/Story';
import SmartLightPitchDeckLegacy from './pages/smartlight/PitchDeckLegacy';
import SolarPitchDeck from './pages/solar/PitchDeck';
import SolarLightingReport from './pages/solar/LightingReport';
import EmergencyStory from './pages/emergency/Story';
import EmergencyPitchDeckLegacy from './pages/emergency/PitchDeckLegacy';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 pt-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/smart-street-light" element={<SmartLightStory />} />
            <Route path="/smart-street-light/legacy" element={<SmartLightPitchDeckLegacy />} />
            <Route path="/smart-street-light/details" element={<SmartStreetLight />} />
            <Route path="/solar-street-light" element={<SolarPitchDeck />} />
            <Route path="/solar-street-light/details" element={<SolarStreetLight />} />
            <Route path="/solar-street-light/report" element={<SolarLightingReport />} />
            <Route path="/fee-management" element={<FeeManagement />} />
            <Route path="/waste-fee" element={<WasteCollectionFee />} />
            <Route path="/elderly-care" element={<ElderlyCare />} />
            <Route path="/elderly-care-v2" element={<ElderlyCareStory />} />
            <Route path="/elderly-care/legacy" element={<ElderlyCareLegacy />} />
            <Route path="/emergency-mgmt" element={<EmergencyStory />} />
            <Route path="/emergency-mgmt/legacy" element={<EmergencyPitchDeckLegacy />} />

            {/* CCTV + AI catalog + 6 detail apps + technical overview */}
            <Route path="/smart-traffic" element={<SmartTraffic />} />
            <Route path="/cctv-ai" element={<CCTVAIPitchDeck />} />
            <Route path="/cctv-ai/pitch" element={<CCTVAI />} />
            <Route path="/cctv-ai/technical-overview" element={<TechnicalOverview />} />
            <Route path="/cctv-ai/public-area-watch" element={<PublicAreaWatch />} />
            <Route path="/cctv-ai/restricted-zone" element={<RestrictedZone />} />
            <Route path="/cctv-ai/crowd-density" element={<CrowdDensity />} />
            <Route path="/cctv-ai/road-safety" element={<RoadSafety />} />
            <Route path="/cctv-ai/vehicle-check" element={<VehicleCheck />} />
            <Route path="/cctv-ai/parking-management" element={<ParkingManagement />} />
            <Route path="/cctv-ai/bridge-tunnel-watch" element={<BridgeTunnelWatch />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
