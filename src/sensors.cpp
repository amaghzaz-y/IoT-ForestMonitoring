#include "sensors.hpp"

DHT dht(PIN_SENSOR_DHT, DHTTYPE);

void Sensors::begin() { dht.begin(); }

void Sensors::readSensorFlame() {
  flameSensorRead = analogRead(PIN_SENSOR_FLAME);
}

void Sensors::readSensorHumidity() {
  humiditySensorRead = static_cast<int>(dht.readHumidity(false));
}

void Sensors::readSensorTemperature() {
  temperatureSensorRead = static_cast<int>(dht.readTemperature(false));
}

void Sensors::readSensorLight() {
  lightSensorRead = analogRead(PIN_SENSOR_LIGHT);
}

void Sensors::readSensorSound() {
  soundSensorRead = analogRead(PIN_SENSOR_SOUND);
}

void Sensors::readSensorMovement() { movementSensorRead = 0.0f; }

void Sensors::update() {
  if (dht.read()) {
    readSensorHumidity();
    readSensorTemperature();
  }
  readSensorFlame();
  readSensorSound();
  readSensorLight();
  data[0] = temperatureSensorRead;
  data[1] = humiditySensorRead;
  data[2] = flameSensorRead; // works
  data[3] = lightSensorRead; // works
  data[4] = movementSensorRead;
  data[5] = soundSensorRead;
  data[6] = digitalRead(PIN_BUTTON);
  if (data[6] == HIGH) {
    digitalWrite(PIN_LED_GREEN, HIGH);
    delay(500);
    digitalWrite(PIN_LED_GREEN, LOW);
  }
  Serial.print(data[0]);
  Serial.print(",");
  Serial.print(data[1]);
  Serial.print(",");
  Serial.print(data[2]);
  Serial.print(",");
  Serial.print(data[3]);
  Serial.print(",");
  Serial.print(data[4]);
  Serial.print(",");
  Serial.println(data[5]);
  Serial.println();
}

int *Sensors::getData() { return data; }