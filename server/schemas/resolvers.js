const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                console.log(userData)
                return userData;
                
            }

            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, newUserData) => {
            const user = await User.create(newUserData);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async(parent, book, context) => {
            if (context.user) {

                console.log(context.user)
                const userData = await User.findByIdAndUpdate(
                    context.user._id,
                    { $addToSet: { savedBooks: { ...book } } },
                    {new: true, runValidators: true}
                )

                return userData;
            }

            throw new AuthenticationError('You need to be logged in!')
        },
        removeBook: async (parent, book, context) => {
            if (context.user) {
                const userData = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: {bookId: book.bookId} } },
                    { new: true }
                )
                
                return userData;
            }

            throw new AuthenticationError('You need to be logged in!')
        }
    }

}

module.exports = resolvers;