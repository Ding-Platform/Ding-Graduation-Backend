"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = __importStar(require("bcryptjs"));
var crypto = __importStar(require("crypto"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var slug = __importStar(require("speakingurl"));
var voucher_code_generator_1 = require("voucher-code-generator");
var token_constants_1 = require("../../constants/token.constants");
var HelperService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HelperService = _classThis = /** @class */ (function () {
        function HelperService_1() {
        }
        HelperService_1.prototype.getAuthEncryptionKey = function () {
            var secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error('JWT_SECRET is required for encryption');
            }
            return crypto.createHash('sha256').update(secret).digest();
        };
        HelperService_1.prototype.encryptAuthToken = function (plainText) {
            var key = this.getAuthEncryptionKey(); // 32 bytes
            var iv = crypto.randomBytes(12); // recommended length for GCM
            var cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
            var cipherText = Buffer.concat([
                cipher.update(plainText, 'utf8'),
                cipher.final(),
            ]);
            var tag = cipher.getAuthTag();
            return "".concat(iv.toString('base64'), ".").concat(tag.toString('base64'), ".").concat(cipherText.toString('base64'));
        };
        HelperService_1.prototype.decryptAuthToken = function (encrypted) {
            var key = this.getAuthEncryptionKey();
            var parts = encrypted.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid encrypted token format');
            }
            var ivB64 = parts[0], tagB64 = parts[1], cipherTextB64 = parts[2];
            var iv = Buffer.from(ivB64, 'base64');
            var tag = Buffer.from(tagB64, 'base64');
            var cipherText = Buffer.from(cipherTextB64, 'base64');
            var decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
            decipher.setAuthTag(tag);
            var plain = Buffer.concat([
                decipher.update(cipherText),
                decipher.final(),
            ]);
            return plain.toString('utf8');
        };
        HelperService_1.prototype.slugify = function (value) {
            if (value.charAt(value.length - 1) === '-')
                value = value.slice(0, value.length - 1);
            return "".concat(slug(value, { titleCase: true }), "-").concat((0, voucher_code_generator_1.generate)({
                charset: '123456789abcdefghgklmnorstuvwxyz',
                length: 4,
            })[0]).toLowerCase();
        };
        HelperService_1.prototype.hashPassword = function (password) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bcrypt.hash(password, token_constants_1.TOKEN_CONSTANTS.SECURITY.BCRYPT_ROUNDS)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        HelperService_1.prototype.comparePassword = function (password, hash) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bcrypt.compare(password, hash)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        HelperService_1.prototype.updateProvidedFields = function (model, input) {
            Object.keys(input).map(function (field) { return (model[field] = input[field]); });
            return model;
        };
        HelperService_1.prototype.upperCaseFirstLetter = function (str) {
            return "".concat(str.charAt(0).toUpperCase()).concat(str.slice(1));
        };
        HelperService_1.prototype.encryptStringWithRsaPublicKey = function (toEncrypt, relativeOrAbsolutePathToPublicKey) {
            var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
            var publicKey = fs.readFileSync(absolutePath, 'utf8');
            var buffer = Buffer.from(toEncrypt);
            var encrypted = crypto.publicEncrypt(publicKey, buffer);
            return encrypted.toString('base64');
        };
        HelperService_1.prototype.decryptStringWithRsaPrivateKey = function (toDecrypt, relativeOrAbsolutePathToPrivateKey) {
            var absolutePath = path.resolve(relativeOrAbsolutePathToPrivateKey);
            var privateKey = fs.readFileSync(absolutePath, 'utf8');
            var buffer = Buffer.from(toDecrypt, 'base64');
            var decrypted = crypto.privateDecrypt(privateKey, buffer);
            return decrypted.toString('utf8');
        };
        HelperService_1.prototype.trimAllSpaces = function (text) {
            return text.replace(/\s+/g, ' ').trim();
        };
        HelperService_1.prototype.deriveMapFromArray = function (array, mapFn) {
            var map = new Map();
            array.forEach(function (item) {
                map.set(mapFn(item), item);
            });
            return map;
        };
        return HelperService_1;
    }());
    __setFunctionName(_classThis, "HelperService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HelperService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HelperService = _classThis;
}();
exports.HelperService = HelperService;
