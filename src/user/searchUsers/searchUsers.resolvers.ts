import { Resolver, Resolvers } from "../../types";

const searchUsersFn: Resolver = async (_, { keyword, last }, { client }) => {
  const take = 3;
  const users = await client.user.findMany({
    where: {
      userName: {
        startsWith: keyword.toLowerCase(),
      },
    },
    // select: {
    //   avatar: false,
    // },
    take,
    // skip: take * (page - 1),
    ...(last && { skip: 1 }),
    ...(last && { cursor: { id: last } }),
  });
  last = users[take - 1].id;
  // page += 1;
  console.log(users);
  console.log(last);
  // console.log(page);
  return { users, last };
  // return { users, page };
};
const resolver: Resolvers = {
  Query: {
    searchUsers: searchUsersFn,
  },
};
export default resolver;
