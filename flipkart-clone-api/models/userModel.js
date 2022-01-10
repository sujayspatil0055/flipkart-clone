// import mongoose from 'mongoose';
const mongooseConfig = require('../config/database.config');
const { Schema } = mongooseConfig;

// console.log(mongooseConfig.connection.readyState);

const userSchema = new Schema({
    first_name:  {
        type: String, 
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        index: { unique: true },
        required: true,
        trim: true
    },
    password: {
        type: String,
    },
}, { timestamps: true });

// userSchema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
// });
const UserModal = mongooseConfig.model('userModel', userSchema);
module.exports = UserModal;