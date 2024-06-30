module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongo",
    MONGO_PORT: process.env.MONGO_PORT || 27017, 
    MONGO_DB: process.env.MONGO_DB || "mydatabase",
    MONGO_COLLECTION: process.env.MONGO_COLLECTION || "mycollection",
    MONGO_USERNAME: process.env.MONGO_USERNAME || "emmachid",
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || "emma",
    port:process.env.PORT || 3000
}