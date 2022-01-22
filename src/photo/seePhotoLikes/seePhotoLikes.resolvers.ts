import { Resolver, Resolvers } from "../../types";

const seePhotoLikesFn:Resolver = async(_,{id},{client}) => {
  // const a = await client.user.findMany({where:{likes:{some:{photoId:id}}}})
  const b = await client.like.findMany({where:{photoId:id},select:{user:true}})
  // const c = await client.photo.findUnique({where:{id}}).likes({select:{user:true}})
  // const d = (await client.photo.findUnique({where:{id},select:{likes:{select:{user:true}}}})).likes
  // console.log(a)
  // console.log(b)
  // console.log(c)
  // const obj = b.map(obj=>obj.user)
  // console.log(obj)
  return b.map(obj=>obj.user)
}
const resolver:Resolvers = {
  Query:{
    seePhotoLikes:seePhotoLikesFn
  }
}
export default resolver