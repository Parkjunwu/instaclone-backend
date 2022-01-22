import { Resolver, Resolvers } from "../../types";

const seePhotoFn:Resolver = (_,{id},{client,}) => client.photo.findUnique({where:{id}})


const resolver:Resolvers = {
  Query: {
    seePhoto:seePhotoFn
  }
}

export default resolver