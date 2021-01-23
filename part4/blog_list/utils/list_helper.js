const { propertyOf } = require('lodash');
const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => {
    if (!blogs) {
        return null;
    }

    const total = blogs.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.likes;
    }, 0);

    return total;   
}

const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length === 0 ) {
        return null;
    }

    const maxLikes = blogs.reduce((accumulator, currentValue) => {
        return currentValue.likes > accumulator.likes
            ? currentValue
            : accumulator
    })    

    const favBlog = {
        title: maxLikes.title,
        author: maxLikes.author,
        likes: maxLikes.likes
    }
    
    return favBlog;
}

const mostBlogs = (blogs) => {
    if (!blogs || blogs.length === 0 ) {
        return null;
    }

    const groupedByAuthor = _.reduce(blogs, (result, blog) => {
        (result[blog.author] || (result[blog.author] = [])).push(blog);
        return result;
    }, {});

    const authors = _.keys(groupedByAuthor);
    const blogCount = _.values(groupedByAuthor).map(element => element.length);
    const maxBlog = Math.max(...blogCount);
    const maxIndex = blogCount.findIndex(value => value === maxBlog);
    
    const mostAmntBlogs = {
        author: authors[maxIndex],
        blogs: maxBlog
    }
    
    return mostAmntBlogs;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,

}
