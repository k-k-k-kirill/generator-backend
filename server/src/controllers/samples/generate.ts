import { Request, Response } from 'express';
import path from 'path';
import Sample from '../../models/Sample/Sample';
import type SampleDocument from '../../models/Sample/types';
import Generator from '../../services/Generator';
import Storage from '../../Storage';
const WaveFile = require('wavefile').WaveFile;
import fs from 'fs';

const generate = async (req: Request, res: Response) => {
    try {
        const storage = new Storage();
        const trackLengthInSeconds = 60;
        const key = {
            label: 'Fm',
            value: 'fm',
        };
        const bpm = 140;
        const trackType = {
            label: 'Bass808',
            value: 'bass808',
        };

        const trackSample: SampleDocument | null = await Sample.findOne({
            //@ts-ignore
            key: key,
            bpm: bpm,
            trackType: trackType,
        });

        if(trackSample) {
            const {fileKey} = trackSample;
            const inputDownloadPath = path.join(__dirname, '../../../../resources/input');

            const filePath: any = await storage.getObjectToPath(fileKey, inputDownloadPath);

            let originalWav = new WaveFile(fs.readFileSync(filePath));
            let resultWav = new WaveFile();

            // let counter = 0;

            // while (counter < trackLengthInSeconds) {
            //     counter += 10;

            // }

            let samples: any = originalWav.getSamples(true);

            console.log(samples);

            resultWav.fromScratch(originalWav.fmt.numChannels, originalWav.fmt.sampleRate, originalWav.fmt.bitsPerSample.toString(), samples);

            console.log(resultWav.getSamples(true));

            fs.writeFileSync(`${inputDownloadPath}/new.wav`, resultWav.toBuffer());

            // const generator = new Generator();

            // generator.runCxxGenerator();

            return res.status(200).send(filePath);
        }
    } catch(error) {
        console.log(error);
        res.status(500).send({
            error: 'Could not retrieve sample collection.'
        })
    }
}

export default generate;