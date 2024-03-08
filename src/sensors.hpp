#pragma once
#include "pins.hpp"
#include "DHT.h"

class Sensors {
protected:
  int flameSensorRead = 0;
  int soundSensorRead = 0;
  int lightSensorRead = 0;
  int movementSensorRead = 0;
  int temperatureSensorRead = 0;
  int humiditySensorRead = 0;
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