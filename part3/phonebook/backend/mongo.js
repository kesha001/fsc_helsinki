const mongoose = require("mongoose");

if (process.argv.length < 3){
    console.log("you have to provide password");
    process.exit();
}

const password = process.argv[2];

const url = `mongodb+srv://berdstudy_db_user:${password}@cluster0.3pfip0v.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set("strictQuery", false);



mongoose.connect(url, {family: 4});

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = new mongoose.model('Person', personSchema);

if (process.argv.length >= 5){
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4],
    });

    newPerson.save().then(response => {
        console.log(response);
        console.log("person has been added");
        mongoose.connection.close();
    })
} else {
    Person.find({}).then(response => {
        response.forEach(person => {
            console.log(person);
            mongoose.connection.close();
        })
    })
}


