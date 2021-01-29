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

describe('there are existing blogs', () => {
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
})

describe('inspecting individual blog', () => {
    test('blogs should contain id property', async () => {
        const res = await api.get('/api/blogs');
    
        expect(res.body[0].id).toBeDefined();
    })

    test('updating number of likes', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];
    
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({
                likes: '123456789'
            })
            .expect(200);
    
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    
        const updatedBlog = blogsAtEnd[0];
        expect(updatedBlog.likes).toBe(123456789);
    })
})

describe('adding new blog', () => {
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
})

describe('deleting blog', () => {
    test('deleting blog succeeds with code 204', async () => {
        const blogAtStart = await helper.blogsInDb();
        const blogToDelete = blogAtStart[0];
    
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);
    
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    
        const titles = blogsAtEnd.map(blog => blog.title);
        expect(titles).not.toContain(blogToDelete.title);
    })
})

afterAll(() => {
    mongoose.connection.close();
})