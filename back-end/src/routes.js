import express from 'express';

const routes = express();

routes.get('/', () => console.log('Funfou'));

export default routes;
