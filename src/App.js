
import './App.css';
import CharityDashboard from 'components/CharityDashboard';
import Dashboard from './components/DonorDashboard/Dashboard';
import LandingPage from './components/HomePage/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';
import ForgotPassword from 'components/ForgotPassword';
import ResetPassword from 'components/ResetPassword';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/charity-dashboard" element={<CharityDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;