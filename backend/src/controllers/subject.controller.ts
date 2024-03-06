import * as express from 'express'
import subject from '../models/subject'

export class SubjectController {

    getAllSubjects = (req: express.Request, res: express.Response) => {
        subject.find()
        .then((data)=>{
            if (!data) res.json({msg : 'no sub'});

            res.json(data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    addSubject  = (req: express.Request, res: express.Response) => {
        let sub = new subject();

        sub.name = req.body.name;
        sub.save()
        .then(data => { return res.json({ msg : 'ok' }) })
        .catch(error=>{ console.log(error); })
    }
}