"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/member-delimiter-style */
const mongoose_1 = __importDefault(require("mongoose"));
const authorSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    biography: {
        type: String,
        maxLength: 255,
    },
});
exports.default = mongoose_1.default.model('Author', authorSchema);
// _id: mongoose.ObjectId
// firstName: string
// lastName: string
// biography: string
//# sourceMappingURL=Author.js.map