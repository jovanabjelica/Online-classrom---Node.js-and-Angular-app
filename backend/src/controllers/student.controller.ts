import * as express from 'express';
import student from '../models/student';
import _class from '../models/class';

export class StudentController {
    register = (req: express.Request, res: express.Response) => {
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
        let grade = req.body.grade;
        let type = req.body.type;

        const crypto = require('crypto');
        let encrypted = crypto.createHash('sha256').update(password).digest('hex');

        let newStudent = new student();

        newStudent.firstname = firstname;
        newStudent.lastname = lastname;
        newStudent.username = username;
        newStudent.password = encrypted;
        newStudent.email = email;
        newStudent.mobile = mobile;
        newStudent.securityQuestion = securityQuestion;
        newStudent.securityAnswer = securityAnswer;
        newStudent.gender = gender;
        newStudent.address = address;
        newStudent.grade = grade;
        newStudent.schoolType = type;

        newStudent.save()
            .then((data) => {
                res.json({ msg: 'ok' });
            })
            .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            });
    };

    getAll = (req: express.Request, res: express.Response) => {
        student.find()
        .then((data)=>{
            res.json(data);
        })
        .catch((error)=>{
            console.log(error);
        });
    };

    getStudent = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        student.findOne({username: username})
        .then(data=>{
           res.json(data); 
        })
        .catch(error=>{
            console.log(error);
        })
    };

    changeName = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let name = req.body.name;

        student.findOneAndUpdate({username: username}, {firstname: name})
        .then(data=>{
            res.json({ msg : 'ok' })
        })
        .catch(error=>{
            console.log(error);
        });
    };

    changeLastname = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let lastname = req.body.lastname;

        student.findOneAndUpdate({username: username}, {lastname: lastname})
        .then(data=>{
            res.json({ msg : 'ok' })
        })
        .catch(error=>{
            console.log(error);
        });
    };

    changeAddress = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let address = req.body.address;

        student.findOneAndUpdate({username: username}, {address: address})
        .then(data=>{
            res.json({ msg : 'ok' })
        })
        .catch(error=>{
            console.log(error);
        });
    };

    changeSchool = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let type = req.body.type;

        student.findOneAndUpdate({username: username}, {schoolType: type})
        .then(data=>{
            res.json({ msg : 'ok' })
        })
        .catch(error=>{
            console.log(error);
        });
    };

    changeGrade = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        
        student.findOne({ username: username })
        .then(data => {
            if (!data || !data.grade) return;
        
            let newGrade = data.grade + 1;

            if (data.grade === 8 && data.schoolType === "osnovna") {
                newGrade = 1;
            } 
            
            student.findOneAndUpdate({username  : username}, { grade: newGrade})
            .then( data => {
                res.json( {msg : "ok"} )
            })
            .catch(error => {
                console.log(error);
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        const crypto = require('crypto');
        let encrypted = crypto.createHash('sha256').update(password).digest('hex');

        student.findOneAndUpdate({ username : username }, { password : encrypted })
        .then(data => { return res.json({ msg : "ok" }); })
        .catch(error => { console.log(error); })
    }

    getClasses = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        
        _class.find({ student: username })
        .then(data => { return res.json(data); })
        .catch( error => { console.log(error); return; } )
    }

    addReview = (req: express.Request, res: express.Response) => {
        let username = req.body.username; //to which student
        let t = req.body.teacher;
        let review = req.body.review;

        student.findOne({ username: username })
        .then(data=>{
            if (!data) return;

            let reviews = data.reviews;
            const r = {
                username: t,
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

            student.findOneAndUpdate({ username: username }, { reviews: reviews, reviewsAvg: avg, reviewsNum: num })
            .then(data => { return res.json({ msg : 'ok' }) })
            .catch(error => { console.log(error) } );
        })
        .catch(error=>{ console.log(error); })
    }
}
