import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# 1. Load your CSV
df = pd.read_csv("dataset.csv")

# 2. One-hot encode weather
df = pd.get_dummies(df, columns=["weather"], drop_first=True)

# 3. Features & target
X = df.drop("water_liters", axis=1)
y = df["water_liters"]

# 4. Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 5. Fit linear model
model = LinearRegression()
model.fit(X_train, y_train)

# 6. Predict & evaluate
y_pred = model.predict(X_test)
print(f"MSE:  {mean_squared_error(y_test, y_pred):.3f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.3f}")
print(f"R²:   {r2_score(y_test, y_pred):.3f}")

# 7. Inspect coefficients
coef_df = pd.DataFrame({"feature": X.columns, "coef": model.coef_})
print("\nCoefficients:\n", coef_df)

# 8. Save model
joblib.dump(model, "alulod_sprinkler_lr.pkl")
