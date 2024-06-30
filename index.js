const express = require('express');
const mongoose = require("mongoose")

const app = express()

mongoose.connect("mongodb://emmachid:emmy@ip=address")

const port = process.env.PORT || 3000

app.get('/' , (req , res) => {
    res.send('<h2> Hi There  , my name is Anne James.</h2>')
})

app.listen( port , ()=> console.log(`listening on port${port}`))