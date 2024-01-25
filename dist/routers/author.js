"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_1 = require("../controllers/author");
const router = express_1.default.Router();
// Every path we define here will get /api/authors prefix
router.get('/', author_1.findAll);
router.get('/:authorId', author_1.findById);
router.put('/:authorId', author_1.updateAuthor);
router.delete('/:authorId', author_1.deleteAuthor);
router.post('/', author_1.createAuthor);
exports.default = router;
//# sourceMappingURL=author.js.map