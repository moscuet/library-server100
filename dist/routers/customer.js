"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = require("../controllers/customer");
const router = express_1.default.Router();
router.get('/', customer_1.findAll);
router.delete('/', customer_1.deleteAll);
router.get('/:customerId', customer_1.findById);
router.put('/:customerId', customer_1.updateCustomer);
router.delete('/:customerId', customer_1.deleteCustomer);
exports.default = router;
//# sourceMappingURL=customer.js.map