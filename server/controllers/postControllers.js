const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const { v4: uuid } = require("uuid")
const HttpError = require('../models/errorModel')


// create da post
// api/posts
const createPost = async (req, res, next) => {
    try {
        let {title, category, description} = req.body;
        if(!title || !category || !description || !req.files) {
            return next(new HttpError("Fill in all fields and choose thumbnail.", 422))
        }

        const {thumbnail} = req.files;

        if(thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail size too big. File must be less than 2mb"))
        }
        let fileName = thumbnail.name;
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async (err) => {
            if(err) {
                return next(new HttpError(err))
            } else {
                const newPost = await Post.create({title, category, description, thumbnail: newFilename, creator: req.user.id})
                if(!newPost) {
                    return next(new HttpError("Post couldn't be created", 422))
                }

                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})

                res.status(201).json(newPost)
            }
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}

// get all posts
// api/posts
const getPosts = async (req, res, next) => {
    res.json("get all posts")
}

// get just one post
// api/posts/:id
const getPost = async (req, res, next) => {
    res.json("get just one post")
}

// posts by category
// api/posts/categories/:category
const getCatPosts = async (req, res, next) => {
    res.json("posts by category")
}

// posts of the author
// api/posts/users/:id
const getUserPosts = async (req, res, next) => {
    res.json("user posts")
}

// editing post
// api/posts/:id
const editPost = async (req, res, next) => {
    res.json("edit post")
}

// delete the post
// api/posts/:id
const deletePost = async (req, res, next) => {
    res.json("delete post")
}

module.exports = {createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost}

