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
const Customer_1 = __importDefault(require("../models/Customer"));
const apiError_1 = require("../helpers/apiError");
const create = (customer) => __awaiter(void 0, void 0, void 0, function* () {
    return customer.save();
});
const findById = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCustomer = yield Customer_1.default.findById(customerId);
    if (!foundCustomer) {
        throw new apiError_1.NotFoundError(`Author ${customerId} not found`);
    }
    return foundCustomer;
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Customer_1.default.find();
});
const deleteAll = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Customer_1.default.deleteMany({});
});
const update = (customerId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCustomer = yield Customer_1.default.findByIdAndUpdate(customerId, update, {
        new: true,
    });
    if (!foundCustomer) {
        throw new apiError_1.NotFoundError(`Customer ${customerId} not found`);
    }
    return foundCustomer;
});
const deleteCustomer = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(customerId);
    const foundCustomer = Customer_1.default.findByIdAndDelete(customerId);
    if (!foundCustomer) {
        throw new apiError_1.NotFoundError(`Customer ${customerId} not found`);
    }
    return foundCustomer;
});
exports.default = {
    create,
    findById,
    findAll,
    deleteAll,
    update,
    deleteCustomer,
};
//# sourceMappingURL=customer.js.map