"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientIp = void 0;
var common_1 = require("@nestjs/common");
exports.clientIp = (0, common_1.createParamDecorator)(function (data, ctx) {
    var _a, _b;
    var request = ctx.switchToHttp().getRequest();
    // Check for IP in various headers (in order of preference)
    var forwarded = request.headers['x-forwarded-for'];
    var realIp = request.headers['x-real-ip'];
    var cfConnectingIp = request.headers['cf-connecting-ip'];
    var remoteAddress = ((_a = request.connection) === null || _a === void 0 ? void 0 : _a.remoteAddress) || ((_b = request.socket) === null || _b === void 0 ? void 0 : _b.remoteAddress);
    // If x-forwarded-for exists, get the first IP (client IP)
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    // Check other headers
    if (realIp) {
        return realIp;
    }
    if (cfConnectingIp) {
        return cfConnectingIp;
    }
    // Fallback to connection remote address
    if (remoteAddress) {
        // Remove IPv6 prefix if present
        return remoteAddress.replace(/^::ffff:/, '');
    }
    // Default fallback
    return 'unknown';
});
