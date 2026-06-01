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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serialize = Serialize;
var common_1 = require("@nestjs/common");
var class_transformer_1 = require("class-transformer");
var operators_1 = require("rxjs/operators");
var SerializationInterceptor = /** @class */ (function () {
    function SerializationInterceptor(dto, itemType) {
        this.dto = dto;
        this.itemType = itemType;
    }
    SerializationInterceptor.prototype.intercept = function (context, handler) {
        var _this = this;
        return handler.handle().pipe((0, operators_1.map)(function (data) {
            // Handle wrapped responses from ResponseInterceptor
            if (data.code !== undefined &&
                data.success !== undefined &&
                data.data) {
                // Serialize the inner data
                var serializedData = _this.serializeData(data.data);
                return __assign(__assign({}, data), { data: serializedData });
            }
            // Handle direct data
            return _this.serializeData(data);
        }));
    };
    SerializationInterceptor.prototype.serializeData = function (data) {
        var _this = this;
        // Handle paginated responses with data.data structure
        if (data.data && Array.isArray(data.data) && data.meta) {
            data.data = data.data.map(function (item) {
                return (0, class_transformer_1.plainToInstance)(_this.itemType, item, {
                    excludeExtraneousValues: true,
                    enableImplicitConversion: true,
                });
            });
            return (0, class_transformer_1.plainToInstance)(this.dto, data, {
                excludeExtraneousValues: true,
                enableImplicitConversion: true,
            });
        }
        // Handle legacy responses with data.items structure
        if (data.items && Array.isArray(data.items)) {
            data.items = data.items.map(function (item) {
                return (0, class_transformer_1.plainToInstance)(_this.itemType, item, {
                    excludeExtraneousValues: true,
                    enableImplicitConversion: true,
                });
            });
        }
        return Array.isArray(data.items)
            ? data
            : (0, class_transformer_1.plainToInstance)(this.dto, data, {
                excludeExtraneousValues: true,
                enableImplicitConversion: true,
            });
    };
    return SerializationInterceptor;
}());
function Serialize(dto, itemType) {
    return (0, common_1.UseInterceptors)(new SerializationInterceptor(dto, itemType));
}
