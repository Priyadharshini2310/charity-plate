
// // File: src/pages/CharityDashboard.tsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Header } from '../components/Headers';
// import { StatsOverview } from '../components/StatsOverview';
// import { AnalyticsPanels } from '../components/AnalyticsPanels';
// import { DonationsList } from '../components/DonationsList';
// import { MessagesList } from '../components/MessagesList';
// import { ThankYouModal, ConfirmDeleteModal } from '../components/Modals';
// import { useCharityDashboard } from '../hooks/useCharityDashboard';
// import { Donation, Message } from '../types';

// const CharityDashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const { loading, charityData, donations, sentMessages, userProfile, analyticsData, setCharityData, fetchDonations, fetchSentMessages } = useCharityDashboard();

//   const [activeTab, setActiveTab] = React.useState<'analytics'|'donations'|'messages'>('analytics');
//   const [toast, setToast] = React.useState<{show:boolean;type:'success'|'error'|'', message:string}>({show:false,type:'',message:''});

//   const [thankYouOpen, setThankYouOpen] = React.useState(false);
//   const [selectedDonation, setSelectedDonation] = React.useState<Donation | null>(null);
//   const [editingMessage, setEditingMessage] = React.useState<Message | null>(null);
//   const [deleteOpen, setDeleteOpen] = React.useState(false);
//   const [messageToDelete, setMessageToDelete] = React.useState<Message | null>(null);

//   React.useEffect(()=>{
//     try {
//       const storedUser = localStorage.getItem('user');
//       const user = storedUser ? JSON.parse(storedUser) : null;
//       if (!user || user.role !== 'charity') navigate('/login');
//     } catch { navigate('/login'); }
//     // eslint-disable-next-line
//   },[]);

//   const showToast = (type:'success'|'error', message:string) => { setToast({show:true,type,message}); setTimeout(()=>setToast({show:false,type:'',message:''}),4000); };

//   const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/login'); };

//   const openThankYouForDonation = (d: Donation) => { setSelectedDonation(d); setEditingMessage(null); setThankYouOpen(true); };
//   const sendThankYou = async (text: string) => {
//     if (!text.trim()) { showToast('error','Please enter a message'); return; }
//     try {
//       const token = localStorage.getItem('token');
//       const url = editingMessage ? `https://charityplatebe.vercel.app/api/charity/thank-you/${editingMessage._id}` : 'https://charityplatebe.vercel.app/api/charity/thank-you';
//       const res = await fetch(url, { method: editingMessage ? 'PUT' : 'POST', headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(editingMessage ? { message: text } : { donationId: selectedDonation?._id, userId: selectedDonation?.user?._id, message: text }) });
//       if (res.ok) { showToast('success', editingMessage ? 'Message updated!' : 'Thank you sent!'); setThankYouOpen(false); setSelectedDonation(null); setEditingMessage(null); fetchSentMessages(); }
//       else throw new Error('Failed');
//     } catch (e) { showToast('error', 'Failed to send message'); }
//   };

//   const onEditMessage = (m: Message) => { setEditingMessage(m); setThankYouOpen(true); };
//   const onDeleteMessage = (m: Message) => { setMessageToDelete(m); setDeleteOpen(true); };
//   const confirmDelete = async () => {
//     if (!messageToDelete) return;
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`https://charityplatebe.vercel.app/api/messages/${messageToDelete._id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
//       if (res.ok) { showToast('success','Deleted'); setDeleteOpen(false); setMessageToDelete(null); fetchSentMessages(); }
//       else throw new Error('Failed');
//     } catch { showToast('error','Failed to delete'); }
//   };

//   if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div></div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-pink-50">
//       {toast.show && <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl ${toast.type==='success'?'bg-green-500 text-white':'bg-red-500 text-white'}`}><p>{toast.message}</p></div>}
//       <Header userProfile={userProfile} onLogout={handleLogout} onOpenProfile={()=>{}} onOpenOrg={()=>{}} />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-xl shadow-md mb-6">
//           <div className="border-b border-gray-200">
//             <nav className="flex -mb-px">
//               <button onClick={()=>setActiveTab('analytics')} className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab==='analytics'?'border-indigo-500 text-indigo-600':'border-transparent text-gray-500'}`}>📊 Analytics & Insights</button>
//               <button onClick={()=>setActiveTab('donations')} className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab==='donations'?'border-indigo-500 text-indigo-600':'border-transparent text-gray-500'}`}>Received Donations</button>
//               <button onClick={()=>setActiveTab('messages')} className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab==='messages'?'border-indigo-500 text-indigo-600':'border-transparent text-gray-500'}`}>Thank You Messages Sent</button>
//             </nav>
//           </div>
//         </div>

//         {activeTab==='analytics' && (
//           <div className="space-y-6">
//             <StatsOverview charityData={charityData} donationsCount={donations.length} />
//             <AnalyticsPanels analytics={analyticsData} donations={donations} />
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">Recent Donations</h3>
//               <div className="space-y-3">{donations.slice(0,5).map(d=> (
//                 <div key={d._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"> <div className="flex items-center gap-3"><div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">{d.user?.name?.charAt(0)||'U'}</div><div><p className="font-semibold">{d.user?.name||'Anonymous'}</p><p className="text-sm text-gray-500">{new Date(d.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</p></div></div><div className="text-right"><p className="font-bold text-lg text-indigo-600">₹{d.totalAmount}</p><p className="text-sm text-gray-500">{d.plates} plates</p></div></div>
//               ))}</div>
//             </div>
//           </div>
//         )}

//         {activeTab==='donations' && <div className="bg-white rounded-xl shadow-md p-8"><h2 className="text-2xl font-bold mb-6">Received Donations</h2><DonationsList donations={donations} onSendThankYou={openThankYouForDonation} /></div>}

//         {activeTab==='messages' && <div className="bg-white rounded-xl shadow-md p-8"><h2 className="text-2xl font-bold mb-6">Thank You Messages Sent</h2><MessagesList messages={sentMessages} onEdit={onEditMessage} onDelete={onDeleteMessage} /></div>}

//       </div>

//       <ThankYouModal open={thankYouOpen} onClose={()=>setThankYouOpen(false)} onSend={sendThankYou} initial={editingMessage?.message||''} recipient={selectedDonation} />
//       <ConfirmDeleteModal open={deleteOpen} onClose={()=>setDeleteOpen(false)} onConfirm={confirmDelete} />

//       <style>{`@keyframes scale-in{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}.animate-scale-in{animation:scale-in 0.3s ease-out}`}</style>
//     </div>
//   );
// };

// export default CharityDashboard;