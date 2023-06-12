const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World, from home')
});

app.get('/about', (req, res) => {
    res.send('Hello World, from about')
});

app.get('/login', (req, res) => {
    res.send('Hello World, from login')
});

app.get('/contact', (req, res) => {
    res.send('Hello World, from contact')
});

app.get('/signup', (req, res) => {
    res.send('Hello World, from signup')
});

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})