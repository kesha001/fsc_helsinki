const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user');
const jwt = require('jsonwebtoken');


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {username: 1, name: 1});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {  

  const blogBody = request.body;

  // const decodedToken = jwt.verify(request.token, process.env.SECRET);

  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  // const user = await User.findById(decodedToken.id);
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if (!blogBody.title || !blogBody.url){
    response.status(400).end();
    return;
  }

  const blog = new Blog({
    title: blogBody.title,
    author: blogBody.author,
    url: blogBody.url,
    likes: blogBody.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const {likes} = request.body;
  
  const foundBlog = await Blog.findById(request.params.id);

  if (!foundBlog){
    response.status(404).end();
    return;
  }

  foundBlog.likes = likes;

  const updatedBlog = await foundBlog.save();

  response.json(updatedBlog);

});

blogsRouter.delete('/:id', async (request, response) => {
  const idToDelete = request.params.id;


  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }

  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);


  const blog = await Blog.findById(idToDelete);

  if ( blog.user.toString() !== decodedToken.id.toString() ){
    return response.status(401).json({ error: 'user can only delete own blogs' });
  } 

  await Blog.findByIdAndDelete(idToDelete);

  response.status(204).end();
});

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }



module.exports = blogsRouter