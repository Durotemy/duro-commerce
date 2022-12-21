import express from 'express';
import {addOrderItems} from "../controller/orderController";
import {protect} from "../middleware/authmiddleware"

const router = express.Router()

router.post('/',protect,addOrderItems)

export default router;
