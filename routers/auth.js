const express = require('express');
const authController  = require('../controllers/auth');
const router = express.Router();
const { createClient } = require('redis');

global.redisClient = createClient();

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

redisClient.connect().then(() => {
  console.log('Redis connected');
}).catch((err) => {
  console.log('Redis error: ', err);
});

const app = express();
app.use(express.json());


router.post('/signup', authController.createUser);
router.post('/login', authController.loginUser);
// router.post('/validate', authController.validateToken);

module.exports = router;