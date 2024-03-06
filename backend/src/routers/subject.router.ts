import * as express from 'express'
import { SubjectController } from '../controllers/subject.controller';

const subjectRouter = express.Router();

subjectRouter.route('/get').get(
    (req: express.Request, res: express.Response) => { return new SubjectController().getAllSubjects(req, res); }
);

subjectRouter.route('/add').post(
    (req: express.Request, res: express.Response) => { return new SubjectController().addSubject(req, res); }
);

export default subjectRouter;