"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_utils_1 = require("../../user/user.utils");
var seeFeedFn = function (_, _a, _b) {
    var offset = _a.offset;
    var client = _b.client, loggedInUser = _b.loggedInUser;
    return client.photo.findMany({
        where: {
            OR: [
                {
                    user: {
                        followers: {
                            some: {
                                id: loggedInUser.id
                            }
                        }
                    }
                },
                {
                    userId: loggedInUser.id
                }
            ]
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 2,
        skip: offset,
        // 2*(offset-1)
    });
};
var resolver = {
    Query: {
        seeFeed: (0, user_utils_1.protectResolver)(seeFeedFn)
    }
};
exports.default = resolver;
