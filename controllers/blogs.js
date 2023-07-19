const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get( '/', async ( request, response ) =>
{
    let blogs = await Blog.find( {} )
    response.status( 200 ).json( blogs )
} )

blogsRouter.post( '/', async ( request, response ) =>
{
    const blog = new Blog( request.body )

    let result = await blog.save()
    response.status( 201 ).json( result )
} )

module.exports = blogsRouter