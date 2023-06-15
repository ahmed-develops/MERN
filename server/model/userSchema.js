const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

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

// Encrypting our password here
userSchema.pre('save', async function (next) {
    // if user has typed some password
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
        this.confirm_password = await bcrypt.hash(this.confirm_password,12)
    }
    next();
})

// create a new collection : like a table of the database
const User = mongoose.model('USER', userSchema)
module.exports = User;