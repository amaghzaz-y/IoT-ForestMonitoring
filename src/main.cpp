#include <lora.hpp>
#include <sensors.hpp>
#define DEBUG true

Sensors sensors;
Lora lora;
unsigned long previousMillis = 0;
const unsigned long interval = 5 * 60 * 1000;
void setup() {
  if (true)
    Serial.begin(9600);
  sensors.begin();
  lora.begin();
}

void loop() {
  unsigned long currentMillis = millis();
  sensors.update();
  delay(1000);
  if (!sensors.isEmergency()) {
    Serial.println("emergency");
    lora.send(sensors.getDevData());
  }
  if (currentMillis - previousMillis >= interval) {
    Serial.println("interval");
    lora.send(sensors.getDevData());
    previousMillis = currentMillis;
  }
}