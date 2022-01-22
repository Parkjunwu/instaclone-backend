import { withFilter } from "apollo-server-express";
import { NEW_MESSAGE } from "../../constant";
import pubsub from "../../pubsub";
import client from "../../client";

// const subscribeFn = 

const resolver = {
  Subscription:{
    roomUpdate:{
      subscribe: 
      // ()=>pubsub.asyncIterator(NEW_MESSAGE)
      async (parent, args, context, info) => {
        const room = await client.room.findFirst({
          where:{
            id:args.id,
            users:{
              some:{
                id:context.loggedInUser.id
              }
            }
          },
          select:{
            id:true
          }
        })
        if(!room) {
          throw new Error("Cannot see this.");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          // (payload,variables) => {
          async({roomUpdate},{id},{loggedInUser}) => {
            // return payload.roomUpdate.roomId === variables.id
            const ok = await client.room.findFirst({
              where:{
                id,
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
            if(!ok) return false;
            return roomUpdate.roomId === id
          }
        )(parent, args, context,info)
      }
    }
  }
};

export default resolver;

