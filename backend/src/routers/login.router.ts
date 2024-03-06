import * as express from 'express'
import { LoginController } from '../controllers/login.controller';

const loginRouter = express.Router();

loginRouter.route('').post(
    (req: express.Request, res: express.Response)=> { return new LoginController().login(req, res); }
)

export default loginRouter;