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
  lora.send(sensors.getData());
  delay(5000);
}