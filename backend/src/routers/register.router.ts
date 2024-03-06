import * as express from 'express'
import { RegisterController } from '../controllers/register.controller';

import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/app/src/assets/pic');
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.username}.${file.originalname.split('.').pop()}`);
    }
});

const upload = multer({ storage: storage });

const registerRouter = express.Router();

registerRouter.route('/username').post(
    (req: express.Request, res: express.Response)=> { return new RegisterController().checkUsername(req, res); }
)

registerRouter.route('/email').post(
    (req: express.Request, res: express.Response)=> { return new RegisterController().checkEmail(req, res); }
)

registerRouter.route('/picture').post(
    upload.single('file'), 
    (req: express.Request, res: express.Response) => {
        return new RegisterController().uploadPicture(req, res);
    }
)

export default registerRouter;