#pragma once
#include <MKRWAN.h>

class Lora {
public:
  void begin();
  void send(int *data);
  void receive();
};