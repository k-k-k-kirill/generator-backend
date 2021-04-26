import express, { Request, Response } from 'express';
import Storage from '../Storage';
import Sample from '../models/Sample/Sample';
const router = express.Router();
const musicMetadata = require('music-metadata');
import path from 'path';
import Generator from '../services/Generator';

router.post('/samples/upload', async (req: Request, res: Response) => {
    const upload = req.files!.upload;

    if(upload) {
        const storage = new Storage();

        try {
            //@ts-ignore
            const fileExists = await storage.fileExists(upload.name);

            if(fileExists) {
                return res.status(409).json({
                    error: 'Resource already exists.',
                })
            }

            //@ts-ignore
            const info = await musicMetadata.parseBuffer(upload.data, 'wav');
            
            const uploadData = await storage.uploadFile(upload);
            res.status(200).send({
                fileKey: uploadData.Key,
                duration: info.format.duration,
            });
        } catch(error) {
            console.log(error);
            res.status(500).send('Failure!');
        }

    }
});

router.post('/samples/meta', async (req: Request, res: Response) => {
    const data = req.body;

    try {
        const sample = new Sample({...data});
        await sample.save();
        res.status(200).send(sample);
    }catch(error) {
        console.log(error);

        try {
            const storage = new Storage();
            await storage.deleteFile(data.fileKey);
        } catch(subError) {
            console.log(subError);
        }

        res.status(500).send('No success!');
    }
});

router.get('/samples/generate', async (req: Request, res: Response) => {
    try {
        const storage = new Storage();
        const sampleCollection = await Sample.find();

        if(sampleCollection.length > 0) {
            //@ts-ignore
            const fileKeys = sampleCollection.map((sample) => sample.fileKey);
            const inputDownloadPath = path.join(__dirname, '../../../resources/input');

            const downloadPromises = fileKeys.map(async (fileKey) => {
                return storage.getObjectToPath(fileKey, inputDownloadPath);
            });

            await Promise.all(downloadPromises)
                .then(() => console.log('Sample downloads completed.'))
                .catch(() => console.log('Error occured while downloading samples.'));

            const generator = new Generator();

            console.log('Async sucks');
            generator.runCxxGenerator();

            return res.status(200).send('Success!');
        }
    } catch(error) {
        console.log(error);
        res.status(500).send({
            error: 'Could not retrieve sample collection.'
        })
    }
})

export default router;

