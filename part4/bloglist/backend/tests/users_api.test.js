// const {test, after, beforeEach, describe} = require("node:test");
// const supertest = require("supertest");
// console.log("before app import")
// const app = require("../app");
// const mongoose = require("mongoose");

// console.log("after app import")

// const assert = require("node:assert");
// const bcrypt = require('bcrypt')
// const User = require('../models/user')
// const helper = require('./test_helper');



// describe('when there is initially one user in db', () => {
//   beforeEach(async () => {
//     console.log(await User.find({})); // to delete. testing why timeout
//     // okay now the problem is that app = requrier(app) makes it freeze, I did have before 
//     // same problem, dont remember why , or no, I dont understand where it frezes
//     // so if not import app then it will timout
//     // if import then freeze
//     // i believe  it is because i have different app importing
//     // like one with 
//     // may be its because it is in separate files and I actually need to put evertyhgin in one
//     // add it to blog api test but rename it to test api
//     await User.deleteMany({})

//     const passwordHash = await bcrypt.hash('sekret', 10)
//     const user = new User({ username: 'root', passwordHash })

//     await user.save()
//   })

//   test('creation succeeds with a fresh username', async () => {
//     const usersAtStart = await helper.usersInDb()

//     const newUser = {
//       username: 'mluukkai',
//       name: 'Matti Luukkainen',
//       password: 'salainen',
//     }

//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)

//     const usersAtEnd = await helper.usersInDb()
//     assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

//     const usernames = usersAtEnd.map(u => u.username)
//     assert(usernames.includes(newUser.username))
//   })
// })