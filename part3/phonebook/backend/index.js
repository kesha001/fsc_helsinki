require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

const app = express();
app.use(express.static('dist'));
app.use(cors());
app.use(express.json());

morgan.token('request_data', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
});

const logFormat = ":method :url :status :res[content-length] - :response-time ms :request_data"
app.use(morgan(logFormat));

app.get('/api/persons', (request, response) => {
    Person.find({}).then(foundPersons => {
        response.json(foundPersons);
    }) 
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person.findById(id).then(foundPerson => {
        response.json(foundPerson);
    }).catch(error => next(error));
})

app.post('/api/persons', (request, response, next) => {
    // console.log(request.body);
    
    const reqName = request.body.name;
    const reqNumber = request.body.number;
    
    // const nameExists = persons.find((p => p.name === reqName))
    // if (!reqName || !reqNumber || nameExists){
    //     const nameErr = {
    //         error: 'name must be unique',
    //     }
    //     response.status(400).json(nameErr);
    // }
    const newPerson = new Person({
        "name": reqName,
        "number": reqNumber,
    });

    newPerson.save().then(savedPerson => {
        response.status(201).json(savedPerson);
    }).catch(error => next(error));
        
})

app.put('/api/persons/:id', (request, response, next) => {
    const {number} = request.body;
    Person.findById(request.params.id).then(foundPerson => {
        if (!foundPerson){
            response.status(404).end();
        }

        foundPerson.number = number;

        foundPerson.save().then(
            updatedPerson => {
                response.json(updatedPerson).end();
            }       
        ).catch(error => next(error));
    }).catch(error => next(error));
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;

    Person.findByIdAndDelete(id).then(() => {
        response.status(204).end();
    }).catch(error => next(error));
})

app.get('/info', (request, response, next) => {
    Person.countDocuments().then(count => {
        response.write(`Phonebook has info for ${count} people \n`);
        const currentDateTime = new Date().toString();
        response.write(`\n${currentDateTime}`);
        response.end();
    }).catch(error => next(error));
    
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({"error": "unknown endpoint"});
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error);
    if (error.name === "CastError"){
        response.status(400).send({"error": "malformed id"});
    } else if (error.name == "ValidationError") {
        response.status(400).send({"error": error.message});
    }
    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);

console.log(`Server is running on port ${PORT}`);
