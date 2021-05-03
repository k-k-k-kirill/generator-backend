#include <juce_core/juce_core.h>
#include <juce_audio_formats/juce_audio_formats.h>
#include <string>
#include "FileHandler.h"
using namespace juce;

std::vector<File> FileHandler::getFilePathsFromDirectory(std::string directory) {
    std::vector<File> fileInputPaths;

    for (DirectoryEntry entry : RangedDirectoryIterator (File (directory), false)) {
                fileInputPaths.push_back(entry.getFile());
    }

    return fileInputPaths;
}

File FileHandler::writeToWavFileFromMixer(std::string outputFilePath, MixerAudioSource* mixer, int64 numberOfSamples) {
    File fileOutput(outputFilePath);
    WavAudioFormat wav;

    if (fileOutput.exists()) {
        fileOutput.deleteFile();
    }

    fileOutput.create();

    StringPairArray metaData = WavAudioFormat::createBWAVMetadata("", "", "", Time::getCurrentTime(), 0, "");
    AudioFormatWriter* writer(wav.createWriterFor(new FileOutputStream(fileOutput), 48000.000000000000, 2, 24, metaData, 0));

    if (writer != nullptr)
    {
        bool ok = writer->writeFromAudioSource(*mixer, numberOfSamples, 512);
    }

    delete writer;

    return fileOutput;
}