
// File: src/components/AnalyticsPanels.tsx
import React from 'react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalyticsData } from '../types';
import { IoTrendingUp, IoCalendar } from 'react-icons/io5';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

export const AnalyticsPanels: React.FC<{ analytics: AnalyticsData; donations: any[] }> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><IoTrendingUp className="w-6 h-6 text-indigo-600" /> Last 7 Days Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={analytics.weeklyStats}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPlates" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorAmount)" name="Amount (₹)" />
            <Area type="monotone" dataKey="plates" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPlates)" name="Plates" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Donation Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" name="Amount (₹)" strokeWidth={2} />
              <Line type="monotone" dataKey="plates" stroke="#82ca9d" name="Plates" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Top 5 Donors</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.topDonors} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalAmount" fill="#8884d8" name="Total Amount (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Donation Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={analytics.statusDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#82ca9d" dataKey="value">
                {analytics.statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};