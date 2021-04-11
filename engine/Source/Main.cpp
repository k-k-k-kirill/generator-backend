#include <iostream>
#include <iterator>
#include <juce_core/juce_core.h>
#include <juce_audio_formats/juce_audio_formats.h>
using namespace juce;

int main() {
    File fileOutput("../../resources/output/output.wav");
    File inputFile("../../resources/downloads/hiphop_drill_140_drums_T1.wav");
    File fileInputPaths[1] = {inputFile};
    AudioFormatManager  formatManager;
    MixerAudioSource mixer;
    int64 totalNumSamples = 0;
    WavAudioFormat wav;
    formatManager.registerBasicFormats();
    AudioFormatReader* reader;
    int64 currentFileSampleLength;

    for (int i = 0; i < 1; i++) {
        reader = formatManager.createReaderFor(fileInputPaths[i]);
        auto* newSource(new AudioFormatReaderSource(reader, true));
        mixer.addInputSource(newSource, true);

        currentFileSampleLength = reader->lengthInSamples;

        if (currentFileSampleLength > totalNumSamples) {
            totalNumSamples = currentFileSampleLength;
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