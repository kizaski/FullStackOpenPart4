const blogsRouter = require( 'express' ).Router()
const Blog = require( '../models/blog' )
const User = require( '../models/user' )

const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get( '/', async ( request, response ) =>
{
    let blogs = await Blog.find( {} ).populate( 'user', { username: 1, name: 1 } )
    response.status( 200 ).json( blogs )
} )

blogsRouter.post( '/', async ( request, response ) =>
{
    // const user = await User.findById(request.body.userId)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog( request.body )

    if ( !blog.likes )
    {
        blog.likes = 0
    }

    if ( typeof blog.title === 'undefined' || blog.title === null ||
        typeof blog.url === 'undefined' || blog.url === null )
    {
        response.status( 400 ).end()
    } else
    {
        const result = await blog.save()
        response.status( 201 ).json( result.toJSON() )
    }
} )

blogsRouter.get( '/:id', async ( request, response ) =>
{
    const blog = await Blog.findById( request.params.id )
    response.status( 200 ).json( blog.toJSON() )
} )

blogsRouter.delete( '/:id', async ( request, response ) =>
{
    await Blog.findById( request.params.id )
    await Blog.findByIdAndRemove( request.params.id )
    response.status( 204 ).end()
} )

blogsRouter.put( '/:id', async ( request, response ) =>
{
    const blog = {
        likes: request.body.likes
    }
    const result = await Blog.findByIdAndUpdate( request.params.id, blog, { new: true } )
    response.status( 200 ).json( result.toJSON() )
} )

module.exports = blogsRouter