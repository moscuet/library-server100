"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = require("../controllers/customer");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/users prefix
router.get('/', customer_1.findAll);
router.get('/:customerId', customer_1.findById);
router.put('/:customerId', customer_1.updateCustomer);
router.delete('/:customerId', customer_1.deleteCustomer);
// deleteAll only for testing
router.delete('/all', customer_1.deleteAll);
exports.default = router;
//# sourceMappingURL=customer.js.map