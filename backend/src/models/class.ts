import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Class = new Schema({
    descr: {
        type: String
    },

    datetime: {
        type: String
    },

    student: {
        type: String
    },

    teacher: {
        type: String
    },

    status: {
        type: String
    },

    subject: {
        type: String
    },

    double: {
        type: Number
    },

    explanation: {
        type: String
    },

    comment: {
        type: String
    },

    review: {
        type: String
    },

    teacherComment: {
        type: String
    }

}, { versionKey: false });

export default mongoose.model('class', Class, 'class');
