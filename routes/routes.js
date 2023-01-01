const express = require('express');
const Query= require('../model/model');
const router = express.Router()
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();



const send_email = async() => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD            
        }
    });
      
    try {
      const documents = await Query.find();
      const lastDocument = documents[documents.length - 1];
    //   console.log(documents);
    //   console.log(lastDocument.name);
      // do something with the documents, like send an email
      let mailDetails = {
        from: process.env.GMAIL_USER,
        to: 'sauravshriwastavaa@gmail.com', 
        subject: 'Queries-Metropolitan Design',
        text: 'Test',
        html:  `<h1>Dear Metropolitan Design,
                ${lastDocument.name} requested the following queries  </h1>
                <></>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Your Query</th>
                    <th>Whence</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>${lastDocument.name}</td>
                    <td>${lastDocument.phone}</td>
                    <td>${lastDocument.email}/td>
                    <td>${lastDocument.your_query}</td>
                    <td>${lastDocument.whence}</td>
                    </tr>
                </tbody>
            </table>`
      };
    
    mailTransporter.sendMail(mailDetails, function(err, data){
        if(err) {
            console.log("Error", err)
        }
    })

    console.log("Email Sent")
    
    } catch (error) {
      console.error(error);
    }

 
  }


const query = async (req, res) => {
    const {name, phone, email, your_query, whence} = req.body;
        try{
            await Query.create({   
                name,
                phone,
                email,
                your_query,
                whence,
            })

            await send_email();
            res.send({status: 200, message: "Query Sent Sucessfully"});
        }
    
        catch (err){
            console.log(err)
            res.send({status: 400, message: "Error Sending Query"})
        }
    
}  

router.post('/query', query);


module.exports = router;