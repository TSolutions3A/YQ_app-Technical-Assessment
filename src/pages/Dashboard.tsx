import React, { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import { Outlet } from 'react-router-dom';
import sampleData from '../data/sample_data.json';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from 'recharts';

export type ActiveUser = {
  timeBucket: string;
  value: number;
};

export type SectionData = {
  locationName: string;
  metrics: {
    waitTimeSeconds: number;
    workForceUtilization: {
      total: number;
      persons: {
        firstName: string;
        lastName: string;
      }[];
    };
  };
};

const Dashboard = () => {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [sections, setSections] = useState<SectionData[]>([]);

  useEffect(() => {
    if (sampleData?.activeUsers && sampleData?.sectionData) {
      setActiveUsers(sampleData.activeUsers);
      setSections(sampleData.sectionData);
    }
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64">
        <Topbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to your dashboard</h1>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Active Users Chart */}
            <div className="bg-white shadow p-4 rounded">
              <h2 className="text-lg font-semibold mb-2">Active Users</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={activeUsers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timeBucket" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Section Wait Time Chart */}
            <div className="bg-white shadow p-4 rounded">
              <h2 className="text-lg font-semibold mb-2">Wait Time per Section</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sections.map(s => ({ name: s.locationName, waitTime: s.metrics.waitTimeSeconds }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="waitTime" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Section Details Table */}
          <div className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-semibold mb-4">Section Metrics Table</h2>
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left p-2">Section</th>
                  <th className="text-left p-2">Wait Time (s)</th>
                  <th className="text-left p-2">Utilization (%)</th>
                  <th className="text-left p-2">Workforce</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section) => (
                  <tr key={section.locationName} className="border-t">
                    <td className="p-2 font-medium">{section.locationName}</td>
                    <td className="p-2">{section.metrics.waitTimeSeconds}</td>
                    <td className="p-2">{section.metrics.workForceUtilization.total}%</td>
                    <td className="p-2">
                      {section.metrics.workForceUtilization.persons.map(p => `${p.firstName} ${p.lastName}`).join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
