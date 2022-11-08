const { Thought, Reaction, User } = require('../models')

module.exports = {
    // /api/thoughts/
    async getAll(req, res) {
        try {
            const thoughts = await Thought.find({})

            if (thoughts.length === 0) {
                res.status(404).json({ message: 'No thoughts in db.' })
            }

            res.status(200).json(thoughts)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createOne(req, res) {
        try {
            const thought = await Thought.create(req.body.thought)

            const user = await User.findOneAndUpdate({ _id: req.body.id }, { $push: { thoughts: thought._id } }, { new: true })

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // /api/thoughts/:id
    async getOne(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id })

            if (!thought) {
                res.status(404).json({ message: 'No thought with that id.', id: req.params.id })
            }

            res.status(200).json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async updateOne(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(req.body, { new: true })

            if (!thought) {
                res.status(404).json({ message: 'No thought with that id.' })
            }

            res.status(200).json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async deleteOne(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id)
            await Reaction.deleteMany({ _id: { $in: thought.reactions } })

            if (!thought) {
                res.status(404).json({ message: 'No thought with that id.' })
            }

            res.status(200).json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // /api/thoughts/:thoughtId/reactions/:reactionId
    async addReaction(req, res) {
        try {
            const reaction = await Reaction.create({ reactionBody: req.body.reactionBody, username: req.body.username })

            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: reaction._id } }, { new: true })

            res.status(200).json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async removeReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndDelete({ _id: req.body.id })

            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.body.id } },
                { new: true }
            )

            if (!thought) {
                res.status(404).json({ message: 'No thought with that id.' })
            }

            res.status(200).json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}