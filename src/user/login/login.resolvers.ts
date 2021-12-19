// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { userName, password }) => {
      const user = await client.user.findUnique({ where: { userName } });
      if (!user) {
        return { ok: false, error: "There is no user" };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return { ok: false, error: "incorrect Password" };
      }
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return { ok: true, token };
    },
  },
};
