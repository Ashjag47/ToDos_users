const express = require('express');
const authRouter = require('./routers/auth');
const usersRouter = require('./routers/users');
const authValidator = require('./middleware/auth.validator');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth',authRouter);
app.use('/users',authValidator.JWTVaidator,usersRouter)

const hostname = '127.0.0.1';
const port = 7000;


app.listen(port, () => {
    console.log(`http://${hostname}:${port}`);
});
