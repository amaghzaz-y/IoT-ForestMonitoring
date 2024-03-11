#include "sensors.hpp"

DHT dht(A0, DHTTYPE);

void Sensors::begin() {
  dht.begin();
  pinMode(A0, INPUT);
  pinMode(PIN_LED_GREEN, OUTPUT);
  pinMode(PIN_LED_BLUE, OUTPUT);
  pinMode(PIN_BUTTON, INPUT);
  pinMode(PIN_SENSOR_MOVEMEMT, INPUT);
  randomSeed(analogRead(0));
}

void Sensors::readSensorFlame() {
  flameSensorRead = analogRead(PIN_SENSOR_FLAME);
}

void Sensors::readSensorHumidity() {
  humiditySensorRead = dht.readHumidity(true);
}

void Sensors::readSensorTemperature() {
  temperatureSensorRead = dht.readTemperature(true);
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
  data[2] = flameSensorRead;
  data[3] = lightSensorRead;
  data[4] = movementSensorRead;
  data[5] = soundSensorRead;
  data[6] = digitalRead(PIN_BUTTON);
}

int *Sensors::getData() { return data; }

int *Sensors::getDevData() {
  data[0] = random(10, 15);
  data[1] = random(20, 40);
  data[2] = random(0, 1);
  data[3] = random(500, 700);
  data[4] = random(0, 2);
  data[5] = random(30, 50);
  data[6] = !digitalRead(PIN_BUTTON);
  if (data[6]) {
    digitalWrite(PIN_LED_BLUE, HIGH);
    delay(400);
    digitalWrite(PIN_LED_BLUE, LOW);
  }
  // debug print
  if (false) {
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
    Serial.print(data[5]);
    Serial.print(",");
    Serial.println(data[6]);
  }
  return data;
}

bool Sensors::isEmergency() { return data[6]; }