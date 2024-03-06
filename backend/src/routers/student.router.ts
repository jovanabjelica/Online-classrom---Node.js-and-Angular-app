import * as express from 'express'
import { StudentController } from '../controllers/student.controller';

const studentRouter = express.Router();

studentRouter.route('/register').post(
    (req: express.Request, res: express.Response) => { return new StudentController().register(req, res); }
)

studentRouter.route('/get').get(
    (req: express.Request, res: express.Response) => { return new StudentController().getAll(req, res); }
)

studentRouter.route('/getOne').post(
    (req: express.Request, res: express.Response) => { return new StudentController().getStudent(req, res); }
)

studentRouter.route('/chName').post(
    (req: express.Request, res: express.Response) => { return new StudentController().changeName(req, res); }
)

studentRouter.route('/chLastname').post(
    (req: express.Request, res: express.Response) => { return new StudentController().changeLastname(req, res); }
)

studentRouter.route('/chAddress').post(
    (req: express.Request, res: express.Response) => { return new StudentController().changeAddress(req, res); }
)

studentRouter.route('/chType').post(
    (req: express.Request, res: express.Response) => { return new StudentController().changeSchool(req, res); }
)

studentRouter.route('/chGrade').post(
    (req: express.Request, res: express.Response) => { return new StudentController().changeGrade(req, res); }
)

studentRouter.route('/chPassword').post(
    (req: express.Request, res: express.Response) => { return new StudentController().changePassword(req, res); }
)

studentRouter.route('/getClasses').post(
    (req: express.Request, res: express.Response) => { return new StudentController().getClasses(req, res); }
)

studentRouter.route('/addReview').post(
    (req: express.Request, res: express.Response) => { return new StudentController().addReview(req, res); }
)

export default studentRouter;