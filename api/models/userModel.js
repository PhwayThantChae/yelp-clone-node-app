'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

/**
 * User schema
 */
let UserSchema = new mongoose.Schema({
    fullName: {
        type: String, 
        trim: true, 
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.hash_password);
}

mongoose.model("User", UserSchema);