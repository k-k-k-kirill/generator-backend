import { Request, Response } from 'express';
import path from 'path';
import Sample from '../../models/Sample/Sample';
import Generator from '../../services/Generator';

const generate = async (req: Request, res: Response) => {
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

            generator.runCxxGenerator();

            return res.status(200).send('Success!');
        }
    } catch(error) {
        console.log(error);
        res.status(500).send({
            error: 'Could not retrieve sample collection.'
        })
    }
}

export default generate;