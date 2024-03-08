#include "lora.hpp"

LoRaModem modem;
String appEui = "E8F4749842ED27F7";
String appKey = "7B8A7D46FA3E84F5E06AD91727D8A7DA";
String devAddr = "260B058D";
String nwkSKey = "56FEE415D6A7D1ADB6C0D271C2090AE0";
String appSKey = "DBD6049FC934307B9BDBDFB3159D849D";

void Lora::begin() {
  while (!modem.begin(EU868)) {
    Serial.println("Failed to start module");
    delay(1000);
  };
  while (!modem.joinOTAA(appEui, appKey)) {
    Serial.println("failed to join !");
    delay(1000);
  }
  Serial.print("Module version is: ");
  Serial.println(modem.version());
  Serial.print("Device EUI is: ");
  Serial.println(modem.deviceEUI());
  modem.minPollInterval(10);
}

void Lora::send(int *data) {
  modem.beginPacket();
  modem.write(data);
  if (!modem.endPacket(true))
    Serial.println("failed to send data");
  modem.flush();
}

void Lora::receive() {
  if (modem.parsePacket()) {
    Serial.print("Received packet '");
    while (modem.available()) {
      Serial.write(modem.read());
    }
    modem.poll();
  }
}