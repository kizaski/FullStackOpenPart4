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


module.exports = {
    totalLikes,
    favoriteBlog
}   