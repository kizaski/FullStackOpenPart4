const bcrypt = require( 'bcrypt' )
const usersRouter = require( 'express' ).Router()
const User = require( '../models/user' )

usersRouter.get( '/', async ( request, response ) =>
{
  let users = await User
    .find( {} )
    .populate( {
      path: 'blogs',
    }
    )

  response.status( 200 ).json( users )
} )

usersRouter.post( '/', async ( request, response ) =>
{
  const { username, name, password } = request.body

  if ( password.length < 3 )
  {
    return response.status( 400 ).json( { error: 'Password must be at least 3 characters long.' } )
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash( password, saltRounds )

  const user = new User( {
    username,
    name,
    passwordHash,
  } )

  const savedUser = await user.save()

  response.status( 201 ).json( savedUser )
} )

module.exports = usersRouter