#pragma once
#include "pins.hpp"
#include "DHT.h"

class Sensors {
protected:
  int flameSensorRead = 0;
  int soundSensorRead = 0;
  int lightSensorRead = 0;
  int movementSensorRead = 0;
  float temperatureSensorRead = 0.0f;
  float humiditySensorRead = 0.0f;
  int data[6];

public:
  void begin();
  void update();
  int *getData();
  int *getDevData();
  bool isEmergency();

private:
  void readSensorFlame();
  void readSensorSound();
  void readSensorLight();
  void readSensorMovement();
  void readSensorTemperature();
  void readSensorHumidity();
};