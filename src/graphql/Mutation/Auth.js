const { UserInputError } = require('apollo-server-express')
const User = require('../../models/User')
const { hashPassword, comparePassword, createToken } = require('../../lib/auth')


const login = async (_, { input: { email, password } }) => {
  const user = await User.query().findOne({
    email,
  })
  if (!user) {
    throw new UserInputError('Invalid email or password')
  }
  const validPassword = await comparePassword(password, user.password)
  if (!validPassword) {
    throw new UserInputError('Invalid email or password')
  }
  // If successful login, set authentication information
  const payload = {
    id: user.id,
  }
  const token = createToken(payload)
  return { user, token }
}
const register = async (_, { input: { email, password, confirmPassword, username, location } }) => {
  const emailExists = await User.query().findOne({ email })
  if (emailExists) {
    throw new UserInputError('Email is already in use!')
  }

  const usernameExists = await User.query().findOne({ username })
  if (usernameExists) {
    throw new UserInputError('Username is already in use!')
  }
  
  if (password !== confirmPassword) {
    throw new UserInputError("The passwords don't match.")
  } 

  const passwordHash = await hashPassword(password)
  const user = await User.query().insertAndFetch({
    email,
    password: passwordHash,
    username,
    location
  })
  // If successful registration, set authentication information
  const payload = {
    id: user.id,
  }
  const token = createToken(payload)
  return {
    user,
    token
  }
}
const resolver = {
  Mutation: { 
    login, 
    register
   },
}
module.exports = resolver
