import express from 'express';
import {addOrderItems,getOrderById,updateOrderToPaid, getMyOrders } from "../controller/orderController";
import {protect} from "../middleware/authmiddleware"

const router = express.Router()

router.post('/',protect,addOrderItems)
router.get('/:id',protect,getOrderById)
router.put('/:id',protect,updateOrderToPaid)
router.get('/myorders',protect,getMyOrders)


export default router;
