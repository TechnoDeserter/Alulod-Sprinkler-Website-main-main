const unsigned long updateIntervalMs = 1000; // Update sensors every 1s
const unsigned long sprinklerOffMs = 2000; // Sprinkler on duration: 2s
const unsigned long automatic_irrigateIntervalMs = 15000; // Check irrigation every 15s

// --------------------------------------- Relay
class Relay {
  private:
    byte pin;
    bool activeLow;

  public:
    Relay(byte pin, bool activeLow = true) : pin(pin), activeLow(activeLow) {}

    void setup() {
      pinMode(pin, OUTPUT);
      off();
    }

    void on() {
      digitalWrite(pin, activeLow ? LOW : HIGH);
    }

    void off() {
      digitalWrite(pin, activeLow ? HIGH : LOW);
    }

    bool isOn() {
      return digitalRead(pin) == (activeLow ? LOW : HIGH);
    }
};

// --------------------------------------- SetTimeout
class SetTimeout {
  private:
    unsigned long delayTime;
    unsigned long lastMillis;
    void (*callback)();
    bool activated;

  public:
    SetTimeout() : activated(false) {}

    void start(unsigned long delayTime, void (*callback)()) {
      this->delayTime = delayTime;
      this->callback = callback;
      this->lastMillis = millis();
      this->activated = true;
    }

    void stop() {
      this->activated = false;
    }

    bool isActive() {
      return activated;
    }

    void loop() {
      if (activated && (millis() - lastMillis >= delayTime)) {
        callback();
        activated = false;
      }
    }
};

// --------------------------------------- SetInterval
class SetInterval {
  private:
    unsigned long interval;
    unsigned long lastMillis;
    void (*callback)();

  public:
    SetInterval() {}

    void setup(unsigned long interval, void (*callback)()) {
      this->interval = interval;
      this->callback = callback;
      this->lastMillis = millis();
    }

    void loop() {
      unsigned long currentMillis = millis();
      if (currentMillis - lastMillis >= interval) {
        callback();
        lastMillis = currentMillis;
      }
    }
};

// --------------------------------------- SoilMoisture
class SoilMoisture {
  private:
    byte pin;
    int min_val;
    int max_val;

  public:
    int moisture = 0;

    SoilMoisture(byte pin, int min_val = 1023, int max_val = 200) :
      pin(pin), min_val(min_val), max_val(max_val) {}

    int readRaw() {
      return analogRead(pin);
    }

    void update() {
      int value = readRaw();
      value = map(value, min_val, max_val, 0, 100);
      value = constrain(value, 0, 100);
      moisture = value;
    }
};

// --------------------------------------- FloatSwitch
class FloatSwitch {
  private:
    byte pin;
    void (*callback)();
    bool isPrevOn;
    unsigned long lastClick;
    unsigned long clickIntervalMs = 100;

  public:
    FloatSwitch(byte pin) : pin(pin), lastClick(0), isPrevOn(false) {}

    void setup(void (*callback)()) {
      pinMode(pin, INPUT_PULLUP);
      this->callback = callback;
    }

    void loop() {
      bool isCurrentOn = isOn();
      if (isCurrentOn && !isPrevOn && millis() - lastClick > clickIntervalMs) {
        callback();
        lastClick = millis();
      }
      isPrevOn = isCurrentOn;
    }

    bool isOn() {
      return !digitalRead(pin);
    }
};

// --------------------------------------- SerialComm
class SerialComm {
  private:
    HardwareSerial &serial;
    String buffer;

  public:
    SerialComm(HardwareSerial &serial) : serial(serial) {}

    void setup() {
      serial.begin(9600);
    }

    bool receive(int &min_moisture, bool &manual_irrigate) {
      while (serial.available()) {
        char c = serial.read();
        if (c == '\n') {
          if (buffer.startsWith("SET:")) {
            buffer.remove(0, 4);
            int comma = buffer.indexOf(",");
            if (comma != -1) {
              min_moisture = buffer.substring(0, comma).toInt();
              manual_irrigate = buffer.substring(comma + 1).toInt() == 1;
              buffer = "";
              return true;
            }
          }
          buffer = "";
        } else {
          buffer += c;
        }
      }
      return false;
    }

    void send(int moisture, String reservoir) {
      serial.print("DATA:");
      serial.print(moisture);
      serial.print(",");
      serial.print(reservoir);
      serial.println();
    }
};

// --------------------------------------------------------------- CLASSES
Relay sprinkler(7, true); // Pin 7
SetTimeout sprinklerOffTimeout;
SetInterval updateInterval;
SetInterval automaticIrrigateInterval;
SoilMoisture soilMoisture(A0, 1023, 200); // A0, adjusted for Mega ADC
FloatSwitch floatSwitchMed(8); // Pin 8
FloatSwitch floatSwitchHigh(9); // Pin 9
SerialComm serialComm(Serial1); // Use Serial1 (pins 19 RX, 18 TX)

// --------------------------------------------------------------- VARIABLES
bool manual_irrigate = false;
bool irrigating = false;
int moisture = 0;
int min_required_moisture = 30; // Hardcoded default
String current_reservoir = "Low";

// --------------------------------------------------------------- FUNCTIONS
void update() {
  soilMoisture.update();
  moisture = soilMoisture.moisture;

  if (floatSwitchHigh.isOn()) {
    current_reservoir = "High";
  } else if (floatSwitchMed.isOn()) {
    current_reservoir = "Medium";
  } else {
    current_reservoir = "Low";
  }

  serialComm.send(moisture, current_reservoir);

  Serial.print("Current Soil Moisture (%): ");
  Serial.print(moisture);
  Serial.print("\tRequired Moisture Threshold (%): ");
  Serial.print(min_required_moisture);
  Serial.print("\tReservoir Level: ");
  Serial.print(current_reservoir);
  Serial.print("\tIrrigating: ");
  Serial.print(irrigating ? "Yes" : "No");
  Serial.println();
}

void sprinkle() {
  if (!sprinkler.isOn() && (current_reservoir == "Medium" || current_reservoir == "High")) {
    sprinkler.on();
    irrigating = true;
    sprinklerOffTimeout.start(sprinklerOffMs, sprinlklerOff);
    Serial.println("Sprinkler ON");
  }
}

void sprinlklerOff() {
  sprinkler.off();
  irrigating = false;
  Serial.println("Sprinkler OFF");
}

void automatic_irrigate() {
  if (!manual_irrigate && !sprinkler.isOn()) {
    if (moisture < min_required_moisture) {
      sprinkle();
    } else if (moisture >= min_required_moisture && sprinkler.isOn()) {
      sprinklerOffTimeout.stop();
      sprinlklerOff();
    }
  }
}

void _null() {}

// --------------------------------------------------------------- SETUP
void setup() {
  Serial.begin(9600);
  Serial.println("Mega Init...");

  sprinkler.setup();
  updateInterval.setup(updateIntervalMs, update);
  automaticIrrigateInterval.setup(automatic_irrigateIntervalMs, automatic_irrigate);
  floatSwitchMed.setup(_null);
  floatSwitchHigh.setup(_null);
  serialComm.setup();
  soilMoisture.update();

  Serial.println("Mega Init Finished...");
}

// --------------------------------------------------------------- LOOP
void loop() {
  updateInterval.loop();
  sprinklerOffTimeout.loop();
  automaticIrrigateInterval.loop();

  if (serialComm.receive(min_required_moisture, manual_irrigate)) {
    Serial.print("Received: min_moisture=");
    Serial.print(min_required_moisture);
    Serial.print(", manual_irrigate=");
    Serial.println(manual_irrigate);
  }

  if (manual_irrigate && !irrigating) {
    sprinkle();
  }

  floatSwitchMed.loop();
  floatSwitchHigh.loop();
}