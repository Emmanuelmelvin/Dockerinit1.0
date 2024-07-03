const express = require('express');
const mongoose = require("mongoose");
const session = require('express-session');
const redis = require("redis");
let RedisStore = require("connect-redis").default;

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_IP, port, REDIS_URL, SESSION_SECRET , REDIS_PORT } = require('./config/config');

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoute");

let redisClient = redis.createClient({
    url: `redis://${REDIS_URL}:${REDIS_PORT}`
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
}); 

redisClient.connect().catch(console.error);

const app = express();
app.use(express.json());

const mongoURI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectToDb = () => {
    mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(error => {
        console.log(error);
        setTimeout(connectToDb , 5000);
    });
};   
connectToDb();

redisClient.on('ready', () => {
    console.log('Redis client connected');

    app.use(session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true
        }
    }));

    app.get('/' , (req , res) => {
        res.send('<h2> Hi There  , my name is Anne James.</h2>');
    });

    app.use("/posts" , postRouter);
    app.use("/" ,  userRouter);

    app.listen(port, () => console.log(`listening on port ${port}`));
});
