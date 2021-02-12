const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const bcrypt = require('bcrypt');
const User = require('../models/user');
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

    // Start off with no token as default
    let token = null;
    
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('password', 10);
        const user = new User({ username: 'tester', name: 'testerName', passwordHash });

        await user.save();

        // Login to user to get token
        await api
            .post('/api/login')
            .send({ username: 'tester', password: 'password' })
            .then(res => token = res.body.token);

        return token;
    })

    test('a valid blog can be added (with authorized user)', async () => {
        const newBlog = {
            title: "Type wars", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
            likes: 2, 
        }
    
        await api
            .post('/api/blogs')
            .set("Authorization", `bearer ${token}`)
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
            .set("Authorization", `bearer ${token}`)
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
            .set("Authorization", `bearer ${token}`)
            .send(newBlog)
            .expect(400);
    
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    })
})

describe('deleting blogs', () => {
    
    // Start off with no token as default
    let token = null;

    beforeEach(async () => {
        await Blog.deleteMany({});
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('password', 10);
        const user = new User({ username: 'tester', name: 'testerName', passwordHash });

        await user.save();

        // Login to user to get token
        await api
            .post('/api/login')
            .send({ username: 'tester', password: 'password' })
            .then(res => token = res.body.token);

        // Create new blog with user
        const newBlog = {
            title: "Test blog",
            author: "Blog tester",
            url: "test url"
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        return token;
    })

    test('deleting blog succeeds with code 204', async () => {
        const blogAtStart = await Blog.find({}).populate('user');
        const blogToDelete = blogAtStart[0];
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204);
    
        const blogsAtEnd = await Blog.find({}).populate('user');
        expect(blogsAtEnd).toHaveLength(blogAtStart.length - 1);
        expect(blogsAtEnd).toEqual([]);
    })

    test('deleting blog fails with unauthorize user', async () => {
        const blogsAtStart = await Blog.find({}).populate('user');
        const blogToDelete = blogsAtStart[0];
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401);
    
        const blogsAtEnd = await Blog.find({}).populate('user');
        expect(blogsAtStart).toEqual(blogsAtEnd);
    })
})

describe('testing users', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('sekret', 10);
        const user = new User({ username: 'root', passwordHash });

        await user.save();
    })

    test('user is returned', async () => {
        const usersAtStart = await helper.usersInDb();    
        expect(usersAtStart[0].username).toBe('root');
    })

    test('new username succeed', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'mluukkai', 
            name: 'Matti Luukkainen', 
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    })

    test('existing username fails', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'root', 
            name: 'Superuser',
            password: 'password',
        }
        
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('`username` to be unique');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    })

    test('invalid passwords', async () => {
        const usersAtStart = await helper.usersInDb();

        let newUser = {
            username: 'testUser',
            name: 'testName'
        }

        let result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('password is required');

        newUser.password = '12';

        result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('password must be at least 3 characters');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    })
})

afterAll(() => {
    mongoose.connection.close();
})