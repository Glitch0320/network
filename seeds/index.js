const connection = require("../config/connection");
const { User, Thought, Reaction } = require('../models')

// connection.on('err', err => err)

connection.once('open', async () => {
    console.log('connected')

    await User.deleteMany({})
    await Thought.deleteMany({})
    await Reaction.deleteMany({})

    await User.insertMany(
        [
            {
                "username": "testone",
                "email": "testone@gmail.com",
                "password": "testtest"
            },
            {
                "username": "testtwo",
                "email": "testtwo@gmail.com",
                "password": "testtest"
            }
        ],
        (err) => err ? handleError(err) : console.log('Users created.')
    )

    await Thought.insertMany(
        [
            {
                "thoughtText": "This here is an important thought.",
                "username": "testone"
            },
            {
                "thoughtText": "This here is another important thought.",
                "username": "testtwo"
            }
        ],
        (err) => err ? handleError(err) : console.log('Thoughts created.')
    )

    await Reaction.insertMany(
        [
            {
                "reactionBody": "I agree with your thought.",
                "username": "testtwo"
            },
            {
                "reactionBody": "I agree with your thought.",
                "username": "testone" 
            }
        ],
        (err) => err ? handleError(err) : console.log('Reactions created.')
    )

    console.log('DB seeded!')
    
})