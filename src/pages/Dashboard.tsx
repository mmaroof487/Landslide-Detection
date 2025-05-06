import React from 'react';
import { BarChart2, AlertTriangle, Map, Calendar, Activity } from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import RecentUploads from '../components/Dashboard/RecentUploads';
import AnalyticsSummary from '../components/Dashboard/AnalyticsSummary';
import { mockProcessedImages, mockAnalyticsData } from '../utils/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of landslide detection activities and insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Analyzed Areas"
          value="28"
          icon={Map}
          description="Past 30 days"
          trend={{ value: 12, isPositive: true }}
          color="primary"
        />
        
        <StatCard
          title="High Risk Areas"
          value="8"
          icon={AlertTriangle}
          description="Areas requiring immediate attention"
          trend={{ value: 3, isPositive: false }}
          color="danger"
        />
        
        <StatCard
          title="Active Monitoring"
          value="15"
          icon={Activity}
          description="Currently monitored regions"
          trend={{ value: 5, isPositive: true }}
          color="success"
        />
        
        <StatCard
          title="Historical Data"
          value="143"
          icon={Calendar}
          description="Total records in database"
          trend={{ value: 8, isPositive: true }}
          color="secondary"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <AnalyticsSummary data={mockAnalyticsData} />
        </div>
        
        <div>
          <RecentUploads images={mockProcessedImages} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <BarChart2 className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-semibold">System Activity</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="flex items-start border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
              >
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">
                  <span className="text-xs text-gray-600 font-medium">
                    {String.fromCharCode(65 + i)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {[
                      "New high-risk landslide detected in Mountain Region 3",
                      "Updated analysis completed for Coastal Area 7",
                      "Risk level decreased in Northern Hills after mitigation",
                      "New satellite imagery available for Southern Province",
                      "System maintenance scheduled for tomorrow at 02:00 UTC"
                    ][i]}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(Date.now() - i * 3600000 * (i+1)).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;