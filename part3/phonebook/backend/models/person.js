const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(url, {family: 4}).then(connection => {
    console.log(`Connected to MongoDB`);
}).catch(error => {
    console.log("Failed to connect to MongoDB: " + error);
});

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
    },
    number: {
        type: String,
        validate: {
            validator: (value) => {
                return /\d{2,3}-\d+/.test(value) && value.length >= 8;
            },
            message: (props) => {
                return `${props.path} has to be at least 8 symbols long, 
                2-3 digits before dash and digits after dash`;
            }
        },
       
    },
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const Person = new mongoose.model("Person", personSchema);


module.exports = Person;