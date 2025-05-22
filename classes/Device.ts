import { Timestamp } from "firebase/firestore";

export interface Device {
  id: string;

  // WEATHER
  last_load_weather: Timestamp;

  // AI
  weather_hour: "rain" | "sunny" | "cloudy";
  area: number;
  num_plants: number;
  moisture: number;
  min_moisture: number;
  ai_output_offset: number;

  // WATER LEVEL
  current_reservoir: "Low" | "Medium" | "High";


  // IRRIGATION
  is_manual: boolean;
  manual_irrigate: boolean;

  // LOCATION
  latitude: number;
  longitude: number;
  location_name_1: string;
  location_name_2: string;


}
