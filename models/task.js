import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    text: {
        type: String,
        required: true,
        unique: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
})

const TaskModel = mongoose.model('Task', TaskSchema)
export default TaskModel