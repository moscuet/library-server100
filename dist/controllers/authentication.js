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
exports.signup = exports.signin = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcrypt_2 = __importDefault(require("../config/bcrypt"));
const auth_1 = __importDefault(require("../config/auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Customer_1 = __importDefault(require("../models/Customer"));
const apiError_1 = require("../helpers/apiError");
// POST /Customers
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { useremail, password } = req.body;
    try {
        const customer = yield Customer_1.default.findOne({ useremail }).exec();
        const pass = customer ? customer.password : '';
        const isValidPassword = yield bcrypt_1.default.compare(password, pass);
        if (!useremail || !password)
            return res.status(400).json({ message: 'please fillup all data' });
        if (!customer)
            return res.status(401).json({ message: 'wrong credential' });
        if (!isValidPassword)
            return res.status(401).json({ message: 'Email or Password is Wrong!' });
        const accessToken = jsonwebtoken_1.default.sign({ id: customer.useremail }, auth_1.default.secret, {
            expiresIn: 7200,
        });
        const resObj = {
            _id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            useremail: customer.useremail,
            phoneNumber: customer.phoneNumber,
            address: customer.address,
            password: customer.password,
            roles: customer.roles,
            accessToken,
        };
        res.status(200).send(resObj);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else if (error instanceof Error && error.message.indexOf('11000')) {
            res.status(401).json({
                status: 'duplicate email',
                statusCode: 401,
                message: `Email ${useremail} already registered`,
            });
            return;
        }
        else {
            next(error);
        }
    }
});
exports.signin = signin;
// POST /Customers
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, useremail, phoneNumber, address, password, roles, } = req.body;
    try {
        const customer = new Customer_1.default({
            _id: (0, uuid_1.v4)(),
            firstName,
            lastName,
            useremail,
            phoneNumber: Number(phoneNumber),
            address,
            password: yield bcrypt_1.default.hash(password, bcrypt_2.default.salt),
            roles,
        });
        yield customer.save();
        res.set('Access-Control-Allow-Origin', '*');
        res.json(customer);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else if (error instanceof Error && error.message.indexOf('11000')) {
            res.status(401).json({
                status: 'duplicate email',
                statusCode: 401,
                message: `Email ${useremail} already registered`,
            });
            return;
        }
        else {
            next(error);
        }
    }
});
exports.signup = signup;
//# sourceMappingURL=authentication.js.map