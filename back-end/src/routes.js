import express from 'express';

import CommentController from './controllers/CommentController';

const routes = express();

routes.get('/', CommentController.index);
routes.post('/', CommentController.store);
routes.delete('/', CommentController.delete);

export default routes;
