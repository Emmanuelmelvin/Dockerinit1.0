const express = require('express');
const mongoose = require("mongoose");
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_IP } = require('./config/config');

const app = express()

mongoose
.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
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