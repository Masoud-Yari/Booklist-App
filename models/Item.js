const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    page: {
        type: Number,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Item = mongoose.model('item', ItemSchema)