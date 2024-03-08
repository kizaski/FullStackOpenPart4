const blogsRouter = require( 'express' ).Router()
const Blog = require( '../models/blog' )
const middleware = require('../utils/middleware')

blogsRouter.get( '/', async ( request, response ) =>
{
    let blogs = await Blog.find( {} ).populate( 'user', { username: 1, name: 1 } )
    response.status( 200 ).json( blogs )
} )

blogsRouter.post( '/', middleware.userExtractor, async ( request, response ) =>
{
    const body = request.body

    const user = request.user

    const blog = new Blog( {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    } )

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
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        await savedBlog.populate('user')

        response.status( 201 ).json( savedBlog.toJSON() )
    }
} )

blogsRouter.get( '/:id', async ( request, response ) =>
{
    const blog = await Blog.findById( request.params.id )
    response.status( 200 ).json( blog.toJSON() )
} )

blogsRouter.delete( '/:id', middleware.userExtractor, async ( request, response ) =>
{    
    const blogToDelete = await Blog.findById( request.params.id )
    if (!blogToDelete || !blogToDelete.user) {
        return response.status(400).json({ error: 'no blog found with the given id.' })
    }

    const user = request.user

    if (blogToDelete.user._id.toString() === user.id) {
        await blogToDelete.deleteOne()
        response.status( 204 ).end()
    } else {
        response.status( 401 ).end()
    }
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