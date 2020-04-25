// GET /api/notes - Should read the db.json file and return all saved notes as JSON.


// POST /api/notes - Should receive a new note to save on the request body, 
//add it to the db.json file, and then return the new note to the client.


// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each 
// note a unique id when it's saved. In order to delete a note,
//  you'll need to read all notes from the db.json file, remove the note with the given 
// id property, and then rewrite the notes to the db.json file.
const Db = require('../db/db.js');
const fs = require('fs');
const uuidv1 = require('uuidv1');
const dbPath = './db/db.json';


module.exports = function (app) {



     // refactored helper methods


//      const readFile = (callback, returnJson = false, filePath = dbPath, encoding = 'utf8') => {
//         fs.readFile(filePath, encoding, (err, data) => {
//             if (err) {
//                 throw err;
//             }

//             callback(returnJson ? JSON.parse(data) : data);
//         });
//     };

//    const writeFile = (fileData, callback, filePath = dbPath, encoding = 'utf8') => {

//         fs.writeFile(filePath, fileData, encoding, (err) => {
//             if (err) {
//                 throw err;
//             }

//             callback();
//         });
//     };

    // READ
    app.get('api/notes', (req, res) => {
        fs.readFile(dbPath, 'utf8', (err, data)=> {
            if(err){
                throw err;
            }
            res.send(JSON.parse(data));
        });
        
    });

    app.post('api/notes', (req, res) => {
        Db.addNotes(req.body).then ((note) => res.send (note))
        .catch(err => res.status(500).json(err));
            
             
        

    });

   // UPDATE
    app.put('api/notes/:id', (req, res) => {

    readFile(data => {

        // add the new note
        const noteID = req.params["id"];
        data[noteID] = JSON.parse(req.body.data);

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`note id:${noteID} updated`);
        });
    },
        true);
});

// DELETE
app.delete('api/notes/:id', (req, res) => {

    readFile(data => {

        // add the new user
        const noteID = req.params["id"];
        delete data[noteID];

        writeFile(JSON.stringify(data), () => {
            res.status(200).send(`note id:${noteID} removed`);
        });
    },
        true);
});
    

}
    