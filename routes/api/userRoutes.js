const router = require('express').Router()

const {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    addFriend,
    removeFriend
} = require('../../controllers/userController')

// /api/users

router.route('/')
.get(getAll)
.post(createOne)
router.route('/:id')
.get(getOne)
.post(createOne)
.put(updateOne)
.delete(deleteOne)
router.post()
router.delete(':userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend)