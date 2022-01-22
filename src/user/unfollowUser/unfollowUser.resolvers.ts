import { Resolver, Resolvers } from "../../types";
import { protectResolver } from "../user.utils";

const unfollowUserFn: Resolver = async (
  _,
  { userName },
  { loggedInUser, client }
) => {
  const ok = await client.user.findUnique({ where: { userName } });
  if (!ok) return { ok: false, error: "That user doesn't exist" };
  await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      following: {
        disconnect: { userName },
      },
    },
  });
  // await client.user.upsert()
  return { ok: true };
};

const resolver: Resolvers = {
  Mutation: {
    unfollowUser: protectResolver(unfollowUserFn),
  },
};
export default resolver;
