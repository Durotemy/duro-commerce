import express from 'express';
import { getProducts, getProductById,deleteProduct,createProduct,updateProduct } from '../controller/productController';
import {protect,admin} from '../middleware/authmiddleware';


const router = express.Router();
router.get('/', getProducts);
router.get('/:id', getProductById);
router.delete('/:id',protect,admin, deleteProduct);
router.post('/',protect,admin, createProduct);
router.put('/:id',protect,admin, updateProduct);





export default router;