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
exports.deleteAll = exports.findAllAndPopulate = exports.findAll = exports.findByIdAndPopulate = exports.deleteBook = exports.updateBook = exports.createBook = exports.findByQuery = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const book_1 = __importDefault(require("../services/book"));
const apiError_1 = require("../helpers/apiError");
// POST /books
exports.findByQuery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const q1 = req.query.catagory;
    console.log('catagory');
    try {
        res.json(yield book_1.default.findByQuery());
    }
    catch (error) {
        console.log('error');
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ISBN, title, publisherName, author, publishedYear, genres, description, edition, pageCount, img, } = req.body;
        const book = new Book_1.default({
            ISBN,
            title,
            publisherName,
            authors: author ? author.split(',') : '',
            publishedYear,
            genres: genres ? genres.split(',') : '',
            description,
            edition,
            pageCount,
            img,
        });
        yield book_1.default.create(book);
        res.json(book);
    }
    catch (error) {
        //console.log('error from cont/boob/create',error)
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
// PUT /books/:bookId
exports.updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const bookId = req.params.bookId;
        const updatedBook = yield book_1.default.update(bookId, update);
        res.json(updatedBook);
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
//##################
// DELETE /books/:bookId
exports.deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_1.default.deleteBook(req.params.bookId);
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
// GET /books/:bookId
exports.findByIdAndPopulate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield book_1.default.findByIdAndPopulate(req.params.bookId));
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
// GET /books
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield book_1.default.findAll());
    }
    catch (error) {
        console.log('error');
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
//
exports.findAllAndPopulate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('22222222222222 controller');
    try {
        res.json(yield book_1.default.findAllAndPopulate());
    }
    catch (error) {
        console.log('error');
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
// Delete All Book
exports.deleteAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_1.default.deleteAll();
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
//# sourceMappingURL=book.js.map