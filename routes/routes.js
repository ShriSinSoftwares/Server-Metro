const express = require('express');
const Query= require('../model/model');
const router = express.Router()
const cors = require('cors');

const query = async (req, res) => {
    const {name, phone, email, your_query, whence} = req.body;
        try{
            Query.create({   
                name,
                phone,
                email,
                your_query,
                whence,
            })
            res.send({status: 200, message: "Query Sent Sucessfully"});
        }
    
        catch (err){
            console.log(err)
            res.send({status: 400, message: "Error Sending Query"})
        }
    
}  

router.post('/query', query);


router.get('/a', (req, res)=> {
    res.send("Asf")
})

router.get('/av', (req, res)=> {
    res.send("Asadsf")
})

module.exports = router;