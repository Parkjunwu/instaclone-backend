import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seePhotoComment(id:Int!):[Comment]
  }
`