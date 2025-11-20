import React, { useState, useRef, useEffect } from 'react';
import { Download, Share2, Copy, Check, X, ArrowLeft, Heart, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import { FaDonate, FaLandmark, FaLocationArrow, FaMoneyBillAlt, FaPhone, FaPhoneAlt, FaRoute, FaStar, FaUtensils } from 'react-icons/fa';

const PublicCharityCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [charityData, setCharityData] = useState(null);
  const [error, setError] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Get charity ID from URL path
    const pathParts = window.location.pathname.split('/');
    const charityId = pathParts[pathParts.length - 1];
    
    if (charityId && charityId !== 'card') {
      fetchPublicCharityData(charityId);
    } else {
      // If no ID in URL, try to fetch logged-in user's charity
      fetchOwnCharityData();
    }
  }, []);

  const fetchPublicCharityData = async (charityId) => {
    try {
      const response = await fetch(
        `https://charityplatebe.vercel.app/api/charity/${charityId}`
      );
      
      const data = await response.json();
      
      if (response.ok) {
        const normalized = data?.data ?? data;
        const profileUrl = `${window.location.origin}/charity/card/${charityId}`;
        
        setCharityData({
          ...normalized,
          profileUrl,
          description: normalized.description || "Dedicated to providing food and support to those in need"
        });
      } else {
        setError("Charity not found");
      }
    } catch (err) {
      console.error("Error fetching public charity data:", err);
      setError("Unable to load charity information");
    } finally {
      setLoading(false);
    }
  };

  const fetchOwnCharityData = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      
      if (!token || !user) {
        setError("Please login to view your charity card");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://charityplatebe.vercel.app/api/charity/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      const data = await response.json();
      
      if (response.ok) {
        const normalized = data?.data ?? data;
        const charityId = normalized._id || user.id;
        const profileUrl = `${window.location.origin}/charity/card/${charityId}`;
        
        setCharityData({
          ...normalized,
          profileUrl,
          description: normalized.description || "Dedicated to providing food and support to those in need"
        });
      } else {
        setError("Failed to fetch charity data");
      }
    } catch (err) {
      console.error("Error fetching charity data:", err);
      setError("Unable to load charity information");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (charityData?.profileUrl) {
      navigator.clipboard.writeText(charityData.profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    alert('To enable download, install html2canvas library:\nnpm install html2canvas');
  };

  const handleShare = async () => {
    if (!charityData) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: charityData.name,
          text: `Check out ${charityData.name} - ${charityData.description}`,
          url: charityData.profileUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          setShowModal(true);
        }
      }
    } else {
      setShowModal(true);
    }
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-50 to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading charity card...</p>
        </div>
      </div>
    );
  }

  if (error || !charityData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-50 to-sky-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Card</h2>
          <p className="text-gray-600 mb-6">{error || "Charity information not found"}</p>
          <button
            onClick={handleBack}
            className="bg-gradient-to-r from-sky-600 to-sky-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-700 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-50 to-sky-50 p-4">
      <div className="max-w-4xl mx-auto mb-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all text-gray-700 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div ref={cardRef} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-sky-600 via-sky-600 to-sky-600 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="flex-1">
                <div className="inline-block px-4 py-1 bg-white bg-opacity-20 rounded-full text-white text-sm font-medium mb-3">
                  {charityData.isActive ? '✓ Verified Organization' : 'Organization'}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{charityData.name}</h1>
                <p className="text-white text-opacity-90 mb-4">{charityData.description}</p>
                <div className="flex items-center gap-2 text-white text-opacity-90">
                  <span className="text-2xl"><FaStar className='text-amber-500'/></span>
                  <span className="text-xl font-semibold">{charityData.rating || 0}</span>
                  <span className="text-sm">Rating</span>
                </div>
              </div>
              
              <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                {charityData.image ? (
                  <img src={charityData.image} alt={charityData.name} className="w-full h-full object-cover" />
                ) : (
                  <Heart className="w-16 h-16 text-sky-600" />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Total Donations */}
  <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-sky-100">
    <div className="flex justify-center mb-2">
      <FaMoneyBillAlt className="w-7 h-7 text-sky-600" />
    </div>
    <div className="text-xl md:text-2xl font-bold text-sky-600">
      ₹{((charityData.totalDonationsReceived || 0) / 1000).toFixed(0)}K
    </div>
    <div className="text-xs text-gray-600 mt-1">Total Donations</div>
  </div>

  {/* Plates Served */}
  <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-sky-100">
    <div className="flex justify-center mb-2">
      <FaUtensils className="w-7 h-7 text-sky-600" />
    </div>
    <div className="text-xl md:text-2xl font-bold text-sky-600">
      {(charityData.totalPlatesReceived || 0).toLocaleString()}
    </div>
    <div className="text-xs text-gray-600 mt-1">Plates Served</div>
  </div>

  {/* Price Per Plate */}
  <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-sky-100">
    <div className="flex justify-center mb-2">
      <span className="text-3xl font-bold text-sky-600">₹</span>
    </div>
    <div className="text-xl md:text-2xl font-bold text-sky-600">
      {charityData.pricePerPlate || 0}
    </div>
    <div className="text-xs text-gray-600 mt-1">Per Plate</div>
  </div>
</div>


          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl"><FaLocationArrow className='w-5 h-5 text-sky-600'/></span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">Location</div>
                <div className="text-gray-600 text-sm">{charityData.address || 'Address not provided'}</div>
              </div>
            </div>

            {charityData.contactPhone && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl"><FaPhoneAlt className='text-sky-600'/></span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">Contact</div>
                  <div className="text-gray-600 text-sm">+91 {charityData.contactPhone}</div>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl"><FaDonate className='text-sky-600'/></span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">Donation Type</div>
                <div className="text-gray-600 text-sm capitalize">
                  {charityData.type === 'both' ? 'Food & Money Donations' : `${charityData.type} Donations`}
                </div>
              </div>
            </div>

            {charityData.distance && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl"><FaRoute className='text-sky-600'/></span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">Distance</div>
                  <div className="text-gray-600 text-sm">{charityData.distance} km</div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-gradient-to-r from-sky-50 to-sky-50 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 w-full">
                <div className="text-sm font-semibold text-gray-900 mb-2">Scan to Visit Profile</div>
                <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 break-all">
                  {charityData.profileUrl}
                </div>
              </div>
              <div className="w-24 h-24 bg-white rounded-xl border-2 border-sky-200 flex items-center justify-center shadow-lg flex-shrink-0">
                {/* <QrCode className="w-12 h-12 text-sky-600" /> */}
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleShare}
                className="flex-1 bg-gradient-to-r from-sky-600 to-sky-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share Card
              </button>
              
              <button
                onClick={handleDownloadCard}
                className="flex-1 bg-gradient-to-r from-sky-600 to-sky-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>

            <button
              onClick={handleCopyLink}
              className="w-full mt-3 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-600">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy Profile Link
                </>
              )}
            </button>
          </div>

          <div className="bg-gradient-to-r from-sky-900 to-sky-900 p-4 text-center">
            <p className="text-white text-sm">
               Powered by CharityPlate Platform
            </p>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Share Profile</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Profile URL</p>
                  <p className="text-sm text-gray-900 break-all">{charityData.profileUrl}</p>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="w-full bg-gradient-to-r from-sky-600 to-sky-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-700 transition-all flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
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

export default PublicCharityCard;