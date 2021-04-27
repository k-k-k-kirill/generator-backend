import express from 'express';
const router = express.Router();

// Controllers
import uploadController from '../controllers/samples/upload';
import metaController from '../controllers/samples/meta';
import generateController from '../controllers/samples/generate';

router.post('/samples/upload', uploadController);

router.post('/samples/meta', metaController);

router.get('/samples/generate', generateController);

export default router;

