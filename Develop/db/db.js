const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuidv1');

const readData = util.promisify(fs.readFile);
const writeData = util.promisify(fs.writeFile);

class Db {
    read() {
        return readData ("db.json","utf8");
    }
    write(note){
        return writeData("db.json", JSON.stringify(note));
    }
    getNotes(){
    fs.readFile("dbjson", "utf8", (err, data)=> {
        if(err){
            throw err;
        }
        res.send(JSON.parse(data));
    });
}
    addNotes(note){
        const {title, text} = note; //means db.json has title and text in its object
        const newNote = {title, text, id: uuidv1()};
        return this.getNotes()
        .then (notes => [...notes, newNote]) //uses spread operator to read all the notes and appends the "new note" at the end of array
        .then (writeNote => this.write(writeNote)
        .then (() => newNote)
        )
    }
}

module.exports = new Db;