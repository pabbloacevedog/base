
const findUser = async (authToken) => {
    // Find a user by their auth token
    console.log('findUser', authToken)
    return { id: 1, name: 'Test User' };
};
const tokenIsNotValid = (connectionParams) => {
    // Check if the token is valid
    console.log('tokenIsNotValid', connectionParams)
    return false;
};
const getDynamicContext = async (ctx, msg, args) => {
    // ctx is the graphql-ws Context where connectionParams live
    // console.log('getDynamicContext', ctx.connectionParams)
    // if (ctx.connectionParams.authentication) {
    //     const currentUser = await findUser(ctx.connectionParams.authentication);
    //     return { currentUser };
    // }
    // Otherwise let our resolvers know we don't have a current user
    return { currentUser: true };
};
// Set up ApolloServer.
module.exports = { getDynamicContext, tokenIsNotValid };