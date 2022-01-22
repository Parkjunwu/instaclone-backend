import { Resolver, Resolvers } from "../../types";
import { protectResolver } from "../../user/user.utils";

const toggleLikeFn:Resolver = async(_,{id},{client,loggedInUser}) => {
  const photo = await client.photo.findUnique({
    where:{id},
  })
  if(!photo) return {ok:false,error:"photo not found"}
  const likeWhere = {
    photoId_userId:{
      photoId:id,
      userId:loggedInUser.id
    }
  }
  const like = await client.like.findUnique({
    where:likeWhere
  })
  if(like) {
    await client.like.delete({where:likeWhere})
  } else {
    await client.like.create({data:{
      userId:loggedInUser.id,photoId:id
      // user:{
      //   connect:{
      //     id:loggedInUser.id
      //   }
      // },
      // photo:{
      //   connect:{
      //     id
      //     // id:photo.id
      //   }
      // }
    }})
  }
  return {ok:true}
}

const resolver:Resolvers = {
  Mutation:{
    toggleLike:protectResolver(toggleLikeFn)
  }
}
export default resolver