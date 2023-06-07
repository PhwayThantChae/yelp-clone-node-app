'use strict';

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

Schema = moongoose.Schema;

/**
 * User schema
 */
let UserSchema = new moongoose.Schema({
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