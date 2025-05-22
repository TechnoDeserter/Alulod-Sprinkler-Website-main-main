import { HourLog } from "@/classes/HourLog";
import { Timestamp } from "firebase/firestore";

export default async function getWeatherData(
    latitude: number,
    longitude: number,
    deviceData?: {
        num_plants: number;
        area: number;
        moisture: number;
    }
): Promise<HourLog[]> {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,windspeed_10m,precipitation_probability,weathercode&timezone=auto`
        );
        const data = await response.json();

        const hourly = data.hourly;
        const time = hourly.time;
        const temperature = hourly.temperature_2m;
        const windSpeed = hourly.windspeed_10m;
        const weatherCode = hourly.weathercode;
        const humidity = hourly.relative_humidity_2m;

        const hourLogs: HourLog[] = [];
        let previousMoisture: number | undefined;

        for (let i = 0; i < time.length; i++) {
            const weatherType = getWeatherType(weatherCode[i]);

            // Calculate moisture based on humidity and precipitation
            const baseMoisture = humidity[i];
            const precipitationEffect = weatherType === "rain" ? 20 : 0;
            const actualMoisture = Math.min(100, Math.max(0, baseMoisture + precipitationEffect));

            // Calculate timeliness metrics
            let detectionTime: number | undefined;
            let timelinessScore: number | undefined;

            if (previousMoisture !== undefined) {
                const moistureChange = Math.abs(actualMoisture - previousMoisture);
                if (moistureChange > 5) { // Only calculate if there's a significant change (>5%)
                    // Simulate detection time (in minutes) based on moisture change
                    // Larger changes are detected faster
                    detectionTime = Math.max(5, Math.min(60, 60 - (moistureChange * 2)));

                    // Calculate timeliness score (100 = instant detection, 0 = very slow)
                    timelinessScore = Math.max(0, Math.min(100,
                        100 - ((detectionTime - 5) / 55) * 100
                    ));
                }
            }

            // Simulate historical device data with some variation
            const historicalData = deviceData ? {
                num_plants: deviceData.num_plants,
                area: deviceData.area,
                moisture: Math.max(0, Math.min(100,
                    deviceData.moisture + (Math.random() * 10 - 5) // Add random variation of ±5%
                ))
            } : undefined;

            hourLogs.push({
                id: time[i],
                timestamp: Timestamp.fromDate(new Date(time[i])),
                temperature: temperature[i],
                wind_speed: windSpeed[i],
                weather_type: weatherType,
                actual_moisture: actualMoisture,
                ...historicalData,
                detection_time: detectionTime,
                timeliness_score: timelinessScore
            });

            previousMoisture = actualMoisture;
        }

        return hourLogs;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return [];
    }
}

function getWeatherType(code: number): "rain" | "sunny" | "cloudy" {
    // Weather codes from Open-Meteo API
    if (code >= 51 && code <= 67) return "rain"; // Rain
    if (code >= 0 && code <= 3) return "sunny"; // Clear to partly cloudy
    return "cloudy"; // Cloudy
}

