import express from 'express';
import UserController from '../controllers/UserController';
import validateMiddleware from '../middleware/validateMiddleware';
import userValidateSchema from '../validators/userValidator';
import authMiddleware from '../middleware/authMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';

const router = express.Router();

const userController = new UserController();

router.post('/login', userController.login)
router.post('/create', validateMiddleware.validate(userValidateSchema) , userController.createUser);
router.put('/:id', validateMiddleware.validate(userValidateSchema) ,userController.updateUser);
router.put('/status/:id', authMiddleware, roleMiddleware("ADMIN"), userController.updateUserStatus);
router.delete('/delete/:id', userController.deleteUser);
router.get('/', userController.getAllUsers)

export default router;