const { Schema, model, Types } = require('mongoose')

const thoughtSchema = new Schema({
    text: { Type: String, required: true, max_length: 280 },
    username: { Type: String, required: true },
    reactions: [{Type:Types.ObjectId,ref:'Reaction'}],
    lastAccessed: { type: Date, default: Date.now },
},
    {
        timestamps: true,
    })

const User = model('User', thoughtSchema)

module.exports = User