// import node modules
import { Router, Request, Response } from 'express';

// import models
import Task from '../models/Task';

// initializations
const router = Router();

// routes
router.route('/')
    .get( async (req: Request, res: Response): Promise<void> => {
        let tasks = await Task.find().lean();
        res.render('tasks/index', { tasks });
    });

router.route('/create')
    .get((req: Request, res: Response): void => {
        res.render('tasks/create');
    })
    .post( async (req: Request, res: Response): Promise<void> => {
        let { title, description } = req.body;
        let newTask = new Task({ title, description });
        await newTask.save();
        res.redirect('/tasks');
    });

router.route('/edit/:id')
    .get( async (req: Request, res: Response): Promise<void> => {
        let taskToEdit = await Task.findById(req.params.id).lean();
        res.render('tasks/edit', { taskToEdit });
    })
    .post( async (req: Request, res: Response): Promise<void> => {
        await Task.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/tasks');
    });

router.route('/delete/:id')
    .get( async (req: Request, res: Response): Promise<void> => {
        await Task.findByIdAndDelete(req.params.id)
        res.redirect('/tasks')
    });

export default router;