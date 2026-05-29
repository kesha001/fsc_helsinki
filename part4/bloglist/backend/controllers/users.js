const usersRouter = require("express").Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, likes:1});

    response.json(users);
});

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    if (!(username && password)) {
        return response.status(400).json({ error: 'username or password is missing' });
    }    

    if (!(username.length > 3 && password.length > 3)){
        return response.status(400).json({ error: 'length of username and password should be more than 3' });
    }

    const existingUser = await User.find({username: username});

    if (existingUser.length !== 0){
        return response.status(400).json({ error: 'user with given username already exists' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();
    console.log(await User.find({})); 
    response.status(201).send(savedUser);
});

module.exports = usersRouter;
