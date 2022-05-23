"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_1 = require("../controllers/book");
const router = express_1.default.Router();
// Every path we define here will get /api/books prefix
//router.get('/', findAll)
router.get('/catagory', book_1.findByQuery);
router.get('/all', book_1.findAllAndPopulate);
router.get('/', book_1.findAll);
router.get('/:bookId', book_1.findByIdAndPopulate);
router.put('/:bookId', book_1.updateBook);
// deleteAll only for testing
router.delete('/all', book_1.deleteAll);
router.delete('/:bookId', book_1.deleteBook);
router.post('/', book_1.createBook);
exports.default = router;
//# sourceMappingURL=book.js.map