import { Resolver, Resolvers } from "../../types";
import { protectResolver } from "../../user/user.utils";

const seeRoomFn:Resolver = async(_,{id,page},{client,loggedInUser}) => {
  const result = await client.room.findFirst({
    where:{
      id,
      users:{
        some:{
          id:loggedInUser.id
        }
      }
    },
    // include:{
    //   messages:
    //   {
    //     include:{
    //       user:true,
    //     }
    //   }
    // }
  })
  // console.log(JSON.stringify(result))
  return result;
}
// client.user.findUnique({
//   where:{
//     id:loggedInUser.id
//   },
//   select:{
//     rooms:{
//       where:{
//         id
//       },
//       include:{
//         messages:{
//           include:{
//             user:{
//               select:{
//                 userName:true
//               }
//             }
//           },
//           select:{
//             payload:true,
//             createdAt:true
//           }
//         }
//       }
//     }
//   }
// })

const resolver:Resolvers = {
  Query: {
    seeRoom:protectResolver(seeRoomFn)
  }
};
export default resolver;