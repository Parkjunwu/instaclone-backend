import { Resolver, Resolvers } from "../../types";
import { protectResolver } from "../../user/user.utils";

const readMessageFn: Resolver = async(_,{id},{client,loggedInUser}) =>{ 
  const message = await client.message.findFirst({
    where:{
      id,
      userId:{
        not:loggedInUser.id
      },
      room:{
        users:{
          some:{
            id:loggedInUser.id
          }
        }
      }
    },
    select:{
      id:true
    }
  })
  if(!message) return {ok:false, error:"Message not found"}
  await client.message.update({
    where:{
      id
    },
    data:{
      read:true
    }
  })
  return {ok:true}
}
// client.message.updateMany({
//   where:{
//     roomId:id,
//     userId:{
//       not:loggedInUser.id
//     },
//     read:false
//   },
//   data:{
//     read:true
//   }
// })

const resolver:Resolvers = {
  Mutation: {
    readMessage:protectResolver(readMessageFn)
  }
}
export default resolver;