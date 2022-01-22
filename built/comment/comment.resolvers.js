"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isMineFn = function (_a, _, _b) {
    var userId = _a.userId;
    var loggedInUser = _b.loggedInUser;
    return userId === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.id);
};
var resolver = {
    Comment: {
        isMine: isMineFn
    }
};
exports.default = resolver;
