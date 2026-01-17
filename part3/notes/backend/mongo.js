const mongoose = require("mongoose");

if (process.argv.length < 3){
    console.log('give password as argument');
    process.exit();
}

const password = process.argv[2];

const url = `mongodb+srv://berdstudy_db_user:${password}@cluster0.3pfip0v.mongodb.net/noteApp?appName=Cluster0`

mongoose.set("strictQuery", false);

// support only and always ipv4, mongodb atlas supports only v4
mongoose.connect(url, {family: 4});

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

const Note = new mongoose.model('Note', noteSchema);

// const note = new Note({
//     content: 'mangGoose makes things easy',
//     important: true,
// })

// note.save().then(result =>{
//     console.log('note saved!');
//     mongoose.connection.close();
// })

Note.find({}).then(result => {
    result.forEach((note) => {
        console.log(note);
    })
    mongoose.connection.close();
})