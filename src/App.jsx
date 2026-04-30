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
import IotFlood from './pages/IotFlood';

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
            <Route path="/cctv-ai" element={<CCTVAI />} />
            <Route path="/elderly-care" element={<ElderlyCare />} />
            <Route path="/iot-flood" element={<IotFlood />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
