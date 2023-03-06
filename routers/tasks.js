const express = require("express");
const router = express.Router({mergeParams: true});
const taskController = require("../controllers/tasks");
const {listValidator} = require("../middleware/auth.validator");

router.route("/")
    .get(listValidator,taskController.getAllTasks)
    .post(listValidator,taskController.createTask)
    .delete(listValidator,taskController.deleteFinishedTasks);
router.route("/:taskId")
    .get(listValidator,taskController.getTaskById)
    .put(listValidator,taskController.updateTask);

module.exports = router;