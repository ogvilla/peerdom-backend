import {gql} from 'apollo-server-express';

export const Map = gql`
  type Map {
    map: GraphQLJSON
  }
`;
