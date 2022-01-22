"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var seeHashTagFn = function (_, _a, _b) {
    var hashTag = _a.hashTag;
    var client = _b.client;
    return client.hashTag.findUnique({ where: { hashTag: hashTag } });
};
var resolver = {
    Query: {
        seeHashTag: seeHashTagFn
    }
};
exports.default = resolver;
