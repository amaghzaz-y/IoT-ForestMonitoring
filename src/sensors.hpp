#pragma once
#include "pins.hpp"
#include "DHT.h"

class Sensors {
protected:
  int flameSensorRead = 0.0f;
  int soundSensorRead = 0.0f;
  int lightSensorRead = 0.0f;
  int movementSensorRead = 0.0f;
  int temperatureSensorRead = 0.0f;
  int humiditySensorRead = 0.0f;
  int data[6];

public:
  void begin();
  void update();
  int *getData();

private:
  void readSensorFlame();
  void readSensorSound();
  void readSensorLight();
  void readSensorMovement();
  void readSensorTemperature();
  void readSensorHumidity();
};