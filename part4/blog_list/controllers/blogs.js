const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        res.json(blog);
    }
    else {
        res.status(404).end();
    }
})

blogsRouter.post('/', async (req, res) => {
    const body = req.body;
    const token = req.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);

    if (!body.title && !body.url) {
        return res.status(400).end();
    }

    const blog = new Blog({
        url: body.url,
        title: body.title,
        author: body.author,
        user: user._id,
        likes: body.likes || 0,
    }) 

    const savedBlog = await blog.save();
    user.blog = user.blog.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body;

    const blog = {
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
    
    if (updatedBlog) {
        res.status(200).json(updatedBlog);
    }
    else {
        res.status(404).end();
    }
})

blogsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const token = req.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    
    // Checks for valid token
    if (!token || !decodedToken || !decodedToken.id) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }

    const blog = await Blog.findById(id);
    const user = await User.findById(decodedToken.id);

    // Check if blog creator is the user trying to delete
    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(id);
        res.status(204).end();
    }
    else {
        res
            .status(401)
            .json({ error: "You are unauthorized to delete this blog" });
    }
})

module.exports = blogsRouter;