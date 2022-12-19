"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
const authmiddleware_1 = require("../middleware/authmiddleware");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/login', userController_1.authUser);
router.route('/').post(userController_1.registerUser);
router.get('/profile', authmiddleware_1.protect, userController_1.getUserProfile);
exports.default = router;
// module.exports = router;
