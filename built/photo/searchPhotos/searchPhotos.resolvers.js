"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var searchPhotosFn = function (_, _a, _b) {
    var keyword = _a.keyword, _c = _a.page, page = _c === void 0 ? 1 : _c;
    var client = _b.client;
    return client.photo.findMany({
        where: {
            caption: {
                contains: keyword
            }
        },
        take: 10,
        skip: 10 * (page - 1)
    });
};
// .photos({
//   take:10,
//   skip:10*(page-1)
// })
var resolver = {
    Query: {
        searchPhotos: searchPhotosFn
    }
};
exports.default = resolver;
