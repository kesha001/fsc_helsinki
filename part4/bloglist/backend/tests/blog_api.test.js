const Blog = require("../models/blog");
const request = require('supertest');
const app = require("../app")
const { test, describe, beforeEach, afterEach, after, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require('mongoose');
const testHelper = require("./test_helper");

const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const api = request(app);

let token = null;
let userId = null;

before(async () => {
    await User.deleteMany({});
    const { username, name, password } = testHelper.testingUser;
    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();

    const userForToken = {
            username: savedUser.username,
            id: savedUser._id,
        }
    
    token = jwt.sign(
        userForToken, 
        process.env.SECRET,
        {expiresIn: 60*60}
    );
    console.log(token);
    userId = userForToken.id;
    
});

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(testHelper.initialBlogs);
});

test("blogs are returned as JSON", async () => {
    await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-type", /application\/json/);
})

test("correct amount of blog posts", async () => {    

    const blogsInDB = await api.get("/api/blogs");

    assert.strictEqual(blogsInDB.body.length, testHelper.initialBlogs.length);
    
});

test("the unique identifier property of the blog posts is named id", async () => {
    const blogsInDB = await api.get("/api/blogs");
    
    const firstBlog = blogsInDB.body[0];
   

    assert(!firstBlog.hasOwnProperty("_id"));
    assert(firstBlog.hasOwnProperty("id"));
    
});

test("a blog is correctly added", { only: true }, async () => {
    const newBlog = {
        title: "test blog",
        author: "me",
        url: "empty",
        likes: 1,
        userId: userId,
    };

    const initialBlogs = await testHelper.blogsInDB();


    await api
        .post("/api/blogs")
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201);

    const updatedBlogs = await testHelper.blogsInDB();

    assert.strictEqual(updatedBlogs.length, initialBlogs.length+1);

    // console.log(updatedBlogs);
    
    const newBlogInUpdatedBlogs = updatedBlogs[updatedBlogs.length-1];

    assert.strictEqual(newBlogInUpdatedBlogs.title, newBlog.title);
    assert.strictEqual(newBlogInUpdatedBlogs.author, newBlog.author);
    assert.strictEqual(newBlogInUpdatedBlogs.url, newBlog.url);
    assert.strictEqual(newBlogInUpdatedBlogs.likes, newBlog.likes);

});

test("creating users is handled correctly", {only: true}, async () => {
    const newUserCorrect = {
        username: "testUser",
        name: "test2",
        password: "testing"
    }

    const newUserShortUsername = {
        username: "t",
        name: "test2",
        password: "testing"
    }

    const newUserShortPassword = {
        username: "testUser",
        name: "test2",
        password: "te"
    }

    const newUserShortUsernameAndPassword = {
        username: "tr",
        name: "test2",
        password: "te"
    }

    const newUserExistingUsername = {
        username: testHelper.testingUser.username,
        name: "test2",
        password: "testing"
    }


    await api
            .post("/api/users")
            .send(newUserCorrect)
            .expect(201);
    
    await api
            .post("/api/users")
            .send(newUserShortUsername)
            .expect(400);
    
    await api
            .post("/api/users")
            .send(newUserShortPassword)
            .expect(400);
    
    await api
            .post("/api/users")
            .send(newUserShortUsernameAndPassword)
            .expect(400);

    await api
            .post("/api/users")
            .send(newUserExistingUsername)
            .expect(400);
});

test("handle missing property in request correctly", async () => {
    const newBlogWithoutLikes = {
        title: "test blog",
        author: "me",
        url: "empty",
        userId: userId,
    };

    const newBlogWithoutTitle = {
        author: "me",
        url: "empty",
        likes: 2,
        userId: userId,

    };
    const newBlogWithotUrl = {
        title: "test blog",
        author: "me",
        likes: 2,
        userId: userId,

    };
    const newBlogWithotTitleAndUrl = {
        author: "me",
        likes: 2,
        userId: userId,

    };

    await api
        .post("/api/blogs")
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithoutLikes)
        .expect(201);

    await api
        .post("/api/blogs")
        // .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithoutLikes)
        .expect(401);

    await api
        .post("/api/blogs")
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithoutTitle)
        .expect(400);

    await api
        .post("/api/blogs")
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithotUrl)
        .expect(400);

    await api
        .post("/api/blogs")
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithotTitleAndUrl)
        .expect(400);

    const updatedBlogs = await testHelper.blogsInDB();

    const newBlogInUpdatedBlogs = updatedBlogs[updatedBlogs.length-1];

    // check if likes property is set to 0
    assert.strictEqual(newBlogInUpdatedBlogs.likes, 0);
    
});

describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
        const blogsBefore = await testHelper.blogsInDB();
        const correctBlog = blogsBefore[0];

        await api
            .delete(`/api/blogs/${correctBlog.id}`)
            .expect(204);
        
        const blogsAfter = await testHelper.blogsInDB();

        const ids = blogsAfter.map(blog => blog.id);
        assert(!ids.includes(correctBlog.id));

        assert.strictEqual(testHelper.initialBlogs.length-1, blogsAfter.length);
    });
})

describe("Editing a blog", () => {
    test("succeeds with status code 200 if id is valid", async () => {
        const blogsBefore = await testHelper.blogsInDB();
        const blogBefore = blogsBefore[0];

        await api
            .put(`/api/blogs/${blogBefore.id}`)
            .send({
                likes: 222
            })
            .expect(200);

        const blogsAfter = await testHelper.blogsInDB();
        const updatedBlog = blogsAfter[0];

        assert.strictEqual(updatedBlog.likes, 222);
    });

    test("returns status code 404 if there is no such id", async () => {
        const nonExistingId = await testHelper.nonExistingId();
        
        await api
            .put(`/api/blogs/${nonExistingId}`)
            .send({
                likes: 222
            })
            .expect(404);
    });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})


after( async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
} );
