"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lusca_1 = __importDefault(require("lusca"));
const dotenv_1 = __importDefault(require("dotenv"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const book_1 = __importDefault(require("./routers/book"));
const author_1 = __importDefault(require("./routers/author"));
const customer_1 = __importDefault(require("./routers/customer"));
const borrow_1 = __importDefault(require("./routers/borrow"));
const authentication_1 = __importDefault(require("./routers/authentication"));
const baseUrl_1 = __importDefault(require("./routers/baseUrl"));
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const apiContentType_1 = __importDefault(require("./middlewares/apiContentType"));
const home_1 = __importDefault(require("./routers/home"));
dotenv_1.default.config({ path: '.env' });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parse application/json
app.use(express_1.default.json());
// parse application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(apiContentType_1.default);
// Use common 3rd-party middlewares
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(lusca_1.default.xframe('SAMEORIGIN'));
app.use(lusca_1.default.xssProtection(true));
// Use movie router
app.use('/api/customers', customer_1.default);
app.use('/api/borrows', borrow_1.default);
app.use('/api/books', book_1.default);
app.use('/api/auths', authentication_1.default);
app.use('/api/authors', author_1.default);
app.use('/api', baseUrl_1.default);
app.use('/', home_1.default);
// Custom API error handler
app.use(apiErrorHandler_1.default);
exports.default = app;
//API_URL + "signup", { firstName, lastName, email, phoneNumber, address, password }
//# sourceMappingURL=app.js.map