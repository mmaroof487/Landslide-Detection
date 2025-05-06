import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import AnalyzePage from './pages/AnalyzePage';
import MapView from './pages/MapView';
import HistoricalData from './pages/HistoricalData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="analyze" element={<AnalyzePage />} />
          <Route path="map" element={<MapView />} />
          <Route path="history" element={<HistoricalData />} />
          <Route path="settings" element={<div className="container mx-auto px-4 py-6"><h1 className="text-2xl font-bold">Settings</h1></div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;