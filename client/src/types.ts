export type ApiStatus = "LOADING" | "SUCCESS" | "FAILURE" | "INITIAL";

export interface Event {
  _id: string;
  name: string;
  organizer: string;
  date: string;
  location: string;
  description: string;
  capacity: number;
  availableSeats: number;
  category: string;
  imageUrl: string;
  price: number;
  attendees: string[];
}

export interface Stats {
  totalEvents: number;
  totalRegistrations: number;
  totalRevenue: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  registeredEvents: string[];
}

export interface EventsResponse {
  data: Event[];
  success?: boolean;
}

export interface StatsResponse {
  data: Stats;
  success?: boolean;
}

export interface LoginResponse {
  user: User;
  token?: string;
}
