const { test, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const Blog = require("../models/blog");

const emptyBlogs = [];
const oneBlog = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    }, 
];
const multipleBlogs = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        },
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        }, 
    ]

test("dummy returns one", () => {

    const blogs = [];

    assert.strictEqual(listHelper.dummy(blogs), 1);
})

describe("total likes", () => {
    test("of empty list is zero", () => {
        // const blogs = [];

        assert.strictEqual(listHelper.totalLikes(emptyBlogs), 0);
    }),
    test("when list has only one blog it equeals to likes of this blog", () => {
        // const blogs = [
        //     {
        //         _id: "5a422a851b54a676234d17f7",
        //         title: "React patterns",
        //         author: "Michael Chan",
        //         url: "https://reactpatterns.com/",
        //         likes: 7,
        //         __v: 0
        //     }, 
        // ]

        assert.strictEqual(listHelper.totalLikes(oneBlog), 7);
    }),
    test("of a bigger list is calculated right", () => {
        // const blogs = [
        // {
        //     _id: "5a422a851b54a676234d17f7",
        //     title: "React patterns",
        //     author: "Michael Chan",
        //     url: "https://reactpatterns.com/",
        //     likes: 7,
        //     __v: 0
        // },
        // {
        //     _id: "5a422aa71b54a676234d17f8",
        //     title: "Go To Statement Considered Harmful",
        //     author: "Edsger W. Dijkstra",
        //     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        //     likes: 5,
        //     __v: 0
        // },
        // {
        //     _id: "5a422b3a1b54a676234d17f9",
        //     title: "Canonical string reduction",
        //     author: "Edsger W. Dijkstra",
        //     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        //     likes: 12,
        //     __v: 0
        // },
        // {
        //     _id: "5a422b891b54a676234d17fa",
        //     title: "First class tests",
        //     author: "Robert C. Martin",
        //     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        //     likes: 10,
        //     __v: 0
        // },
        // {
        //     _id: "5a422ba71b54a676234d17fb",
        //     title: "TDD harms architecture",
        //     author: "Robert C. Martin",
        //     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        //     likes: 0,
        //     __v: 0
        // },
        // {
        //     _id: "5a422bc61b54a676234d17fc",
        //     title: "Type wars",
        //     author: "Robert C. Martin",
        //     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        //     likes: 2,
        //     __v: 0
        // }  
        // ]
        assert.strictEqual(listHelper.totalLikes(multipleBlogs), 36);
    })
})

describe("blog with the most likes", () => {
    // test("of emtpy list throws error", () => {
    //     assert.throws(listHelper.favoriteBlog(emptyBlogs), new TypeError());
    // })
    test("of one length list is the element", () => {
        const favorite = {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        } 
        assert.deepStrictEqual(listHelper.favoriteBlog(oneBlog), favorite);
    }),

    test("of multiple elements is correct", () => {
        const favorite = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }
        assert.deepStrictEqual(listHelper.favoriteBlog(multipleBlogs), favorite);

    })
    
})

describe("author with most blogs", ()=> {
    test("of a list with one blog is author of this blog with blogs value 1", () => {
        assert.strictEqual(listHelper.mostBlogs(oneBlog).author, "Michael Chan");
        assert.strictEqual(listHelper.mostBlogs(oneBlog).blogs, 1);
    }),
    test("of list of blogs is correct", () => {
        assert.strictEqual(listHelper.mostBlogs(multipleBlogs).author, "Robert C. Martin");
        assert.strictEqual(listHelper.mostBlogs(multipleBlogs).blogs, 3);
    })
})


describe("author with most likes", ()=> {
    test("of a list with one blog is author of this blog with likes total = likes in the blog", () => {
        assert.strictEqual(listHelper.mostLikes(oneBlog).author, "Michael Chan");
        assert.strictEqual(listHelper.mostLikes(oneBlog).likes, 7);
    }),
    test("of list of blogs is correct", () => {
        assert.strictEqual(listHelper.mostLikes(multipleBlogs).author, "Edsger W. Dijkstra");
        assert.strictEqual(listHelper.mostLikes(multipleBlogs).likes, 17);
    })
})

// console.log(listHelper.mostLikes(multipleBlogs));