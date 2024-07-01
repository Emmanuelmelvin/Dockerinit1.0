const Post = require('../models/postModels')

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            status: "success",
            data: {
                length: posts.length,
                posts
            }
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed'
        })
        console.log(error)
    }

}

exports.getOnePost = async (req, res) => {
    try {

        const { id } = req.params.id
        const post = await Post.findById(id)
        res.status(201).json({
            status: "success",
            data: post
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed'
        })
        console.log(error)
    }
}


exports.createPost = async (req, res) => {
    try {
        const post = Post.createOne(req.body)
        res.status(201).json({
            status: "success",
            data: post
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed'
        })
        console.log(error)
    }
}

exports.updatePost = async (req, res) => {
    try {

        const { id } = req.params.id
        const post = await Post.findByIdAndUpdate(id, req.body)
        res.status(201).json({
            status: "success",
            data: post
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed'
        })
        console.log(error)
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params.id
        await Post.findByIdAndDelete(id)

        res.status(201).json({
            status: "success",
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed'
        })
        console.log(error)
    }
}

