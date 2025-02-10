// Schema for mongoDB
const mongoose = require('mongoose');

module.exports = () => {
    const EntrySchema = new mongoose.Schema({
        string: String,
        requiredString: {type: String, required: true},
        id: {type: Number, required: true, unique: true},
    });

    mongoose.model('Entry', EntrySchema);
}

