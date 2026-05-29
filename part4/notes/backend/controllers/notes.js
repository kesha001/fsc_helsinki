const jwt = require("jsonwebtoken");
const notesRouter = require("express").Router();
const Note = require("./../models/note");
const User = require("./../models/user");

notesRouter.get('/', async (request, response) => {
    const allNotes = await Note.find({}).populate({path: "user", select: {username: 1, name: 1}});
    response.json(allNotes);

});

notesRouter.get('/:id', async (request, response) => {
    const foundNote = await Note.findById(request.params.id);
    if (foundNote){
        response.json(foundNote);
    } else {
        response.status(404).end();
    }
    
});

const getTokenFrom = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer")){
        return authorization.replace("Bearer ", "");
    }

    return null;
}

notesRouter.post('/', async (request, response) => {
    const body = request.body;

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

    if (!decodedToken.id){
        response.status(401).json({error: "token invalid"})
    }

    const user = await User.findById(decodedToken.id);

    console.log(user);
    

    if (!user){
        response.status(400).json({error: 'userId missing or not valid'});
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        user: user._id,
    });
    
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote);

    await user.save();

    response.status(201).json(savedNote);

});

notesRouter.delete('/:id', async (request, response) => {
    const id = request.params.id;

    await Note.findByIdAndDelete(id);

    response.status(204).send();
});

notesRouter.put('/:id', (request, response, next) => {
    const {content, important} = request.body;
    Note.findById(request.params.id).then(foundNote => {
        if (!foundNote){
            response.status(404).end();
        }

        foundNote.content = content;
        foundNote.important = important;

        foundNote.save().then((updatedNote) => {
            response.json(updatedNote);
        });
    }).catch(error => next(error));
});

module.exports = notesRouter;