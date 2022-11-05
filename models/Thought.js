const { Schema, model, Types } = require('mongoose')

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, max_length: 280 },
    createdAt: { type: Date, default: Date.now},
    username: { type: String, required: true },
    reactions: [{ type: Types.ObjectId, ref: 'Reaction' }],
    lastAccessed: { type: Date, default: Date.now },
},
    {
        timestamps: true,
    })

thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought