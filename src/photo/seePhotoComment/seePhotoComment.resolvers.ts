import { Resolver, Resolvers } from "../../types"

const seePhotoCommentFn:Resolver = (_,{id},{client}) => 
  client.comment.findMany({
    where:{
      photoId: id,
    },
    orderBy:{
      createdAt: "asc",
    }
  })

// client.photo.findUnique({where:{id},select:{comments:true}}).comments()

const resolver:Resolvers = {
  Query:{
    seePhotoComment:seePhotoCommentFn
  }
}
export default resolver;