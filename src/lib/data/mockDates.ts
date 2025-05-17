
import { addDays, subDays, subHours, subMinutes } from "date-fns";

// Get a deterministic date for "today" to use as reference for mock data
export const now = new Date();
export const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
