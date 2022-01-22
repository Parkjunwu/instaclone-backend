import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id:Int!
    user:User!
    hashTags:[HashTag]
    file:String!
    caption:String
    createdAt: String!
    updatedAt: String!
    likes:Int!
    comments:[Comment]
    commentNumber:Int!
    isMine:Boolean!
    isLiked:Boolean!
  }
  type hashTagPhotosResult {
    photos:[Photo]
    page:Int
    cursorId:Int
  }
  type HashTag {
    id:Int!
    # photos:[Photo]
    photos(
      page:Int
      cursorId:Int
    ):hashTagPhotosResult
    hashTag:String!
    createdAt: String!
    updatedAt: String!
    totalPhotos:Int
  }
  type like {
    id:Int!
    photo:Photo!
    createdAt: String!
    updatedAt: String!
  }
`