"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var seePhotoCommentFn = function (_, _a, _b) {
    var id = _a.id;
    var client = _b.client;
    return client.comment.findMany({
        where: {
            photoId: id,
        },
        orderBy: {
            createdAt: "asc",
        }
    });
};
// client.photo.findUnique({where:{id},select:{comments:true}}).comments()
var resolver = {
    Query: {
        seePhotoComment: seePhotoCommentFn
    }
};
exports.default = resolver;
