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

const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0 ) {
        return null;
    }

    // Hash table: key = Author , bucket = each blog by author
    const authorHash = blogs.reduce((result, blog) => {
        (result[blog.author] || (result[blog.author] = [])).push(blog);
        return result;
    }, {});

    const authors = Object.keys(authorHash);
    const groupedBlogs = Object.values(authorHash);

    // Array of blog likes (grouped by author - unlabeled)
    const likesPerBlog = groupedBlogs.map(author => author.map(blog => blog.likes));
    // Array of summed blog likes (grouped by author - unlabeled)
    const totalLikes = likesPerBlog.map(author => author.reduce((a,b) => a + b, 0));

    // Determine highest blog like count and corresponding index
    const maxLikes = Math.max(...totalLikes);
    const index = totalLikes.findIndex(numLikes => numLikes === maxLikes);

    const mostLikedAuthor = {
        author: authors[index],
        likes: maxLikes
    }

    return mostLikedAuthor;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
