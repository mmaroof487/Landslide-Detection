import React, { useState } from 'react';
import { mockProcessedImages } from '../utils/mockData';
import { Search, Layers, Filter } from 'lucide-react';

const MapView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('satellite');
  const [filterOpen, setFilterOpen] = useState(false);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="min-h-[calc(100vh-64px)] relative">
      {/* Map Container */}
      <div className="w-full h-[calc(100vh-64px)] bg-gray-200 relative">
        {/* Placeholder for map - In a real application, this would be a component from a mapping library */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
            activeTab === 'satellite' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg)'
          }}
        ></div>
        
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
            activeTab === 'terrain' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg)'
          }}
        ></div>
        
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
            activeTab === 'risk' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/35577/fire-forest-fire-smoke-trees.jpg)'
          }}
        ></div>
        
        {/* Map Overlays - These would be done with map layers in a real application */}
        {mockProcessedImages.map((image, index) => (
          <div 
            key={image.id}
            className="absolute bg-red-500 bg-opacity-30 border-2 border-red-600 rounded-md cursor-pointer"
            style={{
              left: `${30 + (index * 15)}%`,
              top: `${40 + (index * 5)}%`,
              width: '120px',
              height: '80px',
            }}
          >
            <div className="absolute -top-8 left-0 bg-white shadow-md px-2 py-1 rounded text-xs font-bold">
              {image.analysis.riskLevel.toUpperCase()} RISK
            </div>
          </div>
        ))}
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between">
        <div className="bg-white rounded-lg shadow-lg p-2 flex space-x-1">
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'satellite' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('satellite')}
          >
            Satellite
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'terrain' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('terrain')}
          >
            Terrain
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'risk' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('risk')}
          >
            Risk Overlay
          </button>
        </div>
        
        <div className="flex space-x-2">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a location..."
                className="pl-10 pr-4 py-2 w-64 rounded-lg border-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          
          <button 
            className="bg-white p-2 rounded-lg shadow-lg"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="h-5 w-5 text-gray-700" />
          </button>
          
          <button className="bg-white p-2 rounded-lg shadow-lg">
            <Layers className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
      
      {/* Filter Panel */}
      {filterOpen && (
        <div className="absolute top-16 right-4 w-64 bg-white rounded-lg shadow-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3">Filters</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Risk Level
              </label>
              <div className="space-y-1">
                {['Low', 'Medium', 'High', 'Critical'].map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                    />
                    <span className="ml-2 text-sm text-gray-600">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last year</option>
                <option value="all">All time</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feature Type
              </label>
              <div className="space-y-1">
                {['Slope Failure', 'Debris Flow', 'Rockfall', 'Earth Flow', 'Potential Trigger'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                    />
                    <span className="ml-2 text-sm text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <button
              className="w-full py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <h3 className="text-sm font-medium text-gray-800 mb-2">Legend</h3>
        <div className="space-y-1.5">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-red-500 mr-2"></div>
            <span className="text-xs text-gray-700">Critical Risk</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-orange-500 mr-2"></div>
            <span className="text-xs text-gray-700">High Risk</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-yellow-500 mr-2"></div>
            <span className="text-xs text-gray-700">Medium Risk</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-green-500 mr-2"></div>
            <span className="text-xs text-gray-700">Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;