import {helloResolver} from './resolvers/hello';

export const resolvers = {
    Query: {
        ...helloResolver
    },

    Mutation: {
    },
};
