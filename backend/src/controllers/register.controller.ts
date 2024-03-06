import * as express from 'express'

import teacher from '../models/teacher'
import student from '../models/student'

export class RegisterController {
    checkUsername = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;

        teacher.findOne({username: username})
        .then((t)=>{
            if (t == null) {
                student.findOne({username: username})
                .then((s)=>{
                    if (s == null)
                        res.json({msg: "username ok"});
                    else
                        res.json({msg: "username taken"});
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
            else
                res.json({msg: "username taken"});
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    checkEmail = (req:express.Request, res:express.Response)=>{
        let email = req.body.email;

        teacher.findOne({email: email})
        .then((t)=>{
            if (t == null) {
                student.findOne({email: email})
                .then((s)=>{
                    if (s == null)
                        res.json({msg: "email ok"});
                    else
                        res.json({msg: "email taken"});
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
            else
                res.json({msg: "email taken"});
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    uploadPicture = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        
        if (!req.file) return;
        const path = `${req.body.username}.${req.file.originalname.split('.').pop()}`;
        teacher.findOneAndUpdate({ username: username }, { picture: path })
        .then(data => {
            if (!data) {
                student.findOneAndUpdate({ username : username }, { picture : path })
                .then(data => { return res.json({ msg : "ok" }) })
                .catch(error => { console.log(error); return; })
            }
            else {
                return res.json({ msg : "ok" });
            }
        })
        .catch(error => { console.log(error); return; })
    };
}