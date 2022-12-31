const mongoose = require('mongoose');

// registration Modal Schema
const querySchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    your_query: String,
    whence : String
})
  

//creating model objects
const Query = mongoose.model('queries', querySchema);

// Exporting our model objects
module.exports = Query;