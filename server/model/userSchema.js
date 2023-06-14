const mongoose = require('mongoose')

// Here we create a user schema (a document structure to manipulate data within NoSQL database)

const userSchema = mongoose.Schema({
    name: {
        type     : String,
        required : true
    },
    email: {
        type     : String,
        required : true
    },
    phone: {
        type     : Number,
        required : false
    },
    work: {
        type     : String,
        required : false
    },
    password: {
        type     : String,
        required : true
    },
    confirm_password: {
        type     : String,
        required : true
    }
})

// create a new collection : like a table of the database

const User = mongoose.model('USER', userSchema)

module.exports = User;