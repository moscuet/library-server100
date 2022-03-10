"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_1 = require("../controllers/borrow");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/borrows prefix
//router.get('/', findAll)
router.get('/', borrow_1.findAll);
router.get('/:borrowId', borrow_1.findById);
router.put('/:borrowId', borrow_1.updateBorrow);
// deleteAll only for testing
router.delete('/all', borrow_1.deleteAll);
router.delete('/:borrowId', borrow_1.deleteBorrow);
router.post('/', borrow_1.createBorrow);
exports.default = router;
//# sourceMappingURL=borrow.js.map