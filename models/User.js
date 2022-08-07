const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
        },
        userRole: {
            type: String,
            enum: ["user", "staff", "manager", "admin"],
            default: "user"
        },
        isAdmin: {
            type: Boolean,
            default: 0
        },
        isManager: {
            type: Boolean,
            default: 0
        },
        isStaff: {
            type: Boolean,
            default: 0
        }
    },
    {
        timestamps: true
    },
    
);

module.exports = mongoose.model("User", userSchema)