const express = require('express')

const Protect = require("../middleware/authMiddleware")
const postController = require('../controllers/postController')
const router = express.Router()

router.use(Protect) // Applying authentication middleware to all routes below

router.route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost)

router.route('/:id')
    .get(postController.getOnePost)
    .delete(postController.deletePost)
    .patch(postController.updatePost)

module.exports = router
