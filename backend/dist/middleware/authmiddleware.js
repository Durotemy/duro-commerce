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
exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
//   const { _id } = jwt.verify(token, 'thisisfromabhishek') as JwtPayload
//   req.user = await User.findOne({ _id, 'tokens.token': token })
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer") {
            try {
                token = req.headers.authorization.split(" ")[1];
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                req.user = yield UserModel_1.default.findOne({ id, "tokens.token": token });
                next();
            }
            catch (error) {
                res.status(404);
                throw new Error("not authorization token failde");
            }
        }
        if (!token) {
            res.status(404).send("unauthorized");
        }
    }
    catch (error) {
        res.send("error here");
        console.log(error);
    }
});
exports.protect = protect;
const admin = (req, res, next) => {
    if (req.user) {
        console.log("dooood", req.user);
        next();
    }
    else {
        res.status(401);
        throw new Error("not authorized as an admin");
    }
};
exports.admin = admin;
