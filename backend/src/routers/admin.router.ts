import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const adminRouter = express.Router();

adminRouter.route('/login').post(
    (req: express.Request, res: express.Response)=> { return new AdminController().login(req, res); }
)

adminRouter.route('/requests').get(
    (req: express.Request, res: express.Response)=> { return new AdminController().getRequests(req, res); }
)

adminRouter.route('/accept').post(
    (req: express.Request, res: express.Response)=> { return new AdminController().accept(req, res); }
)

adminRouter.route('/reject').post(
    (req: express.Request, res: express.Response)=> { return new AdminController().reject(req, res); }
)

adminRouter.route('/chPassword').post(
    (req: express.Request, res: express.Response)=> { return new AdminController().changePassword(req, res); }
)

export default adminRouter;