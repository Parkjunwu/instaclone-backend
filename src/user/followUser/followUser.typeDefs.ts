import { gql } from "apollo-server-express";

const resolver = gql`
  type Mutation {
    followUser(
      userName: String
    ): MutationResponse!
  }
`;
export default resolver;
