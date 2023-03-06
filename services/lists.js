const { Lists } = require("../database/models");
const { Users } = require("../database/models");
const { HTTPError } = require("../utils/errors");

const getAllLists = async (userId) => {
    const lists = await Lists.findAll({
        where: {
            userId: userId
        }
    });
    return lists;
};

const createList = async (userId, data) => {
    const user = await Users.findOne({
        where: {
            id: userId
        }
    });
    const list = await Lists.create(data);
    await user.addLists(list);
    return list;
};

const getListById = async (userId, id) => {
    const list = await Lists.findOne({
        where: {
            id: id
        },
        include: "Tasks"
    });
    if (list.userId !== userId) {
        throw new HTTPError(404, "Access denaid");
    }
    if (list == null) {
        throw new HTTPError(404, "List not found");
    }
    return list;
};

const updateList = async (userId, id, data) => {
    const list = await Lists.findOne({
        where: {
            id: id
        }
    });
    if (list.userId !== userId) {
        throw new HTTPError(404, "Access denaid");
    }
    const result = await Lists.update(data, {
        where: {
            id: id
        }, returning: true
    });
    const affectedRows = result[0];
    if (affectedRows === 0) {
        throw new HTTPError(404, "List not found");
    }
    return result;
};

const deleteList = async (userId, id) => {
    const list = await Lists.findOne({
        where: {
            id: id
        }
    });
    if (list.userId !== userId) {
        throw new HTTPError(404, "Access denaid");
    }
    await Lists.destroy({
        where: {
            id: id
        }
    });
};

module.exports = { getAllLists, createList, getListById, updateList, deleteList };