
const {Tasks}= require("../database/models");
const {Lists} = require("../database/models");
const {HTTPError} = require("../utils/errors");

const getAllTasks = async (listId) => {
    const list = await Lists.findOne({
        where: {
            id: listId
        }
    });   
    return list.getTasks();
};

const createTask = async (listId, data) => {
    const list = await Lists.findOne({
        where: {
            id: listId
        }
    });
    data["isComplete"] = false;
    const task = await Tasks.create(data);
    await list.addTask(task);
    return task;
};
const deleteFinishedTasks = async (listId) => {
    await Tasks.destroy({
        where: {
            isCompleted: true,
            listId: listId 
        }
    });
};
const getTaskById = async (id) => {
    const task = await Tasks.findOne({
        where: {
            id: id
        }
    });
    if(task == null){
        throw new HTTPError(404,"Task not found");
    }
    return task;
};
const updateTask = async (id, data) => {
    const result = await Tasks.update(data, {
        where: {
            id: id
        }, returning: true
    });
    const affectedRows = result[0];
    if(affectedRows === 0){
        throw new HTTPError(404,"Task not found");
    }
    return result;
};
module.exports = {getAllTasks, createTask, deleteFinishedTasks, getTaskById, updateTask};