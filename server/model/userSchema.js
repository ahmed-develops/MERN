const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
    },
    tokens: [
        {
            token: {
                type : String,
                required: true
            }
        }
    ]
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

let token;

// everytime a user signs in a authorization token will be generated
userSchema.methods.generateAuthToken = async function() {
    try{
        token = jwt.sign({_id: this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token: token})
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err)
    }
}

// create a new collection : like a table of the database
const User = mongoose.model('USER', userSchema)
module.exports = User;