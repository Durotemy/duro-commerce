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
exports.updateUser = exports.getUserById = exports.deleteUser = exports.getUsers = exports.getUserProfile = exports.registerUser = exports.authUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const generateToken_1 = require("../utils/generateToken");
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield UserModel_1.default.find({ email });
    if (user && (yield user[0].matchPassword(password))) {
        res.status(200).json({
            _id: user[0]._id,
            name: user[0].name,
            email: user[0].email,
            isAdmin: user[0].isAdmin,
            token: (0, generateToken_1.generateToken)(user[0]._id),
        });
    }
    else {
        res.status(401).json({ msg: "invalid email or password" });
    }
});
exports.authUser = authUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield UserModel_1.default.findOne({ email });
    if (user) {
        res.status(400).json({ msg: "user already exist" });
    }
    const newUser = yield new UserModel_1.default({
        name,
        email,
        password,
    });
    const result = newUser.save();
    res.status(200).json({ msg: "user created successfully", result });
    console.log(result);
});
exports.registerUser = registerUser;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findById(req.user._id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(404).json({ msg: "User not found" });
    }
});
exports.getUserProfile = getUserProfile;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.default.find({});
    console.log("llll", users);
    res.json(users);
});
exports.getUsers = getUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findById(req.params.id);
    if (user) {
        yield user.remove();
        res.json({ msg: "user removed" });
    }
    else {
        res.status(404).json({ msg: "user not found" });
    }
});
exports.deleteUser = deleteUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = yield user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: (0, generateToken_1.generateToken)(updatedUser._id),
        });
    }
});
exports.updateUser = updateUser;
