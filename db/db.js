const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuidv1');

const readData = util.promisify(fs.readFile);
const writeData = util.promisify(fs.writeFile);

class Db {
    read() {
        return readData("db/db.json", "utf8");
    }
    write(note){
        return writeData("db/db.json", JSON.stringify(note));
    }
    getNote(){
        
        return this.read()
        .then (notes => {
        //     let parsedNote = JSON.parse(notes); //passing notes and converting it to object
        //     return parsedNote;
        let parsedNote;
        try {
            parsedNote = [].concat(JSON.parse(notes));
        } catch (err) {
            parsedNote = [];
        }
        return parsedNote;
        });
    }
   
    addNote(note){
        const {title, text} = note; //means db.json has title and text in its object
        const newNote = {title, text, id: uuidv1()};
        return this.getNote()
        .then (notes => [...notes, newNote]) //uses spread operator to read all the notes and appends the "new note" at the end of array
        .then (writeNote => this.write(writeNote)
        .then (() => newNote)
        )
    }

    removeNote(id){

        return this.getNote()
        // .then (allNotes => {
        //     allNotes.filter(note => {note.id !== id}) //filter through notes and remove one with given id
        //     .then (filterNotes => this.write(filterNotes))
               
        // });


        .then (function (allNotes) {
            console.log(allNotes)
            return allNotes.filter(function (note) {
                console.log(note.id !== id) 
                return note.id !== id
                });
            })

            
        // .then (function (filterNotes){
        //     this.write(filterNotes)
        //     console.log(filterNotes) 
            
        // });
        .then(filterNotes => this.write(filterNotes));
        
        
  
        
    }
    
}



module.exports = new Db();


