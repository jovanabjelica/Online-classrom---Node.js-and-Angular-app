import * as express from 'express'

import student from '../models/student'
import teacher from '../models/teacher'

export class LoginController {
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        const crypto = require('crypto');
        let encrypted = crypto.createHash('sha256').update(password).digest('hex');
        
        student.findOne({ username: username, password: encrypted })
        .then((s)=>{
            if (s == null) {
                teacher.findOne({username: username, password: encrypted})
                .then((t)=>{
                    if (t == null) {
                        res.json({msg: "bad params"});
                    }
                    else
                        res.json({teacher: t, msg: "t"});
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
            else
                res.json({student: s, msg: "s"});
        })
        .catch((error)=>{
            console.log(error);
        })
    }
}