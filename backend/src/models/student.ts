import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Student = new Schema({
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

    schoolType: {
        type: String
    },

    grade: {
        type: Number
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
}, { versionKey: false });

export default mongoose.model('student', Student, 'student');