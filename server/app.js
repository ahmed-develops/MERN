const express = require('express')
const app = express();

// connects to a port on localhost to run the site
app.listen(3000, () => {
    console.log('Server listening on port 3000')
})

// Middleware functions are functions that have access to request and response object
// and next function in the request-response cycle
// Next function is a function in Express router which when invoked executes the middleware succeeding 
// the current middleware

const middleware = (req, res, next) => {
    console.log('Runs first!')
    next(); // takes to the webpage which is loaded
    // without next the webpage won't load!
    // middleware will always run first, then load the webpage which is
    // called by user
}

// Different webpages of the project
app.get('/', (req, res) => {
    res.send('Hello World, from home')
});

app.get('/about', middleware, (req, res) => {
    console.log('Runs second!')
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