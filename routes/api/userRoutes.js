const router = require('express').Router()

const {
    getAll,
    // getOne,
    // createOne,
    // updateOne,
    // deleteOne,
    // addFriend,
    // removeFriend
} = require('../../controllers/userController')

// /api/users

router.route('/')
.get(getAll)
// .post(createOne)

// router.route('/:id')
// .get(getOne)
// .put(updateOne)
// .delete(deleteOne)

// router.route(':userId/friends/:friendId')
// .post(addFriend)
// .delete(removeFriend)

module.exports = router