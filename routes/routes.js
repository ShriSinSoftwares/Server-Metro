const express = require('express');
const {Career, Query}= require('../model/model');
const router = express.Router()
const cors = require('cors');
const multer = require('multer');
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
        to: 'sauravshriwastavaa@gmail.com, meetmemukeshydv@gmail.com, metropolitandesign20@gmail.com, yadavrashindra67890@gmail.com',
        subject: 'Queries-Metropolitan Design',
        text: 'Test',
        html:  `<h1>Dear Metropolitan Design,
                ${lastDocument.name} requested the following queries  </h1>
                <></>
            <table style="border-collapse: collapse; width: 100%;">
                <thead>
                    <tr style="border: 1px solid black;">
                    <th style="border: 1px solid black; padding: 10px;">Name</th>
                    <th style="border: 1px solid black; padding: 10px;">Phone</th>
                    <th style="border: 1px solid black; padding: 10px;">Email</th>
                    <th style="border: 1px solid black; padding: 10px;">Your Query</th>
                    <th style="border: 1px solid black; padding: 10px;">Whence</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black; padding: 10px;">${lastDocument.name}</td>
                    <td style="border: 1px solid black; padding: 10px;">${lastDocument.phone}</td>
                    <td style="border: 1px solid black; padding: 10px;">${lastDocument.email}</td>
                    <td style="border: 1px solid black; padding: 10px;">${lastDocument.your_query}</td>
                    <td style="border: 1px solid black; padding: 10px;">${lastDocument.whence}</td>
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


//career section



const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage, 
    limits: {
      fileSize: 1024 * 1024 * 1/2, // 500 kB
      files: 1,
    },
  });

router.post('/careers', upload.single('cv'), (req, res) => {
  const cv = req.file;
  const careerData = req.body;

  const newCareer = new Career({
    first_name: careerData.first_name,
    last_name: careerData.last_name,
    email: careerData.email,
    position: careerData.position,
    additional_information: careerData.additional_information,
    cv: cv.buffer,
    cv_filename: cv.originalname,
  });

  newCareer.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
        console.log('work')
      res.status(200).send('CV uploaded successfully!');
    }
  });
});



module.exports = router;