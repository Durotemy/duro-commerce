import  express from 'express';
const  router = express.Router();
import  {authUser,registerUser,getUserProfile} from '../controller/userController';
import {protect} from '../middleware/authmiddleware';

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/login',authUser);
router.route('/').post(registerUser);
router.get('/profile',protect,getUserProfile);
export default router;
// module.exports = router;
