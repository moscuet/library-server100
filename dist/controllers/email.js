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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const apiError_1 = require("../helpers/apiError");
const sendEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, subject, message } = req.body;
        // Validation
        if (typeof email !== 'string' || typeof name !== 'string' ||
            typeof subject !== 'string' || typeof message !== 'string') {
            throw new apiError_1.BadRequestError('Invalid input');
        }
        const transport = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_APP_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: subject,
            text: `From: ${name} message: ${message}`,
        };
        yield transport.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            console.error('Error sending email:', error);
            next(new apiError_1.BadRequestError('Failed to send email', error));
        }
    }
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map