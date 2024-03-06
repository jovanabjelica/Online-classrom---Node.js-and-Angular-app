import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Admin = new Schema({
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
    }
}, { versionKey: false });

export default mongoose.model('admin', Admin, 'admin');