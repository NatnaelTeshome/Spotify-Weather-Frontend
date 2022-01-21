const merge = require('lodash.merge')
const Auth = require('./Auth')
const User = require('./User')

const resolvers = [Auth, User]

module.exports = merge(...resolvers)
