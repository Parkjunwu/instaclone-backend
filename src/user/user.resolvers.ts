import { Resolvers } from "../types";

const resolver: Resolvers = {
  User: {
    totalFollowing: async ({ id }, _, { client }) =>
      client.user.count({
        where: {
          followers: {
            some: { id },
          },
        },
      }),
    totalFollowers: ({ id }, _, { client }) =>
      client.user.count({
        where: {
          following: {
            some: { id },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => id === loggedInUser?.id,
    //애매해
    isFollowing: async ({ id }, _, { client, loggedInUser }) => {
      if (!loggedInUser) return false;
      
      // const a = await client.user
      //   .findUnique({
      //     where: {
      //       id: loggedInUser.id,
      //     },
      //   })
      //   .following({
      //     where: { id },
      //   });
      const exist = await client.user.count({
        where: {
          id: loggedInUser.id,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exist);
    },
    //팔로잉에 내가 있냐 팔로우에 상대방이 있냐 혹은 그냥 찾는 방법 있나
    photos: ({id},{page},{client,loggedInUser}) => client.user.findUnique({where:{id}}).photos(
    //   {
    //   take:10,
    //   skip:10*(page-1)
    // }
    )
  },
};
export default resolver;
