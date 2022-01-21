const User = require('../../models/User')
const { UserInputError } = require('apollo-server-express')
const { hashPassword, comparePassword } = require('../../lib/auth')


const updateAccountDetails = async (_, {input: {oldUsername, username, oldPassword, password}}) => {
    try {
        const user = await User.query().findOne({
            username: oldUsername,
          })
        if (!user) {
            throw new UserInputError('Invalid old username')
        }
        const validPassword = await comparePassword(oldPassword, user.password)
        if (!validPassword) {
            throw new UserInputError('Invalid old password')
        }
        const passwordHash = await hashPassword(password)

        const updatedAccount = await User.query().patch({
            username,
            password: passwordHash,
        }).where('username', oldUsername).returning('*')
        return 'The account has been successfully updated.'
    }
    catch (err) {
        throw new Error('Failed to update user account.')
    }
}


const resolver = {
    Mutation: {
        updateAccountDetails,
    }
}

module.exports = resolver;