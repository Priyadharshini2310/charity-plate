// services/api.js
const API_URL = 'https://charityplatebe.vercel.app/api';

// Enable debug mode - set to false in production
const DEBUG_MODE = true;

// Debug logger
const debugLog = (label, data) => {
  if (DEBUG_MODE) {
    console.log(`%c[API DEBUG] ${label}`, 'color: #00ff00; font-weight: bold;', data);
  }
};

const debugError = (label, data) => {
  if (DEBUG_MODE) {
    console.error(`%c[API ERROR] ${label}`, 'color: #ff0000; font-weight: bold;', data);
  }
};

// Get token from localStorage
const getToken = () => {
  const token = localStorage.getItem('token');
  debugLog('Retrieved token', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
  return token;
};

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const fullUrl = `${API_URL}${endpoint}`;
  
  debugLog('API Call Starting', {
    url: fullUrl,
    method: options.method || 'GET',
    headers: config.headers,
    body: options.body ? JSON.parse(options.body) : null
  });

  try {
    const response = await fetch(fullUrl, config);
    
    debugLog('Response Status', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    // Clone response to read it twice
    const responseClone = response.clone();
    let data;
    
    try {
      data = await response.json();
      debugLog('Response Data', data);
    } catch (jsonError) {
      debugError('JSON Parse Error', jsonError);
      const text = await responseClone.text();
      debugError('Raw Response', text);
      throw new Error('Invalid JSON response from server');
    }
    
    if (!response.ok) {
      debugError('API Error Response', {
        status: response.status,
        data: data
      });
      throw new Error(data.message || data.error || 'Something went wrong');
    }
    
    debugLog('API Call Successful', data);
    return data;
  } catch (error) {
    debugError('API Call Failed', {
      endpoint,
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (credentials) => {
    debugLog('Login attempt', { email: credentials.email });
    try {
      const result = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      // Store token if returned
      if (result.token) {
        localStorage.setItem('token', result.token);
        debugLog('Token stored in localStorage', 'Success');
      }
      
      return result;
    } catch (error) {
      debugError('Login failed', error);
      throw error;
    }
  },
  
  register: async (userData) => {
    debugLog('Register attempt', { email: userData.email });
    try {
      return await apiCall('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    } catch (error) {
      debugError('Register failed', error);
      throw error;
    }
  },
  
  verifyOTP: async (email, otp) => {
    debugLog('Verify OTP attempt', { email, otp });
    try {
      return await apiCall('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
      });
    } catch (error) {
      debugError('Verify OTP failed', error);
      throw error;
    }
  },
  
  resendOTP: async (email) => {
    debugLog('Resend OTP attempt', { email });
    try {
      return await apiCall('/auth/resend-otp', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      debugError('Resend OTP failed', error);
      throw error;
    }
  },
  
  getCurrentUser: async () => {
    console.log('Get current user attempt', 'Checking authentication');
    try {
      return await apiCall('/auth/me');
    } catch (error) {
      debugError('Get current user failed', error);
      throw error;
    }
  },
  
  logout: () => {
    debugLog('Logout', 'Clearing token');
    localStorage.removeItem('token');
    debugLog('Token cleared', 'Success');
  }
};

// Charity API
export const charityAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/charities${params ? `?${params}` : ''}`);
  },
  
  getById: (id) => apiCall(`/charities/${id}`),
  
  getInRadius: (zipcode, distance) => 
    apiCall(`/charities/radius/${zipcode}/${distance}`),
};

// Cart API
export const cartAPI = {
  getCart: () => apiCall('/cart'),
  
  addToCart: (cartItem) => apiCall('/cart', {
    method: 'POST',
    body: JSON.stringify(cartItem),
  }),
  
  updateItem: (itemId, plates) => apiCall(`/cart/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ plates }),
  }),
  
  removeItem: (itemId) => apiCall(`/cart/${itemId}`, {
    method: 'DELETE',
  }),
  
  clearCart: () => apiCall('/cart', {
    method: 'DELETE',
  }),
};

// Donation API
export const donationAPI = {
  getUserDonations: () => apiCall('/donations'),
  
  createDonation: () => apiCall('/donations', {
    method: 'POST',
  }),
  
  getDonation: (id) => apiCall(`/donations/${id}`),
};

// Message API
export const messageAPI = {
  getMessages: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/messages${params ? `?${params}` : ''}`);
  },
  
  getMessage: (id) => apiCall(`/messages/${id}`),
  
  markAsRead: (id) => apiCall(`/messages/${id}/read`, {
    method: 'PUT',
  }),
  
  deleteMessage: (id) => apiCall(`/messages/${id}`, {
    method: 'DELETE',
  }),
};