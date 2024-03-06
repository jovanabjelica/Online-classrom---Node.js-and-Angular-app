import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Teacher = new Schema({
    firstname: {
        type: String
    },
    
    lastname: {
        type: String
    },

    username: {
        type: String
    },

    password: {
        type: String
    },

    email: {
        type: String
    },

    mobile: {
        type: String
    },

    securityQuestion: {
        type: String
    },

    securityAnswer: {
        type: String
    },

    gender: {
        type: String
    },

    address: {
        type: String
    },

    subjects: {
        type: Array
    },

    grades: {
        type: Array
    },

    source: {
        type: String
    },

    status: {
        type: String
    },

    cv: {
        type: String
    },
    
    picture: {
        type: String
    },

    reviewsAvg: {
        type: Number
    },

    reviewsNum: {
        type: Number
    },

    reviews: [
        {
            username: {
                type: String,
            },
            review: {
                type: Number,
                
            }
        }
    ],

    comments: {
        type: [String]
    },

    busyDays: [{
        type: String
    }],

    restDays: [{
        type: String
    }],

    startWorkTime: {
        type: String
    },

    endWorkTime: {
        type: String
    },

    weekendWork: {
        type: Boolean
    }

}, { versionKey: false });

export default mongoose.model('teacher', Teacher, 'teacher');