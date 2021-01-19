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
        .catch(error => next(error));
})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(people => res.json(people))
        .catch(error => next(error));
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(people => res.json(people))
        .catch(error => next(error));
})

app.post('/api/persons', (req, res, next) => {    
    const body = req.body;
    
    if (!body.name) {
        return res.status(400).json({
            error: 'Name is missing'
        });
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'Number is missing'
        });
    }

    const person = new Person ({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => res.json(savedPerson))
        .catch(error => next(error));
})

app.delete('/api/persons/:id', (req, res) => {
    Person 
        .findByIdAndRemove(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => next(error));
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error));
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name == 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message})
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on portal ${PORT}`);
})