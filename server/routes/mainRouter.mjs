import express from 'express';

import usersRouter from './usersRouter.mjs';
import excursionRouter from './excursionRouter.mjs'

const router = express.Router();

router.use('/users', usersRouter);
router.use('/excursion',excursionRouter)


export default router;