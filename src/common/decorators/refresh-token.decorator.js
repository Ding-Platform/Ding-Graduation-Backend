"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = exports.SessionId = void 0;
var common_1 = require("@nestjs/common");
exports.SessionId = (0, common_1.createParamDecorator)(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    return request.sessionId;
});
// Backwards compatible alias (avoid breaking older imports)
exports.RefreshToken = exports.SessionId;
