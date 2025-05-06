import React, { useState } from 'react';
import { Search, Calendar, Download, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { mockProcessedImages } from '../utils/mockData';

const HistoricalData: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  const toggleExpandItem = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };
  
  const getRiskBadgeClasses = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Historical Data</h1>
        <p className="text-gray-600">
          Browse and analyze historical landslide detections
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">Historical Records</h3>
            <span className="text-sm bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {mockProcessedImages.length} items
            </span>
          </div>
          
          <div className="flex space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search records..."
                className="pl-10 pr-4 py-2 w-64 rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
              <Calendar className="h-4 w-4 mr-1" />
              Date Range
            </button>
            
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </button>
            
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Affected Area
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Features
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockProcessedImages.map((image) => (
                <React.Fragment key={image.id}>
                  <tr 
                    className={`${expandedItem === image.id ? 'bg-gray-50' : 'hover:bg-gray-50'} cursor-pointer`}
                    onClick={() => toggleExpandItem(image.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <img 
                          src={image.preview} 
                          alt={image.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{image.name}</div>
                      <div className="text-xs text-gray-500">{(image.size / 1000000).toFixed(2)} MB</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(image.dateUploaded).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(image.dateUploaded).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskBadgeClasses(image.analysis.riskLevel)}`}>
                        {image.analysis.riskLevel.charAt(0).toUpperCase() + image.analysis.riskLevel.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {image.analysis.confidence.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {image.analysis.affectedAreaPercentage.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {image.analysis.detectedFeatures.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {expandedItem === image.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 inline" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 inline" />
                      )}
                    </td>
                  </tr>
                  
                  {expandedItem === image.id && (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Image Analysis</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <img 
                                  src={image.preview}
                                  alt="Original"
                                  className="w-full h-auto rounded border border-gray-300"
                                />
                                <p className="text-xs text-center mt-1 text-gray-500">Original Image</p>
                              </div>
                              <div>
                                <img 
                                  src={image.processedPreview}
                                  alt="Processed"
                                  className="w-full h-auto rounded border border-gray-300"
                                />
                                <p className="text-xs text-center mt-1 text-gray-500">Processed Image</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Detected Features</h4>
                            {image.analysis.detectedFeatures.length === 0 ? (
                              <p className="text-sm text-gray-500">No features detected</p>
                            ) : (
                              <div className="space-y-2">
                                {image.analysis.detectedFeatures.map((feature) => (
                                  <div key={feature.id} className="bg-white p-2 rounded border border-gray-200">
                                    <div className="font-medium text-sm">
                                      {feature.type.split('_').map(word => 
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                      ).join(' ')}
                                    </div>
                                    <div className="text-xs text-gray-600">{feature.description}</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      Confidence: {feature.confidence.toFixed(1)}%
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className="mt-4 flex space-x-2">
                              <button className="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700">
                                View Full Report
                              </button>
                              <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                                Download Data
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{mockProcessedImages.length}</span> of <span className="font-medium">{mockProcessedImages.length}</span> results
          </div>
          <div className="flex-1 flex justify-center sm:justify-end">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <ChevronUp className="h-5 w-5 transform rotate-90" />
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-emerald-50 text-sm font-medium text-emerald-600 hover:bg-emerald-100">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <ChevronDown className="h-5 w-5 transform rotate-90" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalData;