const { Schema, model } = require('mongoose')

const reactionSchema = new Schema({
    reactionBody: { Type: String, required: true, max_length: 280 },
    username: { Type: String, required: true },
    lastAccessed: { type: Date, default: Date.now() },
},
    {
        timestamps: true,
    })

const User = model('User', reactionSchema)

module.exports = User