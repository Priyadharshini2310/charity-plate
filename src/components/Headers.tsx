// File: src/components/Header.tsx
import React from 'react';
import { IoHeart, IoCreate } from 'react-icons/io5';
import { LogOut } from 'lucide-react';
import logoicon from '../images/LogoIcon.png';
import logotext from '../images/NameLogo.png';
import { UserProfile } from '../types';

export const Header: React.FC<{ userProfile: UserProfile | null; onLogout: () => void; onOpenProfile: () => void; onOpenOrg: () => void; }> = ({ userProfile, onLogout, onOpenProfile, onOpenOrg }) => {
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <a className="flex items-center space-x-3 group" aria-label="home">
            <div className="relative flex items-center justify-center">
              <div className="relative">
                <img src={logoicon} className="h-16 w-16 object-contain" alt="Logo" />
              </div>
              <div className="flex items-center">
                <img src={logotext} className="w-52 h-16 object-contain" alt="Name Logo" />
              </div>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowProfileDropdown((s) => !s)} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">{userProfile?.name?.charAt(0).toUpperCase() || 'U'}</div>
                <div className="hidden md:block text-left">
                  <p className="font-medium text-gray-900">{userProfile?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{userProfile?.role}</p>
                </div>
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">{userProfile?.name}</p>
                    <p className="text-sm text-gray-500">{userProfile?.email}</p>
                    <p className="text-xs text-gray-400 mt-1">Member since {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : ''}</p>
                  </div>

                  <button onClick={() => { onOpenOrg(); setShowProfileDropdown(false); }} className="w-full px-4 py-2 text-left hover:bg-indigo-50 transition-colors flex items-center gap-2">
                    <IoHeart className="w-4 h-4 text-indigo-600" /> <span className="text-gray-700">Organization Profile</span>
                  </button>

                  <button onClick={() => { onOpenProfile(); setShowProfileDropdown(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <IoCreate className="w-4 h-4 text-indigo-600" /> <span className="text-gray-700">Account Settings</span>
                  </button>

                  <button onClick={onLogout} className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors flex items-center gap-2 text-red-600">
                    <LogOut className="w-4 h-4" /> <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};