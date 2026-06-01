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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerApplicationDto = void 0;
var class_validator_1 = require("class-validator");
var SellerApplicationDto = function () {
    var _a;
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _country_decorators;
    var _country_initializers = [];
    var _country_extraInitializers = [];
    var _idCardNumber_decorators;
    var _idCardNumber_initializers = [];
    var _idCardNumber_extraInitializers = [];
    var _commercialRegNumber_decorators;
    var _commercialRegNumber_initializers = [];
    var _commercialRegNumber_extraInitializers = [];
    var _bankAccountNumber_decorators;
    var _bankAccountNumber_initializers = [];
    var _bankAccountNumber_extraInitializers = [];
    var _bankCardNumber_decorators;
    var _bankCardNumber_initializers = [];
    var _bankCardNumber_extraInitializers = [];
    var _bankCardExpiry_decorators;
    var _bankCardExpiry_initializers = [];
    var _bankCardExpiry_extraInitializers = [];
    var _bankCardHolderName_decorators;
    var _bankCardHolderName_initializers = [];
    var _bankCardHolderName_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SellerApplicationDto() {
                // ── Personal Info ──────────────────────────────────────────────────
                this.fullName = __runInitializers(this, _fullName_initializers, void 0);
                this.phoneNumber = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
                this.email = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.address = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _address_initializers, void 0));
                this.city = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _city_initializers, void 0));
                this.country = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _country_initializers, void 0));
                // ── Identity ────────────────────────────────────────────────────────
                this.idCardNumber = (__runInitializers(this, _country_extraInitializers), __runInitializers(this, _idCardNumber_initializers, void 0));
                // ── Business ────────────────────────────────────────────────────────
                this.commercialRegNumber = (__runInitializers(this, _idCardNumber_extraInitializers), __runInitializers(this, _commercialRegNumber_initializers, void 0));
                this.bankAccountNumber = (__runInitializers(this, _commercialRegNumber_extraInitializers), __runInitializers(this, _bankAccountNumber_initializers, void 0));
                this.bankCardNumber = (__runInitializers(this, _bankAccountNumber_extraInitializers), __runInitializers(this, _bankCardNumber_initializers, void 0));
                this.bankCardExpiry = (__runInitializers(this, _bankCardNumber_extraInitializers), __runInitializers(this, _bankCardExpiry_initializers, void 0));
                this.bankCardHolderName = (__runInitializers(this, _bankCardExpiry_extraInitializers), __runInitializers(this, _bankCardHolderName_initializers, void 0));
                __runInitializers(this, _bankCardHolderName_extraInitializers);
            }
            return SellerApplicationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _fullName_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(100)];
            _phoneNumber_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.Matches)(/^\+?[\d\s\-()]{7,20}$/, {
                    message: 'phoneNumber must be a valid phone number',
                })];
            _email_decorators = [(0, class_validator_1.IsEmail)(), (0, class_validator_1.IsNotEmpty)()];
            _address_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(300)];
            _city_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(100)];
            _country_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(100)];
            _idCardNumber_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MinLength)(6), (0, class_validator_1.MaxLength)(30)];
            _commercialRegNumber_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.Matches)(/^\d{7,10}$/, {
                    message: 'commercialRegNumber must be 7–10 digits (رقم السجل التجاري)',
                })];
            _bankAccountNumber_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.Matches)(/^\d{10,34}$/, {
                    message: 'bankAccountNumber must be 10–34 digits (IBAN or account number)',
                })];
            _bankCardNumber_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.Matches)(/^\d{13,19}$/, {
                    message: 'bankCardNumber must be 13–19 digits',
                })];
            _bankCardExpiry_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.Matches)(/^(0[1-9]|1[0-2])\/\d{2}$/, {
                    message: 'bankCardExpiry must be in MM/YY format',
                })];
            _bankCardHolderName_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(100)];
            __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
            __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _country_decorators, { kind: "field", name: "country", static: false, private: false, access: { has: function (obj) { return "country" in obj; }, get: function (obj) { return obj.country; }, set: function (obj, value) { obj.country = value; } }, metadata: _metadata }, _country_initializers, _country_extraInitializers);
            __esDecorate(null, null, _idCardNumber_decorators, { kind: "field", name: "idCardNumber", static: false, private: false, access: { has: function (obj) { return "idCardNumber" in obj; }, get: function (obj) { return obj.idCardNumber; }, set: function (obj, value) { obj.idCardNumber = value; } }, metadata: _metadata }, _idCardNumber_initializers, _idCardNumber_extraInitializers);
            __esDecorate(null, null, _commercialRegNumber_decorators, { kind: "field", name: "commercialRegNumber", static: false, private: false, access: { has: function (obj) { return "commercialRegNumber" in obj; }, get: function (obj) { return obj.commercialRegNumber; }, set: function (obj, value) { obj.commercialRegNumber = value; } }, metadata: _metadata }, _commercialRegNumber_initializers, _commercialRegNumber_extraInitializers);
            __esDecorate(null, null, _bankAccountNumber_decorators, { kind: "field", name: "bankAccountNumber", static: false, private: false, access: { has: function (obj) { return "bankAccountNumber" in obj; }, get: function (obj) { return obj.bankAccountNumber; }, set: function (obj, value) { obj.bankAccountNumber = value; } }, metadata: _metadata }, _bankAccountNumber_initializers, _bankAccountNumber_extraInitializers);
            __esDecorate(null, null, _bankCardNumber_decorators, { kind: "field", name: "bankCardNumber", static: false, private: false, access: { has: function (obj) { return "bankCardNumber" in obj; }, get: function (obj) { return obj.bankCardNumber; }, set: function (obj, value) { obj.bankCardNumber = value; } }, metadata: _metadata }, _bankCardNumber_initializers, _bankCardNumber_extraInitializers);
            __esDecorate(null, null, _bankCardExpiry_decorators, { kind: "field", name: "bankCardExpiry", static: false, private: false, access: { has: function (obj) { return "bankCardExpiry" in obj; }, get: function (obj) { return obj.bankCardExpiry; }, set: function (obj, value) { obj.bankCardExpiry = value; } }, metadata: _metadata }, _bankCardExpiry_initializers, _bankCardExpiry_extraInitializers);
            __esDecorate(null, null, _bankCardHolderName_decorators, { kind: "field", name: "bankCardHolderName", static: false, private: false, access: { has: function (obj) { return "bankCardHolderName" in obj; }, get: function (obj) { return obj.bankCardHolderName; }, set: function (obj, value) { obj.bankCardHolderName = value; } }, metadata: _metadata }, _bankCardHolderName_initializers, _bankCardHolderName_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SellerApplicationDto = SellerApplicationDto;
