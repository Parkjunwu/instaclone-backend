"use strict";
// import { gql } from "apollo-server";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
// export default gql`
//   type Query {
//     searchUsers(keyword: String!): [User]
//   }
// `;
var apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Result {\n    users: [User]\n    last: Int\n  }\n  type Query {\n    searchUsers(keyword: String!, last: Int, page: Int): Result\n  }\n"], ["\n  type Result {\n    users: [User]\n    last: Int\n  }\n  type Query {\n    searchUsers(keyword: String!, last: Int, page: Int): Result\n  }\n"])));
var templateObject_1;
