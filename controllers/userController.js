const { User, Thought } = require('../models')

module.exports = {
    // /api/users/
    async getAll(req, res) {
        try {
            const users = await User.find({})
            if (!users) {
                res.status(404).json({message:'No users in db.'})
            }
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // /api/users/:id
    async getOne(req, res) {
        
    },
    async createOne(req, res) {
        
    },
    async updateOne(req, res) {
        
    },
    async deleteOne(req, res) {
        
    },

    // /api/users/:userId/friends/:friendId
    async addFriend(req, res) {
        
    },
    async removeFriend(req, res) {
        
    }
}