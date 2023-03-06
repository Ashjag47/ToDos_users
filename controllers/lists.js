const listsService = require('../services/lists');
const { HTTPError } = require('../utils/errors');

const getAllLists = async (req, res) => {
    try {
        const lists = await listsService.getAllLists(req.user.id);
        res.status(200).send(lists);
    }
    catch (err) {
        if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
        res.status(500).json({ message: err.message });
    }
}

const createList = async (req, res) => {
    try {
        const list = await listsService.createList(req.user.id, req.body);
        res.status(201).send(list);
    }
    catch (err) {
        if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
        res.status(500).json({ message: err.message });
    }
}

const getListById = async (req, res) => {
    try {
        const list = await listsService.getListById(req.user.id, req.params.listId);
        res.status(200).send(list);
    }
    catch (err) {
        if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
        res.status(500).json({ message: err.message });
    }
}

const updateList = async (req, res) => {
    try {
        const list = await listsService.updateList(req.user.id, req.params.listId, req.body);
        res.status(200).send(list);
    }
    catch (err) {
        if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
        res.status(500).json({ message: err.message });
    }
}

const deleteList = async (req, res) => {
    try {
        await listsService.deleteList(req.user.id, req.params.listId);
        res.status(204).send();
    }
    catch (err) {
        if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAllLists, createList, getListById, updateList, deleteList };