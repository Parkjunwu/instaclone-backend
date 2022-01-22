import { Resolver, Resolvers } from "../../types";
import { protectResolver } from "../user.utils";

const resolver:Resolvers = {
  Query :{
    me:(_, __, {loggedInUser}) => {
      if (!loggedInUser) {
        return null
      }
      return loggedInUser
    }
  }
};

export default resolver;