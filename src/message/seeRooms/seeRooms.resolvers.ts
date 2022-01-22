import { Resolver, Resolvers } from "../../types";
import { protectResolver } from "../../user/user.utils";

const seeRoomsFn: Resolver = (_,__,{client,loggedInUser}) => client.room.findMany({where:{users:{some:{id:loggedInUser.id}}}})

// client.user.findUnique({where:{id:loggedInUser.id},select:{rooms:true}})

// client.user.findFirst({
//   where:{
//     id:loggedInUser.id,
//     rooms:{
//       some:{
//         id
//       }
//     }
//   },
//   select:{
//     rooms:{
//       where:{
//         id
//       }
//     }
//   }
// })

const resolver: Resolvers = {
  Query:{
    seeRooms:protectResolver(seeRoomsFn)
  }
}
export default resolver