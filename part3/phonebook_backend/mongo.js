const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please prvide the password as an argument: \n\tnode mongo.js <password>');
    process.exit(1);
}

if (process.argv.length > 3 && process.argv.length < 5) {
    console.log('Please provide new entry as arguments: \n\tnode mongo.js <password> <name> <number>');
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullStackOpenUser:${password}@cluster0.e8ail.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose
    .connect(url, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false, 
        useCreateIndex: true 
    })
    .catch(error => {
        console.error(error);
    });

// Using "mongoose.Schema.Types.Mixed" to take "numeric inputs with dashes"
// Technically, that Schema type allows any type of input (seen as String on MongoDB)
const personSchema = new mongoose.Schema({
    name: String,
    number: mongoose.Schema.Types.Mixed
})

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
    const person = new Person ({
        name: process.argv[3],
        number: process.argv[4]
    });

    person
        .save()
        .then(result => {
            console.log(`added ${person.name} ${person.number} to phonebook`);
            mongoose.connection.close();
        })
        .catch(error => {
            console.error(error);
        });
}

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("phonebook:");
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    })
}