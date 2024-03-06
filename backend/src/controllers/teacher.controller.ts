import * as express from 'express'
import teacher from '../models/teacher'
import multer from 'multer';
import _class from '../models/class';
import { json } from 'stream/consumers';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('cv');

export class TeacherConntroller {

    register = (req: express.Request, res: express.Response)=> {
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let mobile = req.body.mobile;
        let securityQuestion = req.body.securityQuestion;
        let securityAnswer = req.body.securityAnswer;
        let gender = req.body.gender;
        let address = req.body.address;
        let grades = req.body.grades;
        let subjects = req.body.subjects;
        let source = req.body.source;

        let status = 'na cekanju';

        const crypto = require('crypto');
        let encrypted = crypto.createHash('sha256').update(password).digest('hex');

        let newTeacher = new teacher();

        newTeacher.firstname = firstname;
        newTeacher.lastname = lastname;
        newTeacher.username = username;
        newTeacher.password = encrypted;
        newTeacher.email = email;
        newTeacher.mobile = mobile;
        newTeacher.securityQuestion = securityQuestion;
        newTeacher.securityAnswer = securityAnswer;
        newTeacher.gender = gender;
        newTeacher.address = address;
        newTeacher.grades = grades;
        newTeacher.subjects = subjects;
        newTeacher.source = source;
        newTeacher.status = status;

        newTeacher.cv = null;

        newTeacher.save()
        .then((data)=>{
            res.json({msg: 'ok'});
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    getAll = (req: express.Request, res: express.Response) => {
        teacher.find()
        .then(data => {
            return res.json(data);
        })
        .catch(error=>{
            console.log(error);
        })
    };

    uploadCV = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        if (!req.file) return;
        teacher.findOneAndUpdate({ username: username }, {cv : `${req.body.username}.${req.file.originalname.split('.').pop()}`})
        .then(data => { return res.json({ msg : 'ok' }) })
        .catch(error => { console.log(error); return; });
    };
    
    getActive = (req: express.Request, res: express.Response)=>{
        teacher.find({status: 'odobreno'})
        .then((data)=>{
            res.json(data);
        })
        .catch((error)=>{
            console.log(error);
        })       
    }

    getOne = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        teacher.findOne({username: username})
        .then(data => { res.json(data); })
        .catch(error => { console.log(error); })
    }

    addReview = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let t = req.body.teacher;
        let review = req.body.review;

        teacher.findOne({ username: t })
        .then(data=>{
            if (!data) return;

            let reviews = data.reviews;
            const r = {
                username: username,
                review: review
            };

            reviews.push(r);

            let num;
            let avg;

            if (!data.reviewsNum) {
                num = 1;
                avg = review;
            } else {
                num = reviews.length;
                avg = 0;

                for (let r of reviews) {
                    if (!r.review) return;
                    avg += r.review;
                }

                avg /= num;
            }

            teacher.findOneAndUpdate({ username: t }, { reviews: reviews, reviewsAvg: avg, reviewsNum: num })
            .then(data => { return res.json({ msg : 'ok' }) })
            .catch(error => { console.log(error) } );
        })
        .catch(error=>{ console.log(error); })
    }

    addComment = (req: express.Request, res: express.Response) => {
        let t = req.body.teacher;
        let comments = req.body.comments;

        teacher.findOneAndUpdate({ username : t }, { comments : comments })
        .then(data => { return res.json({ msg: 'ok' }) })
        .catch(error => { console.log(error) });
    }

    addTeacherComment = (req: express.Request, res: express.Response) => {
        let student = req.body.student;
        let teacher = req.body.teacher;
        let descr = req.body.descr;
        let subject = req.body.subject;
        let datetime = req.body.datetime;
        let comment = req.body.comment;

        _class.findOneAndUpdate({student: student, teacher: teacher, descr: descr, datetime: datetime, subject: subject}, { teacherComment: comment })
        .then(data=>{ return res.json({ msg : "ok" }); })
        .catch(error=>{ console.log(error); return; })
    }

    addClass = (req: express.Request, res: express.Response) => {
        let t = req.body.teacher;
        let s = req.body.student;
        let descr = req.body.descr;
        let datetime = req.body.datetime;
        let sub = req.body.subject;
        let double = req.body.double;

        let all = req.body.all;

        let cl = new _class();

        cl.teacher = t;
        cl.student = s;
        cl.descr = descr;
        cl.datetime = datetime;
        cl.status = 'zakazano';
        cl.subject = sub;
        cl.double = double;

        cl.save()
        .then(data=>{
            teacher.findOneAndUpdate({ username: t }, { busyDays: all })
            .then(data=>{
                res.json({ msg : "ok" });
            })
            .catch(error=>{
                console.log(error);
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        const crypto = require('crypto');
        let encrypted = crypto.createHash('sha256').update(password).digest('hex');

        teacher.findOneAndUpdate({ username : username }, { password : encrypted })
        .then(data => { return res.json({ msg : "ok" }); })
        .catch(error => { console.log(error); })
    }

    changeName = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let firstname = req.body.firstname;

        teacher.findOneAndUpdate({ username : username }, { firstname : firstname })
        .then(data => { return res.json({ msg : "ok" }); })
        .catch(error => { console.log(error); })
    }

    changeLastname = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let lastname = req.body.lastname;

        teacher.findOneAndUpdate({ username : username }, { lastname : lastname })
        .then(data => { return res.json({ msg : "ok" }); })
        .catch(error => { console.log(error); })
    }

    changeAddress = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let address = req.body.address;

        teacher.findOneAndUpdate({ username : username }, { address : address })
        .then(data => { return res.json({ msg : "ok" }); })
        .catch(error => { console.log(error); })
    }

    changeEmail = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let email= req.body.email;

        teacher.findOneAndUpdate({ username : username }, { email : email })
        .then(data => { return res.json({ msg : "ok" }); })
        .catch(error => { console.log(error); })
    }

    changeMobile = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let mobile = req.body.mobile;

        teacher.findOneAndUpdate({ username : username }, { mobile : mobile })
        .then(data => { return res.json({ msg : "ok" }); })
        .catch(error => { console.log(error); })
    }

    changeSubjects = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let subjects = req.body.subjects;

        teacher.findOneAndUpdate({ username : username }, { subjects : subjects })
        .then(data => { return res.json({ msg : "ok" }); })
        .catch(error => { console.log(error); })
    }

    changeGrades = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let grades = req.body.grades;

        teacher.findOneAndUpdate({ username : username }, { grades : grades })
        .then(data => { return res.json({ msg : "ok" }); })
        .catch(error => { console.log(error); })
    }

    getClassRequests = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        
        _class.find({ teacher: username, status: 'zakazano' })
        .then(data => { return res.json(data); })
        .catch( error => { console.log(error); return; } )
    }

    bookClass = (req: express.Request, res: express.Response) => {
        let student = req.body.student;
        let t = req.body.teacher;
        let all = req.body.all;
        let descr = req.body.descr;
        let subject = req.body.subject;
        let datetime = req.body.datetime;
        
        _class.findOneAndUpdate({student: student, teacher: t, descr: descr, datetime: datetime, subject: subject}, { status:'potvrdjeno' })
        .then(data=>{
            teacher.findOneAndUpdate({username: t}, {busyDays: all})
            .then(data => { return res.json({msg: "ok"}); })
            .catch(error => { console.log(error); });
        })

        .catch(error=>{ console.log(error); return; })
    }

    rejectClass = (req: express.Request, res: express.Response) => {
        let student = req.body.student;
        let teacher = req.body.teacher;
        let descr = req.body.descr;
        let subject = req.body.subject;
        let datetime = req.body.datetime;
        let explanation = req.body.explanation;
        
        _class.findOneAndUpdate({student: student, teacher: teacher, descr: descr, datetime: datetime, subject: subject}, { status:'odbijeno', explanation: explanation })
        .then(data=>{ return res.json({ msg : "ok" }); })
        .catch(error=>{ console.log(error); return; })
    }

    addCommentToClass = (req: express.Request, res: express.Response) => {
        let student = req.body.student;
        let teacher = req.body.teacher;
        let descr = req.body.descr;
        let subject = req.body.subject;
        let datetime = req.body.datetime;
        
        let comment = req.body.comment;

        console.log(comment);
        
        _class.findOneAndUpdate({student: student, teacher: teacher, descr: descr, datetime: datetime, subject: subject}, { comment: comment })
        .then(data=>{ return res.json({ msg : "ok" }); })
        .catch(error=>{ console.log(error); return; })
    }

    addReviewToClass = (req: express.Request, res: express.Response) => {
        let student = req.body.student;
        let teacher = req.body.teacher;
        let descr = req.body.descr;
        let subject = req.body.subject;
        let datetime = req.body.datetime;
        
        let review = req.body.review;
        
        _class.findOneAndUpdate({student: student, teacher: teacher, descr: descr, datetime: datetime, subject: subject}, { review : review })
        .then(data=>{ return res.json({ msg : "ok" }); })
        .catch(error=>{ console.log(error); return; })
    }

    getAllClasses = (req: express.Request, res: express.Response) => {
        _class.find()
        .then(data => {
            return res.json(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    getAllTeacherClasses  = (req: express.Request, res: express.Response) => {
        let username = req.body.teacher;

        _class.find({teacher: username})
        .then(data => {
            return res.json(data);
        })
        .catch(error => {
            console.log(error);
        });
    }


    cancelClass = (req: express.Request, res: express.Response) => {
        let student = req.body.student;
        let teacher = req.body.teacher;
        let descr = req.body.descr;
        let subject = req.body.subject;
        let datetime = req.body.datetime;
        let explanation = req.body.explanation;
        
        _class.findOneAndUpdate({student: student, teacher: teacher, descr: descr, datetime: datetime, subject: subject}, { explanation : explanation, status: 'otkazano' })
        .then(data=>{ return res.json({ msg : "ok" }); })
        .catch(error=>{ console.log(error); return; })
    }

    addWorkTime = (req: express.Request, res: express.Response) => {
        let t = req.body.teacher;
        let startTime = req.body.startTime;
        let endTime = req.body.endTime;
        let weekend = req.body.weekend;

        teacher.findOneAndUpdate({username: t}, {startWorkTime: startTime, endWorkTime: endTime, weekendWork: weekend})
        .then(data => {
            return res.json({msg: "ok"});
        })
        .catch(error => {
            console.log(error);
        })
    }
}