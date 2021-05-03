#include <iostream>
#include <iterator>
#include <string>
#include <juce_core/juce_core.h>
#include <juce_audio_formats/juce_audio_formats.h>
#include "Composer.h"
using namespace juce;

int main() {
    Composer composer;

    composer.composeInputsIntoTrack("../../resources/input", "../../resources/output/output.wav");

    return 0;
}