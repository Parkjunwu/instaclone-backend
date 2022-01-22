"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolver = {
    Query: {
        me: function (_, __, _a) {
            var loggedInUser = _a.loggedInUser;
            if (!loggedInUser) {
                return null;
            }
            return loggedInUser;
        }
    }
};
exports.default = resolver;
