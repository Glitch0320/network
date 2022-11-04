const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    thoughts: [{ type: Types.ObjectId, ref: "Thought" }],
    reactions: [{ type: Types.ObjectId, ref: "Reaction" }],
    lastAccessed: { type: Date, default: Date.now },
},
    {
        timestamps: true,
    })

const User = model('User', userSchema)

module.exports = User