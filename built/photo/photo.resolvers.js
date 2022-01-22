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
var userFn = function (_a, _, _b) {
    var userId = _a.userId;
    var client = _b.client;
    return client.user.findUnique({ where: { id: userId } });
};
var hashTagsFn = function (_a, _, _b) {
    var id = _a.id;
    var client = _b.client;
    return __awaiter(void 0, void 0, void 0, function () {
        var b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, client.hashTag.findMany({ where: { photos: { some: { id: id } } } })
                    // console.log(b)
                ];
                case 1:
                    b = _c.sent();
                    // console.log(b)
                    return [2 /*return*/, b];
            }
        });
    });
};
var totalPhotosFn = function (_a, _, _b) {
    var id = _a.id;
    var client = _b.client;
    return client.photo.count({
        where: {
            hashTags: {
                some: {
                    id: id
                }
            }
        }
    });
};
var photosFn = function (_a, _b, _c) {
    var id = _a.id;
    var _d = _b.page, page = _d === void 0 ? 1 : _d, cursorId = _b.cursorId;
    var client = _c.client;
    return __awaiter(void 0, void 0, void 0, function () {
        var take, a;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    take = 10;
                    return [4 /*yield*/, client.hashTag.findUnique({ where: { id: id } }).photos(__assign({ take: take, skip: take * (page - 1) }, (cursorId && { cursor: { id: cursorId } })))
                        // console.log(a)
                    ];
                case 1:
                    a = _e.sent();
                    // console.log(a)
                    return [2 /*return*/, { photos: a, cursorId: a[a.length - 1].id, page: page + 1 }];
            }
        });
    });
};
var likesFn = function (_a, _, _b) {
    var id = _a.id;
    var client = _b.client;
    return client.like.count({ where: { photoId: id } });
};
var isMineFn = function (_a, _, _b) {
    var userId = _a.userId;
    var loggedInUser = _b.loggedInUser;
    return userId === (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.id);
};
var commentsFn = function (_a, _, _b) {
    var id = _a.id;
    var client = _b.client;
    return client.comment.findMany({
        where: {
            photoId: id,
        },
        include: {
            user: true,
        },
    });
};
// client.photo.findUnique({
//   where:{
//     id
//   }
// }).comments({
// include:{
//   user:{
//     select:{
//       id:true,
//       userName:true,
//       avatar:true
//     }
//   }
// }
// })
var commentNumberFn = function (_a, _, _b) {
    var id = _a.id;
    var client = _b.client;
    return client.comment.count({ where: {
            photoId: id
        } });
};
var isLikedFn = function (_a, _, _b) {
    var id = _a.id;
    var loggedInUser = _b.loggedInUser, client = _b.client;
    return __awaiter(void 0, void 0, void 0, function () {
        var ok;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!loggedInUser)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, client.like.findUnique({
                            where: {
                                photoId_userId: {
                                    photoId: id,
                                    userId: loggedInUser.id,
                                }
                            },
                            select: {
                                id: true,
                            }
                        })];
                case 1:
                    ok = _c.sent();
                    return [2 /*return*/, Boolean(ok)];
            }
        });
    });
};
var resolver = {
    Photo: {
        user: userFn,
        hashTags: hashTagsFn,
        likes: likesFn,
        isMine: isMineFn,
        comments: commentsFn,
        commentNumber: commentNumberFn,
        isLiked: isLikedFn,
    },
    HashTag: {
        totalPhotos: totalPhotosFn,
        photos: photosFn,
    }
};
exports.default = resolver;
