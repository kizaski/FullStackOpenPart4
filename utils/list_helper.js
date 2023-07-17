const totalLikes = ( blogs ) =>
{
    return blogs.reduce((total, current) => total + current.likes, 0)
}

module.exports = {
    totalLikes
}   