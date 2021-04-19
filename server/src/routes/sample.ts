import express from 'express';

const router = express.Router();

router.post('/samples/upload', (req, res) => {
    res.send('Success!');
});

export default router;

