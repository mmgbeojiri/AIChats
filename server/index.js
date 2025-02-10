const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const EntrySchema = require('./model/Schema.js');
const mongooseServer = 'mongodb://localhost:27017/database'
const fs = require('fs');

/*mongoose.connect(mongooseServer, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));*/

const app = express();

app.use(cors());
app.use(express.json());

/*app.routes('/').get((req, res) => { 
    res.send('Hello World');
}).post((req, res) => {
    // parse the json from req
    const {string, requiredString, id} = req.body;
    const data = new EntrySchema({string, requiredString, id}).save();
}).delete((req, res) => {
    // parse the json from req
    const {id} = req.body;
    EntrySchema.findOneAndDelete({id}, (err) => {
        if (err) {
            res.sendStatus(500);
            return;
        } 
        res.sendStatus(200);
            
        
    });
});*/
const memoryfile = 'memory.json'
app.route("/memory").get((req, res) => {
    jsonData = fs.readFile(memoryfile, 'utf8', (err) => {
        res.sendStatus(500).send("Error reading to memory file: " + err);
    })
    res.send(jsonData)
}).post((req, res) => {
    jsonData = fs.writeFile(memoryfile, JSON.stringify(req), function (err) {
        if (err) {
          res.sendStatus(500).send("Error writing to memory file: " + err);
        }
      }); 
    res.sendStatus(200).send(jsonData)
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
