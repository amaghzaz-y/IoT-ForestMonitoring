#pragma once
#include <MKRWAN.h>
#include <ArduinoJson.h>
#include <pins.hpp>
class Lora {
public:
  void begin();
  void send(int *data);
  void receive();
};