"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidDateOfBirthConstraint = exports.IsAdultConstraint = void 0;
exports.IsAdult = IsAdult;
exports.IsValidDateOfBirth = IsValidDateOfBirth;
var class_validator_1 = require("class-validator");
var IsAdultConstraint = function () {
    var _classDecorators = [(0, class_validator_1.ValidatorConstraint)({ async: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var IsAdultConstraint = _classThis = /** @class */ (function () {
        function IsAdultConstraint_1() {
        }
        IsAdultConstraint_1.prototype.validate = function (dateOfBirth, args) {
            if (!dateOfBirth)
                return true; // Optional field
            var date = new Date(dateOfBirth);
            var today = new Date();
            var age = today.getFullYear() - date.getFullYear();
            var monthDiff = today.getMonth() - date.getMonth();
            if (monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < date.getDate())) {
                return age - 1 >= 13;
            }
            return age >= 13;
        };
        IsAdultConstraint_1.prototype.defaultMessage = function (args) {
            return 'You must be at least 13 years old';
        };
        return IsAdultConstraint_1;
    }());
    __setFunctionName(_classThis, "IsAdultConstraint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IsAdultConstraint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IsAdultConstraint = _classThis;
}();
exports.IsAdultConstraint = IsAdultConstraint;
function IsAdult(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsAdultConstraint,
        });
    };
}
var IsValidDateOfBirthConstraint = function () {
    var _classDecorators = [(0, class_validator_1.ValidatorConstraint)({ async: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var IsValidDateOfBirthConstraint = _classThis = /** @class */ (function () {
        function IsValidDateOfBirthConstraint_1() {
        }
        IsValidDateOfBirthConstraint_1.prototype.validate = function (dateOfBirth, args) {
            if (!dateOfBirth)
                return true; // Optional field
            var date = new Date(dateOfBirth);
            var today = new Date();
            // Check if date is valid
            if (isNaN(date.getTime())) {
                return false;
            }
            // Check if date is not in the future
            if (date > today) {
                return false;
            }
            // Check if date is not too far in the past (e.g., 150 years)
            var maxAge = 150;
            var minDate = new Date();
            minDate.setFullYear(today.getFullYear() - maxAge);
            return date >= minDate;
        };
        IsValidDateOfBirthConstraint_1.prototype.defaultMessage = function (args) {
            return 'Date of birth must be a valid date in the past';
        };
        return IsValidDateOfBirthConstraint_1;
    }());
    __setFunctionName(_classThis, "IsValidDateOfBirthConstraint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IsValidDateOfBirthConstraint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IsValidDateOfBirthConstraint = _classThis;
}();
exports.IsValidDateOfBirthConstraint = IsValidDateOfBirthConstraint;
function IsValidDateOfBirth(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidDateOfBirthConstraint,
        });
    };
}
