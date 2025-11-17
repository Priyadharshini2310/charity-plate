import React, { useState, useEffect } from "react";
import {
  MapPin,
  Heart,
  ShoppingCart,
  User,
  LogOut,
  Award,
  MessageSquare,
  Clock,
  Home,
  Search,
  Filter,
  X,
  Plus,
  Minus,
  CreditCard,
  Utensils,
  DollarSign,
  CheckCircle,
  Star,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  Target,
  Zap,
  Trophy,
} from "lucide-react";
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
  Area,
  AreaChart,
} from "recharts";
import logoicon from '../images/LogoIcon.png'
import logotext from '../images/NameLogo.png'
const API_BASE_URL = "http://localhost:5100/api";
const CAUTION_DEPOSIT_PER_PLATE = 20;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState("analytics");
  const [cart, setCart] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [donorPoints, setDonorPoints] = useState(0);
  const [charities, setCharities] = useState([]);
  const [recentDonations, setRecentDonations] = useState([]);
  const [thankYouMessages, setThankYouMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("6months");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchInitialData(parsedUser._id || parsedUser.id);
    }
  }, []);

  const fetchInitialData = async (userId) => {
    try {
      setLoading(true);
      await Promise.all([
        fetchCharities(),
        fetchCart(userId),
        fetchRecentDonations(userId),
        fetchMessages(userId),
      ]);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCharities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/charity`);
      const data = await response.json();
      if (data.success) {
        setCharities(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching charities:", error);
      setCharities([]);
    }
  };

  const fetchCart = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (data.success && data.data) {
        setCart(data.data.items || []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    }
  };

  const fetchRecentDonations = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/donations`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (data.success) {
        setRecentDonations(data.data || []);
        const points = (data.data || []).reduce(
          (sum, d) => sum + (d.donorPoints || 0),
          0
        );
        setDonorPoints(points);
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
      setRecentDonations([]);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (data.success) {
        setThankYouMessages(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setThankYouMessages([]);
    }
  };

  const addToCart = async (charity, plates, donationType) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          charityId: charity._id || charity.id,
          plates,
          donationType,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCart(data.data.items);
        setShowCart(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const updateCartItem = async (itemId, newPlates) => {
    if (newPlates <= 0) {
      removeFromCart(itemId);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          plates: newPlates,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCart(data.data.items);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();
      if (data.success) {
        setCart(data.data.items);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();
      if (data.success) {
        setCart([]);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const createDonation = async () => {
    try {
      const totalPlates = getTotalPlates();
      const donorPointsEarned = totalPlates * 10;

      const response = await fetch(`${API_BASE_URL}/donations`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          items: cart,
          totalAmount: getTotalAmount(),
          totalCautionDeposit: getTotalCautionDeposit(),
          grandTotal: getGrandTotal(),
          totalPlates,
          donorPoints: donorPointsEarned,
        }),
      });

      const data = await response.json();
      if (data.success) {
        const refundMsg =
          getTotalCautionDeposit() > 0
            ? `\n\n💰 Caution deposit of ₹${getTotalCautionDeposit()} will be refunded within 24 hours of timely delivery!`
            : "";
        alert(
          `Donation successful! You earned ${donorPointsEarned} points! 🎉${refundMsg}`
        );

        setDonorPoints(donorPoints + donorPointsEarned);
        await clearCart();
        await fetchRecentDonations(user._id || user.id);
        setActiveView("analytics");
      }
    } catch (error) {
      console.error("Error creating donation:", error);
      alert("Failed to process donation. Please try again.");
    }
  };

  const getTotalAmount = () => {
    return cart.reduce(
      (sum, item) =>
        sum + (item.amount || item.plates * item.charity.pricePerPlate),
      0
    );
  };

  const getTotalCautionDeposit = () => {
    return cart.reduce((sum, item) => {
      if (item.donationType === "food") {
        return (
          sum + (item.cautionDeposit || item.plates * CAUTION_DEPOSIT_PER_PLATE)
        );
      }
      return sum;
    }, 0);
  };

  const getGrandTotal = () => {
    return getTotalAmount() + getTotalCautionDeposit();
  };

  const getTotalPlates = () => {
    return cart.reduce((sum, item) => sum + item.plates, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const getMonthlyData = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyStats = {};
    
    recentDonations.forEach(donation => {
      const date = new Date(donation.createdAt);
      const monthKey = `${monthNames[date.getMonth()]}`;
      
      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = {
          month: monthKey,
          donations: 0,
          plates: 0,
          charities: new Set()
        };
      }
      console.log(donation);
      monthlyStats[monthKey].donations += donation.totalAmount || 0;
      monthlyStats[monthKey].plates += donation.plates || 0;
      donation.items?.forEach(item => {
        if (item.charity?._id) {
          monthlyStats[monthKey].charities.add(item.charity._id);
        }
      });
    });

    return Object.values(monthlyStats).map(stat => ({
      ...stat,
      charities: stat.charities.size
    })).slice(-6);
  };

//   const getCategoryData = () => {
//     let foodCount = 0;
//     let moneyCount = 0;

//     recentDonations.forEach(donation => {
//       donation.items?.forEach(item => {
//         console
//         if (item.donationType === "food") foodCount += item.plates;
//         else moneyCount += item.plates;
//       });
//     });

//     const total = foodCount + moneyCount;
//     if (total === 0) return [
//       { name: "Food", value: 50, color: "#0ea5e9" },
//       { name: "Money", value: 50, color: "#10b981" },
//     ];

//     return [
//       { name: "Food", value: Math.round((foodCount / total) * 100), color: "#0ea5e9" },
//       { name: "Money", value: Math.round((moneyCount / total) * 100), color: "#10b981" },
//     ];
//   };

//   const getTopCharities = () => {
//     const charityStats = {};
    
//     recentDonations.forEach(donation => {
//       donation.items?.forEach(item => {
//         const charityId = item.charity?._id;
//         const charityName = item.charity?.name || "Unknown";
//         const amount = item.amount || 0;
        
//         if (!charityStats[charityId]) {
//           charityStats[charityId] = {
//             name: charityName,
//             amount: 0
//           };
//         }
//         charityStats[charityId].amount += amount;
//       });
//     });

//     const colors = ["#0ea5e9", "#10b981", "#8b5cf6", "#f59e0b"];
//     return Object.values(charityStats)
//       .sort((a, b) => b.amount - a.amount)
//       .slice(0, 4)
//       .map((charity, idx) => ({
//         ...charity,
//         color: colors[idx]
//       }));
//   };

//   const getImpactData = () => {
//     const totalPlates = recentDonations.reduce((sum, d) => sum + (d.totalPlates || 0), 0);
//     const uniqueCharities = new Set();
//     recentDonations.forEach(d => {
//       d.items?.forEach(item => {
//         if (item.charity?._id) uniqueCharities.add(item.charity._id);
//       });
//     });

//     return [
//       { category: "Meals Served", value: totalPlates, icon: "🍽️", color: "bg-sky-500" },
//       { category: "Families Helped", value: Math.floor(totalPlates / 4), icon: "👨‍👩‍👧‍👦", color: "bg-green-500" },
//       { category: "Charities Supported", value: uniqueCharities.size, icon: "🏠", color: "bg-purple-500" },
//       { category: "Impact Hours", value: totalPlates * 2, icon: "⏰", color: "bg-orange-500" },
//     ];
//   };

const getCategoryData = () => {
  let foodCount = 0;
  let moneyCount = 0;

  recentDonations.forEach(donation => {
    if (donation.donationType === "food") {
      foodCount += donation.plates;
    } else if (donation.donationType === "money") {
      moneyCount += donation.plates;
    }
  });

  const total = foodCount + moneyCount;
  if (total === 0) return [
    { name: "Food", value: 50, color: "#0284c7" },
    { name: "Money", value: 50, color: "#bae6fd" },
  ];

  return [
    { name: "Food", value: Math.round((foodCount / total) * 100), color: "#0284c7" },
    { name: "Money", value: Math.round((moneyCount / total) * 100), color: "#7dd3fc" },
  ];
};

const getTopCharities = () => {
  const charityStats = {};
  
  recentDonations.forEach(donation => {
    const charityId = donation.charity?._id;
    const charityName = donation.charity?.name || "Unknown";
    const amount = donation.amount || 0;
    
    if (charityId) {
      if (!charityStats[charityId]) {
        charityStats[charityId] = {
          name: charityName,
          amount: 0
        };
      }
      charityStats[charityId].amount += amount;
    }
  });

  const colors = [ "#0284C7", "#38BDF8","#7DD3FC","#BAE6FD"];
  return Object.values(charityStats)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4)
    .map((charity, idx) => ({
      ...charity,
      color: colors[idx]
    }));
};

const getImpactData = () => {
  const totalPlates = recentDonations.reduce((sum, d) => sum + (d.plates || 0), 0);
  const uniqueCharities = new Set();
  recentDonations.forEach(d => {
    if (d.charity?._id) {
      uniqueCharities.add(d.charity._id);
    }
  });

  return [
    { category: "Meals Served", value: totalPlates, icon: "🍽️", color: "bg-sky-500" },
    // { category: "Families Helped", value: Math.floor(totalPlates / 4), icon: "👨‍👩‍👧‍👦", color: "bg-green-500" },
    { category: "Charities Supported", value: uniqueCharities.size, icon: "🏠", color: "bg-purple-500" },
    { category: "Impact Hours", value: totalPlates * 2, icon: "⏰", color: "bg-orange-500" },
  ];
};
  const StatCard = ({ title, value, icon: Icon, subtitle, trend, color = "sky" }) => {
    const colorClasses = {
      sky: { bg: "bg-sky-50", text: "text-sky-600" },
      green: { bg: "bg-sky-50", text: "text-sky-600" },
      purple: { bg: "bg-sky-50", text: "text-sky-600" },
      yellow: { bg: "bg-sky-50", text: "text-sky-600" },
      orange: { bg: "bg-orange-50", text: "text-orange-600" },
    };
    
    const colors = colorClasses[color] || colorClasses.sky;
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-sky-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              <TrendingUp className="w-4 h-4" />
              {trend}%
            </div>
          )}
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    );
  };

  const AnalyticsView = () => {
    const monthlyData = getMonthlyData();
    const categoryData = getCategoryData();
    const impactData = getImpactData();
    const topCharities = getTopCharities();
    console.log("Top Charities:", topCharities);
    const totalDonations = recentDonations.reduce((sum, d) => sum + (d.totalAmount || 0), 0);
    console.log("Total Donations:", recentDonations);
    const donor = recentDonations.reduce((sum, d) => sum + (d.pointsEarned || 0), 0);
    setDonorPoints(donor);
    const totalPlates = recentDonations.reduce((sum, d) => sum + (d.plates || 0), 0);
    const avgDonation = recentDonations.length > 0 ? Math.floor(totalDonations / recentDonations.length) : 0;

    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <BarChart3 className="w-10 h-10 text-sky-500" />
            Your Impact Dashboard
          </h1>
          <p className="text-gray-600">Track your donations and see your real-world impact</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Donated"
            value={`₹${totalDonations.toLocaleString()}`}
            icon={DollarSign}
            color="green"
          />
          <StatCard
            title="Donor Points"
            value={donorPoints.toLocaleString()}
            icon={Award}
            subtitle="Keep going!"
            color="yellow"
          />
          <StatCard
            title="Plates Donated"
            value={totalPlates}
            icon={Utensils}
            color="sky"
          />
          <StatCard
            title="Avg per Donation"
            value={`₹${avgDonation.toLocaleString()}`}
            icon={BarChart3}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Donation Trend</h3>
              <TrendingUp className="w-5 h-5 text-sky-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="donations" 
                  stroke="#0ea5e9" 
                  fillOpacity={1} 
                  fill="url(#colorDonations)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Donation Types</h3>
              <PieChartIcon className="w-5 h-5 text-sky-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#0284c7"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Plates Donated</h3>
              <Utensils className="w-5 h-5 text-sky-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="plates" fill="#0284c7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {topCharities.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Top Charities</h3>
                <Trophy className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="space-y-4">
                {topCharities.map((charity, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900">{charity.name}</span>
                      <span className="font-bold text-gray-900">₹{charity.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(charity.amount / topCharities[0].amount) * 100}%`,
                          backgroundColor: charity.color 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-sky-500 via-sky-700 to-sky-900 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Your Real-World Impact</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {impactData.map((item, idx) => (
              <div key={idx} className="text-center  bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 transition-all">
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="text-3xl font-bold mb-1">{item.value}</div>
                <div className="text-sm opacity-90">{item.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CharityCard = ({ charity }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100">
      <div className="p-6" onClick={() => setSelectedCharity(charity)}>
        <div className="flex items-start justify-between mb-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            {charity.image ? (
              <img
                src={charity.image}
                alt={charity.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = '<span class="text-4xl">🏠</span>';
                }}
              />
            ) : (
              <span className="text-4xl">🏠</span>
            )}
          </div>
          <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 text-green-600 fill-current" />
            <span className="text-sm font-semibold text-green-700">
              {charity.rating || 4.5}
            </span>
          </div>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-1">{charity.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{charity.address}</p>

        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{charity.distance} km away</span>
          </div>
          <span className="text-sky-600 font-semibold">
            ₹{charity.pricePerPlate}/plate
          </span>
        </div>

        <div className="flex gap-2">
          {(charity.type === "food" || charity.type === "both") && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(charity, 1, "food");
              }}
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Utensils className="w-4 h-4" />
              Donate Food
            </button>
          )}
          {(charity.type === "money" || charity.type === "both") && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(charity, 1, "money");
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              Donate Money
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const CharityDetailModal = ({ charity, onClose }) => {
    const [plates, setPlates] = useState(1);
    const [donationType, setDonationType] = useState(
      charity.type === "both" ? "food" : charity.type
    );

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{charity.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center mb-4">
                {charity.image ? (
                  <img
                    src={charity.image}
                    alt={charity.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = '<span class="text-6xl">🏠</span>';
                    }}
                  />
                ) : (
                  <span className="text-6xl">🏠</span>
                )}
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {charity.distance} km
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-green-600 fill-current" />
                  {charity.rating || 4.5} ({charity.reviews || 0} reviews)
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">{charity.address}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Select Donation Type & Plates
              </h3>

              {charity.type === "both" && (
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setDonationType("food")}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      donationType === "food"
                        ? "bg-sky-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Utensils className="w-5 h-5" />
                    Food Donation
                  </button>
                  <button
                    onClick={() => setDonationType("money")}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      donationType === "money"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <DollarSign className="w-5 h-5" />
                    Money Donation
                  </button>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700 font-medium">
                    Number of Plates
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPlates(Math.max(1, plates - 1))}
                      className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:border-sky-500 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                      {plates}
                    </span>
                    <button
                      onClick={() => setPlates(plates + 1)}
                      className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:border-sky-500 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-bold text-gray-900">
                    ₹{plates * charity.pricePerPlate}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(charity, plates, donationType);
                  onClose();
                }}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors mt-4"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CartDrawer = () => (
    <div
      className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        showCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
          <button
            onClick={() => setShowCart(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item, idx) => {
                const charity = item.charity || {};
                const amount = item.amount || item.plates * charity.pricePerPlate;
                const cautionDeposit =
                  item.donationType === "food"
                    ? item.cautionDeposit || item.plates * CAUTION_DEPOSIT_PER_PLATE
                    : 0;

                return (
                  <div
                    key={item._id || idx}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {charity.name}
                        </h3>
                        <span
                          className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
                            item.donationType === "food"
                              ? "bg-sky-100 text-sky-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {item.donationType === "food" ? "Food" : "Money"}
                        </span>
                        {item.donationType === "food" && (
                          <p className="text-xs text-sky-600 mt-1">
                            +₹{cautionDeposit} caution deposit (refundable)
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartItem(item._id, item.plates - 1)}
                          className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-gray-900 w-8 text-center">
                          {item.plates}
                        </span>
                        <button
                          onClick={() => updateCartItem(item._id, item.plates + 1)}
                          className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-bold text-gray-900">₹{amount}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Total Plates</span>
                  <span className="font-semibold">{getTotalPlates()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Donation Amount</span>
                  <span className="font-semibold">₹{getTotalAmount()}</span>
                </div>
                {getTotalCautionDeposit() > 0 && (
                  <div className="flex justify-between text-sky-600">
                    <span className="flex items-center gap-1">
                      Caution Deposit
                      <span className="text-xs">(Refundable)</span>
                    </span>
                    <span className="font-semibold">
                      ₹{getTotalCautionDeposit()}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-2 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total to Pay</span>
                  <span>₹{getGrandTotal()}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveView("checkout")}
                className="w-full bg-gradient-to-r from-sky-500 to-red-500 hover:from-sky-600 hover:to-red-600 text-white py-4 rounded-lg font-semibold text-lg transition-all"
              >
                Proceed to Donate
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const CheckoutView = () => (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => setActiveView("discover")}
        className="mb-6 text-sky-600 hover:text-sky-700 font-medium flex items-center gap-2"
      >
        ← Back to Charities
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Complete Your Donation
        </h2>
        <p className="text-gray-600 mb-8">Review your order and make payment</p>

        <div className="space-y-6 mb-8">
          {cart.map((item, idx) => {
            const charity = item.charity || {};
            const amount = item.amount || item.plates * charity.pricePerPlate;
            const cautionDeposit =
              item.donationType === "food"
                ? item.cautionDeposit || item.plates * CAUTION_DEPOSIT_PER_PLATE
                : 0;

            return (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {charity.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.plates} plates • {item.donationType}
                    </p>
                  </div>
                  <span className="font-bold text-gray-900">₹{amount}</span>
                </div>
                {item.donationType === "food" && cautionDeposit > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sky-600">
                      Caution Deposit (Refundable on timely delivery)
                    </span>
                    <span className="font-semibold text-sky-600">
                      ₹{cautionDeposit}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {getTotalCautionDeposit() > 0 && (
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">ℹ️</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sky-900 mb-1">
                  Caution Deposit Information
                </h4>
                <p className="text-sm text-sky-700">
                  A refundable caution deposit of ₹{CAUTION_DEPOSIT_PER_PLATE} per plate (₹{getTotalCautionDeposit()} total) is required for food donations. This amount will be <strong>refunded to your account within 24 hours</strong> once the food is delivered on time to the charity.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-6 mb-8">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Donation Amount</span>
              <span className="font-semibold">₹{getTotalAmount()}</span>
            </div>
            {getTotalCautionDeposit() > 0 && (
              <div className="flex justify-between text-sky-600">
                <span>Caution Deposit (Refundable)</span>
                <span className="font-semibold">
                  ₹{getTotalCautionDeposit()}
                </span>
              </div>
            )}
            <div className="border-t border-gray-300 pt-2 flex justify-between text-2xl font-bold text-gray-900">
              <span>Total to Pay</span>
              <span>₹{getGrandTotal()}</span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={createDonation}
              className="w-full bg-gradient-to-r from-sky-500 to-red-500 hover:from-sky-600 hover:to-red-600 text-white py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Pay ₹{getGrandTotal()} Now
            </button>

            <button
              onClick={createDonation}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Confirm Donation
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center">
          You'll earn {getTotalPlates() * 10} donor points with this donation! 🌟
        </p>
      </div>
    </div>
  );

  const DiscoverView = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Nearby Charities
        </h1>
        <p className="text-gray-600">
          Find and support charities near you
        </p>
      </div>

      <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
        {["all", "food", "money", "both"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
              selectedFilter === filter
                ? "bg-sky-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-sky-600"
            }`}
          >
            {filter === "all" ? "All" : filter === "food" ? "Food" : filter === "money" ? "Money" : "Both"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charities && Array.isArray(charities) ? (
          charities
            .filter(
              (c) =>
                selectedFilter === "all" ||
                c.type === selectedFilter ||
                c.type === "both"
            )
            .map((charity) => (
              <CharityCard
                key={charity._id || charity.id}
                charity={charity}
              />
            ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No charities available</p>
          </div>
        )}
      </div>
    </div>
  );

  const RecentView = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Recent Donations
        </h1>
        <p className="text-gray-600">
          Track your donation history and impact
        </p>
      </div>

      {recentDonations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No donations yet</p>
          <button
            onClick={() => setActiveView("discover")}
            className="mt-4 bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Start Donating
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {recentDonations.map((donation, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    Donation #{donation._id?.slice(-6) || idx + 1}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(donation.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{donation.totalAmount}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    +{donation.donorPoints} points
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Donation Items:
                </h4>
                <div className="space-y-2">
                  {donation.items?.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600">
                        {item.charity?.name} • {item.plates} plates • {item.donationType}
                      </span>
                      <span className="font-semibold text-gray-900">
                        ₹{item.amount || item.plates * item.charity?.pricePerPlate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {donation.totalCautionDeposit > 0 && (
                <div className="mt-4 bg-sky-50 border border-sky-200 rounded-lg p-3">
                  <p className="text-sm text-sky-700">
                    💰 Caution Deposit: ₹{donation.totalCautionDeposit} (Refundable)
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const MessagesView = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Thank You Messages
        </h1>
        <p className="text-gray-600">
          Gratitude from the charities you've supported
        </p>
      </div>

      {thankYouMessages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No messages yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Messages will appear here once charities send them
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {thankYouMessages.map((message, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {message.charity?.image ? (
                    <img
                      src={message.charity.image}
                      alt={message.charity?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML = '<span class="text-2xl">🏠</span>';
                      }}
                    />
                  ) : (
                    <span className="text-2xl">🏠</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">
                    {message.charity?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {message.message}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                  <span>Thank you for your support!</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderView = () => {
    switch (activeView) {
      case "analytics":
        return <AnalyticsView />;
      case "discover":
        return <DiscoverView />;
      case "recent":
        return <RecentView />;
      case "messages":
        return <MessagesView />;
      case "checkout":
        return <CheckoutView />;
      default:
        return <AnalyticsView />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to continue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-red-500 bg-clip-text text-transparent">
                <a href="/" className="flex items-center space-x-3 group">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative">
                    <img
                      src={logoicon}
                      className="h-16 w-16 object-contain"
                      alt="Logo"
                    />
                  </div>
                  <div className="flex items-center">
                    <img
                      src={logotext}
                      className="w-52 h-16 object-contain"
                      alt="Name Logo"
                    />
                  </div>
                </div>
              </a>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                <span>Bangalore</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full">
                <Award className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-yellow-700">{donorPoints} Points</span>
              </div>

              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-sky-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name?.charAt(0).toUpperCase() || "D"}
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <LogOut className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: "analytics", label: "Analytics", icon: BarChart3 },
              { id: "discover", label: "Discover", icon: Home },
              { id: "recent", label: "Recent", icon: Clock },
              { id: "messages", label: "Messages", icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeView === tab.id
                      ? "border-sky-500 text-sky-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>

      <CartDrawer />
      {selectedCharity && (
        <CharityDetailModal
          charity={selectedCharity}
          onClose={() => setSelectedCharity(null)}
        />
      )}
      {showCart && (
        <div
          onClick={() => setShowCart(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}
    </div>
  );
};

export default Dashboard;