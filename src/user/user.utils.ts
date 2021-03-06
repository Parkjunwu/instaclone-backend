// // import * as jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken");
// import client from "../client";

// export const getUser = async (token) => {
//   try {
//     if (!token) return null;
//     const { id } = await jwt.verify(token, process.env.SECRET_KEY);
//     // if(user) {return {user}} else {return {user}}
//     const user = await client.user.findUnique({ where: { id } });
//     if (user) {
//       return user;
//     } else {
//       return null;
//     }
//   } catch {
//     return null;
//   }
// };

// export const protectResolver = (ourResolver) => (root, arg, context, info) => {
//   if (!context.loggedInUser) {
//     return { ok: false, error: "Please log in to perform this action" };
//   }
//   return ourResolver(root, arg, context, info);
// };

import * as jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

export const getUser = async (token) => {
  try {
    if (!token) return null;
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    // const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY);
    // if ("id" in verifiedToken) {
    //   const user = await client.user.findUnique({ where: verifiedToken["id"] });
    //   if (user) {
    //     return user;
    //   } else {
    //     return null;
    //   }
    // }
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectResolver =
  (ourResolver: Resolver) => (root, arg, context, info) => {
    if (!context.loggedInUser) {
      if(info.operation.operation === "query") return null
      return { ok: false, error: "Please log in to perform this action" };
    }
    return ourResolver(root, arg, context, info);
  };

export const userCheckResolver =
  (ourResolver: Resolver, errorMessage: String = "That user doesn't exist") =>
  async (root, arg, context, info) => {
    const { client } = context;
    const { userName } = arg;
    const ok = await client.user.findUnique({
      where: { userName },
      select: { id: true },
    });
    if (!ok) {
      return { ok: false, error: errorMessage };
    }
    return ourResolver(root, arg, context, info);
  };
