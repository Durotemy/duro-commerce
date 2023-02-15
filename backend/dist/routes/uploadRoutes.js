"use strict";
// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, '../public/uploads'),
//     filename: (req, file, cb) => {
//         cb(null, uuidv4() + path.extname(file.originalname));
//     }
// });
// const upload = multer({
//     storage,
//     dest: path.join(__dirname, '../public/uploads'),
//     limits: { fileSize: 1000000 },
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpeg|jpg|png|gif/;
//         const mimetype = filetypes.test(file.mimetype);
//         const extname = filetypes.test(path.extname(file.originalname));
//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb("image only");
//     }
// })
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb('Images only!');
    }
}
const upload = (0, multer_1.default)({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/$!{req.file.path}`);
});
exports.default = router;
