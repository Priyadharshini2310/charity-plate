// import { useEffect, useState } from 'react';
// import { Charity, Donation, Message, UserProfile, AnalyticsData } from '../types';


// export const useCharityDashboard = () => {
// const [loading, setLoading] = useState(true);
// const [charityData, setCharityData] = useState<Charity | null>(null);
// const [donations, setDonations] = useState<Donation[]>([]);
// const [sentMessages, setSentMessages] = useState<Message[]>([]);
// const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
// const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({ monthlyTrend: [], donationTypeBreakdown: [], topDonors: [], statusDistribution: [], weeklyStats: [] });


// useEffect(() => {
// // initial fetch
// const init = async () => {
// await Promise.all([fetchCharity(), fetchDonations(), fetchMessages(), fetchUser()]);
// setLoading(false);
// };
// init();
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);


// const fetchCharity = async () => {
// try {
// const token = localStorage.getItem('token');
// const res = await fetch('https://charityplatebe.vercel.app/api/charity/profile', { headers: { Authorization: `Bearer ${token}` } });
// const data = await res.json();
// if (res.ok) setCharityData(data);
// } catch (e) {
// console.error(e);
// }
// };


// const fetchDonations = async () => {
// try {
// const token = localStorage.getItem('token');
// const res = await fetch('https://charityplatebe.vercel.app/api/charity/donations', { headers: { Authorization: `Bearer ${token}` } });
// };