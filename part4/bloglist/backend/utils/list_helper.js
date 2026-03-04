const _ = require('lodash/collection');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blogpost) => blogpost.likes + sum, 0);
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((mostLiked, blogpost) => {
        if (mostLiked.likes < blogpost.likes){
            return blogpost;
        } else {
            return mostLiked;
        }
    });
}

const mostBlogs = (blogs) => {
    const counted = _.countBy(blogs, 'author');
    const sorted = _.sortBy(Object.entries(counted), ([author, blogCount]) => blogCount);

    const personWithMostBlogs = sorted.at(-1);

    if (personWithMostBlogs)    
        return {
            'author': personWithMostBlogs[0],
            'blogs': personWithMostBlogs[1]
        }
}

const mostLikes = (blogs) => {
    const likesCount = _.reduce(blogs, (result, blog) => {
        if (!result[blog.author])
            result[blog.author] = 0;
        
        result[blog.author] += blog.likes;
        return result;
    }, {});

    const sorted = _.sortBy(Object.entries(likesCount), ([author, likesCount]) => likesCount);

    const personWithMostLikes = sorted.at(-1);

    if (personWithMostLikes)    
        return {
            'author': personWithMostLikes[0],
            'likes': personWithMostLikes[1]
        }
    
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,

}