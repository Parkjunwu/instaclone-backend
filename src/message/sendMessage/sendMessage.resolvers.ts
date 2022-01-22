import { NEW_MESSAGE } from "../../constant";
import pubsub from "../../pubsub";
import { Context, Resolver, Resolvers } from "../../types";
import { protectResolver } from "../../user/user.utils";

// type argType = {
//   payload:string;
//   userId:number;
//   roomId:number;
// }
// type sendMessageResolver = (root: any, args: argType, context: Context, info: any) => any

const sendMessageFn: Resolver = async(_,{payload,userId,roomId},{client,loggedInUser}) => {
  let room = null;
  if(!userId && !roomId) return {ok:false, error:"There is nothing."}
  if(userId === loggedInUser.id) return {ok:false, error:"Cannot create room"}
  if(userId){
    const user = await client.user.findUnique({where:{id:userId},select:{id:true}});
    if(!user) return {ok:false, error:"There is no user."};
    room = await client.room.create({
      data:{
        users:{
          connect:[
            {
              id:userId 
            },
            {
              id:loggedInUser.id
            }
          ]
        }
      }
    });
  } else if (roomId) {
    // room = await client.user.findUnique({
    //   where:{
    //     id:loggedInUser.id
    //   },
    //   select:{
    //     rooms:{
    //       where:{
    //         users:{
    //           some:{
    //             id:loggedInUser.id
    //           }
    //         }
    //       },
    //       select:{
    //         id:true
    //       }
    //     }
    //   }
    // });
    room = await client.room.findFirst({
      where:{
        id:roomId,
        users:{
          some:{
            id:loggedInUser.id
          }
        }
      },
      select:{
        id:true
      }
    })
    if(!room) return {ok:false, error:"Room not found"};
  }
  const messagenotbug = await client.message.create({
    data:{
      room:{
        connect:{
          id:room.id
        }
      },
      user:{
        connect:{
          id:loggedInUser.id
        }
      },
      payload
    }
  });
  pubsub.publish(NEW_MESSAGE,{roomUpdate:{...messagenotbug}})
  return {ok:true,id:messagenotbug.id};
  // client.message.create({
  //   data:{
  //     room:{
  //       connectOrCreate:{
  //         where:{id:isRoom},
  //         create:{
  //           users:{
  //             connect:[
  //               {
  //                 id:userId 
  //               },
  //               {
  //                 id:loggedInUser.id
  //               }
  //             ]
  //           }
  //         }
  //       }
  //     },
  //     user:{
  //       connect:{
  //         id:userId
  //       }
  //     },
  //     payload
  //   }
  // })
};

const resolver: Resolvers = {
  Mutation :{
    sendMessage:protectResolver(sendMessageFn)
  }
};

export default resolver;

// import { protectResolver } from "../../user/user.utils";

// export default {
//   Mutation: {
//     sendMessage: protectResolver(
//       async (_, { payload, roomId, userId }, { loggedInUser,client }) => {
//         let room = null;
//         if (userId) {
//           const user = await client.user.findUnique({
//             where: {
//               id: userId,
//             },
//             select: {
//               id: true,
//             },
//           });
//           if (!user) {
//             return {
//               ok: false,
//               error: "This user does not exist.",
//             };
//           }
//           room = await client.room.create({
//             data: {
//               users: {
//                 connect: [
//                   {
//                     id: userId,
//                   },
//                   {
//                     id: loggedInUser,
//                   },
//                 ],
//               },
//             },
//           });
//         } else if (roomId) {
//           room = await client.room.findUnique({
//             where: {
//               id: roomId,
//             },
//             select: {
//               id: true,
//             },
//           });
//           if (!room) {
//             return {
//               ok: false,
//               error: "Room not found.",
//             };
//           }
//         }
//         await client.message.create({
//           data: {
//             payload,
//             room: {
//               connect: {
//                 id: room.id,
//               },
//             },
//             user: {
//               connect: {
//                 id: loggedInUser.id,
//               },
//             },
//           },
//         });
//         return {
//           ok: true,
//         };
//       }
//     ),
//   },
// };