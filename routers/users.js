const express = require('express');
const listsRoutes = require('./lists');

const router = express.Router();

router.use('/lists', listsRoutes);

module.exports = router;