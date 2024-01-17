const lo = require( 'lodash' )

const totalLikes = ( blogs ) =>
{
    return blogs.reduce( ( total, current ) => total + current.likes, 0 )
}

const favoriteBlog = ( blogs ) =>
{
    if ( blogs.length === 0 ) return "No blogs available"

    return blogs.reduce( ( maxLikesBlog, currentBlog ) =>
    ( currentBlog.likes > maxLikesBlog.likes
        ? currentBlog
        : maxLikesBlog )
    )
}

const mostBlogs = ( blogs ) =>
{
    if ( blogs.length === 0 )
    {
        return "No blogs available"
    }

    const groupedByAuthor = lo.groupBy( blogs, 'author' )

    const authorWithMostBlogs = lo.maxBy( Object.keys( groupedByAuthor ), author => groupedByAuthor[ author ].length )

    return {
        author: authorWithMostBlogs,
        blogs: groupedByAuthor[ authorWithMostBlogs ].length
    }
}

const mostLikes = ( blogs ) =>
{
    if ( blogs.length === 0 )
    {
        return "No blogs available"
    }

    const groupedByAuthor = lo.groupBy( blogs, 'author' )

    const authorWithMostLikes = lo.maxBy( Object.keys( groupedByAuthor ), author => groupedByAuthor[ author ], 'likes' )

    const mostLikesAmount = lo.sumBy( groupedByAuthor[ authorWithMostLikes ], 'likes' )

    return {
        author: authorWithMostLikes,
        likes: mostLikesAmount
    }
}


module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}   