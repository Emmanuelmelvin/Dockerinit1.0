const express = require('express');
const mongoose = require("mongoose");
const session = require('express-session');
const redis = require("redis");
const cors = require("cors")
let RedisStore = require("connect-redis").default;

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_IP, port, REDIS_URL, SESSION_SECRET, REDIS_PORT } = require('./config/config');

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
app.use(cors({}))

const mongoURI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectToDb = () => {
    mongoose
        .connect(mongoURI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(error => {
            console.log(error);
            setTimeout(connectToDb, 5000);
        });
};
connectToDb();

redisClient.on('ready', () => {
    console.log('Redis client connected');
    app.enable("trust-proxy")
    app.use(session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 60 * 24
        }
    }));

    app.get('/', (req, res) => {
         // Log the session object to verify if a session is created
        //  console.log('Session:', req.session);

         // Increment visit count to ensure session is being used
         if (req.session.views) {
             req.session.views++;
             res.send(`<h2> Hi There , my name is Anne James. You've visited ${req.session.views} times.</h2>`);
         } else {
             req.session.views = 1;
             res.send('<h2> Hi There , my name is Anne James. Welcome for the first time!</h2>');
         }
    });

    app.use("/posts", postRouter);
    app.use("/", userRouter);

    app.listen(port, () => console.log(`listening on port ${port}`));
});
