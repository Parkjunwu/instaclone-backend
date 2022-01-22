import { Resolver, Resolvers } from "../../types";

const seeHashTagFn: Resolver = (_,{hashTag},{client}) => client.hashTag.findUnique({where:{hashTag}})

const resolver: Resolvers = {
  Query:{
    seeHashTag:seeHashTagFn
  }
}
export default resolver