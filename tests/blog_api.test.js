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

afterAll( async () =>
{
  await mongoose.connection.close()
} )