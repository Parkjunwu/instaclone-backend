import { Resolver, Resolvers } from "../../types";
import { protectResolver } from "../../user/user.utils";

const createCommentFn:Resolver = async(_,{photoId,payload},{client,loggedInUser}) => {
  if(!payload) return {ok:false,error:"Please write your comment"}
  const ok = await client.photo.findUnique({where:{id:photoId},select:{id:true}})
  if(!ok) return {ok:false,error:"No photo on there"}
  const newComment = await client.comment.create({data:{
    payload,
    user:{
      connect:{
        id:loggedInUser.id
      }
    },
    photo:{
      connect:{
        id:photoId
      }
    }
  }})
  return {ok:true,id:newComment.id}
}
const resolver:Resolvers = {
  Mutation:{
    createComment:protectResolver(createCommentFn)
  }
}

export default resolver