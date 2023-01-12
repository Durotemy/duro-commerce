import  express from 'express';
const  router = express.Router();
import  {authUser,registerUser,getUserProfile,getUsers,deleteUser,getUserById,updateUser} from '../controller/userController';
import {protect,admin} from '../middleware/authmiddleware';

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/login',authUser);
router.route('/').post(registerUser);
router.route('/').get(protect,admin,getUsers);
router.get('/profile',protect,getUserProfile);
router.delete('/:id',protect,admin,deleteUser);
router.get('/:id',protect,admin,getUserById);
router.put('/:id',protect,admin,updateUser);

export default router;
// module.exports = router;
