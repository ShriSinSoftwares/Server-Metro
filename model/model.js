const mongoose = require('mongoose');

// registration Modal Schema
const querySchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    your_query: String,
    whence : String
})


//careers modal schema
const careerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    position: String,
    additional_information: String,
    cv: {
      type: Buffer,
      required: true,
    },
    cv_filename: {
      type: String,
      required: true,
    },
  });
  
  

//creating model objects
const Query = mongoose.model('queries', querySchema);
const Career = mongoose.model('careers',careerSchema);

// Exporting our model objects
module.exports = {Query, Career};