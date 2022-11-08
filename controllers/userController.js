const { User, Thought } = require('../models')

module.exports = {
    // /api/users/
    async getAll(req, res) {
        try {
            const users = await User.find({})

            if (users.length === 0) {
                res.status(404).json({ message: 'No users in db.' })
            }

            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // /api/users/:id
    async getOne(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id }).populate('thoughts').populate('friends')

            if (!user) {
                res.status(404).json({ message: 'No user with that id.', id: req.params.id })
            }

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createOne(req, res) {
        try {
            const user = await User.create(req.body)

            if (!user) {
                res.status(404).json({ message: 'User already exists with that email.' })
            }

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async updateOne(req, res) {
        try {
            const user = await User.findOneAndUpdate(req.body, { new: true })

            if (!user) {
                res.status(404).json({ message: 'No user with that id.' })
            }

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async deleteOne(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id })
            await Thought.deleteMany({ _id: { $in: user.thoughts } })

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // /api/users/:userId/friends/:friendId
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                { new: true }
            )

            if (!user) {
                res.status(404).json({ message: 'No user with that id.' })
            }

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            )

            if (!user) {
                res.status(404).json({ message: 'No user with that id.' })
            }

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}