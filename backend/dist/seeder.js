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
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./data/users"));
const products_js_1 = __importDefault(require("./data/products.js"));
const UserModel_1 = __importDefault(require("./models/UserModel"));
const ProductModel_1 = __importDefault(require("./models/ProductModel"));
const OrderModel_1 = __importDefault(require("./models/OrderModel"));
const db_js_1 = __importDefault(require("./config/db.js"));
dotenv_1.default.config();
(0, db_js_1.default)();
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield OrderModel_1.default.deleteMany();
        yield ProductModel_1.default.deleteMany();
        yield UserModel_1.default.deleteMany();
        const createdUsers = yield UserModel_1.default.insertMany(users_1.default);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products_js_1.default.map((product) => {
            return Object.assign(Object.assign({}, product), { user: adminUser });
        });
        yield ProductModel_1.default.insertMany(sampleProducts);
        console.log('Data Imported!');
        process.exit();
    }
    catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
});
const destroyData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield OrderModel_1.default.deleteMany();
        yield ProductModel_1.default.deleteMany();
        yield UserModel_1.default.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    }
    catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
});
if (process.argv[2] === '-d') {
    destroyData();
}
else {
    importData();
}
