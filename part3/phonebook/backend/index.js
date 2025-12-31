const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const app = express();
app.use(cors());
app.use(express.json());

morgan.token('request_data', (req) =>{
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
});

const logFormat = ":method :url :status :res[content-length] - :response-time ms :request_data"
app.use(morgan(logFormat));

app.get('/api/persons', (request, response) =>{
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find((person) => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => Number(person.id)))
        : 0;
    
    // console.log(Math.max(...persons.map(person => Number(person.id))));
    
    return String(maxId + 1);
}

app.post('/api/persons', (request, response) => {
    // console.log(request.body);
    
    const reqName = request.body.name;
    const reqNumber = request.body.number;
    const nameExists = persons.find((p => p.name === reqName))
    if (!reqName || !reqNumber || nameExists){
        const nameErr = {
            error: 'name must be unique',
        }
        response.status(400).json(nameErr);
    }
    const newPerson = {
        "id": generateId(),
        "name": reqName,
        "number": reqNumber,
    }

    persons = persons.concat(newPerson);

    response.status(201).json(newPerson);
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    // const person = persons.find((person) => person.id == id);
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
})

app.get('/info', (request, response) => {
    const currentCount = persons.length;
    const currentDateTime = new Date().toString();

    response.write(`Phonebook has info for ${currentCount} people \n`);
    response.write(`\n${currentDateTime}`);
    response.end();
})

const PORT = process.env.PORT || 3001;
app.listen(PORT);

console.log(`Server is running on port ${PORT}`);
