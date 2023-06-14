const express = require('express')
const User = require('../model/userSchema')

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World, from home')
});

router.post('/register', (req, res) => {

    // ECMA SCRIPT 2016 CONVENTION OF DISPLAYING DATA
    const {name, email, phone, work, password, confirm_password} = req.body;
    //console.log(name);

    // required fields
    if (!name || !email || password || confirm_password) {
        return res.status(422).json( { error: "Error 422: Unprocessable Content"})
    }

    // validation check upon email
    User.findOne( {email : email} )
    .then((userExists) => {
        if (userExists) {
            return res.status(422).json( { error: "Error 422: Unprocessable Content"})
        }

        const user = new User({name:name, email:email, phone:phone, work:work, password:password, confirm_password:confirm_password});

        // returns promises while registring successfully or unsuccesfully
        user.save().then(()=> {
            // successfully saved
            return res.status(201).json( { msg: "Data saved successfully"})
        // unsucessful save
        }).catch((err) => {
            return res.status(500).json({ error: "Data could not be registered! "})
        })
    }).catch(err => { console.log(err) } )


    //res.send("Testing123");
});

module.exports = router;