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
exports.deleteAll = exports.findAll = exports.findById = exports.deleteCustomer = exports.updateCustomer = void 0;
const customer_1 = __importDefault(require("../services/customer"));
const apiError_1 = require("../helpers/apiError");
// PUT /Customers/:customerId
const updateCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            useremail: req.body.useremail,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
        };
        const customerId = req.params.customerId;
        const updatedCustomer = yield customer_1.default.update(customerId, update);
        res.json(updatedCustomer);
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
exports.updateCustomer = updateCustomer;
// DELETE /Customers/:customerId
const deleteCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield customer_1.default.deleteCustomer(req.params.customerId);
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
exports.deleteCustomer = deleteCustomer;
// GET /Authors/:AuthorId
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield customer_1.default.findById(req.params.customerId));
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
//GET /Customers
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield customer_1.default.findAll());
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
//Delete All Customer
const deleteAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield customer_1.default.deleteAll();
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
//# sourceMappingURL=customer.js.map