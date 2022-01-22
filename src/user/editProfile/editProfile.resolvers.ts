const bcrypt = require("bcrypt");
import { protectResolver } from "../user.utils";
import { Resolver, Resolvers } from "../../types";
import { createWriteStream } from "fs";
import { uploadToS3 } from "../../shared/shared.utils";

const resolverFn: Resolver = async (
  _,
  { firstName, lastName, userName, email, password, bio, avatar },
  { loggedInUser, client }
) => {
  let avatarUrl = null;
  if (avatar) {
    avatarUrl = await uploadToS3(avatar, loggedInUser.id,"avatar")
    // const { filename, createReadStream } = await avatar;
    // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    // const readStream = createReadStream();
    // const writeStream = createWriteStream(
    //   process.cwd() + "/uploads/" + newFilename
    // );
    // readStream.pipe(writeStream);
    // avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }
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
      bio,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarUrl && { avatar: avatarUrl }),
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
