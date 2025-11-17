
// File: src/components/MessagesList.tsx
import React from 'react';
import { Message } from '../types';
import { IoHeart, IoCreate, IoTrash } from 'react-icons/io5';

export const MessagesList: React.FC<{ messages: Message[]; onEdit: (m: Message) => void; onDelete: (m: Message) => void; }> = ({ messages, onEdit, onDelete }) => {
  if (messages.length === 0) return (
    <div className="text-center py-12">
      <IoHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500 text-lg">No thank you messages sent yet</p>
    </div>
  );

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white"><IoHeart className="w-6 h-6" /></div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">To: {msg.user?.name || 'Anonymous Donor'}</h3>
                  <p className="text-sm text-gray-500">{msg.user?.email}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4"><p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p></div>

              <p className="text-xs text-gray-400">Sent on {new Date(msg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>

            <div className="ml-4 flex gap-2">
              <button onClick={() => onEdit(msg)} className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-110" title="Edit Message"><IoCreate className="w-5 h-5" /></button>
              <button onClick={() => onDelete(msg)} className="p-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-full hover:from-red-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-110" title="Delete Message"><IoTrash className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

