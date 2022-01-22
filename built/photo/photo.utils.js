"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processHashtags = void 0;
var processHashtags = function (caption) {
    var _a;
    return (_a = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w.]+/g)) === null || _a === void 0 ? void 0 : _a.map(function (hashTag) { return ({
        where: { hashTag: hashTag },
        create: { hashTag: hashTag }
    }); });
};
exports.processHashtags = processHashtags;
