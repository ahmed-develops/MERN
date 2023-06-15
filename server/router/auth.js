const express = require('express')
const User = require('../model/userSchema')

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Hello World, from home')
});

router.post('/register', async (req, res) => {

    // ECMA SCRIPT 2016 CONVENTION OF DISPLAYING DATA
    const { name, email, phone, work, password, confirm_password } = req.body;
    //console.log(name);

    // required fields
    if (!name || !email || !password || !confirm_password) {
        return res.status(422).json({ error: "Error 422: Unprocessable Content" })
    }

    // Async version
    try {
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(422).json({ error: "Email already exists" })
        }
        else if (password != confirm_password) {
            return res.status(422).json({ error: "Confirm password does not match the original password" })
        }
        else {
            const user = new User({ name: name, email: email, phone: phone, work: work, password: password, confirm_password: confirm_password });

            await user.save();

            res.status(201).json({ msg: "Data saved successfully" })
            console.log(user)
        }
    }
    catch (err) {
        console.log(err);
    }

    // Promise version

    // // validation check upon email
    // User.findOne( {email : email} )
    // .then((userExists) => {
    //     if (userExists) {
    //         return res.status(422).json( { error: "Error 422: Unprocessable Content"})
    //     }

    //     const user = new User({name:name, email:email, phone:phone, work:work, password:password, confirm_password:confirm_password});

    //     res.status(201).json( { msg: "Data saved successfully"})
    //     // returns promises while registring successfully or unsuccesfully
    //     user.save().then(()=> {
    //         // successfully saved
    //         return res.status(201).json( { msg: "Data saved successfully"})
    //     // unsucessful save
    //     }).catch((err) => {
    //         return res.status(500).json({ error: "Data could not be registered! "})
    //     })
    // }).catch(err => { console.log(err) } )


    //res.send("Testing123");
});

// Signin form backend

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "Fields must not be empty!" })
        }

        const userLogin = await User.findOne({ email: email })

        if (!userLogin) {
            return res.status(402).json({ msg: "Login unsuccessful!" })
        }

        res.status(200).json({ msg: "Login successful!" })
        console.log(userLogin);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;