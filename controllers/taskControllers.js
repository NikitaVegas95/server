import TaskModel from "../models/task.js";


export const create = async (req, res) => {
    try {
        const doc = new TaskModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            user: req.userId,
        })

        const task = await doc.save()

        res.json(task)
    } catch (err) {
        res.status(500).json(
            {
                message: 'Не удалось создать статью',
            }
        )
    }
}
export const getAll = async (req, res) => {
    try {
        const tasks = await TaskModel.find().populate('user').exec()
        res.json(tasks)
    } catch (err) {
        res.status(500).json(
            {
                message: 'Не удалось получить статьи',
            }
        )
    }
}
export const getOne = async (req, res) => {
    try {
        const one = await TaskModel.findById({_id: req.params.id})
        res.json(one);

    } catch (err) {
        res.status(500).json(
            {
                message: 'Не удалось получить статьи',
            }
        )
    }
}
export const remove = async (req, res) => {
    try {
        await TaskModel.findByIdAndDelete({_id: req.params.id})
        res.json({
            message: 'успешно удалено'
        });
    } catch (err) {
        res.status(500).json(
            {
                message: 'Не удалось получить статьи',
            }
        )
    }
}
export const update = async (req, res) => {
    try {
        await TaskModel.findOneAndUpdate({_id: req.params.id},{$set: {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            user: req.userId,
        }}, {upsert: true}

        )
        res.json({
            message: 'успешно обновлено'
        });
    } catch (err) {
        res.status(500).json(
            {
                message: 'Не удалось получить статьи',
            }
        )
    }
}