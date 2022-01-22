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
var shared_utils_1 = require("../../shared/shared.utils");
var user_utils_1 = require("../../user/user.utils");
var photo_utils_1 = require("../photo.utils");
// import { createWriteStream } from "fs";
// const { filename, createReadStream } = await file;
// const uploadName = `${loggedInUser.id}-${Date.now()}-${filename}`
// const write =  createWriteStream(`${process.cwd()}/uploads/${uploadName}`)
// createReadStream().pipe(write)
// const fileUrl = `http://localhost:4000/static/${uploadName}`;
// const ok = await client.photo.create({
//   data:{user:loggedInUser,file:fileUrl,caption}
// })
// if(!ok) return {ok:false, error:"can't upload"}
// return {ok:false}
var uploadPhotoFn = function (_, _a, _b) {
    var file = _a.file, caption = _a.caption;
    var client = _b.client, loggedInUser = _b.loggedInUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var hashTags, fileUrl, a;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    hashTags = null;
                    if (caption) {
                        hashTags = (0, photo_utils_1.processHashtags)(caption);
                    }
                    return [4 /*yield*/, (0, shared_utils_1.uploadToS3)(file, loggedInUser.id, "upload")];
                case 1:
                    fileUrl = _c.sent();
                    return [4 /*yield*/, client.photo.create({
                            data: __assign({ user: {
                                    connect: {
                                        id: loggedInUser.id
                                    },
                                }, file: fileUrl, caption: caption }, (hashTags && { hashTags: {
                                    connectOrCreate: hashTags
                                } }))
                        })
                        // console.log(a)
                    ];
                case 2:
                    a = _c.sent();
                    // console.log(a)
                    return [2 /*return*/, a];
            }
        });
    });
};
var resolver = {
    Mutation: {
        uploadPhoto: (0, user_utils_1.protectResolver)(uploadPhotoFn)
    }
};
exports.default = resolver;
