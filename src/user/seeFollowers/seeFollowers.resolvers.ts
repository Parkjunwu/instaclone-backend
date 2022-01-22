import { Resolver, Resolvers } from "../../types";
// import { protectResolver, userCheckResolver } from "../user.utils";

const seeFollowersFn: Resolver = async (_, { userName, page }, { client }) => {
  const ok = await client.user.findUnique({
    where: { userName },
    select: { id: true },
  });
  console.log(ok);
  if (!ok) {
    return { ok: "false", error: "There are no user" };
  }
  const followers = await client.user
    .findUnique({ where: { userName } })
    .followers({
      skip: 5 * (page - 1),
      take: 5,
      
    });
  // const followersNumber1 = await client.user
  //   .findMany({
  //     where: {
  //       following: {
  //         some: { userName },
  //       },
  //     },
  //   })
  //   .then((res) => Math.ceil(res.length / 5));
  const followersNumber2 = await client.user.count({
    where: {
      following: {
        some: { userName },
      },
    },
  });
  return { ok: true, followers, totalPages: Math.ceil(followersNumber2 / 5) };
};
// const seeFollowersFn: Resolver = (_,{userName,page},{client,loggedInUser}) => {

// }
const resolver: Resolvers = {
  Query: {
    // seeFollowers:protectResolver(userCheckResolver(seeFollowersFn))
    seeFollowers: seeFollowersFn,
  },
};
export default resolver;
