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
const Author_1 = __importDefault(require("../models/Author"));
const apiError_1 = require("../helpers/apiError");
const create = (author) => __awaiter(void 0, void 0, void 0, function* () {
    return author.save();
});
const findById = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAuthor = yield Author_1.default.findById(authorId);
    if (!foundAuthor) {
        throw new apiError_1.NotFoundError(`Author ${authorId} not found`);
    }
    return foundAuthor;
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Author_1.default.find().sort({ fisrtName: 1 });
});
const deleteAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Author_1.default.deleteMany({});
});
const update = (authorId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAuthor = yield Author_1.default.findByIdAndUpdate(authorId, update, {
        new: true,
    });
    if (!foundAuthor) {
        throw new apiError_1.NotFoundError(`Author ${authorId} not found`);
    }
    return foundAuthor;
});
const deleteAuthor = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(authorId);
    const foundAuthor = Author_1.default.findByIdAndDelete(authorId);
    if (!foundAuthor) {
        throw new apiError_1.NotFoundError(`Author ${authorId} not found`);
    }
    return foundAuthor;
});
exports.default = {
    create,
    findById,
    findAll,
    deleteAll,
    update,
    deleteAuthor,
};
//# sourceMappingURL=author.js.map