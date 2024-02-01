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
const Borrow_1 = __importDefault(require("../models/Borrow"));
const apiError_1 = require("../helpers/apiError");
const create = (borrow) => __awaiter(void 0, void 0, void 0, function* () {
    return borrow.save();
});
const findById = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBorrow = yield Borrow_1.default.findById(borrowId)
        .populate('customerId')
        .populate('bookId');
    if (!foundBorrow) {
        throw new apiError_1.NotFoundError(`Borrow ${borrowId} not found`);
    }
    return foundBorrow;
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Borrow_1.default.find().sort({ fisrtName: 1 }).populate('bookId');
});
const findByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return Borrow_1.default.find({ customerId }).populate('bookId');
});
const deleteAll = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Borrow_1.default.deleteMany({});
});
const update = (borrowId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBorrow = yield Borrow_1.default.findByIdAndUpdate(borrowId, update, {
        new: true,
    });
    if (!foundBorrow) {
        throw new apiError_1.NotFoundError(`Borrow ${borrowId} not found`);
    }
    return foundBorrow;
});
const deleteBorrow = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBorrow = Borrow_1.default.findByIdAndDelete(borrowId);
    if (!foundBorrow) {
        throw new apiError_1.NotFoundError(`Borrow ${borrowId} not found`);
    }
    return foundBorrow;
});
exports.default = {
    create,
    findById,
    findAll,
    findByCustomerId,
    deleteAll,
    update,
    deleteBorrow,
};
//# sourceMappingURL=borrow.js.map