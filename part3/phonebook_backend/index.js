require('dotenv').config();
const express = require('express');
const app = express();
const Person = require('./models/person');

const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

// Create custom token to output data sent in HTTP POST requests only
morgan.token('person', (req, res) => {
    if (req.method === "POST") {
        return JSON.stringify(req.body);
    }
    return null;
})

app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :person"
    )
);

app.get('/', (req, res) => {
    res.send('<h1><b>Hello Wooorld!</b><\h1>');
})

app.get('/info', (req, res) => {
    Person
        .find({})
        .then(people => {
            res.send(
                `<p>Phonebook has info for ${people.length} people</p>` + 
                `<p>${new Date().toString()}</p>`
            );
        })
})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(people => {
            res.json(people);
        })
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(people => {
            res.json(people);
        })
})

app.post('/api/persons', (req, res) => {    
    const generateId = () => {
        const min = 0;
        const max = 8589934592; // Number of bits in 1 Gibibyte (GiB)
        return Math.floor(Math.random() * (max - min) + min );
    }
    const body = req.body;

    if (!body.name) {
        return res.status(400).json({
            error: 'Name is missing'
        });
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'Number is missing'
        })
    }
    if (phonebook.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'Name already exists in the phonebook'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    phonebook = phonebook.concat(person);

    res.json(person);
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    phonebook = phonebook.filter(person => person.id !== id);

    res.status(204).end();
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on portal ${PORT}`);
})