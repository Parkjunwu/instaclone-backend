// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");
import { protectResolver } from "../user.utils";
import { Resolver, Resolvers } from "../../types";

const resolverFn: Resolver = async (root, arg, context, info) => {
  const { firstName, lastName, userName, email, password } = arg;
  const { loggedInUser, client } = context;
  let uglyPassword = null;
  if (password) {
    uglyPassword = await bcrypt.hash(password, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      userName,
      email,
      ...(uglyPassword && { password: uglyPassword }),
    },
  });

  if (updatedUser.id) {
    return { ok: true };
  } else {
    return { ok: false, error: "can't update profile" };
  }
};

const resolver: Resolvers = {
  Mutation: {
    editProfile: protectResolver(resolverFn),
  },
};
export default resolver;
