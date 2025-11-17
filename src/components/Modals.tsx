
// File: src/components/Modals.tsx
import React from 'react';
import { Donation, Message, Charity, UserProfile } from '../types';
import { IoHeart, IoTrash } from 'react-icons/io5';

export const ThankYouModal: React.FC<{ open: boolean; onClose: () => void; onSend: (text: string) => void; initial?: string; recipient?: Donation | null }> = ({ open, onClose, onSend, initial = '', recipient }) => {
  const [text, setText] = React.useState(initial);
  React.useEffect(()=> setText(initial),[initial]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4"><IoHeart className="w-10 h-10 text-white" /></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{recipient ? `Send Thank You to ${recipient.user?.name}` : 'Send Thank You Message'}</h3>
        </div>
        <textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full px-4 py-3 border rounded-lg mb-4" rows={5} />
        <div className="flex gap-3">
          <button onClick={()=>{ onClose(); setText(''); }} className="flex-1 px-4 py-3 border rounded-lg">Cancel</button>
          <button onClick={()=>{ onSend(text); setText(''); }} className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg">Send Message</button>
        </div>
      </div>
    </div>
  );
};

export const ConfirmDeleteModal: React.FC<{ open: boolean; onClose: ()=>void; onConfirm: ()=>void }> = ({ open, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
        <div className="text-center mb-6"><div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center"><IoTrash className="w-8 h-8 text-white" /></div>
        <h3 className="text-2xl font-bold">Delete Message</h3>
        <p className="text-gray-600 mt-2">Are you sure? This action cannot be undone.</p>
        </div>
        <div className="flex gap-3"><button onClick={onClose} className="flex-1 border rounded-lg px-4 py-2">Cancel</button><button onClick={onConfirm} className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg px-4 py-2">Delete</button></div>
      </div>
    </div>
  );
};

