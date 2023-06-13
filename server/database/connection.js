const mongoose = require('mongoose')
const DB = process.env.DATABASE

mongoose.connect(DB).then(() => {
    console.log("Database connected to the backend server!");
}).catch((err) => console.log("Database connection failed!"));