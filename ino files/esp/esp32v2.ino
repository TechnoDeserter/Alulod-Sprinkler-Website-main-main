const char* wifi_name = "Giga2";
const char* wifi_password = "Dignidad.14321";
const unsigned long updateIntervalMs = 1000; // Update Firebase every 1s
const char* DEVICE_ID = "readings"; // Device ID from FH_Wrapper.tsx

// --------------------------------------- WiFi
#include <WiFi.h>
class WiFi_ {
  private:
    const char *ssid;
    const char *password;
  public:
    WiFi_(const char *ssid, const char *password): ssid(ssid), password(password) {}

    void setup() {
      WiFi.begin(ssid, password);
      Serial.print("Connecting to Wi-Fi");
      while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(300);
      }
      Serial.println();
      Serial.print("Connected with IP: ");
      Serial.println(WiFi.localIP());
    }
};

// --------------------------------------- Firebase
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>

#define API_KEY "AIzaSyDyvVJJGtdd_SW6bibHF-CYYmN9pIMNt3g"
#define FIREBASE_PROJECT_ID "alulod-sprinkler"
#define USER_EMAIL "admin@gmail.com"
#define USER_PASSWORD "admin123"

class FirebaseHelper {
  private:
    FirebaseData fbdo;
    FirebaseAuth auth;
    FirebaseConfig config;

  public:
    void setup() {
      Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);
      config.api_key = API_KEY;
      auth.user.email = USER_EMAIL;
      auth.user.password = USER_PASSWORD;
      config.token_status_callback = tokenStatusCallback;
      fbdo.setBSSLBufferSize(2048, 2048);
      fbdo.setResponseSize(2048);
      Firebase.begin(&config, &auth);
      Firebase.reconnectWiFi(true);
    }

    void write(const char *documentPath, FirebaseJson content, const char *fields) {
      if (!Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath, content.raw(), fields)) {
        Serial.println(fbdo.errorReason());
      }
    }

    void read(const char *documentPath, const char *fields, FirebaseJson *readJson) {
      if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath, fields)) {
        readJson->setJsonData(fbdo.payload());
      } else {
        Serial.println(fbdo.errorReason());
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

    void send(int min_moisture, bool manual_irrigate) {
      serial.print("SET:");
      serial.print(min_moisture);
      serial.print(",");
      serial.print(manual_irrigate ? "1" : "0");
      serial.println();
    }

    bool receive(int &moisture, String &reservoir) {
      while (serial.available()) {
        char c = serial.read();
        if (c == '\n') {
          if (buffer.startsWith("DATA:")) {
            buffer.remove(0, 5);
            int comma = buffer.indexOf(",");
            if (comma != -1) {
              moisture = buffer.substring(0, comma).toInt();
              reservoir = buffer.substring(comma + 1);
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
};

// --------------------------------------------------------------- CLASSES
WiFi_ wifi(wifi_name, wifi_password);
FirebaseHelper firebase;
SetInterval updateInterval;
SerialComm serialComm(Serial2); // Use Serial2 (GPIO 16 RX, 17 TX)

// --------------------------------------------------------------- VARIABLES
bool manual_irrigate = false;
int min_required_moisture = 30;
int moisture = 0;
String current_reservoir = "Low";

// --------------------------------------------------------------- FUNCTIONS
void update() {
  firebase_read();
  serialComm.send(min_required_moisture, manual_irrigate);
  if (serialComm.receive(moisture, current_reservoir)) {
    firebase_write();
  }
}

void firebase_read() {
  FirebaseJson readJson;
  String documentPath = "device/readings";
  firebase.read(documentPath.c_str(), "is_manual,min_moisture,manual_irrigate", &readJson);

  FirebaseJsonData firebaseJsonData;
  readJson.get(firebaseJsonData, "fields/is_manual/booleanValue");
  bool is_manual = firebaseJsonData.to<bool>();

  readJson.get(firebaseJsonData, "fields/min_moisture/integerValue");
  min_required_moisture = firebaseJsonData.to<int>();

  readJson.get(firebaseJsonData, "fields/manual_irrigate/booleanValue");
  manual_irrigate = firebaseJsonData.to<bool>();

  Serial.print("is_manual: ");
  Serial.print(is_manual);
  Serial.print("\tmin_required_moisture: ");
  Serial.print(min_required_moisture);
  Serial.print("\tmanual_irrigate: ");
  Serial.print(manual_irrigate);
  Serial.println();
}

void firebase_write() {
  FirebaseJson content;
  bool newManualIrrigate = manual_irrigate; // Keep manual_irrigate state
  content.set("fields/manual_irrigate/booleanValue", newManualIrrigate);
  content.set("fields/moisture/integerValue", moisture);
  content.set("fields/current_reservoir/stringValue", current_reservoir);

  String documentPath = "device/readings";
  firebase.write(documentPath.c_str(), content, "manual_irrigate,moisture,current_reservoir");
}

// --------------------------------------------------------------- SETUP
void setup() {
  Serial.begin(9600);
  Serial.println("ESP32 Init...");

  wifi.setup();
  firebase.setup();
  serialComm.setup();
  updateInterval.setup(updateIntervalMs, update);

  Serial.println("ESP32 Init Finished...");
}

// --------------------------------------------------------------- LOOP
void loop() {
  updateInterval.loop();
}