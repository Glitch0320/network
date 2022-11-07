const connection = require("../config/connection");
const { User, Thought, Reaction } = require('../models')

// connection.on('err', err => err)

connection.once('open', async () => {
    console.log('connected')

    await User.deleteMany({})
    await Thought.deleteMany({})
    await Reaction.deleteMany({})

    // 
    const user = await User.create({
        "username": "test",
        "email": "test@gmail.com",
        "password": "testtest"
    })

    const friend = await User.create({
        "username": "testtwo",
        "email": "test2@gmail.com",
        "password": "testtest"
    })

    const thought = await Thought.create({
        "thoughtText": "This is an important thought.",
        "username": user.username
    })

    const reaction = await Reaction.create({
        "reactionBody": "I agree with your thought.",
        "username": friend.username
    })

    await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { thoughts: thought._id, friends: friend._id } },
        { new: true }
    )

    await Thought.findOneAndUpdate(
        { _id: thought._id },
        { $push: { reactions: reaction._id }, },
        { new: true }
    )

    console.log('DB seeded!')
})