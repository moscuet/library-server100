"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.findAll = exports.findById = exports.deleteBorrow = exports.updateBorrow = exports.createBorrow = void 0;
const Borrow_1 = __importDefault(require("../models/Borrow"));
const borrow_1 = __importDefault(require("../services/borrow"));
const apiError_1 = require("../helpers/apiError");
// POST /borrows
const createBorrow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId, customerId, borrowDate, returnDate } = req.body;
        const borrow = new Borrow_1.default({
            customerId,
            bookId,
            borrowDate,
            returnDate,
            isReturned: false,
        });
        yield borrow_1.default.create(borrow);
        res.json(borrow);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.createBorrow = createBorrow;
// PUT /borrws/:borrowId
const updateBorrow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const borrowId = req.params.borrowId;
        const updatedBorrow = yield borrow_1.default.update(borrowId, update);
        res.json(updatedBorrow);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.updateBorrow = updateBorrow;
// DELETE /borrows/:borrowId
const deleteBorrow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield borrow_1.default.deleteBorrow(req.params.borrowId);
        res.status(204).end();
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.deleteBorrow = deleteBorrow;
// GET /borrows/:borrowId
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield borrow_1.default.findById(req.params.borrowId));
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.findById = findById;
// GET /borrows
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.query.customerId;
    if (!params) {
        try {
            res.json(yield borrow_1.default.findAll());
        }
        catch (error) {
            if (error instanceof Error && error.name == 'ValidationError') {
                next(new apiError_1.BadRequestError('Invalid Request', error));
            }
            else {
                next(error);
            }
        }
    }
    else {
        try {
            res.json(yield borrow_1.default.findByCustomerId(params));
        }
        catch (error) {
            if (error instanceof Error && error.name == 'ValidationError') {
                next(new apiError_1.BadRequestError('Invalid Request', error));
            }
            else {
                next(error);
            }
        }
    }
});
exports.findAll = findAll;
// Delete All Borrow
const deleteAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield borrow_1.default.deleteAll();
        res.status(204).end();
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.deleteAll = deleteAll;
//# sourceMappingURL=borrow.js.map