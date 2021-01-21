const dummy = () => 1;

const totalLikes = (blogs) => {
    const total = blogs.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.likes;
    }, 0);

    return total;   
}

module.exports = {
    dummy,
    totalLikes,
}