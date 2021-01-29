const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
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

    if (!body.title && !body.url) {
        return res.status(400).end();
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    }) 

    const savedBlog = await blog.save();
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
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
})

module.exports = blogsRouter;