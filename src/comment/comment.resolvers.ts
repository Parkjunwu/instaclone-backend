import { Resolver, Resolvers } from "../types"

const isMineFn:Resolver = ({userId},_,{loggedInUser}) => userId===loggedInUser?.id

const resolver:Resolvers = {
  Comment:{
    isMine:isMineFn
  }
}

export default resolver;