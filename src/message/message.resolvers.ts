import { Resolver, Resolvers } from "../types";

const usersFn:Resolver = async({id},_,{client,loggedInUser}) => client.room.findUnique({where:{id}}).users()
const messagesFn:Resolver = async({id},_,{client,loggedInUser}) => client.message.findMany({where:{roomId:id}})
const unreadTotalFn:Resolver = async({id},_,{client,loggedInUser}) => {
  if(!loggedInUser) return 0
  return client.message.count({
    where:{
      user:{
        id:{
          not:loggedInUser.id
        }
      },
      roomId:id,
      read:false
    }
  })
}

const userFn:Resolver = async({id},_,{client}) => {
  const result = await client.message.findUnique({where:{id}}).user()
  // client.message.findUnique({where:{id},select:{user:true}})
  // console.log(result)
  return result
}


const resolver:Resolvers = {
  Room: {
    users:usersFn,
    messages:messagesFn,
    unreadTotal:unreadTotalFn,
  },
  Message: {
    user:userFn
  }
}

export default resolver