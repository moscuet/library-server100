"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
const JwtTokenAtuthenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const accessTokenSecret = auth_1.default.secret;
        jsonwebtoken_1.default.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                res.status(403).json({
                    status: 'failed authenticate',
                    statusCode: 403,
                    message: 'Failed to authenticate user.',
                });
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).json({
            status: 'failed authenticate',
            statusCode: 403,
            message: 'No token provided',
        });
    }
};
exports.default = JwtTokenAtuthenticate;
//# sourceMappingURL=authenticateJWT.js.map