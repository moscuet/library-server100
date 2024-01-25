"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../controllers/authentication");
const authentication_2 = require("../controllers/authentication");
const router = express_1.default.Router();
router.post('/signup', authentication_1.signup);
router.post('/signin', authentication_2.signin);
exports.default = router;
//# sourceMappingURL=authentication.js.map