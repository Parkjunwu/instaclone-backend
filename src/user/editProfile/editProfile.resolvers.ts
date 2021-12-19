import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protectResolver } from "../user.utils";

const resolverFn = async (
  // _,
  // { firstName, lastName, userName, email, password },
  // { loggedInUser }
  root,
  arg,
  context,
  info
) => {
  const { firstName, lastName, userName, email, password } = arg;
  const { loggedInUser } = context;
  // protectResolver(loggedInUser);
  // if (!loggedinUser) {
  //   return { ok: false, error: "can't update profile" };
  // }
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

export default {
  Mutation: {
    editProfile: protectResolver(resolverFn),
  },
};
