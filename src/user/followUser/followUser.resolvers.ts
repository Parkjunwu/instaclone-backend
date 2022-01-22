import { Resolver, Resolvers } from "../../types";
import { protectResolver } from "../user.utils";

const followUserFn: Resolver = async (
  _,
  { userName },
  { loggedInUser, client }
) => {
  const ok = await client.user.findUnique({ where: { userName } });
  if (!ok) {
    return { ok: false, error: "That user doesn't exist" };
  }
  await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      following: {
        connect: {
          userName,
        },
      },
    },
  });
  return { ok: true };
};

const resolver: Resolvers = {
  Mutation: {
    followUser: protectResolver(followUserFn),
  },
};
export default resolver;
