import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/samples/upload', (req: Request, res: Response) => {
    console.log(req.params);
    res.send('Success!');
});

export default router;

