import * as express from 'express'

import admin from '../models/admin'
import teacher from '../models/teacher';

export class AdminController {
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        
        admin.findOne({ username: username, password:password })
        .then((a)=>{
            res.json(a);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    getRequests = (req: express.Request, res: express.Response)=> {
        teacher.find({ status: 'na cekanju' })
        .then((data)=>{
            res.json(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    accept = (req: express.Request, res: express.Response)=> {
        let username = req.body.teacher;
        
        teacher.findOneAndUpdate({ username: username }, { status: 'odobreno' })
        .then(
            (data)=> {
                res.json({msg: 'ok'});
            }
        )
        .catch(
            (error)=>{
                console.log(error);
            }
        )
    }

    reject = (req: express.Request, res: express.Response)=> {
        let username = req.body.teacher;
        
        teacher.findOneAndUpdate({ username: username }, { status: 'odbijeno' })
        .then(
            (data)=> {
                res.json({msg: 'ok'});
            }
        )
        .catch(
            (error)=>{
                console.log(error);
            }
        )
    }

    changePassword = (req: express.Request, res: express.Response)=> {
        let username = req.body.username;
        let password = req.body.password;

        admin.findOneAndUpdate({username: username}, {password: password})
        .then(data => {
            return res.json({msg: 'ok'})
        })
        .catch(error => {
            console.log(error)
        })
    }
}