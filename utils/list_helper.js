const _ = require('lodash')

const totalLikes = ( blogs ) =>
{
    return blogs.reduce((total, current) => total + current.likes, 0)
}

const favoriteBlog = (blogs) =>
{
  if ( blogs.length === 0 ) return "No blogs available"

  return blogs.reduce( ( maxLikesBlog, currentBlog ) =>
    (currentBlog.likes > maxLikesBlog.likes 
        ? currentBlog
        : maxLikesBlog)
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return "No blogs available"
  }

  const groupedByAuthor = _.groupBy(blogs, 'author')

  const authorWithMostBlogs = _.maxBy(Object.keys(groupedByAuthor), author => groupedByAuthor[author].length)

  return {
    author: authorWithMostBlogs,
    blogs: groupedByAuthor[authorWithMostBlogs].length
  }
}


module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs
}   