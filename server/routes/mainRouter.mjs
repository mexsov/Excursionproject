import express from 'express';

import usersRouter from './usersRouter.mjs';


const router = express.Router();

router.use('/users', usersRouter);


export default router;