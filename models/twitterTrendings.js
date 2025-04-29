const mongoose = require('mongoose')

const twitterTrendingSchema = new mongoose.Schema({
    rank: Number,
    topic: String,
    url: String,
    position: Number,
    count: Number,
    duration: String
}, { timestamps: true })

module.exports = mongoose.model('twitterTrendings', twitterTrendingSchema)