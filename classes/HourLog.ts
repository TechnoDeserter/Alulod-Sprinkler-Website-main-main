import { Timestamp } from "firebase/firestore";

export interface HourLog {
    id: string;
    timestamp: Timestamp;
    temperature: number;
    wind_speed: number;
    weather_type: "rain" | "sunny" | "cloudy";
    actual_moisture?: number;
    // Historical device data
    num_plants?: number;
    area?: number;
    moisture?: number;
    // Timeliness metrics
    detection_time?: number; // Time in minutes to detect moisture change
    timeliness_score?: number; // Score from 0-100 based on detection speed
}