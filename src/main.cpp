#include <lora.hpp>
#include <sensors.hpp>
#define DEBUG true

Sensors sensors;
Lora lora;

void setup() {
  if (DEBUG)
    Serial.begin(9600);
  sensors.begin();
  lora.begin();
}

void loop() {
  sensors.update();
  sensors.getDevData();
  lora.send(sensors.getDevData());
  delay(1000);
}