
// File: src/components/StatsOverview.tsx
import React from 'react';
import { Charity } from '../types';
import { IoCash, IoPeople, IoHeart, IoStar } from 'react-icons/io5';

export const StatsOverview: React.FC<{ charityData: Charity | null; donationsCount: number }> = ({ charityData, donationsCount }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200 shadow-md">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-green-500 rounded-lg"><IoCash className="w-6 h-6 text-white" /></div>
        <div>
          <p className="text-sm text-gray-600 font-medium">Total Donations</p>
          <p className="text-2xl font-bold text-gray-900">₹{charityData?.totalDonationsReceived?.toLocaleString() || 0}</p>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-blue-50 to-sky-100 p-6 rounded-xl border border-blue-200 shadow-md">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-500 rounded-lg"><IoPeople className="w-6 h-6 text-white" /></div>
        <div>
          <p className="text-sm text-gray-600 font-medium">Total Plates</p>
          <p className="text-2xl font-bold text-gray-900">{charityData?.totalPlatesReceived?.toLocaleString() || 0}</p>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-xl border border-purple-200 shadow-md">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-500 rounded-lg"><IoHeart className="w-6 h-6 text-white" /></div>
        <div>
          <p className="text-sm text-gray-600 font-medium">Total Donors</p>
          <p className="text-2xl font-bold text-gray-900">{donationsCount}</p>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-6 rounded-xl border border-yellow-200 shadow-md">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-yellow-500 rounded-lg"><IoStar className="w-6 h-6 text-white" /></div>
        <div>
          <p className="text-sm text-gray-600 font-medium">Rating</p>
          <p className="text-2xl font-bold text-gray-900">{charityData?.rating || 0} ⭐</p>
        </div>
      </div>
    </div>
  </div>
);

