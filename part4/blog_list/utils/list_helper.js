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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}