"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/member-delimiter-style */
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    ISBN: {
        type: String,
        index: true,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    publisherName: String,
    authors: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Author',
            required: true,
        },
    ],
    publishedYear: {
        type: Number,
        required: true,
    },
    genres: [String],
    description: {
        type: String,
        maxLength: 255,
    },
    edition: String,
    pageCount: {
        type: Number,
        required: true,
        min: 2,
    },
    img: String,
});
exports.default = mongoose_1.default.model('Book', bookSchema);
//# sourceMappingURL=Book.js.map