"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_utils_1 = require("../../user/user.utils");
var seeRoomsFn = function (_, __, _a) {
    var client = _a.client, loggedInUser = _a.loggedInUser;
    return client.room.findMany({ where: { users: { some: { id: loggedInUser.id } } } });
};
// client.user.findUnique({where:{id:loggedInUser.id},select:{rooms:true}})
// client.user.findFirst({
//   where:{
//     id:loggedInUser.id,
//     rooms:{
//       some:{
//         id
//       }
//     }
//   },
//   select:{
//     rooms:{
//       where:{
//         id
//       }
//     }
//   }
// })
var resolver = {
    Query: {
        seeRooms: (0, user_utils_1.protectResolver)(seeRoomsFn)
    }
};
exports.default = resolver;
