#pragma once
#include <string>
#include <iostream>
#include <iterator>
#include <juce_core/juce_core.h>
#include <juce_audio_formats/juce_audio_formats.h>
#include "FileHandler.h"
using namespace juce;

class Composer {
    public:
        void composeInputsIntoTrack(std::string inputDirectory, std::string outputFilePath);
};