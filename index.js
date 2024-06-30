const express = require('express');
const mongoose = require("mongoose")

const app = express()

mongoose
.connect("mongodb://emmachid:emmy@172.18.0.2/?authSource=admin")
.then(() => {
    console.log("Connected to MongoDB")
})
.catch(error => {
    console.log(error)
})

const port = process.env.PORT || 3000

app.get('/' , (req , res) => {
    res.send('<h2> Hi There  , my name is Anne James.</h2>')
})

app.listen( port , ()=> console.log(`listening on port${port}`))