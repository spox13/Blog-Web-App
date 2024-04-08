const {Router} = require('express')

const {createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost} = require('../controllers/postControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/', createPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.patch('/:id', editPost)
router.get('/categories/:category', getCatPosts)
router.get('/users/:id', getUserPosts)
router.delete('/:id', deletePost)

module.exports = router