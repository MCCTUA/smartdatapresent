import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import SmartStreetLight from './pages/SmartStreetLight';
import SolarStreetLight from './pages/SolarStreetLight';
import FeeManagement from './pages/FeeManagement';

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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
