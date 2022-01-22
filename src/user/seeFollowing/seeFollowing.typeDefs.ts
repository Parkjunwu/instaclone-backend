import { gql } from "apollo-server-express";

export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
    # last: Int
  }
  type Query {
    seeFollowing(userName: String!, lastId: Int): SeeFollowingResult!
  }
`;