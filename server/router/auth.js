const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World, from home')
});

router.post('/register', (req, res) => {

    // ECMA SCRIPT 2016 CONVENTION OF DISPLAYING DATA
    const {name, email, phone, work, password, confirm_password} = req.body;
    console.log(name);
    //res.send("Testing123");
});

module.exports = router;