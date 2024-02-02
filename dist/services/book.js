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
const Book_1 = __importDefault(require("../models/Book"));
const apiError_1 = require("../helpers/apiError");
const Borrow_1 = __importDefault(require("../models/Borrow"));
const create = (book) => __awaiter(void 0, void 0, void 0, function* () {
    return book.save();
});
const findByIdAndPopulate = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBook = yield Book_1.default.findById(bookId).populate('authors');
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book ${bookId} not found`);
    }
    return foundBook;
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Book_1.default.find().sort({ title: 1, publishedYear: -1 });
});
const findByQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    return Book_1.default.find().sort({ title: 1, publishedYear: -1 });
});
const findAllAndPopulate = () => __awaiter(void 0, void 0, void 0, function* () {
    return Book_1.default.find().sort({ name: 1, publishedYear: -1 }).populate('authors');
});
const deleteAll = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Book_1.default.deleteMany({});
});
const update = (bookId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBook = yield Book_1.default.findByIdAndUpdate(bookId, update, {
        new: true,
    });
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book ${bookId} not found`);
    }
    return foundBook;
});
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const borrowCount = yield Borrow_1.default.countDocuments({ bookId });
    if (borrowCount > 0) {
        throw new apiError_1.BadRequestError(`Cannot delete book ${bookId} as it is borrowed by customers.`);
    }
    const foundBook = yield Book_1.default.findByIdAndDelete(bookId);
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book ${bookId} not found`);
    }
    return foundBook;
});
exports.default = {
    create,
    findByIdAndPopulate,
    findAll,
    findByQuery,
    deleteAll,
    update,
    deleteBook,
    findAllAndPopulate,
};
//# sourceMappingURL=book.js.map