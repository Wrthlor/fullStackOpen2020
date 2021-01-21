const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
    
    if (blogs.length !== 0) {    
        let sum = 0;
        blogs.map(blog => sum += blog.likes);
        
        return sum;
    }
    else {
        return 0;
    }
}

module.exports = {
    dummy,
    totalLikes,
}