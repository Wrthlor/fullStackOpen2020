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

    const listOfAuthors = blogs.map(blog => blog.author);
    const blogCountByAuthor = listOfAuthors.reduce((acc, cur) => {
        acc[cur] ? acc[cur]++ : (acc[cur] = 1);
        return acc
    }, {});
    
    const authors = Object.keys(blogCountByAuthor);
    const authorCount = Object.values(blogCountByAuthor);
    
    const maxCount = Math.max(...authorCount);
    const index = authorCount.findIndex(value => value === maxCount);

    const mostAmntBlogs = {
        author: authors[index],
        blogs: maxCount
    }

    return mostAmntBlogs;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,

}