"use strict";
//SBN:varchar userId:string borrowdate: timestamp returnDate : timestap
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/member-delimiter-style */
const mongoose_1 = __importDefault(require("mongoose"));
const borrowSchema = new mongoose_1.default.Schema({
    bookId: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
    ],
    customerId: [
        {
            type: String,
            ref: 'Customer',
            required: true,
        },
    ],
    borrowDate: {
        type: Date,
        default: Date.now,
    },
    returnDate: {
        type: Date,
        default: new Date(new Date().getTime() + 7 * 24 * 3600 * 1000),
    },
    isReturned: {
        type: Boolean,
        default: false,
    },
});
// {type: Schema.Types.ObjectId, ref: 'Ingredient'}
exports.default = mongoose_1.default.model('Borrow', borrowSchema);
//# sourceMappingURL=Borrow.js.map