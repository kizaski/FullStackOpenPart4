const blogsRouter = require( 'express' ).Router()
const Blog = require( '../models/blog' )

blogsRouter.get( '/', async ( request, response ) =>
{
    let blogs = await Blog.find( {} )
    response.status( 200 ).json( blogs )
} )

blogsRouter.post( '/', async ( request, response ) =>
{
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

module.exports = blogsRouter