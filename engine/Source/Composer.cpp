#include <string>
#include <iostream>
#include <iterator>
#include <juce_core/juce_core.h>
#include <juce_audio_formats/juce_audio_formats.h>
#include "Composer.h"
#include "FileHandler.h"
using namespace juce;

void Composer::composeInputsIntoTrack(std::string inputDirectory, std::string outputFilePath) {
    FileHandler fileHandler;
    std::vector<File> fileInputPaths = fileHandler.getFilePathsFromDirectory(inputDirectory);

    AudioFormatManager formatManager;
    MixerAudioSource mixer;
    AudioFormatReader* reader;
    int64 totalNumSamples = 0;
    formatManager.registerBasicFormats();
    int64 currentFileSampleLength;

    for(std::size_t i = 0; i < fileInputPaths.size(); ++i) {
        reader = formatManager.createReaderFor(fileInputPaths[i]);

        if ( reader != NULL ) {
            auto* newSource(new AudioFormatReaderSource(reader, true));
            mixer.addInputSource(newSource, true);

            currentFileSampleLength = reader->lengthInSamples;

            if (currentFileSampleLength > totalNumSamples) {
                totalNumSamples = currentFileSampleLength;
            }
        }
    }

    mixer.prepareToPlay(512, 48000.000000000000);

    MixerAudioSource* mixerPtr = &mixer;

    fileHandler.writeToWavFileFromMixer(outputFilePath, mixerPtr, totalNumSamples);
}