import { Router } from 'express';
import { index } from '../controllers/indexController';
import publishersRoutes from './publishers';
import authorsRoutes from './authors';
import booksRoutes from './books';
import authRoutes from './auth';
import favoritesRoutes from './favorites';
import collectionsRoutes from './books-collections';
import readingRoutes from './reading';

const router = Router();

router.get('/', index);
router.use('/publishers', publishersRoutes);
router.use('/authors', authorsRoutes);
router.use('/books', booksRoutes);
router.use('/auth', authRoutes);
router.use('/favorites', favoritesRoutes);
router.use('/collections', collectionsRoutes);
router.use('/reading', readingRoutes);

export default router;
