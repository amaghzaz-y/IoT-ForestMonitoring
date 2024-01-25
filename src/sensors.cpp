#include "sensors.hpp"

DHT dht(PIN_SENSOR_DHT, DHTTYPE);

void Sensors::begin() { dht.begin(); }

void Sensors::readSensorFlame() {
  flameSensorRead = analogRead(PIN_SENSOR_FLAME);
}

void Sensors::readSensorHumidity() {
  humiditySensorRead = dht.readHumidity(false);
}

void Sensors::readSensorTemperature() {
  temperatureSensorRead = dht.readTemperature(false);
}

void Sensors::readSensorLight() {
  lightSensorRead = analogRead(PIN_SENSOR_LIGHT);
}

void Sensors::readSensorSound() {
  soundSensorRead = analogRead(PIN_SENSOR_SOUND);
}

void Sensors::readSensorMovement() { movementSensorRead = 0.0f; }

void Sensors::update() {
  readSensorFlame();
  readSensorHumidity();
  readSensorTemperature();
  readSensorSound();
  readSensorLight();
  data[0] = temperatureSensorRead;
  data[1] = humiditySensorRead;
  data[2] = flameSensorRead;
  data[3] = lightSensorRead;
  data[4] = movementSensorRead;
  data[5] = soundSensorRead;
}

int *Sensors::getData() { return data; }