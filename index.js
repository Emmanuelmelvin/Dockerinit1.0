const express = require('express');
const mongoose = require("mongoose");
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_IP, port } = require('./config/config');
const postRouter = require("./routes/postRoutes")

const app = express()

const mongoURI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const connectToDb = () => {
    mongoose
    .connect(mongoURI , {
        useNewUlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log(error)
        setTimeout(connectToDb , 5000)
    })

}     

app.get('/' , (req , res) => {
    res.send('<h2> Hi There  , my name is Anne James.</h2>')
})

app.use("/posts" , postRouter)
app.listen( port , ()=> console.log(`listening on port${port}`))