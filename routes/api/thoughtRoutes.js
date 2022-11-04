const router = require('express').Router()

const {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController')

router.route('/')
.get(getAll)
.post(createOne)
router.route('/:id')
.get(getOne)
.put(updateOne)
.delete(deleteOne)
router.route(':thoughtId/reactions/:reaction_id')
.post(addReaction)
.delete(removeReaction)