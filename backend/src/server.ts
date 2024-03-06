import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'

import adminRouter from './routers/admin.router';
import studentRouter from './routers/student.router';
import loginRouter from './routers/login.router';
import teacherRouter from './routers/teacher.router';
import registerRouter from './routers/register.router';
import subjectRouter from './routers/subject.router';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/piaproject');
const conn = mongoose.connection;
conn.once('open', ()=>{
    console.log("DB ok");
})

const router = express.Router();

router.use('/admin', adminRouter);
router.use('/student', studentRouter);
router.use('/teacher', teacherRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/subject', subjectRouter);

app.use("/" ,router);
app.listen(4000, () => console.log(`Express server running on port 4000`));