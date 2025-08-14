import express from 'express';
import { getSignedUrl } from '../controller/image_controller.js';

const routes = express.Router();
// routes.get("/image-url", getSignedUrl);

routes.post('/api/upload-url', getSignedUrl);

export default routes;
