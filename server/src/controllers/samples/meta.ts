import { Request, Response } from 'express';
import Storage from '../../Storage';
import Sample from '../../models/Sample/Sample';

const meta = async (req: Request, res: Response) => {
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
};

export default meta;