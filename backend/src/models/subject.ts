import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Subject = new Schema({
    name: {
        type: String
    }
}, { versionKey: false });

export default mongoose.model('subject', Subject, 'subject');