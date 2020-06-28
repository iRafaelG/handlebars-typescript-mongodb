// import node modules
import { Router, Request, Response } from 'express';

// initializations
const router = Router();

// routes
router.get('/', (req: Request, res: Response) => {
    res.render('index');
});

export default router;