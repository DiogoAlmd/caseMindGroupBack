import express from 'express';
import UserController from './controllers/userController';
import ProductController from './controllers/productController';
import { auth } from './middlewares/auth';

export const router = express.Router();

router.get('/user/:id', UserController.getUserById);
router.post('/api/auth/user', UserController.login);
router.post('/user', UserController.create);

router.post('/product', auth, ProductController.create);
router.get('/products', auth, ProductController.listProducts);
router.get('/product/:id', auth, ProductController.listProductById);
router.put('/update/:id', auth, ProductController.update);
router.delete('/delete/:id', auth, ProductController.delete);

//router.post('/product', ProductController.create);
//router.get('/products', ProductController.listProducts);
//router.get('/product/:id', ProductController.listProductById);
//router.put('/update/:id', ProductController.update);
//router.delete('/delete/:id', ProductController.delete);
