"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var seePhotoFn = function (_, _a, _b) {
    var id = _a.id;
    var client = _b.client;
    return client.photo.findUnique({ where: { id: id } });
};
var resolver = {
    Query: {
        seePhoto: seePhotoFn
    }
};
exports.default = resolver;
