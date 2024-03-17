#include <lora.hpp>
#include <sensors.hpp>
#define DEBUG true

Sensors sensors;
Lora lora;
unsigned long previousMillis = 0;
const unsigned long interval = 5 * 60 * 1000; // 5 seconds

void setup() {
  if (true)
    Serial.begin(9600);
  sensors.begin();
  lora.begin();
}

void loop() {
  unsigned long currentMillis = millis();
  sensors.update();
  if (!sensors.isEmergency()) {
    lora.send(sensors.getData());
  }
  if (currentMillis - previousMillis >= interval) {
    lora.send(sensors.getData());
    previousMillis = currentMillis;
  }
}
