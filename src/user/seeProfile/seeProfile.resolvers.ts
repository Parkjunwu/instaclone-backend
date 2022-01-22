// import client from "../../client";

// export default {
//   Query: {
//     seeProfile: (_, { userName }) =>
//       client.user.findUnique({ where: { userName } }),
//   },
// };

// import client from "../../client";

import { Resolvers } from "../../types";
// import { protectResolver } from "../user.utils";

const resolvers: Resolvers = {
  Query: {
    // seeProfile: protectResolver((_, { userName }, { loggedInUser, client }) =>
    seeProfile: (_, { userName }, { client }) =>
      client.user.findUnique({
        where: { userName },
        include: {
          following: true,
          followers: true,
        },
      })
  },
};

export default resolvers;
