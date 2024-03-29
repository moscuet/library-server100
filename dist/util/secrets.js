"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.JWT_SECRET = exports.ENVIRONMENT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("./logger"));
if (fs_1.default.existsSync('.env')) {
    console.log('true');
    logger_1.default.debug('Using .env file to supply config environment variables');
    dotenv_1.default.config({ path: '.env' });
}
else {
    console.log('false');
    logger_1.default.debug('Using .env.example file to supply config environment variables');
    dotenv_1.default.config({ path: '.env.example' });
}
exports.ENVIRONMENT = process.env.NODE_ENV;
console.log('environment:', exports.ENVIRONMENT);
const prod = exports.ENVIRONMENT === 'production';
exports.JWT_SECRET = process.env['JWT_SECRET'];
exports.MONGODB_URI = (prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI']);
if (!exports.JWT_SECRET) {
    logger_1.default.error('No client secret. Set JWT_SECRET environment variable.');
    process.exit(1);
}
if (!exports.MONGODB_URI) {
    if (prod) {
        logger_1.default.error('No mongo connection string. Set MONGODB_URI environment variable.');
    }
    else {
        logger_1.default.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.');
    }
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map