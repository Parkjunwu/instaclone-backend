"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../../constant");
var pubsub_1 = require("../../pubsub");
var user_utils_1 = require("../../user/user.utils");
// type argType = {
//   payload:string;
//   userId:number;
//   roomId:number;
// }
// type sendMessageResolver = (root: any, args: argType, context: Context, info: any) => any
var sendMessageFn = function (_, _a, _b) {
    var payload = _a.payload, userId = _a.userId, roomId = _a.roomId;
    var client = _b.client, loggedInUser = _b.loggedInUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var room, user, messagenotbug;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    room = null;
                    if (!userId && !roomId)
                        return [2 /*return*/, { ok: false, error: "There is nothing." }];
                    if (userId === loggedInUser.id)
                        return [2 /*return*/, { ok: false, error: "Cannot create room" }];
                    if (!userId) return [3 /*break*/, 3];
                    return [4 /*yield*/, client.user.findUnique({ where: { id: userId }, select: { id: true } })];
                case 1:
                    user = _c.sent();
                    if (!user)
                        return [2 /*return*/, { ok: false, error: "There is no user." }];
                    return [4 /*yield*/, client.room.create({
                            data: {
                                users: {
                                    connect: [
                                        {
                                            id: userId
                                        },
                                        {
                                            id: loggedInUser.id
                                        }
                                    ]
                                }
                            }
                        })];
                case 2:
                    room = _c.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (!roomId) return [3 /*break*/, 5];
                    return [4 /*yield*/, client.room.findFirst({
                            where: {
                                id: roomId,
                                users: {
                                    some: {
                                        id: loggedInUser.id
                                    }
                                }
                            },
                            select: {
                                id: true
                            }
                        })];
                case 4:
                    // room = await client.user.findUnique({
                    //   where:{
                    //     id:loggedInUser.id
                    //   },
                    //   select:{
                    //     rooms:{
                    //       where:{
                    //         users:{
                    //           some:{
                    //             id:loggedInUser.id
                    //           }
                    //         }
                    //       },
                    //       select:{
                    //         id:true
                    //       }
                    //     }
                    //   }
                    // });
                    room = _c.sent();
                    if (!room)
                        return [2 /*return*/, { ok: false, error: "Room not found" }];
                    _c.label = 5;
                case 5: return [4 /*yield*/, client.message.create({
                        data: {
                            room: {
                                connect: {
                                    id: room.id
                                }
                            },
                            user: {
                                connect: {
                                    id: loggedInUser.id
                                }
                            },
                            payload: payload
                        }
                    })];
                case 6:
                    messagenotbug = _c.sent();
                    pubsub_1.default.publish(constant_1.NEW_MESSAGE, { roomUpdate: __assign({}, messagenotbug) });
                    return [2 /*return*/, { ok: true, id: messagenotbug.id }];
            }
        });
    });
};
var resolver = {
    Mutation: {
        sendMessage: (0, user_utils_1.protectResolver)(sendMessageFn)
    }
};
exports.default = resolver;
// import { protectResolver } from "../../user/user.utils";
// export default {
//   Mutation: {
//     sendMessage: protectResolver(
//       async (_, { payload, roomId, userId }, { loggedInUser,client }) => {
//         let room = null;
//         if (userId) {
//           const user = await client.user.findUnique({
//             where: {
//               id: userId,
//             },
//             select: {
//               id: true,
//             },
//           });
//           if (!user) {
//             return {
//               ok: false,
//               error: "This user does not exist.",
//             };
//           }
//           room = await client.room.create({
//             data: {
//               users: {
//                 connect: [
//                   {
//                     id: userId,
//                   },
//                   {
//                     id: loggedInUser,
//                   },
//                 ],
//               },
//             },
//           });
//         } else if (roomId) {
//           room = await client.room.findUnique({
//             where: {
//               id: roomId,
//             },
//             select: {
//               id: true,
//             },
//           });
//           if (!room) {
//             return {
//               ok: false,
//               error: "Room not found.",
//             };
//           }
//         }
//         await client.message.create({
//           data: {
//             payload,
//             room: {
//               connect: {
//                 id: room.id,
//               },
//             },
//             user: {
//               connect: {
//                 id: loggedInUser.id,
//               },
//             },
//           },
//         });
//         return {
//           ok: true,
//         };
//       }
//     ),
//   },
// };
