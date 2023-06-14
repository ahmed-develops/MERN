const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World, from home')
});

router.post('/register', (req, res) => {
    console.log(req.body);
    res.send("Testing123");
});

module.exports = router;