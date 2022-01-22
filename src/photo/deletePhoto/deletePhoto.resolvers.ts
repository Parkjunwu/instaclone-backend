import { Resolver, Resolvers } from "../../types";
import { protectResolver } from "../../user/user.utils";

const deletePhotoFn:Resolver = async(_,{id},{loggedInUser,client}) => {
  const photo = await client.photo.findUnique({where:{id},select:{userId:true}})
  if(!photo) {
    return { ok:false, error:"photo not found"}
  } else if (photo.userId !== loggedInUser.id) {
    return { ok:false, error:"Not authorized"}
  }
  await client.photo.delete({where:{id}})
  return {ok:true}
}

const resolver:Resolvers = {
  Mutation: {
    deletePhoto:protectResolver(deletePhotoFn)
  }
}
export default resolver