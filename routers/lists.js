const express = require('express');
const router = express.Router({mergeParams: true});
const listsController = require('../controllers/lists');
const tasksRoutes = require('./tasks');

router.get('/', listsController.getAllLists);
router.post('/', listsController.createList);
router.get('/:listId', listsController.getListById);
router.put('/:listId', listsController.updateList);
router.delete('/:listId', listsController.deleteList);

router.use('/:listId/tasks', tasksRoutes)

module.exports = router;