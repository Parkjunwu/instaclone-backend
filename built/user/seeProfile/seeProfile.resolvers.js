"use strict";
// import client from "../../client";
Object.defineProperty(exports, "__esModule", { value: true });
// import { protectResolver } from "../user.utils";
var resolvers = {
    Query: {
        // seeProfile: protectResolver((_, { userName }, { loggedInUser, client }) =>
        seeProfile: function (_, _a, _b) {
            var userName = _a.userName;
            var client = _b.client;
            return client.user.findUnique({
                where: { userName: userName },
                include: {
                    following: true,
                    followers: true,
                },
            });
        }
    },
};
exports.default = resolvers;
