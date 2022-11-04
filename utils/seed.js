const connection = require('../config/connection')
const { User, Thought, Reaction } = require('../models')
const { userData, thoughtData, reactionData } = require('./data')

connection.on('error', (err) => err)

connection.once('open', async () => {
  console.log('connected')

  await User.deleteMany({})

  await Thought.deleteMany({})

  await Reaction.deleteMany({})
  
  console.info('🌱!');
  process.exit(0);
});
