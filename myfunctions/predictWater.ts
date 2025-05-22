const intercept = 0.940557;
const coefs = {
    num_plants: 0.261464,
    soil_moisture: -0.054172,
    area: 1.293962,
    weather_rain: 14.696237,
    weather_sunny: -5.083165,
};

// Outputs in L/hr
export function predictWater(
    weather: 'rain' | 'sunny' | 'cloudy',
    num_plants: number,
    soil_moisture: number,
    area: number,
    ai_output_offset: number
): number {

    const weather_rain = weather === 'rain' ? 1 : 0;
    const weather_sunny = weather === 'sunny' ? 1 : 0;

    let pred = intercept;
    pred += coefs.num_plants * num_plants;
    pred += coefs.soil_moisture * soil_moisture;
    pred += coefs.area * area;
    pred += coefs.weather_rain * weather_rain;
    pred += coefs.weather_sunny * weather_sunny;

    // ensure non-negative
    return Math.max(pred + ai_output_offset, 0);
}