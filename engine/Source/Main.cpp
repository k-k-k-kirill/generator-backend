#include <iostream>
#include <iterator>
#include <juce_core/juce_core.h>
#include <juce_audio_formats/juce_audio_formats.h>
using namespace juce;

int main() {
    File fileOutput("../../resources/output/output.wav");
    std::vector<File> fileInputPaths;

    for (DirectoryEntry entry : RangedDirectoryIterator (File ("../../resources/input/"), false)) {
        fileInputPaths.push_back(entry.getFile());
    }

    AudioFormatManager formatManager;
    MixerAudioSource mixer;
    AudioFormatReader* reader;
    int64 totalNumSamples = 0;
    WavAudioFormat wav;
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

    if (fileOutput.exists()) {
        fileOutput.deleteFile();
    }

    fileOutput.create();

    StringPairArray metaData = WavAudioFormat::createBWAVMetadata("", "", "", Time::getCurrentTime(), 0, "");
    AudioFormatWriter* writer(wav.createWriterFor(new FileOutputStream(fileOutput), 48000.000000000000, 2, 24, metaData, 0));
    mixer.prepareToPlay(512, 48000.000000000000);

    if (writer != nullptr)
    {
        bool ok = writer->writeFromAudioSource(mixer, totalNumSamples, 512);
    }

    delete writer;

    return 0;
}