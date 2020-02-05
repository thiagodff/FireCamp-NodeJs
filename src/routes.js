import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ActivitiesController from './app/controllers/ActivitiesController';
import InstructorActivitiesController from './app/controllers/InstructorActivitiesController';
import SubscriptionController from './app/controllers/SubscriptionController';
import PlansController from './app/controllers/PlansController';
import EnrollmentsController from './app/controllers/EnrollmentsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/activities', ActivitiesController.index);

routes.get('/instructor-activities', InstructorActivitiesController.index);
routes.post('/instructor-activities', InstructorActivitiesController.store);
routes.put('/instructor-activities/:id', InstructorActivitiesController.update);

routes.get('/subscriptions', SubscriptionController.index);
routes.post('/subscriptions', SubscriptionController.store);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/plans', PlansController.index);
routes.post('/plans', PlansController.store);
routes.put('/plans/:id', PlansController.update);
routes.delete('/plans/:id', PlansController.delete);

routes.get('/enrollments', EnrollmentsController.index);
routes.put('/enrollments', EnrollmentsController.update);
routes.delete('/enrollments/:id', EnrollmentsController.delete);

export default routes;
