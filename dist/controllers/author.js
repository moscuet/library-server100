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
exports.deleteAll = exports.findAll = exports.findById = exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = void 0;
const Author_1 = __importDefault(require("../models/Author"));
const author_1 = __importDefault(require("../services/author"));
const apiError_1 = require("../helpers/apiError");
// POST /Authors
const createAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, biography } = req.body;
        const author = new Author_1.default({
            firstName,
            lastName,
            biography,
        });
        yield author_1.default.create(author);
        res.json(author);
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
exports.createAuthor = createAuthor;
// PUT /Authors/:AuthorId
const updateAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const authorId = req.params.authorId;
        console.log(authorId);
        const updatedAuthor = yield author_1.default.update(authorId, update);
        res.json(updatedAuthor);
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
exports.updateAuthor = updateAuthor;
// DELETE /Authors/:AuthorId
const deleteAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield author_1.default.deleteAuthor(req.params.authorId);
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
exports.deleteAuthor = deleteAuthor;
// GET /Authors/:AuthorId
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield author_1.default.findById(req.params.authorId));
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
// GET /Authors
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield author_1.default.findAll());
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
exports.findAll = findAll;
// Delete All Author
const deleteAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield author_1.default.deleteAll();
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
//# sourceMappingURL=author.js.map