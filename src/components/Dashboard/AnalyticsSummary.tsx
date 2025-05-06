import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

interface AnalyticsSummaryProps {
  data: {
    landslidesByRisk: {
      name: string;
      value: number;
      color: string;
    }[];
    landslidesByMonth: {
      month: string;
      count: number;
    }[];
  };
}

const AnalyticsSummary: React.FC<AnalyticsSummaryProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Analytics Summary</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-3">Distribution by Risk Level</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.landslidesByRisk}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.landslidesByRisk.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value} areas`, 'Count']}
                  labelFormatter={(name) => `Risk Level: ${name}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-3">Detected Landslides by Month</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.landslidesByMonth} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;