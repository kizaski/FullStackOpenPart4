const mongoose = require( 'mongoose' )
const supertest = require( 'supertest' )
const app = require( '../app' )
const Blog = require( '../models/blog' )
const helper = require( './test_helper' )

const api = supertest( app )

beforeEach( async () =>
{
  await Blog.deleteMany( {} )

  for ( let blog of helper.initialBlogs )
  {
    let blogObject = new Blog( blog )
    await blogObject.save()
  }
} )



// describe('when there is initially some notes saved', () => {  } )




test( 'blogs are returned as json', async () =>
{
  await api
    .get( '/api/blogs' )
    .expect( 200 )
    .expect( 'Content-Type', /application\/json/ )
} )

test( 'correct amount of blogs is returned', async () =>
{
  const response = await api.get( '/api/blogs' )
  expect( response.body ).toHaveLength( helper.initialBlogs.length )
} )

test( 'identifying field named id', async () =>
{
  const response = await api.get( '/api/blogs' )
  expect( response.body[ 0 ].id ).toBeDefined()
} )

test( 'a valid blog can be added ', async () =>
{
  const initialResponse = await api.get( '/api/blogs' )

  const newBlog = {
    title: "Title",
    author: "author",
    url: "https://www.example.com/",
    likes: 1
  }

  await api
    .post( '/api/blogs' )
    .send( newBlog )

  const response = await api.get( '/api/blogs' )
  expect( response.body ).toHaveLength( initialResponse.body.length + 1 )
  expect( response.body[ response.body.length - 1 ].title ).toBeDefined()
  expect( response.body[ response.body.length - 1 ].url ).toBeDefined()
} )

test( 'likes default to 0', async () =>
{
  const newBlog = {
    title: "Title",
    author: "author",
    url: "https://www.example.com/"
  }

  await api
    .post( '/api/blogs' )
    .send( newBlog )

  const response = await api.get( '/api/blogs' )
  expect( response.body[ response.body.length - 1 ] ).toHaveProperty( 'title', newBlog.title )
  expect( response.body[ response.body.length - 1 ] ).toHaveProperty( 'likes', 0 )
} )

test( '400 Bad Request on missing data', async () =>
{
  const newBlog = {
    random: 'object',
    that: 'doesnt have the right properties'
  }

  await api
    .post( '/api/blogs' )
    .send( newBlog )
    .expect( 400 )
} )


test( 'a blog can be deleted', async () =>
{
  const initialResponse = await api.get( '/api/blogs' )

  const newBlog = {
    title: "Title",
    author: "author",
    url: "https://www.example.com/",
    likes: 1
  }

  let newBlogResponse = await api
    .post( '/api/blogs' )
    .send( newBlog )

  const deleteBlog = await api
    .delete( `/api/blogs/${ newBlogResponse.body.id }` )

  expect( deleteBlog.status ).toBe( 204 )
} )


afterAll( async () =>
{
  await mongoose.connection.close()
} )