#pragma once
#include <juce_core/juce_core.h>
#include <juce_audio_formats/juce_audio_formats.h>
#include <string>

using namespace juce;

class FileHandler {
    public: 
        std::vector<File> getFilePathsFromDirectory(std::string directory);
        File writeToWavFileFromMixer(std::string outputFilePath, MixerAudioSource* mixer, int64 numberOfSamples);
};