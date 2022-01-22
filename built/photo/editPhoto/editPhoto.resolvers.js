"use strict";
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
var user_utils_1 = require("../../user/user.utils");
var photo_utils_1 = require("../photo.utils");
var editPhotoFn = function (_, _a, _b) {
    var id = _a.id, caption = _a.caption;
    var client = _b.client, loggedInUser = _b.loggedInUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var oldPhoto;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, client.photo.findFirst({
                        where: {
                            id: id,
                            userId: loggedInUser.id
                        },
                    }).hashTags({
                        select: {
                            hashTag: true
                        }
                    })
                    // console.log(oldPhoto)
                ];
                case 1:
                    oldPhoto = _c.sent();
                    // console.log(oldPhoto)
                    if (!oldPhoto)
                        return [2 /*return*/, { ok: false, error: "Can't edit another user's Post" }];
                    return [4 /*yield*/, client.photo.update({
                            where: { id: id },
                            data: {
                                caption: caption,
                                hashTags: {
                                    // disconnect:oldPhoto.hashTags,
                                    disconnect: oldPhoto,
                                    connectOrCreate: (0, photo_utils_1.processHashtags)(caption),
                                }
                            }
                        })];
                case 2:
                    _c.sent();
                    return [2 /*return*/, { ok: true }];
            }
        });
    });
};
//   const {userId,caption:previousCaption} = await client.photo.findUnique({where:{id}})
//   if(userId !== loggedInUser.id) return {ok:false,error:"Can't edit another user's Post"}
//   if(caption === previousCaption) return {ok:true}
//   const hashTag = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w.]+/g)?.map(hash => ({hashTag:hash}))
//   const previousHash = await client.photo.findUnique({where:{id}}).hashTags({
//     select:{
//       hashTag:true,
//     }
//   })
//   let hashTagChange
//   if(hashTag !== previousHash){
//     hashTagChange=hashTag?.map(hashTag=>({
//       where:hashTag,
//       create:hashTag
//     })
//     )
//   }
//   console.log("New"+hashTagChange)
//   console.log("Old"+previousHash)
// const updatePhoto = await client.photo.update({
//   where:{id},
//   data:{
//     caption,
//     ...((hashTagChange || previousHash) && {hashTags: {
//       disconnect:previousHash,
//       connectOrCreate:hashTagChange,
//     }
//   }),
//   }
// })
//   if(updatePhoto) {
//     return {ok:true}
//   }
//   return {ok:false, error:"Unknown Error"}
// }
var resolver = {
    Mutation: {
        editPhoto: (0, user_utils_1.protectResolver)(editPhotoFn)
    }
};
exports.default = resolver;
