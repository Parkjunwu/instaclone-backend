import { Resolver, Resolvers } from "../../types";
import { userCheckResolver } from "../user.utils";

const seeFollowingFn: Resolver = async (
  _,
  { userName, lastId },
  { client, loggedInUser }
) => {
  const following = await client.user
    .findUnique({ where: { userName } })
    .following({
      take: 5,
      ...(lastId && { skip: 1 }),
      ...(lastId && { cursor: { id: lastId } }),
    });
  console.log(following);
  return { ok: true, following };
};

const resolver: Resolvers = {
  Query: {
    seeFollowing: userCheckResolver(seeFollowingFn, "No User!"),
  },
};
export default resolver;
