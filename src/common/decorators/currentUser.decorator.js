"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
var common_1 = require("@nestjs/common");
var exceptions_1 = require("../application/exceptions");
exports.currentUser = (0, common_1.createParamDecorator)(function (fieldName, ctx) {
    var request = ctx.switchToHttp().getRequest();
    var user = request.user;
    if (!user)
        throw new exceptions_1.GenericHttpException('Unauthorized', 401);
    if (fieldName)
        return user[fieldName];
    return user;
});
