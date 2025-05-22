# export_params.py (run after training your model)
import json, joblib

model = joblib.load("alulod_sprinkler_lr.pkl")
# feature order must match training: ['num_plants','soil_moisture','area','weather_rain','weather_sunny']
params = {
    "intercept": model.intercept_.round(6),
    "coef": model.coef_.round(6).tolist(),
    "features": [
        "num_plants",
        "soil_moisture",
        "area",
        "weather_rain",
        "weather_sunny",
    ],
}
with open("model_params.json", "w") as f:
    json.dump(params, f)
