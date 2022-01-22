import { Resolver, Resolvers } from "../../types";
import { protectResolver } from "../../user/user.utils";

const seeFeedFn:Resolver = (_,{offset},{client,loggedInUser}) => client.photo.findMany({
  where:{
    OR:[
      {
        user:{
          followers:{
            some:{
              id:loggedInUser.id
            }
          }
        }
      },
      {
        userId:loggedInUser.id
      }
    ]
  },
  orderBy:{
    createdAt:"desc"
  },
  take:2,
  skip:offset,
  // 2*(offset-1)
})


const resolver:Resolvers = {
  Query:{
    seeFeed:protectResolver(seeFeedFn)
  }
}
export default resolver