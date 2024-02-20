const mongodb = require("../db/mongo");
const ObjectId = require("mongodb").ObjectId;
const Task = require("../models/taskModel.js");


const getAllTasks = async (req, res) => {
    //#swagger.tags=['Tasks']
    //#swagger.description='Gets a list of all tasks.'
    try {
        const tasks = await Task.find({});
        return res.status(200).json(tasks);
    } catch (err) {
        console.error("There was an error while fetching all tasks.", err);
        res.status(500).json({error: "There was an error while fetching all tasks."});
    }
}

const getTaskById = async (req, res) => {
    //#swagger.tags=['Tasks']
    //#swagger.description='Gets a specific tasks by its ID.'

    try {
        // Validate task ID:
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json("You must use a valid task ID to find a task.");
        }

        const taskId = new ObjectId(req.params.id);
        const task = await Task.find({ _id: taskId });

        if (task.length > 0) {
            res.status(200).json(task[0]);
        } else {
            res.status(404).json({ error: "Task not found." });
        }
        
    }catch (err) {
        console.error("There was an error while fetching the task.", err);
        res.status(500).json({error: "There was an error while fetching the task."});
    }

}

const getTasksByUserId = async (req, res) => {
    //#swagger.tags=['Tasks']
    //#swagger.description='Gets a specific tasks by the user's ID.'
    
    try {
        // Validate user ID:
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json("You must use a valid user ID to find a task by user ID.");
        }

        const userId = new ObjectId(req.params.id);
        const tasks = await Task.find({ userId: userId });

        if (tasks.length > 0) {
            res.status(200).json(tasks);
        } else {
            res.status(404).json({ error: "Tasks not found." });
        }

    } catch (err) {
        console.error("There was an error while fetching the tasks by user ID.", err);
        res.status(500).json({error: "There was an error while fetching the tasks by user ID."});
    }
}

const createTask = async (req, res) => {
    //#swagger.tags=['Tasks']
    //#swagger.description='Creates a new task.'

    try {
        const task = new Task({
        title: req.body.title,
        description: req.body.description,
        dueDate: formatDate(req.body.dueDate),
        priorityLevel: req.body.priorityLevel,
        status: req.body.status,
        userId: req.session.user._id // Sets userId with session id
      });

        await task.save();
        return res.status(200).send({message: "Task was created successfully!"});

    } catch(err) {
        console.error("There was an error while creating the task.", err);
        res.status(500).json({error: "There was an error while creating the task."});
    }
}

const updateTask = async (req, res) => {
    //#swagger.tags=['Tasks']
    //#swagger.description='Updates a specific taks by its ID.'
    // Update is not available for userId:
    const task = {
        title: req.body.title,
        description: req.body.description,
        dueDate: formatDate(req.body.dueDate), 
        priorityLevel: req.body.priorityLevel,
        status: req.body.status,
    };

    try {
        // Validate task ID:
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json("You must use a valid task ID to update a task.");
        }

        const taskId = new ObjectId(req.params.id);        
        const taskUpdate = await Task.findOneAndUpdate({ _id: taskId}, task, {new: true});
        
        if (taskUpdate) {
            return res.status(200).json({message: "Task was successfully updated!"});
        } else {
            res.status(404).json({ error: "Task not found." });
        }
        
    } catch (err) {
        console.error("There was an error while updating the task.", err);
        res.status(500).json({error: "There was an error while updating the task."});
    }
}

const deleteTask = async (req, res) => {
    //#swagger.tags=['Tasks']
    //#swagger.description='Deletes a specific taks by its ID.'
    try {
        // Validate task ID:
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json(
                "You must use a valid task ID to delete a task."
            );
        }
        const taskId = new ObjectId(req.params.id);
        const taskDelete = await Task.deleteOne({ _id: taskId});

        if (taskDelete.deletedCount > 0) {
            res.status(200).send({message: "Task successfully deleted!"});
        } else {
            res.status(404).json({ error: "Task not found." });
        }
    } catch (err) {
        console.error("There was an error while deleting the task.", err);
        res.status(500).json({error: "There was an error while deleting the task."});
    }
}

    // Custom setter function to format the date
function formatDate(date) {
    if (!date) { return undefined;}

    // Convert the date string to a Date object
    const formattedDate = new Date(date);

    // Ensure it's a valid date
    if (isNaN(formattedDate)) { 
        throw new Error("Invalid date format. Format should be: YYYY-MM-DD");
    }
    // Format the date to YYYY-MM-DD
    return formattedDate.toISOString().split('T')[0];
}

module.exports = {
    getAllTasks,
    getTaskById,
    getTasksByUserId,
    createTask,
    updateTask,
    deleteTask
};