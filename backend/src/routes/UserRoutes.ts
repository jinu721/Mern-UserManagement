import {Router} from 'express';
import { userController } from '../controllers/UserControler';
import {upload} from '../utils/multerConfig';

const route = Router();


route.post('/register',userController.register);
route.post('/login',userController.login);
route.post('/check-user',userController.checkUser);
route.post('/check-user',userController.checkUser);
route.post('/update/profile/:id',upload.single('avatar'),userController.updateUser);


export default route;