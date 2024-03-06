import * as express from 'express'
import { TeacherConntroller } from '../controllers/teacher.controller';

import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/app/src/assets/cv');
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.username}.${file.originalname.split('.').pop()}`);
    }
});

const upload = multer({ storage: storage });

const teacherRouter = express.Router();

teacherRouter.route('/register').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().register(req, res); }
)

teacherRouter.route('/cv').post(
    upload.single('file'), 
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().uploadCV(req, res); }
)

teacherRouter.route('/active').get(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().getActive(req, res); }
)

teacherRouter.route('/getOne').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().getOne(req, res); }
)

teacherRouter.route('/addComment').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().addComment(req, res); }
)

teacherRouter.route('/addReview').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().addReview(req, res); }
)

teacherRouter.route('/addClass').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().addClass(req, res); }
)

teacherRouter.route('/chPassword').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().changePassword(req, res); }
)

teacherRouter.route('/chName').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().changeName(req, res); }
)

teacherRouter.route('/chLastname').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().changeLastname(req, res); }
)

teacherRouter.route('/chAddress').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().changeAddress(req, res); }
)

teacherRouter.route('/chEmail').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().changeEmail(req, res); }
)

teacherRouter.route('/chMobile').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().changeMobile(req, res); }
)

teacherRouter.route('/chSub').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().changeSubjects(req, res); }
)

teacherRouter.route('/chGrades').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().changeGrades(req, res); }
)

teacherRouter.route('/bookClass').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().bookClass(req, res); }
)

teacherRouter.route('/rejectClass').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().rejectClass(req, res); }
)

teacherRouter.route('/getClassReq').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().getClassRequests(req, res); }
)

teacherRouter.route('/addCommentToClass').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().addCommentToClass(req, res); }
)

teacherRouter.route('/addReviewToClass').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().addReviewToClass(req, res); }
)

teacherRouter.route('/getAllClasses').get(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().getAllClasses(req, res); }
)

teacherRouter.route('/getAllTeacherClasses').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().getAllTeacherClasses(req, res); }
)

teacherRouter.route('/cancelClass').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().cancelClass(req, res); }
)

teacherRouter.route('/addTeacherComment').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().addTeacherComment(req, res); }
)

teacherRouter.route('/getAll').get(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().getAll(req, res); }
)

teacherRouter.route('/addWorkTime').post(
    (req: express.Request, res: express.Response) => { return new TeacherConntroller().addWorkTime(req, res); }
)

export default teacherRouter;