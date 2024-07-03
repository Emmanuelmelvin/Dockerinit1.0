module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongo",
    MONGO_PORT: process.env.MONGO_PORT || 27017, 
    MONGO_DB: process.env.MONGO_DB || "mydatabase",
    MONGO_COLLECTION: process.env.MONGO_COLLECTION || "mycollection",
    MONGO_USERNAME: process.env.MONGO_USERNAME || "emmachid",
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || "emma",
    port:process.env.PORT || 3000,
    REDIS_URL: process.env.REDIS_URL || "redis",
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    SESSION_SECRET: process.env.SESSION_SECRET,
}