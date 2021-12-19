import client from "../../client";
const bcrypt = require("bcrypt");

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        const checkUser = await client.user.findFirst({
          where: {
            OR: [{ userName }, { email }],
          },
        });
        if (checkUser) {
          throw new Error("This username/email is already taken.");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};