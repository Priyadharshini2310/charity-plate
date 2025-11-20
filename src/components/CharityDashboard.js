
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   IoHeart,
//   IoLocation,
//   IoStar,
//   IoPeople,
//   IoCheckmarkCircle,
//   IoCloseCircle,
//   IoTrash,
//   IoCreate,
//   IoTrendingUp,
//   IoCalendar,
//   IoCash,
// } from "react-icons/io5";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from "recharts";
// import imageCompression from "browser-image-compression";
// import { LogOut } from "lucide-react";
// import logoicon from "../images/LogoIcon.png";
// import logotext from "../images/NameLogo.png";

// const CharityDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("analytics");
//   const [loading, setLoading] = useState(true);
//   const [charityData, setCharityData] = useState(null);
//   const [donations, setDonations] = useState([]);
//   const [sentMessages, setSentMessages] = useState([]);
//   const [toast, setToast] = useState({ show: false, type: "", message: "" });
//   const [showThankYouModal, setShowThankYouModal] = useState(false);
//   const [selectedDonation, setSelectedDonation] = useState(null);
//   const [thankYouMessage, setThankYouMessage] = useState("");
//   const [editingMessage, setEditingMessage] = useState(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [messageToDelete, setMessageToDelete] = useState(null);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showOrgProfileModal, setShowOrgProfileModal] = useState(false);
//   const [orgEditMode, setOrgEditMode] = useState(false);
//   const [userProfile, setUserProfile] = useState(null);
//   const [editingProfile, setEditingProfile] = useState({
//     name: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Analytics data states
//   const [analyticsData, setAnalyticsData] = useState({
//     monthlyTrend: [],
//     donationTypeBreakdown: [],
//     topDonors: [],
//     statusDistribution: [],
//     weeklyStats: [],
//   });

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || user.role !== "charity") {
//       navigate("/login");
//       return;
//     }
//     fetchCharityData();
//     fetchDonations();
//     fetchSentMessages();
//     fetchUserProfile();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (charityData?.image) {
//       setImagePreview(charityData.image);
//     }
//   }, [charityData]);

//   useEffect(() => {
//     if (donations.length > 0) {
//       processAnalyticsData();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [donations]);

//   const showToast = (type, message) => {
//     setToast({ show: true, type, message });
//     setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
//   };

//   const processAnalyticsData = () => {
//     // Monthly Trend
//     const monthlyData = {};
//     donations.forEach((donation) => {
//       const month = new Date(donation.createdAt).toLocaleDateString("en-US", {
//         month: "short",
//         year: "2-digit",
//       });
//       if (!monthlyData[month]) {
//         monthlyData[month] = { month, amount: 0, plates: 0, count: 0 };
//       }
//       monthlyData[month].amount += donation.totalAmount || 0;
//       monthlyData[month].plates += donation.plates || 0;
//       monthlyData[month].count += 1;
//     });
//     const monthlyTrend = Object.values(monthlyData).sort((a, b) =>
//       new Date(a.month) - new Date(b.month)
//     );

//     // Donation Type Breakdown
//     const typeData = {};
//     donations.forEach((donation) => {
//       const type = donation.donationType || "unknown";
//       if (!typeData[type]) {
//         typeData[type] = { name: type, value: 0, amount: 0 };
//       }
//       typeData[type].value += 1;
//       typeData[type].amount += donation.totalAmount || 0;
//     });
//     const donationTypeBreakdown = Object.values(typeData);

//     // Top Donors
//     const donorData = {};
//     donations.forEach((donation) => {
//       const donorName = donation.user?.name || "Anonymous";
//       if (!donorData[donorName]) {
//         donorData[donorName] = { name: donorName, totalAmount: 0, donations: 0 };
//       }
//       donorData[donorName].totalAmount += donation.totalAmount || 0;
//       donorData[donorName].donations += 1;
//     });
//     const topDonors = Object.values(donorData)
//       .sort((a, b) => b.totalAmount - a.totalAmount)
//       .slice(0, 5);

//     // Status Distribution
//     const statusData = {};
//     donations.forEach((donation) => {
//       const status = donation.status || "unknown";
//       if (!statusData[status]) {
//         statusData[status] = { name: status, value: 0 };
//       }
//       statusData[status].value += 1;
//     });
//     const statusDistribution = Object.values(statusData);

//     // Weekly Stats (Last 7 days)
//     const weeklyData = [];
//     for (let i = 6; i >= 0; i--) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
//       const dayDonations = donations.filter((d) => {
//         const donationDate = new Date(d.createdAt);
//         return donationDate.toDateString() === date.toDateString();
//       });

//       weeklyData.push({
//         day: dayName,
//         donations: dayDonations.length,
//         amount: dayDonations.reduce((sum, d) => sum + (d.totalAmount || 0), 0),
//         plates: dayDonations.reduce((sum, d) => sum + (d.plates || 0), 0),
//       });
//     }

//     setAnalyticsData({
//       monthlyTrend,
//       donationTypeBreakdown,
//       topDonors,
//       statusDistribution,
//       weeklyStats: weeklyData,
//     });
//   };

//   const fetchCharityData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "https://charityplatebe.vercel.app/api/charity/profile",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         // handle either { data: { ... } } or plain { ... }
//         const normalized = data?.data ?? data;
//         setCharityData(normalized);
//       } else {
//         console.error("Failed to fetch charity data:", data);
//       }
//     } catch (error) {
//       console.error("Error fetching charity data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDonations = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "https://charityplatebe.vercel.app/api/charity/donations",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setDonations(data);
//       }
//     } catch (error) {
//       console.error("Error fetching donations:", error);
//     }
//   };

//   const fetchSentMessages = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const user = JSON.parse(localStorage.getItem("user"));
//       const userId = user.id;

//       const charityResponse = await fetch(
//         `https://charityplatebe.vercel.app/api/charity/byUser/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const charityDataResp = await charityResponse.json();

//       if (!charityResponse.ok || !charityDataResp?.data?._id) {
//         console.error("Charity not found for user");
//         return;
//       }

//       const charityId = charityDataResp.data._id;

//       const response = await fetch(
//         `https://charityplatebe.vercel.app/api/messages/sent/${charityId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const data = await response.json();

//       if (response.ok) {
//         setSentMessages(data.data || []);
//       } else {
//         console.error("Failed to fetch messages:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching sent messages:", error);
//     }
//   };

//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("https://charityplatebe.vercel.app/api/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       if (data.success) {
//         setUserProfile(data.user);
//         setEditingProfile({
//           name: data.user.name,
//           password: "",
//           confirmPassword: "",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//     }
//   };

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "https://charityplatebe.vercel.app/api/charity/profile",
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(charityData),
//         }
//       );

//       if (response.ok) {
//         showToast("success", "Profile updated successfully!");
//         fetchCharityData();
//       } else {
//         throw new Error("Failed to update profile");
//       }
//     } catch (error) {
//       showToast("error", "Failed to update profile. Please try again.");
//     }
//   };

//   const handleUpdateUserProfile = async (e) => {
//     e.preventDefault();

//     if (editingProfile.password) {
//       if (editingProfile.password.length < 6) {
//         showToast("error", "Password must be at least 6 characters");
//         return;
//       }
//       if (editingProfile.password !== editingProfile.confirmPassword) {
//         showToast("error", "Passwords do not match");
//         return;
//       }
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const updateData = {
//         name: editingProfile.name,
//       };

//       if (editingProfile.password) {
//         updateData.password = editingProfile.password;
//       }

//       const response = await fetch(
//         "https://charityplatebe.vercel.app/api/auth/update-profile",
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(updateData),
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         showToast("success", "Profile updated successfully!");

//         const user = JSON.parse(localStorage.getItem("user"));
//         user.name = editingProfile.name;
//         localStorage.setItem("user", JSON.stringify(user));

//         setUserProfile(data.user);
//         setShowProfileModal(false);
//         setEditingProfile({
//           ...editingProfile,
//           password: "",
//           confirmPassword: "",
//         });
//       } else {
//         throw new Error(data.message || "Failed to update profile");
//       }
//     } catch (error) {
//       console.error("Update profile error:", error);
//       showToast("error", error.message || "Failed to update profile");
//     }
//   };

//   const handleSendThankYou = async () => {
//     if (!thankYouMessage.trim()) {
//       showToast("error", "Please enter a thank you message");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const url = editingMessage
//         ? `https://charityplatebe.vercel.app/api/charity/thank-you/${editingMessage._id}`
//         : "https://charityplatebe.vercel.app/api/charity/thank-you";

//       const response = await fetch(url, {
//         method: editingMessage ? "PUT" : "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(
//           editingMessage
//             ? { message: thankYouMessage }
//             : {
//                 donationId: selectedDonation._id,
//                 userId: selectedDonation.user._id,
//                 message: thankYouMessage,
//               }
//         ),
//       });

//       if (response.ok) {
//         showToast(
//           "success",
//           editingMessage ? "Message updated successfully!" : "Thank you message sent successfully!"
//         );
//         setShowThankYouModal(false);
//         setThankYouMessage("");
//         setSelectedDonation(null);
//         setEditingMessage(null);
//         fetchSentMessages();
//       } else {
//         throw new Error("Failed to send message");
//       }
//     } catch (error) {
//       showToast("error", editingMessage ? "Failed to update message" : "Failed to send thank you message");
//     }
//   };

//   const handleEditMessage = (message) => {
//     setEditingMessage(message);
//     setThankYouMessage(message.message);
//     setShowThankYouModal(true);
//   };

//   const handleDeleteMessage = async () => {
//     if (!messageToDelete) return;

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `https://charityplatebe.vercel.app/api/messages/${messageToDelete._id}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.ok) {
//         showToast("success", "Message deleted successfully!");
//         setShowDeleteConfirm(false);
//         setMessageToDelete(null);
//         fetchSentMessages();
//       } else {
//         throw new Error("Failed to delete message");
//       }
//     } catch (error) {
//       showToast("error", "Failed to delete message");
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       showToast("error", "Please upload an image file");
//       return;
//     }

//     setUploadingImage(true);

//     try {
//       const options = {
//         maxSizeMB: 0.5,
//         maxWidthOrHeight: 800,
//         useWebWorker: true,
//         fileType: "image/jpeg",
//       };

//       const compressedFile = await imageCompression(file, options);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         setImagePreview(base64String);
//         setCharityData({ ...charityData, image: base64String });
//         setUploadingImage(false);
//         showToast("success", 'Image uploaded! Click "Update Profile" to save.');
//       };
//       reader.onerror = () => {
//         showToast("error", "Failed to read image file");
//         setUploadingImage(false);
//       };
//       reader.readAsDataURL(compressedFile);
//     } catch (error) {
//       console.error("Compression error:", error);
//       showToast("error", "Failed to compress image");
//       setUploadingImage(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const handleOrgUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("https://charityplatebe.vercel.app/api/charity/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(charityData),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         showToast("success", "Organization updated");
//         setOrgEditMode(false);
//         fetchCharityData();
//       } else {
//         throw new Error(data.message || "Failed to update");
//       }
//     } catch (err) {
//       console.error("Org update error:", err);
//       showToast("error", err.message || "Failed to update organization");
//     }
//   };

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-200">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-pink-50">
//       {/* Toast Notification */}
//       {toast.show && (
//         <div
//           className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm ${
//             toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
//           }`}
//         >
//           {toast.type === "success" ? <IoCheckmarkCircle className="w-6 h-6" /> : <IoCloseCircle className="w-6 h-6" />}
//           <p className="font-medium">{toast.message}</p>
//         </div>
//       )}

//       {/* Header */}
//       <header className="bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <a className="flex items-center space-x-3 group">
//               <div className="relative flex items-center justify-center">
//                 <div className="absolute inset-0 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
//                 <div className="relative">
//                   <img src={logoicon} className="h-16 w-16 object-contain" alt="Logo" />
//                 </div>
//                 <div className="flex items-center">
//                   <img src={logotext} className="w-52 h-16 object-contain" alt="Name Logo" />
//                 </div>
//               </div>
//             </a>

//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//                   className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <div className="w-10 h-10 bg-gradient-to-br from-sky-200 to-sky-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                     {userProfile?.name?.charAt(0).toUpperCase() || "U"}
//                   </div>
//                   <div className="hidden md:block text-left">
//                     <p className="font-medium text-gray-900">{userProfile?.name}</p>
//                     <p className="text-xs text-gray-500 capitalize">{userProfile?.role}</p>
//                   </div>
//                 </button>

//                 {showProfileDropdown && (
//                   <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
//                     <div className="px-4 py-3 border-b border-gray-200">
//                       <p className="font-semibold text-gray-900">{userProfile?.name}</p>
//                       <p className="text-sm text-gray-500">{userProfile?.email}</p>
//                       <p className="text-xs text-gray-400 mt-1">Member since {new Date(userProfile?.createdAt).toLocaleDateString()}</p>
//                     </div>

//                     <button
//                       type="button"
//                       onClick={() => {
//                         setShowOrgProfileModal(true);
//                         setShowProfileDropdown(false);
//                       }}
//                       className="w-full px-4 py-2 text-left hover:bg-sky-200 transition-colors flex items-center gap-2"
//                     >
//                       <IoHeart className="w-4 h-4 text-sky-600" />
//                       <span className="text-gray-700">Organization Profile</span>
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => {
//                         setShowProfileModal(true);
//                         setShowProfileDropdown(false);
//                       }}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
//                     >
//                       <IoCreate className="w-4 h-4 text-sky-600" />
//                       <span className="text-gray-700">Account Settings</span>
//                     </button>

//                     <button
//                       type="button"
//                       onClick={handleLogout}
//                       className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors flex items-center gap-2 text-red-600"
//                     >
//                       <LogOut className="w-4 h-4" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Tabs */}
//         <div className="bg-white rounded-xl shadow-md mb-6">
//           <div className="border-b border-gray-200">
//             <nav className="flex -mb-px">
//               <button
//                 type="button"
//                 onClick={() => setActiveTab("analytics")}
//                 className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
//                   activeTab === "analytics" ? "border-sky-200 text-sky-600" : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Analytics & Insights
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setActiveTab("donations")}
//                 className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
//                   activeTab === "donations" ? "border-sky-200 text-sky-600" : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Received Donations
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setActiveTab("messages")}
//                 className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
//                   activeTab === "messages" ? "border-sky-200 text-sky-600" : "border-transparent text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Thank You Messages Sent
//               </button>
//             </nav>
//           </div>
//         </div>

//         {/* Analytics Tab */}
//         {activeTab === "analytics" && (
//           <div className="space-y-6">
//             {/* Stats Overview */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200 shadow-md">
//                 <div className="flex items-center gap-3">
//                   <div className="p-3 bg-green-500 rounded-lg">
//                     <IoCash className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 font-medium">Total Donations</p>
//                     <p className="text-2xl font-bold text-gray-900">₹{charityData?.totalDonationsReceived?.toLocaleString() || 0}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-blue-50 to-sky-100 p-6 rounded-xl border border-blue-200 shadow-md">
//                 <div className="flex items-center gap-3">
//                   <div className="p-3 bg-blue-500 rounded-lg">
//                     <IoPeople className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 font-medium">Total Plates</p>
//                     <p className="text-2xl font-bold text-gray-900">{charityData?.totalPlatesReceived?.toLocaleString() || 0}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-6 rounded-xl border border-sky-200 shadow-md">
//                 <div className="flex items-center gap-3">
//                   <div className="p-3 bg-sky-500 rounded-lg">
//                     <IoHeart className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 font-medium">Total Donors</p>
//                     <p className="text-2xl font-bold text-gray-900">{donations.length}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-6 rounded-xl border border-yellow-200 shadow-md">
//                 <div className="flex items-center gap-3">
//                   <div className="p-3 bg-yellow-500 rounded-lg">
//                     <IoStar className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 font-medium">Rating</p>
//                     <p className="text-2xl font-bold text-gray-900">{charityData?.rating || 0}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Weekly Trend */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <IoTrendingUp className="w-6 h-6 text-sky-600" />
//                 Last 7 Days Activity
//               </h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart data={analyticsData.weeklyStats}>
//                   <defs>
//                     <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#0284C7" stopOpacity={0.8} />
//                       <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
//                     </linearGradient>
//                     <linearGradient id="colorPlates" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#0284C7" stopOpacity={0.8} />
//                       <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="day" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Area type="monotone" dataKey="amount" stroke="#0284C7" fillOpacity={1} fill="url(#colorAmount)" name="Amount (₹)" />
//                   <Area type="monotone" dataKey="plates" stroke="#0284C7" fillOpacity={1} fill="url(#colorPlates)" name="Plates" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Charts Row */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Monthly Trend */}
//               <div className="bg-white rounded-xl shadow-md p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Donation Trend</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={analyticsData.monthlyTrend}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="amount" stroke="#0284C7" name="Amount (₹)" strokeWidth={2} />
//                     <Line type="monotone" dataKey="plates" stroke="#0284C7" name="Plates" strokeWidth={2} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Top Donors */}
//               <div className="bg-white rounded-xl shadow-md p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Top 5 Donors</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={analyticsData.topDonors} layout="vertical">
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis type="number" />
//                     <YAxis type="category" dataKey="name" width={100} />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="totalAmount" fill="#0284C7" name="Total Amount (₹)" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Status Distribution */}
//               <div className="bg-white rounded-xl shadow-md p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Donation Status</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie data={analyticsData.statusDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#0284C7" dataKey="value">
//                       {analyticsData.statusDistribution.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <IoCalendar className="w-6 h-6 text-sky-600" />
//                 Recent Donations
//               </h3>
//               <div className="space-y-3">
//                 {donations.slice(0, 5).map((donation) => (
//                   <div key={donation._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center text-white font-bold">{donation.user?.name?.charAt(0) || "U"}</div>
//                       <div>
//                         <p className="font-semibold text-gray-900">{donation.user?.name || "Anonymous"}</p>
//                         <p className="text-sm text-gray-500">{new Date(donation.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-bold text-lg text-sky-600">₹{donation.totalAmount}</p>
//                       <p className="text-sm text-gray-500">{donation.plates} plates</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Donations Tab */}
//         {activeTab === "donations" && (
//           <div className="bg-white rounded-xl shadow-md p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Received Donations</h2>

//             {donations.length === 0 ? (
//               <div className="text-center py-12">
//                 <IoHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500 text-lg">No donations received yet</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {donations.map((donation) => (
//                   <div key={donation._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="w-12 h-12 bg-gradient-to-br from-sky-200 to-sky-600 rounded-full flex items-center justify-center text-white font-bold text-lg">{donation.user?.name?.charAt(0) || "U"}</div>
//                           <div>
//                             <h3 className="font-semibold text-lg text-gray-900">{donation.user?.name || "Anonymous Donor"}</h3>
//                             <p className="text-sm text-gray-500">{donation.user?.email}</p>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                           <div>
//                             <p className="text-xs text-gray-500">Plates</p>
//                             <p className="font-semibold text-gray-900">{donation.plates}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500">Type</p>
//                             <p className="font-semibold text-gray-900 capitalize">{donation.donationType}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500">Amount</p>
//                             <p className="font-semibold text-gray-900">₹{donation.totalAmount}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500">Status</p>
//                             <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${donation.status === "delivered" ? "bg-green-100 text-green-800" : donation.status === "in-transit" ? "bg-blue-100 text-blue-800" : donation.status === "confirmed" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>{donation.status}</span>
//                           </div>
//                         </div>

//                         {donation.notes && (
//                           <p className="text-sm text-gray-600 mb-3"><span className="font-medium">Note:</span> {donation.notes}</p>
//                         )}

//                         <p className="text-xs text-gray-400">Received on {new Date(donation.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
//                       </div>

//                       <button
//                         type="button"
//                         onClick={() => {
//                           setSelectedDonation(donation);
//                           setEditingMessage(null);
//                           setThankYouMessage("");
//                           setShowThankYouModal(true);
//                         }}
//                         className="ml-4 p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-110"
//                         title="Send Thank You Message"
//                       >
//                         <IoHeart className="w-6 h-6" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Thank You Messages Tab */}
//         {activeTab === "messages" && (
//           <div className="bg-white rounded-xl shadow-md p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Thank You Messages Sent</h2>

//             {sentMessages.length === 0 ? (
//               <div className="text-center py-12">
//                 <IoHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500 text-lg">No thank you messages sent yet</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {sentMessages.map((msg) => (
//                   <div key={msg._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white"><IoHeart className="w-6 h-6" /></div>
//                           <div>
//                             <h3 className="font-semibold text-lg text-gray-900">To: {msg.user?.name || "Anonymous Donor"}</h3>
//                             <p className="text-sm text-gray-500">{msg.user?.email}</p>
//                           </div>
//                         </div>

//                         <div className="bg-gray-50 p-4 rounded-lg mb-4">
//                           <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
//                         </div>

//                         <p className="text-xs text-gray-400">Sent on {new Date(msg.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
//                       </div>

//                       <div className="ml-4 flex gap-2">
//                         <button type="button" onClick={() => handleEditMessage(msg)} className="p-3 bg-gradient-to-r from-blue-500 to-sky-200 text-white rounded-full hover:from-blue-600 hover:to-sky-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-110" title="Edit Message"><IoCreate className="w-5 h-5" /></button>
//                         <button type="button" onClick={() => { setMessageToDelete(msg); setShowDeleteConfirm(true); }} className="p-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-full hover:from-red-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-110" title="Delete Message"><IoTrash className="w-5 h-5" /></button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Thank You Modal */}
//       {showThankYouModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
//             <div className="text-center mb-6">
//               <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <IoHeart className="w-10 h-10 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">{editingMessage ? "Edit Thank You Message" : "Send Thank You Message"}</h3>
//               <p className="text-gray-600">{editingMessage ? `Update your message to ${editingMessage.user?.name}` : `Express your gratitude to ${selectedDonation?.user?.name}`}</p>
//             </div>

//             <textarea value={thankYouMessage} onChange={(e) => setThankYouMessage(e.target.value)} placeholder="Write your heartfelt thank you message here..." rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent mb-4" maxLength="1000" />
//             <p className="text-xs text-gray-500 mb-4">{thankYouMessage.length}/1000 characters</p>

//             <div className="flex gap-3">
//               <button type="button" onClick={() => { setShowThankYouModal(false); setThankYouMessage(""); setSelectedDonation(null); setEditingMessage(null); }} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
//               <button type="button" onClick={handleSendThankYou} className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg font-medium">{editingMessage ? "Update Message" : "Send Message"}</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
//             <div className="text-center mb-6">
//               <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <IoTrash className="w-10 h-10 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Message</h3>
//               <p className="text-gray-600">Are you sure you want to delete this thank you message? This action cannot be undone.</p>
//             </div>

//             <div className="flex gap-3">
//               <button type="button" onClick={() => { setShowDeleteConfirm(false); setMessageToDelete(null); }} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
//               <button type="button" onClick={handleDeleteMessage} className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 transition-all shadow-lg font-medium">Delete Message</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* User Profile Modal */}
//       {showProfileModal && userProfile && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in max-h-[90vh] overflow-y-auto">
//             <div className="text-center mb-6">
//               <div className="w-20 h-20 bg-gradient-to-br from-sky-200 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
//                 {userProfile.name?.charAt(0).toUpperCase()}
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-1">Account Settings</h3>
//               <p className="text-sm text-gray-500">{userProfile.email}</p>
//             </div>

//             <form onSubmit={handleUpdateUserProfile} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   value={editingProfile.name}
//                   onChange={(e) =>
//                     setEditingProfile({
//                       ...editingProfile,
//                       name: e.target.value,
//                     })
//                   }
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//                 <input
//                   type="email"
//                   value={userProfile.email}
//                   disabled
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
//                 <input
//                   type="text"
//                   value={userProfile.role}
//                   disabled
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed capitalize"
//                 />
//               </div>

//               <div className="bg-gray-50 rounded-lg p-3">
//                 <p className="text-xs text-gray-500">Member Since</p>
//                 <p className="text-sm font-medium text-gray-900">{new Date(userProfile.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">New Password (optional)</label>
//                 <input
//                   type="password"
//                   value={editingProfile.password}
//                   onChange={(e) => setEditingProfile({ ...editingProfile, password: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-transparent"
//                   placeholder="Leave empty to keep current password"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
//                 <input
//                   type="password"
//                   value={editingProfile.confirmPassword}
//                   onChange={(e) => setEditingProfile({ ...editingProfile, confirmPassword: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-transparent"
//                   placeholder="Confirm new password"
//                 />
//               </div>

//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowProfileModal(false);
//                     setEditingProfile({ name: userProfile.name, password: "", confirmPassword: "" });
//                   }}
//                   className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-200 to-sky-500 text-white rounded-lg hover:from-sky-600 hover:to-sky-600 transition-all shadow-lg font-medium"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Organization Profile Modal */}
//       {showOrgProfileModal && charityData && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
//             <div className="p-8">
//               <div className="text-center mb-6">
//                 <div className="w-24 h-24 mx-auto mb-4 rounded-xl border-2 border-gray-200 overflow-hidden bg-gray-50">
//                   {imagePreview ? (
//                     <img src={imagePreview} alt="Organization Logo" className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <IoHeart className="w-12 h-12 text-gray-300" />
//                     </div>
//                   )}
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-1">{charityData.name}</h3>
//                 <p className="text-sm text-gray-500 capitalize">{charityData.type === "both" ? "Food & Money Donations" : `${charityData.type} Donations`}</p>
//                 <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${charityData.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{charityData.isActive ? "Active" : "Inactive"}</span>
//               </div>

//               <div className="space-y-4 mb-6">
//                 {!orgEditMode ? (
//                   <>
//                     <div>
//                       <label className="block text-xs font-medium text-gray-500 mb-1"><IoLocation className="inline w-4 h-4 mr-1" /> Address</label>
//                       <p className="text-gray-900">{charityData.address}</p>
//                     </div>

//                     {charityData.contactPhone && (
//                       <div>
//                         <label className="block text-xs font-medium text-gray-500 mb-1">Contact Phone</label>
//                         <p className="text-gray-900">+91 {charityData.contactPhone}</p>
//                       </div>
//                     )}

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-xs font-medium text-gray-500 mb-1">Distance</label>
//                         <p className="text-gray-900">{charityData.distance} km</p>
//                       </div>
//                       <div>
//                         <label className="block text-xs font-medium text-gray-500 mb-1">Price Per Plate</label>
//                         <p className="text-gray-900">₹{charityData.pricePerPlate}</p>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <form onSubmit={handleOrgUpdate} className="space-y-4">
//                     <div>
//                       <label className="block text-xs font-medium text-gray-500 mb-1">Organization Name</label>
//                       <input
//                         type="text"
//                         value={charityData.name || ""}
//                         onChange={(e) => setCharityData({ ...charityData, name: e.target.value })}
//                         className="w-full px-3 py-2 border rounded"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
//                       <input
//                         type="text"
//                         value={charityData.address || ""}
//                         onChange={(e) => setCharityData({ ...charityData, address: e.target.value })}
//                         className="w-full px-3 py-2 border rounded"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs font-medium text-gray-500 mb-1">Contact Phone</label>
//                       <input
//                         type="text"
//                         value={charityData.contactPhone || ""}
//                         onChange={(e) => setCharityData({ ...charityData, contactPhone: e.target.value })}
//                         className="w-full px-3 py-2 border rounded"
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-xs font-medium text-gray-500 mb-1">Distance (km)</label>
//                         <input
//                           type="number"
//                           value={charityData.distance || 0}
//                           onChange={(e) => setCharityData({ ...charityData, distance: e.target.value })}
//                           className="w-full px-3 py-2 border rounded"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-xs font-medium text-gray-500 mb-1">Price Per Plate</label>
//                         <input
//                           type="number"
//                           value={charityData.pricePerPlate || 0}
//                           onChange={(e) => setCharityData({ ...charityData, pricePerPlate: e.target.value })}
//                           className="w-full px-3 py-2 border rounded"
//                         />
//                       </div>
//                     </div>

//                     <div className="flex gap-3">
//                       <button type="button" onClick={() => setOrgEditMode(false)} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
//                       <button type="submit" className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-200 to-sky-500 text-white rounded-lg shadow-lg font-medium">Save</button>
//                     </div>
//                   </form>
//                 )}
//               </div>

//               <div className="grid grid-cols-3 gap-3 mb-6">
//                 <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
//                   <IoHeart className="w-6 h-6 text-green-600 mb-2" />
//                   <p className="text-xs text-gray-600">Total Donations</p>
//                   <p className="text-lg font-bold text-gray-900">₹{charityData.totalDonationsReceived?.toLocaleString() || 0}</p>
//                 </div>

//                 <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-xl border border-blue-200">
//                   <IoPeople className="w-6 h-6 text-blue-600 mb-2" />
//                   <p className="text-xs text-gray-600">Total Plates</p>
//                   <p className="text-lg font-bold text-gray-900">{charityData.totalPlatesReceived?.toLocaleString() || 0}</p>
//                 </div>

//                 <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-xl border border-yellow-200">
//                   <IoStar className="w-6 h-6 text-yellow-600 mb-2" />
//                   <p className="text-xs text-gray-600">Rating</p>
//                   <p className="text-lg font-bold text-gray-900">{charityData.rating || 0} ⭐</p>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button type="button" onClick={() => { setShowOrgProfileModal(false); setOrgEditMode(false); }} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Close</button>
//                 {!orgEditMode ? (
//                   <button type="button" onClick={() => setOrgEditMode(true)} className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-200 to-sky-500 text-white rounded-lg hover:from-sky-600 hover:to-sky-600 transition-all shadow-lg font-medium">Edit Organization</button>
//                 ) : null}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showProfileDropdown && <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)}></div>}

//       <style jsx>{`
//         @keyframes scale-in {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-scale-in {
//           animation: scale-in 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CharityDashboard;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoHeart,
  IoLocation,
  IoStar,
  IoPeople,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoTrash,
  IoCreate,
  IoTrendingUp,
  IoCalendar,
  IoCash,
  IoDownload,
} from "react-icons/io5";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import imageCompression from "browser-image-compression";
import { LogOut } from "lucide-react";
// PDF generation libraries
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logoicon from "../images/LogoIcon.png";
import logotext from "../images/NameLogo.png";

const CharityDashboard = () => {
  const reportRef = useRef(null);
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("analytics");
  const [loading, setLoading] = useState(true);
  const [charityData, setCharityData] = useState(null);
  const [donations, setDonations] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [thankYouMessage, setThankYouMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showOrgProfileModal, setShowOrgProfileModal] = useState(false);
  const [orgEditMode, setOrgEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  // Analytics data states
  const [analyticsData, setAnalyticsData] = useState({
    monthlyTrend: [],
    donationTypeBreakdown: [],
    topDonors: [],
    statusDistribution: [],
    weeklyStats: [],
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "charity") {
      navigate("/login");
      return;
    }
    fetchCharityData();
    fetchDonations();
    fetchSentMessages();
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (charityData?.image) {
      setImagePreview(charityData.image);
    }
  }, [charityData]);

  useEffect(() => {
    if (donations.length > 0) {
      processAnalyticsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donations]);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
  };

  const processAnalyticsData = () => {
    // Monthly Trend
    const monthlyData = {};
    donations.forEach((donation) => {
      const month = new Date(donation.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
      if (!monthlyData[month]) {
        monthlyData[month] = { month, amount: 0, plates: 0, count: 0 };
      }
      monthlyData[month].amount += donation.totalAmount || 0;
      monthlyData[month].plates += donation.plates || 0;
      monthlyData[month].count += 1;
    });
    const monthlyTrend = Object.values(monthlyData).sort((a, b) =>
      new Date(a.month) - new Date(b.month)
    );

    // Donation Type Breakdown
    const typeData = {};
    donations.forEach((donation) => {
      const type = donation.donationType || "unknown";
      if (!typeData[type]) {
        typeData[type] = { name: type, value: 0, amount: 0 };
      }
      typeData[type].value += 1;
      typeData[type].amount += donation.totalAmount || 0;
    });
    const donationTypeBreakdown = Object.values(typeData);

    // Top Donors
    const donorData = {};
    donations.forEach((donation) => {
      const donorName = donation.user?.name || "Anonymous";
      if (!donorData[donorName]) {
        donorData[donorName] = { name: donorName, totalAmount: 0, donations: 0 };
      }
      donorData[donorName].totalAmount += donation.totalAmount || 0;
      donorData[donorName].donations += 1;
    });
    const topDonors = Object.values(donorData)
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 5);

    // Status Distribution
    const statusData = {};
    donations.forEach((donation) => {
      const status = donation.status || "unknown";
      if (!statusData[status]) {
        statusData[status] = { name: status, value: 0 };
      }
      statusData[status].value += 1;
    });
    const statusDistribution = Object.values(statusData);

    // Weekly Stats (Last 7 days)
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayDonations = donations.filter((d) => {
        const donationDate = new Date(d.createdAt);
        return donationDate.toDateString() === date.toDateString();
      });

      weeklyData.push({
        day: dayName,
        donations: dayDonations.length,
        amount: dayDonations.reduce((sum, d) => sum + (d.totalAmount || 0), 0),
        plates: dayDonations.reduce((sum, d) => sum + (d.plates || 0), 0),
      });
    }

    setAnalyticsData({
      monthlyTrend,
      donationTypeBreakdown,
      topDonors,
      statusDistribution,
      weeklyStats: weeklyData,
    });
  };

  const fetchCharityData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://charityplatebe.vercel.app/api/charity/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (response.ok) {
        // handle either { data: { ... } } or plain { ... }
        const normalized = data?.data ?? data;
        setCharityData(normalized);
      } else {
        console.error("Failed to fetch charity data:", data);
      }
    } catch (error) {
      console.error("Error fetching charity data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://charityplatebe.vercel.app/api/charity/donations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setDonations(data);
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const fetchSentMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;

      const charityResponse = await fetch(
        `https://charityplatebe.vercel.app/api/charity/byUser/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const charityDataResp = await charityResponse.json();

      if (!charityResponse.ok || !charityDataResp?.data?._id) {
        console.error("Charity not found for user");
        return;
      }

      const charityId = charityDataResp.data._id;

      const response = await fetch(
        `https://charityplatebe.vercel.app/api/messages/sent/${charityId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setSentMessages(data.data || []);
      } else {
        console.error("Failed to fetch messages:", data.message);
      }
    } catch (error) {
      console.error("Error fetching sent messages:", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://charityplatebe.vercel.app/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setUserProfile(data.user);
        setEditingProfile({
          name: data.user.name,
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://charityplatebe.vercel.app/api/charity/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(charityData),
        }
      );

      if (response.ok) {
        showToast("success", "Profile updated successfully!");
        fetchCharityData();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      showToast("error", "Failed to update profile. Please try again.");
    }
  };

  const handleUpdateUserProfile = async (e) => {
    e.preventDefault();

    if (editingProfile.password) {
      if (editingProfile.password.length < 6) {
        showToast("error", "Password must be at least 6 characters");
        return;
      }
      if (editingProfile.password !== editingProfile.confirmPassword) {
        showToast("error", "Passwords do not match");
        return;
      }
    }

    try {
      const token = localStorage.getItem("token");
      const updateData = {
        name: editingProfile.name,
      };

      if (editingProfile.password) {
        updateData.password = editingProfile.password;
      }

      const response = await fetch(
        "https://charityplatebe.vercel.app/api/auth/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      const data = await response.json();

      if (data.success) {
        showToast("success", "Profile updated successfully!");

        const user = JSON.parse(localStorage.getItem("user"));
        user.name = editingProfile.name;
        localStorage.setItem("user", JSON.stringify(user));

        setUserProfile(data.user);
        setShowProfileModal(false);
        setEditingProfile({
          ...editingProfile,
          password: "",
          confirmPassword: "",
        });
      } else {
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      showToast("error", error.message || "Failed to update profile");
    }
  };

  const handleSendThankYou = async () => {
    if (!thankYouMessage.trim()) {
      showToast("error", "Please enter a thank you message");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const url = editingMessage
        ? `https://charityplatebe.vercel.app/api/charity/thank-you/${editingMessage._id}`
        : "https://charityplatebe.vercel.app/api/charity/thank-you";

      const response = await fetch(url, {
        method: editingMessage ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          editingMessage
            ? { message: thankYouMessage }
            : {
                donationId: selectedDonation._id,
                userId: selectedDonation.user._id,
                message: thankYouMessage,
              }
        ),
      });

      if (response.ok) {
        showToast(
          "success",
          editingMessage ? "Message updated successfully!" : "Thank you message sent successfully!"
        );
        setShowThankYouModal(false);
        setThankYouMessage("");
        setSelectedDonation(null);
        setEditingMessage(null);
        fetchSentMessages();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      showToast("error", editingMessage ? "Failed to update message" : "Failed to send thank you message");
    }
  };

  const handleEditMessage = (message) => {
    setEditingMessage(message);
    setThankYouMessage(message.message);
    setShowThankYouModal(true);
  };

  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://charityplatebe.vercel.app/api/messages/${messageToDelete._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        showToast("success", "Message deleted successfully!");
        setShowDeleteConfirm(false);
        setMessageToDelete(null);
        fetchSentMessages();
      } else {
        throw new Error("Failed to delete message");
      }
    } catch (error) {
      showToast("error", "Failed to delete message");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("error", "Please upload an image file");
      return;
    }

    setUploadingImage(true);

    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
        fileType: "image/jpeg",
      };

      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setCharityData({ ...charityData, image: base64String });
        setUploadingImage(false);
        showToast("success", 'Image uploaded! Click "Update Profile" to save.');
      };
      reader.onerror = () => {
        showToast("error", "Failed to read image file");
        setUploadingImage(false);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Compression error:", error);
      showToast("error", "Failed to compress image");
      setUploadingImage(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleOrgUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://charityplatebe.vercel.app/api/charity/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(charityData),
      });
      const data = await response.json();
      if (response.ok) {
        showToast("success", "Organization updated");
        setOrgEditMode(false);
        fetchCharityData();
      } else {
        throw new Error(data.message || "Failed to update");
      }
    } catch (err) {
      console.error("Org update error:", err);
      showToast("error", err.message || "Failed to update organization");
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-pink-50">
      {/* the area wrapped in reportRef will be captured for PDF */}
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm ${
            toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {toast.type === "success" ? <IoCheckmarkCircle className="w-6 h-6" /> : <IoCloseCircle className="w-6 h-6" />}
          <p className="font-medium">{toast.message}</p>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <a className="flex items-center space-x-3 group">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
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
                <button
                  type="button"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-200 to-sky-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {userProfile?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
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
                      <p className="text-xs text-gray-400 mt-1">Member since {new Date(userProfile?.createdAt).toLocaleDateString()}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowOrgProfileModal(true);
                        setShowProfileDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-sky-200 transition-colors flex items-center gap-2"
                    >
                      <IoHeart className="w-4 h-4 text-sky-600" />
                      <span className="text-gray-700">Organization Profile</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileModal(true);
                        setShowProfileDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <IoCreate className="w-4 h-4 text-sky-600" />
                      <span className="text-gray-700">Account Settings</span>
                    </button>
                    <button
                type="button"
                onClick={async () => {
                  try {
                    if (!reportRef.current) return;
                    const canvas = await html2canvas(reportRef.current, { scale: 2 });
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    const fileName = `Charity_Report_${new Date().toISOString().slice(0,10)}.pdf`;
                    pdf.save(fileName);
                    showToast('success', 'Report downloaded');
                  } catch (err) {
                    console.error('PDF generation error:', err);
                    showToast('error', 'Failed to generate report');
                  }
                }}
                className="w-full px-4 py-2 text-left hover:bg-sky-200 transition-colors flex items-center gap-2"
              >
                <IoDownload className="w-4 h-4 text-sky-600" />
                <span className="text-gray-700">Download Report</span>
              </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors flex items-center gap-2 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div ref={reportRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                type="button"
                onClick={() => setActiveTab("analytics")}
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "analytics" ? "border-sky-200 text-sky-600" : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Analytics & Insights
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("donations")}
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "donations" ? "border-sky-200 text-sky-600" : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Received Donations
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("messages")}
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "messages" ? "border-sky-200 text-sky-600" : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Thank You Messages Sent
              </button>
            </nav>
          </div>
        </div>

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500 rounded-lg">
                    <IoCash className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Donations</p>
                    <p className="text-2xl font-bold text-gray-900">₹{charityData?.totalDonationsReceived?.toLocaleString() || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-sky-100 p-6 rounded-xl border border-blue-200 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <IoPeople className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Plates</p>
                    <p className="text-2xl font-bold text-gray-900">{charityData?.totalPlatesReceived?.toLocaleString() || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-6 rounded-xl border border-sky-200 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-sky-500 rounded-lg">
                    <IoHeart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Donors</p>
                    <p className="text-2xl font-bold text-gray-900">{donations.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-6 rounded-xl border border-yellow-200 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-500 rounded-lg">
                    <IoStar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{charityData?.rating || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Trend */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <IoTrendingUp className="w-6 h-6 text-sky-600" />
                Last 7 Days Activity
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.weeklyStats}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284C7" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPlates" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284C7" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="amount" stroke="#0284C7" fillOpacity={1} fill="url(#colorAmount)" name="Amount (₹)" />
                  <Area type="monotone" dataKey="plates" stroke="#0284C7" fillOpacity={1} fill="url(#colorPlates)" name="Plates" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trend */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Donation Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#0284C7" name="Amount (₹)" strokeWidth={2} />
                    <Line type="monotone" dataKey="plates" stroke="#0284C7" name="Plates" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Top Donors */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Top 5 Donors</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.topDonors} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalAmount" fill="#0284C7" name="Total Amount (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Status Distribution */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Donation Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={analyticsData.statusDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#0284C7" dataKey="value">
                      {analyticsData.statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <IoCalendar className="w-6 h-6 text-sky-600" />
                Recent Donations
              </h3>
              <div className="space-y-3">
                {donations.slice(0, 5).map((donation) => (
                  <div key={donation._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center text-white font-bold">{donation.user?.name?.charAt(0) || "U"}</div>
                      <div>
                        <p className="font-semibold text-gray-900">{donation.user?.name || "Anonymous"}</p>
                        <p className="text-sm text-gray-500">{new Date(donation.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-sky-600">₹{donation.totalAmount}</p>
                      <p className="text-sm text-gray-500">{donation.plates} plates</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Donations Tab */}
        {activeTab === "donations" && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Received Donations</h2>

            {donations.length === 0 ? (
              <div className="text-center py-12">
                <IoHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No donations received yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {donations.map((donation) => (
                  <div key={donation._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-sky-200 to-sky-600 rounded-full flex items-center justify-center text-white font-bold text-lg">{donation.user?.name?.charAt(0) || "U"}</div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{donation.user?.name || "Anonymous Donor"}</h3>
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
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${donation.status === "delivered" ? "bg-green-100 text-green-800" : donation.status === "in-transit" ? "bg-blue-100 text-blue-800" : donation.status === "confirmed" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>{donation.status}</span>
                          </div>
                        </div>

                        {donation.notes && (
                          <p className="text-sm text-gray-600 mb-3"><span className="font-medium">Note:</span> {donation.notes}</p>
                        )}

                        <p className="text-xs text-gray-400">Received on {new Date(donation.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDonation(donation);
                          setEditingMessage(null);
                          setThankYouMessage("");
                          setShowThankYouModal(true);
                        }}
                        className="ml-4 p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-110"
                        title="Send Thank You Message"
                      >
                        <IoHeart className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Thank You Messages Tab */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Thank You Messages Sent</h2>

            {sentMessages.length === 0 ? (
              <div className="text-center py-12">
                <IoHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No thank you messages sent yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sentMessages.map((msg) => (
                  <div key={msg._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white"><IoHeart className="w-6 h-6" /></div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">To: {msg.user?.name || "Anonymous Donor"}</h3>
                            <p className="text-sm text-gray-500">{msg.user?.email}</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                        </div>

                        <p className="text-xs text-gray-400">Sent on {new Date(msg.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                      </div>

                      <div className="ml-4 flex gap-2">
                        <button type="button" onClick={() => handleEditMessage(msg)} className="p-3 bg-gradient-to-r from-blue-500 to-sky-200 text-white rounded-full hover:from-blue-600 hover:to-sky-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-110" title="Edit Message"><IoCreate className="w-5 h-5" /></button>
                        <button type="button" onClick={() => { setMessageToDelete(msg); setShowDeleteConfirm(true); }} className="p-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-full hover:from-red-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-110" title="Delete Message"><IoTrash className="w-5 h-5" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoHeart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{editingMessage ? "Edit Thank You Message" : "Send Thank You Message"}</h3>
              <p className="text-gray-600">{editingMessage ? `Update your message to ${editingMessage.user?.name}` : `Express your gratitude to ${selectedDonation?.user?.name}`}</p>
            </div>

            <textarea value={thankYouMessage} onChange={(e) => setThankYouMessage(e.target.value)} placeholder="Write your heartfelt thank you message here..." rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent mb-4" maxLength="1000" />
            <p className="text-xs text-gray-500 mb-4">{thankYouMessage.length}/1000 characters</p>

            <div className="flex gap-3">
              <button type="button" onClick={() => { setShowThankYouModal(false); setThankYouMessage(""); setSelectedDonation(null); setEditingMessage(null); }} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
              <button type="button" onClick={handleSendThankYou} className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg font-medium">{editingMessage ? "Update Message" : "Send Message"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoTrash className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Message</h3>
              <p className="text-gray-600">Are you sure you want to delete this thank you message? This action cannot be undone.</p>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => { setShowDeleteConfirm(false); setMessageToDelete(null); }} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
              <button type="button" onClick={handleDeleteMessage} className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 transition-all shadow-lg font-medium">Delete Message</button>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {showProfileModal && userProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-sky-200 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                {userProfile.name?.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Account Settings</h3>
              <p className="text-sm text-gray-500">{userProfile.email}</p>
            </div>

            <form onSubmit={handleUpdateUserProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={editingProfile.name}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={userProfile.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <input
                  type="text"
                  value={userProfile.role}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed capitalize"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Member Since</p>
                <p className="text-sm font-medium text-gray-900">{new Date(userProfile.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password (optional)</label>
                <input
                  type="password"
                  value={editingProfile.password}
                  onChange={(e) => setEditingProfile({ ...editingProfile, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-transparent"
                  placeholder="Leave empty to keep current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={editingProfile.confirmPassword}
                  onChange={(e) => setEditingProfile({ ...editingProfile, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-transparent"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileModal(false);
                    setEditingProfile({ name: userProfile.name, password: "", confirmPassword: "" });
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-200 to-sky-500 text-white rounded-lg hover:from-sky-600 hover:to-sky-600 transition-all shadow-lg font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Organization Profile Modal */}
      {showOrgProfileModal && charityData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-xl border-2 border-gray-200 overflow-hidden bg-gray-50">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Organization Logo" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <IoHeart className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{charityData.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{charityData.type === "both" ? "Food & Money Donations" : `${charityData.type} Donations`}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${charityData.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{charityData.isActive ? "Active" : "Inactive"}</span>
              </div>

              <div className="space-y-4 mb-6">
                {!orgEditMode ? (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1"><IoLocation className="inline w-4 h-4 mr-1" /> Address</label>
                      <p className="text-gray-900">{charityData.address}</p>
                    </div>

                    {charityData.contactPhone && (
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Contact Phone</label>
                        <p className="text-gray-900">+91 {charityData.contactPhone}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Distance</label>
                        <p className="text-gray-900">{charityData.distance} km</p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Price Per Plate</label>
                        <p className="text-gray-900">₹{charityData.pricePerPlate}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleOrgUpdate} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Organization Name</label>
                      <input
                        type="text"
                        value={charityData.name || ""}
                        onChange={(e) => setCharityData({ ...charityData, name: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                      <input
                        type="text"
                        value={charityData.address || ""}
                        onChange={(e) => setCharityData({ ...charityData, address: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Contact Phone</label>
                      <input
                        type="text"
                        value={charityData.contactPhone || ""}
                        onChange={(e) => setCharityData({ ...charityData, contactPhone: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Distance (km)</label>
                        <input
                          type="number"
                          value={charityData.distance || 0}
                          onChange={(e) => setCharityData({ ...charityData, distance: e.target.value })}
                          className="w-full px-3 py-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Price Per Plate</label>
                        <input
                          type="number"
                          value={charityData.pricePerPlate || 0}
                          onChange={(e) => setCharityData({ ...charityData, pricePerPlate: e.target.value })}
                          className="w-full px-3 py-2 border rounded"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button type="button" onClick={() => setOrgEditMode(false)} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
                      <button type="submit" className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-200 to-sky-500 text-white rounded-lg shadow-lg font-medium">Save</button>
                    </div>
                  </form>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <IoHeart className="w-6 h-6 text-green-600 mb-2" />
                  <p className="text-xs text-gray-600">Total Donations</p>
                  <p className="text-lg font-bold text-gray-900">₹{charityData.totalDonationsReceived?.toLocaleString() || 0}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-xl border border-blue-200">
                  <IoPeople className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="text-xs text-gray-600">Total Plates</p>
                  <p className="text-lg font-bold text-gray-900">{charityData.totalPlatesReceived?.toLocaleString() || 0}</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-xl border border-yellow-200">
                  <IoStar className="w-6 h-6 text-yellow-600 mb-2" />
                  <p className="text-xs text-gray-600">Rating</p>
                  <p className="text-lg font-bold text-gray-900">{charityData.rating || 0} ⭐</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => { setShowOrgProfileModal(false); setOrgEditMode(false); }} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Close</button>
                {!orgEditMode ? (
                  <button type="button" onClick={() => setOrgEditMode(true)} className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-200 to-sky-500 text-white rounded-lg hover:from-sky-600 hover:to-sky-600 transition-all shadow-lg font-medium">Edit Organization</button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {showProfileDropdown && <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)}></div>}

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CharityDashboard;
