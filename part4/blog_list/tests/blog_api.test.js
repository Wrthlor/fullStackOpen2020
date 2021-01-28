const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
})

test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body).toHaveLength(helper.initialBlogs.length);
})

test('a specific blog is within the returned blogs', async () => {
    const res = await api.get('/api/blogs');

    const titles = res.body.map(blog => blog.title);
    expect(titles).toContain('First class tests');
})

test('blogs should contain id property', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body[0].id).toBeDefined();
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Type wars", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
        likes: 2, 
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).toContain('Type wars');
})

test('if like property is missing, default to zero', async () => {
    const newBlog = {
        title: "TDD harms architecture", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
})

test('title and url property is missing', async () => {
    const newBlog = {
        likes: 100
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
})

afterAll(() => {
    mongoose.connection.close();
})