const musicMetadata = require('music-metadata');
import Storage from '../../Storage';
import { Request, Response } from 'express';

const upload = async (req: Request, res: Response) => {
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
}

export default upload;