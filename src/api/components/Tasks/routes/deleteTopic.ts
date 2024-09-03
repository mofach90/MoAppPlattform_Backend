import { Router } from 'express';
import { deleteTopicController } from '../controllers/deleteTopicController';

const createDeleteTopicsRoutes = (router: Router) => {
  router.post('/delete-topic', deleteTopicController);
};

export default createDeleteTopicsRoutes;
