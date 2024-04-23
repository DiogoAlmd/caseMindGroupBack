import express from 'express';
import UserController from './controllers/userController';
import ProductController from './controllers/productController';
import { auth } from './middlewares/auth';

export const router = express.Router();

router.get('/user/:id', UserController.getUserById);
router.get('/user', UserController.login);
router.post('/user', UserController.create);

router.post('/product', auth, ProductController.create);
router.get('/products', auth, ProductController.listProducts);
router.put('/update/:id', auth, ProductController.update);
router.delete('/delete/:id', auth, ProductController.delete);