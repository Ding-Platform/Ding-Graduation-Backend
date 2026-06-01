"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericHttpException = void 0;
var common_1 = require("@nestjs/common");
var GenericHttpException = /** @class */ (function (_super) {
    __extends(GenericHttpException, _super);
    function GenericHttpException(message, statusCode, logMessage, params, messageKey) {
        if (statusCode === void 0) { statusCode = common_1.HttpStatus.BAD_REQUEST; }
        var _this = _super.call(this, message, statusCode) || this;
        _this.logMessage = logMessage;
        _this.params = params;
        _this.messageKey = messageKey;
        return _this;
    }
    GenericHttpException.prototype.getLogMessage = function () {
        return this.logMessage;
    };
    GenericHttpException.prototype.getParams = function () {
        return this.params;
    };
    GenericHttpException.prototype.getMessageKey = function () {
        return this.messageKey;
    };
    /**
     * Create a localized GenericHttpException that will be automatically localized
     * by the HttpExceptionFilter
     */
    GenericHttpException.createLocalized = function (messageKey, statusCode, params, logMessage) {
        if (statusCode === void 0) { statusCode = common_1.HttpStatus.BAD_REQUEST; }
        return new GenericHttpException(messageKey, // This will be replaced by the localized message in the filter
        statusCode, logMessage, params, messageKey);
    };
    return GenericHttpException;
}(common_1.HttpException));
exports.GenericHttpException = GenericHttpException;
