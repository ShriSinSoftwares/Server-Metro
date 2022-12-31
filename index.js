const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser=require("body-parser");
const routes = require('./routes/routes');
const app = express();

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions)) 
app.use(bodyParser.json());

mongoose.set('strictQuery', true); //for checking models query

//database connection
//const uri2 = "mongodb://localhost:27017/myDatabase"
const uri = "mongodb+srv://shrisin:traveldetails@panel.to1qhw9.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


app.use('/', routes)

app.listen(process.env.PORT || 3001, ()=> {
    console.log(`SERVER IS RUNNING on ${process.env.PORT || 3001}`);
}); 