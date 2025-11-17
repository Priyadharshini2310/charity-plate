export type Role = "charity" | "user" | string;


export interface UserProfile {
id?: string;
_id?: string;
name?: string;
email?: string;
role?: Role;
createdAt?: string;
}


export interface Charity {
_id?: string;
name?: string;
type?: string;
image?: string | null;
totalDonationsReceived?: number;
totalPlatesReceived?: number;
rating?: number;
address?: string;
contactPhone?: string;
distance?: number;
pricePerPlate?: number;
isActive?: boolean;
}


export interface DonationUser { _id?: string; name?: string; email?: string }
export interface Donation { _id: string; createdAt: string; totalAmount?: number; plates?: number; donationType?: string; status?: string; notes?: string; user?: DonationUser }
export interface Message { _id: string; message: string; createdAt: string; user?: { _id?: string; name?: string; email?: string } }


export interface AnalyticsData {
monthlyTrend: Array<{ month: string; amount: number; plates: number; count: number }>;
donationTypeBreakdown: Array<{ name: string; value: number; amount: number }>;
topDonors: Array<{ name: string; totalAmount: number; donations: number }>;
statusDistribution: Array<{ name: string; value: number }>;
weeklyStats: Array<{ day: string; donations: number; amount: number; plates: number }>;
}