"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/member-delimiter-style */
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const customerSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        default: uuid_1.v4,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    useremail: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address',
        ],
    },
    phoneNumber: {
        type: Number, // Define the type explicitly
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required'], // Use an array for required message
    },
    roles: {
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user',
    },
    img: {
        type: String,
    },
});
exports.default = mongoose_1.default.model('Customer', customerSchema);
//# sourceMappingURL=Customer.js.map