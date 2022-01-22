"use strict";
// // import * as jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken");
// import client from "../client";
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
exports.userCheckResolver = exports.protectResolver = exports.getUser = void 0;
// export const getUser = async (token) => {
//   try {
//     if (!token) return null;
//     const { id } = await jwt.verify(token, process.env.SECRET_KEY);
//     // if(user) {return {user}} else {return {user}}
//     const user = await client.user.findUnique({ where: { id } });
//     if (user) {
//       return user;
//     } else {
//       return null;
//     }
//   } catch {
//     return null;
//   }
// };
// export const protectResolver = (ourResolver) => (root, arg, context, info) => {
//   if (!context.loggedInUser) {
//     return { ok: false, error: "Please log in to perform this action" };
//   }
//   return ourResolver(root, arg, context, info);
// };
var jwt = require("jsonwebtoken");
var client_1 = require("../client");
var getUser = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                if (!token)
                    return [2 /*return*/, null];
                return [4 /*yield*/, jwt.verify(token, process.env.SECRET_KEY)];
            case 1:
                id = (_b.sent()).id;
                return [4 /*yield*/, client_1.default.user.findUnique({ where: { id: id } })];
            case 2:
                user = _b.sent();
                if (user) {
                    return [2 /*return*/, user];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var protectResolver = function (ourResolver) { return function (root, arg, context, info) {
    if (!context.loggedInUser) {
        if (info.operation.operation === "query")
            return null;
        return { ok: false, error: "Please log in to perform this action" };
    }
    return ourResolver(root, arg, context, info);
}; };
exports.protectResolver = protectResolver;
var userCheckResolver = function (ourResolver, errorMessage) {
    if (errorMessage === void 0) { errorMessage = "That user doesn't exist"; }
    return function (root, arg, context, info) { return __awaiter(void 0, void 0, void 0, function () {
        var client, userName, ok;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = context.client;
                    userName = arg.userName;
                    return [4 /*yield*/, client.user.findUnique({
                            where: { userName: userName },
                            select: { id: true },
                        })];
                case 1:
                    ok = _a.sent();
                    if (!ok) {
                        return [2 /*return*/, { ok: false, error: errorMessage }];
                    }
                    return [2 /*return*/, ourResolver(root, arg, context, info)];
            }
        });
    }); };
};
exports.userCheckResolver = userCheckResolver;
