const express = require('express');
const app = express();

app.use(express.json());

let phonebook = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"        
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"        
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1><b>Hello Wooorld!</b><\h1>');
})

app.get('/api/persons', (req, res) => {
    res.json(phonebook);
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = phonebook.find(p => p.id === id);

    if(person) {
        res.json(person);
    }
    else {
        res.status(404).end();
    }
})

app.get('/info', (req, res) => {
    let message = (
        `<p>Phonebook has info for ${phonebook.length} people</p>` + 
        `<p>${new Date().toString()}</p>`
    );
    res.send(message)

})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    phonebook = phonebook.filter(person => person.id !== id);

    res.status(204).end();
})

const generateId = () => {
    const min = 0;
    const max = 8589934592; // Number of bits in 1 Gibibyte (GiB)
    return Math.floor(Math.random() * (max - min) + min );
}

app.post('/api/persons', (req, res) => {
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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on portal ${PORT}`);
})