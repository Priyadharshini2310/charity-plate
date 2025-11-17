
// File: src/components/DonationsList.tsx
import React from 'react';
import { Donation } from '../types';
import { IoHeart } from 'react-icons/io5';

export const DonationsList: React.FC<{ donations: Donation[]; onSendThankYou: (d: Donation) => void }> = ({ donations, onSendThankYou }) => {
  if (donations.length === 0) return (
    <div className="text-center py-12">
      <IoHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500 text-lg">No donations received yet</p>
    </div>
  );

  return (
    <div className="space-y-4">
      {donations.map((donation) => (
        <div key={donation._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">{donation.user?.name?.charAt(0) || 'U'}</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{donation.user?.name || 'Anonymous Donor'}</h3>
                  <p className="text-sm text-gray-500">{donation.user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Plates</p>
                  <p className="font-semibold text-gray-900">{donation.plates}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-semibold text-gray-900 capitalize">{donation.donationType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="font-semibold text-gray-900">₹{donation.totalAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${donation.status === 'delivered' ? 'bg-green-100 text-green-800' : donation.status === 'in-transit' ? 'bg-blue-100 text-blue-800' : donation.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>{donation.status}</span>
                </div>
              </div>

              {donation.notes && <p className="text-sm text-gray-600 mb-3"><span className="font-medium">Note:</span> {donation.notes}</p>}

              <p className="text-xs text-gray-400">Received on {new Date(donation.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>

            <button onClick={() => onSendThankYou(donation)} className="ml-4 p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-110" title="Send Thank You Message">
              <IoHeart className="w-6 h-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
