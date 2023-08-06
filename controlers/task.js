import ErrorHandeler from "../middleware/error.js";
import { Task } from "../models/task.js";


export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user,
        });
        res.status(201).json({
            sucess: true,
            message: "Task addeed",
        });
    } catch (error) {
        next(error);
    }
};

export const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id;

        const tasks = await Task.find({ user: userid });

        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error);
    }
};
export const updateMyTask = async (req, res, next) => {
    try {

        // const { id } = req.params;

        const task = await Task.findById(req.params.id);

        task.isCompleted = !task.isCompleted;
        if (!task) return next(new ErrorHandeler("Task not found", 404));

        await task.save();

        res.status(200).json({
            success: true,
            message: "task updated",
        })
    } catch (error) {
        next(error);
    }
};
export const deleteMyTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return next(new ErrorHandeler("Task not found", 404));

        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "task deleted",
        })
    } catch (error) {
        next(error);
    }
};