(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('date-fns'), require('lodash'), require('lodash-es'), require('@angular/core'), require('@angular/common/http'), require('rxjs/operators'), require('rxjs'), require('qs'), require('reflect-metadata')) :
    typeof define === 'function' && define.amd ? define('angular2-jsonapi', ['exports', 'date-fns', 'lodash', 'lodash-es', '@angular/core', '@angular/common/http', 'rxjs/operators', 'rxjs', 'qs', 'reflect-metadata'], factory) :
    (global = global || self, factory(global['angular2-jsonapi'] = {}, global['date-fns'], global.lodash, global['lodash-es'], global.ng.core, global.ng.common.http, global.rxjs.operators, global.rxjs, global.qs));
}(this, function (exports, dateFns, lodash, lodashEs, core, http, operators, rxjs, qs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
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
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var JsonApiNestedModel = /** @class */ (function () {
        function JsonApiNestedModel(data) {
            this.nestedDataSerialization = false;
            if (data) {
                Object.assign(this, data);
            }
        }
        Object.defineProperty(JsonApiNestedModel.prototype, "modelConfig", {
            get: /**
             * @return {?}
             */
            function () {
                return Reflect.getMetadata('JsonApiModelConfig', this.constructor);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} data
         * @return {?}
         */
        JsonApiNestedModel.prototype.fill = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            Object.assign(this, data);
        };
        /**
         * @return {?}
         */
        JsonApiNestedModel.prototype.serialize = /**
         * @return {?}
         */
        function () {
            return this.transformSerializedNamesToPropertyNames();
        };
        /**
         * @protected
         * @template T
         * @return {?}
         */
        JsonApiNestedModel.prototype.transformSerializedNamesToPropertyNames = /**
         * @protected
         * @template T
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var serializedNameToPropertyName = this.getModelPropertyNames();
            /** @type {?} */
            var properties = {};
            Object.keys(serializedNameToPropertyName).forEach((/**
             * @param {?} serializedName
             * @return {?}
             */
            function (serializedName) {
                if (_this && _this[serializedName] !== null &&
                    _this[serializedName] !== undefined && serializedName !== 'nestedDataSerialization') {
                    properties[serializedNameToPropertyName[serializedName]] = _this[serializedName];
                }
            }));
            return properties;
        };
        /**
         * @protected
         * @return {?}
         */
        JsonApiNestedModel.prototype.getModelPropertyNames = /**
         * @protected
         * @return {?}
         */
        function () {
            return Reflect.getMetadata('AttributeMapping', this) || [];
        };
        return JsonApiNestedModel;
    }());
    if (false) {
        /** @type {?} */
        JsonApiNestedModel.prototype.nestedDataSerialization;
        /* Skipping unhandled member: [key: string]: any;*/
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DEFAULT_OPTIONS = {
        nullValue: false,
        hasMany: false
    };
    /**
     * @template T
     */
    var   /**
     * @template T
     */
    JsonModelConverter = /** @class */ (function () {
        function JsonModelConverter(model, options) {
            if (options === void 0) { options = {}; }
            this.modelType = model; // <ModelType<T>>model
            this.options = __assign({}, DEFAULT_OPTIONS, options);
        }
        /**
         * @param {?} value
         * @return {?}
         */
        JsonModelConverter.prototype.mask = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var e_1, _a;
            if (!value && !this.options.nullValue) {
                if (this.options.hasMany) {
                    return [];
                }
                return new this.modelType();
            }
            /** @type {?} */
            var result = null;
            if (this.options.hasMany) {
                if (!Array.isArray(value)) {
                    throw new Error("ERROR: JsonModelConverter: Expected array but got " + typeof value + ".");
                }
                result = [];
                try {
                    for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                        var item = value_1_1.value;
                        if (item === null) {
                            continue;
                        }
                        /** @type {?} */
                        var temp = void 0;
                        if (typeof item === 'object') {
                            temp = new this.modelType();
                            temp.fill(item);
                        }
                        else {
                            temp = item;
                        }
                        result.push(temp);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                if (!(value instanceof this.modelType)) {
                    result = new this.modelType();
                    result.fill(value);
                }
                else {
                    result = value;
                }
            }
            return result;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        JsonModelConverter.prototype.unmask = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var e_2, _a;
            if (!value) {
                return value;
            }
            /** @type {?} */
            var result = null;
            if (Array.isArray(value)) {
                result = [];
                try {
                    for (var value_2 = __values(value), value_2_1 = value_2.next(); !value_2_1.done; value_2_1 = value_2.next()) {
                        var item = value_2_1.value;
                        if (!item) {
                            continue;
                        }
                        if (item instanceof JsonApiNestedModel) {
                            item.nestedDataSerialization = true;
                            result.push(item.serialize());
                            item.nestedDataSerialization = false;
                        }
                        else {
                            result.push(item);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (value_2_1 && !value_2_1.done && (_a = value_2.return)) _a.call(value_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            else {
                if (value instanceof JsonApiNestedModel) {
                    value.nestedDataSerialization = true;
                    result = value.serialize();
                    value.nestedDataSerialization = false;
                }
                else {
                    result = value;
                }
            }
            return result;
        };
        return JsonModelConverter;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        JsonModelConverter.prototype.modelType;
        /**
         * @type {?}
         * @private
         */
        JsonModelConverter.prototype.options;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?=} config
     * @return {?}
     */
    function HasMany(config) {
        if (config === void 0) { config = {}; }
        return (/**
         * @param {?} target
         * @param {?} propertyName
         * @return {?}
         */
        function (target, propertyName) {
            /** @type {?} */
            var annotations = Reflect.getMetadata('HasMany', target) || [];
            annotations.push({
                propertyName: propertyName,
                relationship: config.key || propertyName
            });
            Reflect.defineMetadata('HasMany', annotations, target);
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?=} config
     * @return {?}
     */
    function BelongsTo(config) {
        if (config === void 0) { config = {}; }
        return (/**
         * @param {?} target
         * @param {?} propertyName
         * @return {?}
         */
        function (target, propertyName) {
            /** @type {?} */
            var annotations = Reflect.getMetadata('BelongsTo', target) || [];
            annotations.push({
                propertyName: propertyName,
                relationship: config.key || propertyName
            });
            Reflect.defineMetadata('BelongsTo', annotations, target);
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // tslint:disable-next-line:variable-name
    /** @type {?} */
    var AttributeMetadata = (/** @type {?} */ (Symbol('AttributeMetadata')));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DateConverter = /** @class */ (function () {
        function DateConverter() {
        }
        /**
         * @param {?} value
         * @return {?}
         */
        DateConverter.prototype.mask = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                return dateFns.parseISO(value);
            }
            else {
                return value;
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        DateConverter.prototype.unmask = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value === null) {
                return null;
            }
            return value.toISOString();
        };
        return DateConverter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?=} options
     * @return {?}
     */
    function Attribute(options) {
        if (options === void 0) { options = {}; }
        return (/**
         * @param {?} target
         * @param {?} propertyName
         * @return {?}
         */
        function (target, propertyName) {
            /** @type {?} */
            var converter = (/**
             * @param {?} dataType
             * @param {?} value
             * @param {?=} forSerialisation
             * @return {?}
             */
            function (dataType, value, forSerialisation) {
                if (forSerialisation === void 0) { forSerialisation = false; }
                /** @type {?} */
                var attrConverter;
                if (options.converter) {
                    attrConverter = options.converter;
                }
                else if (dataType === Date) {
                    attrConverter = new DateConverter();
                }
                else {
                    /** @type {?} */
                    var datatype = new dataType();
                    if (datatype.mask && datatype.unmask) {
                        attrConverter = datatype;
                    }
                }
                if (attrConverter) {
                    if (!forSerialisation) {
                        return attrConverter.mask(value);
                    }
                    return attrConverter.unmask(value);
                }
                return value;
            });
            /** @type {?} */
            var saveAnnotations = (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var metadata = Reflect.getMetadata('Attribute', target) || {};
                metadata[propertyName] = {
                    marked: true
                };
                Reflect.defineMetadata('Attribute', metadata, target);
                /** @type {?} */
                var mappingMetadata = Reflect.getMetadata('AttributeMapping', target) || {};
                /** @type {?} */
                var serializedPropertyName = options.serializedName !== undefined ? options.serializedName : propertyName;
                mappingMetadata[serializedPropertyName] = propertyName;
                Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
            });
            /** @type {?} */
            var setMetadata = (/**
             * @param {?} instance
             * @param {?} oldValue
             * @param {?} newValue
             * @return {?}
             */
            function (instance, oldValue, newValue) {
                /** @type {?} */
                var targetType = Reflect.getMetadata('design:type', target, propertyName);
                if (!instance[AttributeMetadata]) {
                    instance[AttributeMetadata] = {};
                }
                instance[AttributeMetadata][propertyName] = {
                    newValue: newValue,
                    oldValue: oldValue,
                    nested: false,
                    serializedName: options.serializedName,
                    hasDirtyAttributes: !lodash.isEqual(oldValue, newValue),
                    serialisationValue: converter(targetType, newValue, true)
                };
            });
            /** @type {?} */
            var getter = (/**
             * @return {?}
             */
            function () {
                return this["_" + propertyName];
            });
            /** @type {?} */
            var setter = (/**
             * @param {?} newVal
             * @return {?}
             */
            function (newVal) {
                /** @type {?} */
                var targetType = Reflect.getMetadata('design:type', target, propertyName);
                /** @type {?} */
                var convertedValue = converter(targetType, newVal);
                /** @type {?} */
                var oldValue = null;
                if (this.isModelInitialization() && this.id) {
                    oldValue = converter(targetType, newVal);
                }
                else {
                    if (this[AttributeMetadata] && this[AttributeMetadata][propertyName]) {
                        oldValue = this[AttributeMetadata][propertyName].oldValue;
                    }
                }
                this["_" + propertyName] = convertedValue;
                setMetadata(this, oldValue, convertedValue);
            });
            if (delete target[propertyName]) {
                saveAnnotations();
                Object.defineProperty(target, propertyName, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?=} options
     * @return {?}
     */
    function NestedAttribute(options) {
        if (options === void 0) { options = {}; }
        return (/**
         * @param {?} target
         * @param {?} propertyName
         * @return {?}
         */
        function (target, propertyName) {
            /** @type {?} */
            var converter = (/**
             * @param {?} dataType
             * @param {?} value
             * @param {?=} forSerialisation
             * @return {?}
             */
            function (dataType, value, forSerialisation) {
                if (forSerialisation === void 0) { forSerialisation = false; }
                /** @type {?} */
                var attrConverter;
                if (options.converter) {
                    attrConverter = options.converter;
                }
                else {
                    /** @type {?} */
                    var datatype = new dataType();
                    if (datatype.mask && datatype.unmask) {
                        attrConverter = datatype;
                    }
                }
                if (attrConverter) {
                    if (!forSerialisation) {
                        return attrConverter.mask(value);
                    }
                    return attrConverter.unmask(value);
                }
                return value;
            });
            /** @type {?} */
            var saveAnnotations = (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var metadata = Reflect.getMetadata('NestedAttribute', target) || {};
                metadata[propertyName] = {
                    marked: true
                };
                Reflect.defineMetadata('NestedAttribute', metadata, target);
                /** @type {?} */
                var mappingMetadata = Reflect.getMetadata('AttributeMapping', target) || {};
                /** @type {?} */
                var serializedPropertyName = options.serializedName !== undefined ? options.serializedName : propertyName;
                mappingMetadata[serializedPropertyName] = propertyName;
                Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
            });
            /** @type {?} */
            var updateMetadata = (/**
             * @param {?} instance
             * @return {?}
             */
            function (instance) {
                /** @type {?} */
                var newValue = instance["_" + propertyName];
                if (!instance[AttributeMetadata]) {
                    instance[AttributeMetadata] = {};
                }
                if (instance[AttributeMetadata][propertyName] && !instance.isModelInitialization()) {
                    instance[AttributeMetadata][propertyName].newValue = newValue;
                    instance[AttributeMetadata][propertyName].hasDirtyAttributes = !lodash.isEqual(instance[AttributeMetadata][propertyName].oldValue, newValue);
                    instance[AttributeMetadata][propertyName].serialisationValue = newValue;
                }
                else {
                    /** @type {?} */
                    var oldValue = lodash.cloneDeep(newValue);
                    instance[AttributeMetadata][propertyName] = {
                        newValue: newValue,
                        oldValue: oldValue,
                        converter: converter,
                        nested: true,
                        hasDirtyAttributes: !lodash.isEqual(newValue, oldValue)
                    };
                }
            });
            /** @type {?} */
            var getter = (/**
             * @return {?}
             */
            function () {
                return this["_" + propertyName];
            });
            /** @type {?} */
            var setter = (/**
             * @param {?} newVal
             * @return {?}
             */
            function (newVal) {
                /** @type {?} */
                var targetType = Reflect.getMetadata('design:type', target, propertyName);
                this["_" + propertyName] = converter(targetType, newVal);
                updateMetadata(this);
            });
            if (delete target[propertyName]) {
                saveAnnotations();
                Object.defineProperty(target, propertyName, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?=} options
     * @return {?}
     */
    function JsonAttribute(options) {
        if (options === void 0) { options = {}; }
        return (/**
         * @param {?} target
         * @param {?} propertyName
         * @return {?}
         */
        function (target, propertyName) {
            /** @type {?} */
            var converter = (/**
             * @param {?} dataType
             * @param {?} value
             * @param {?=} forSerialisation
             * @return {?}
             */
            function (dataType, value, forSerialisation) {
                if (forSerialisation === void 0) { forSerialisation = false; }
                /** @type {?} */
                var attrConverter;
                if (options.converter) {
                    attrConverter = options.converter;
                }
                else if (dataType === Date) {
                    attrConverter = new DateConverter();
                }
                else {
                    /** @type {?} */
                    var datatype = new dataType();
                    if (datatype.mask && datatype.unmask) {
                        attrConverter = datatype;
                    }
                }
                if (attrConverter) {
                    if (!forSerialisation) {
                        return attrConverter.mask(value);
                    }
                    return attrConverter.unmask(value);
                }
                return value;
            });
            /** @type {?} */
            var saveAnnotations = (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var metadata = Reflect.getMetadata('JsonAttribute', target) || {};
                metadata[propertyName] = {
                    marked: true
                };
                Reflect.defineMetadata('JsonAttribute', metadata, target);
                /** @type {?} */
                var mappingMetadata = Reflect.getMetadata('AttributeMapping', target) || {};
                /** @type {?} */
                var serializedPropertyName = options.serializedName !== undefined ? options.serializedName : propertyName;
                mappingMetadata[serializedPropertyName] = propertyName;
                Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
            });
            /** @type {?} */
            var getter = (/**
             * @return {?}
             */
            function () {
                if (this.nestedDataSerialization) {
                    return converter(Reflect.getMetadata('design:type', target, propertyName), this["_" + propertyName], true);
                }
                return this["_" + propertyName];
            });
            /** @type {?} */
            var setter = (/**
             * @param {?} newVal
             * @return {?}
             */
            function (newVal) {
                /** @type {?} */
                var targetType = Reflect.getMetadata('design:type', target, propertyName);
                this["_" + propertyName] = converter(targetType, newVal);
            });
            if (delete target[propertyName]) {
                saveAnnotations();
                Object.defineProperty(target, propertyName, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var JsonApiMetaModel = /** @class */ (function () {
        function JsonApiMetaModel(response) {
            this.links = response.links || [];
            this.meta = response.meta;
        }
        return JsonApiMetaModel;
    }());
    if (false) {
        /** @type {?} */
        JsonApiMetaModel.prototype.links;
        /** @type {?} */
        JsonApiMetaModel.prototype.meta;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} config
     * @return {?}
     */
    function JsonApiModelConfig(config) {
        return (/**
         * @param {?} target
         * @return {?}
         */
        function (target) {
            if (typeof config.meta === 'undefined' || config.meta == null) {
                config.meta = JsonApiMetaModel;
            }
            Reflect.defineMetadata('JsonApiModelConfig', config, target);
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?=} config
     * @return {?}
     */
    function JsonApiDatastoreConfig(config) {
        if (config === void 0) { config = {}; }
        return (/**
         * @param {?} target
         * @return {?}
         */
        function (target) {
            Reflect.defineMetadata('JsonApiDatastoreConfig', config, target);
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // tslint:disable-next-line:variable-name
    /**
     * HACK/FIXME:
     * Type 'symbol' cannot be used as an index type.
     * TypeScript 2.9.x
     * See https://github.com/Microsoft/TypeScript/issues/24587.
     * @type {?}
     */
    var AttributeMetadataIndex = (/** @type {?} */ (AttributeMetadata));
    var JsonApiModel = /** @class */ (function () {
        function JsonApiModel(internalDatastore, data) {
            this.internalDatastore = internalDatastore;
            this.modelInitialization = false;
            if (data) {
                this.modelInitialization = true;
                this.id = data.id;
                Object.assign(this, data.attributes);
                this.modelInitialization = false;
            }
        }
        /**
         * @return {?}
         */
        JsonApiModel.prototype.isModelInitialization = /**
         * @return {?}
         */
        function () {
            return this.modelInitialization;
        };
        /**
         * @param {?} data
         * @param {?} included
         * @param {?=} remainingModels
         * @return {?}
         */
        JsonApiModel.prototype.syncRelationships = /**
         * @param {?} data
         * @param {?} included
         * @param {?=} remainingModels
         * @return {?}
         */
        function (data, included, remainingModels) {
            if (this.lastSyncModels === included) {
                return;
            }
            if (data) {
                /** @type {?} */
                var modelsForProcessing = remainingModels;
                if (modelsForProcessing === undefined) {
                    modelsForProcessing = [].concat(included);
                }
                this.parseHasMany(data, included, modelsForProcessing);
                this.parseBelongsTo(data, included, modelsForProcessing);
            }
            this.lastSyncModels = included;
        };
        /**
         * @param {?=} params
         * @param {?=} headers
         * @param {?=} customUrl
         * @return {?}
         */
        JsonApiModel.prototype.save = /**
         * @param {?=} params
         * @param {?=} headers
         * @param {?=} customUrl
         * @return {?}
         */
        function (params, headers, customUrl) {
            this.checkChanges();
            /** @type {?} */
            var attributesMetadata = this[AttributeMetadataIndex];
            return this.internalDatastore.saveRecord(attributesMetadata, this, params, headers, customUrl);
        };
        Object.defineProperty(JsonApiModel.prototype, "hasDirtyAttributes", {
            get: /**
             * @return {?}
             */
            function () {
                this.checkChanges();
                /** @type {?} */
                var attributesMetadata = this[AttributeMetadataIndex];
                /** @type {?} */
                var hasDirtyAttributes = false;
                for (var propertyName in attributesMetadata) {
                    if (attributesMetadata.hasOwnProperty(propertyName)) {
                        /** @type {?} */
                        var metadata = attributesMetadata[propertyName];
                        if (metadata.hasDirtyAttributes) {
                            hasDirtyAttributes = true;
                            break;
                        }
                    }
                }
                return hasDirtyAttributes;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @return {?}
         */
        JsonApiModel.prototype.checkChanges = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var attributesMetadata = this[AttributeMetadata];
            for (var propertyName in attributesMetadata) {
                if (attributesMetadata.hasOwnProperty(propertyName)) {
                    /** @type {?} */
                    var metadata = attributesMetadata[propertyName];
                    if (metadata.nested) {
                        this[AttributeMetadata][propertyName].hasDirtyAttributes = !lodash.isEqual(attributesMetadata[propertyName].oldValue, attributesMetadata[propertyName].newValue);
                        this[AttributeMetadata][propertyName].serialisationValue = attributesMetadata[propertyName].converter(Reflect.getMetadata('design:type', this, propertyName), lodash.cloneDeep(attributesMetadata[propertyName].newValue), true);
                    }
                }
            }
        };
        /**
         * @return {?}
         */
        JsonApiModel.prototype.rollbackAttributes = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var attributesMetadata = this[AttributeMetadataIndex];
            for (var propertyName in attributesMetadata) {
                if (attributesMetadata.hasOwnProperty(propertyName)) {
                    if (attributesMetadata[propertyName].hasDirtyAttributes) {
                        this[propertyName] = lodash.cloneDeep(attributesMetadata[propertyName].oldValue);
                    }
                }
            }
        };
        Object.defineProperty(JsonApiModel.prototype, "modelConfig", {
            get: /**
             * @return {?}
             */
            function () {
                return Reflect.getMetadata('JsonApiModelConfig', this.constructor);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @param {?} data
         * @param {?} included
         * @param {?} remainingModels
         * @return {?}
         */
        JsonApiModel.prototype.parseHasMany = /**
         * @private
         * @param {?} data
         * @param {?} included
         * @param {?} remainingModels
         * @return {?}
         */
        function (data, included, remainingModels) {
            var e_1, _a, e_2, _b;
            /** @type {?} */
            var hasMany = Reflect.getMetadata('HasMany', this);
            if (hasMany) {
                try {
                    for (var hasMany_1 = __values(hasMany), hasMany_1_1 = hasMany_1.next(); !hasMany_1_1.done; hasMany_1_1 = hasMany_1.next()) {
                        var metadata = hasMany_1_1.value;
                        /** @type {?} */
                        var relationship = data.relationships ? data.relationships[metadata.relationship] : null;
                        if (relationship && relationship.data && Array.isArray(relationship.data)) {
                            /** @type {?} */
                            var allModels = [];
                            /** @type {?} */
                            var modelTypesFetched = [];
                            try {
                                for (var _c = (e_2 = void 0, __values(Object.keys(relationship.data))), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var typeIndex = _d.value;
                                    /** @type {?} */
                                    var typeName = relationship.data[typeIndex].type;
                                    if (!lodashEs.includes(modelTypesFetched, typeName)) {
                                        modelTypesFetched.push(typeName);
                                        // tslint:disable-next-line:max-line-length
                                        /** @type {?} */
                                        var modelType = Reflect.getMetadata('JsonApiDatastoreConfig', this.internalDatastore.constructor).models[typeName];
                                        if (modelType) {
                                            /** @type {?} */
                                            var relationshipModels = this.getHasManyRelationship(modelType, relationship.data, included, typeName, remainingModels);
                                            if (relationshipModels.length > 0) {
                                                allModels = allModels.concat(relationshipModels);
                                            }
                                        }
                                        else {
                                            throw { message: "parseHasMany - Model type for relationship " + typeName + " not found." };
                                        }
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            this[metadata.propertyName] = allModels;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (hasMany_1_1 && !hasMany_1_1.done && (_a = hasMany_1.return)) _a.call(hasMany_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        /**
         * @private
         * @param {?} data
         * @param {?} included
         * @param {?} remainingModels
         * @return {?}
         */
        JsonApiModel.prototype.parseBelongsTo = /**
         * @private
         * @param {?} data
         * @param {?} included
         * @param {?} remainingModels
         * @return {?}
         */
        function (data, included, remainingModels) {
            var e_3, _a;
            /** @type {?} */
            var belongsTo = Reflect.getMetadata('BelongsTo', this);
            if (belongsTo) {
                try {
                    for (var belongsTo_1 = __values(belongsTo), belongsTo_1_1 = belongsTo_1.next(); !belongsTo_1_1.done; belongsTo_1_1 = belongsTo_1.next()) {
                        var metadata = belongsTo_1_1.value;
                        /** @type {?} */
                        var relationship = data.relationships ? data.relationships[metadata.relationship] : null;
                        if (relationship && relationship.data) {
                            /** @type {?} */
                            var dataRelationship = (relationship.data instanceof Array) ? relationship.data[0] : relationship.data;
                            if (dataRelationship) {
                                /** @type {?} */
                                var typeName = dataRelationship.type;
                                // tslint:disable-next-line:max-line-length
                                /** @type {?} */
                                var modelType = Reflect.getMetadata('JsonApiDatastoreConfig', this.internalDatastore.constructor).models[typeName];
                                if (modelType) {
                                    /** @type {?} */
                                    var relationshipModel = this.getBelongsToRelationship(modelType, dataRelationship, included, typeName, remainingModels);
                                    if (relationshipModel) {
                                        this[metadata.propertyName] = relationshipModel;
                                    }
                                }
                                else {
                                    throw { message: "parseBelongsTo - Model type for relationship " + typeName + " not found." };
                                }
                            }
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (belongsTo_1_1 && !belongsTo_1_1.done && (_a = belongsTo_1.return)) _a.call(belongsTo_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        };
        /**
         * @private
         * @template T
         * @param {?} modelType
         * @param {?} data
         * @param {?} included
         * @param {?} typeName
         * @param {?} remainingModels
         * @return {?}
         */
        JsonApiModel.prototype.getHasManyRelationship = /**
         * @private
         * @template T
         * @param {?} modelType
         * @param {?} data
         * @param {?} included
         * @param {?} typeName
         * @param {?} remainingModels
         * @return {?}
         */
        function (modelType, data, included, typeName, remainingModels) {
            var _this = this;
            /** @type {?} */
            var relationshipList = [];
            data.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                /** @type {?} */
                var relationshipData = lodashEs.find(included, (/** @type {?} */ ({ id: item.id, type: typeName })));
                if (relationshipData) {
                    /** @type {?} */
                    var newObject = _this.createOrPeek(modelType, relationshipData);
                    /** @type {?} */
                    var indexOfNewlyFoundModel = remainingModels.indexOf(relationshipData);
                    /** @type {?} */
                    var modelsForProcessing = remainingModels.concat([]);
                    if (indexOfNewlyFoundModel !== -1) {
                        modelsForProcessing.splice(indexOfNewlyFoundModel, 1);
                        newObject.syncRelationships(relationshipData, included, modelsForProcessing);
                    }
                    relationshipList.push(newObject);
                }
            }));
            return relationshipList;
        };
        /**
         * @private
         * @template T
         * @param {?} modelType
         * @param {?} data
         * @param {?} included
         * @param {?} typeName
         * @param {?} remainingModels
         * @return {?}
         */
        JsonApiModel.prototype.getBelongsToRelationship = /**
         * @private
         * @template T
         * @param {?} modelType
         * @param {?} data
         * @param {?} included
         * @param {?} typeName
         * @param {?} remainingModels
         * @return {?}
         */
        function (modelType, data, included, typeName, remainingModels) {
            /** @type {?} */
            var id = data.id;
            /** @type {?} */
            var relationshipData = lodashEs.find(included, (/** @type {?} */ ({ id: id, type: typeName })));
            if (relationshipData) {
                /** @type {?} */
                var newObject = this.createOrPeek(modelType, relationshipData);
                /** @type {?} */
                var indexOfNewlyFoundModel = remainingModels.indexOf(relationshipData);
                /** @type {?} */
                var modelsForProcessing = remainingModels.concat([]);
                if (indexOfNewlyFoundModel !== -1) {
                    modelsForProcessing.splice(indexOfNewlyFoundModel, 1);
                    newObject.syncRelationships(relationshipData, included, modelsForProcessing);
                }
                return newObject;
            }
            return this.internalDatastore.peekRecord(modelType, id);
        };
        /**
         * @private
         * @template T
         * @param {?} modelType
         * @param {?} data
         * @return {?}
         */
        JsonApiModel.prototype.createOrPeek = /**
         * @private
         * @template T
         * @param {?} modelType
         * @param {?} data
         * @return {?}
         */
        function (modelType, data) {
            /** @type {?} */
            var peek = this.internalDatastore.peekRecord(modelType, data.id);
            if (peek) {
                lodash.extend(peek, this.internalDatastore.transformSerializedNamesToPropertyNames(modelType, data.attributes));
                return peek;
            }
            /** @type {?} */
            var newObject = this.internalDatastore.deserializeModel(modelType, data);
            this.internalDatastore.addToStore(newObject);
            return newObject;
        };
        return JsonApiModel;
    }());
    if (false) {
        /** @type {?} */
        JsonApiModel.prototype.id;
        /** @type {?} */
        JsonApiModel.prototype.modelInitialization;
        /** @type {?} */
        JsonApiModel.prototype.lastSyncModels;
        /**
         * @type {?}
         * @private
         */
        JsonApiModel.prototype.internalDatastore;
        /* Skipping unhandled member: [key: string]: any;*/
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function JsonApiError() { }
    if (false) {
        /** @type {?|undefined} */
        JsonApiError.prototype.id;
        /** @type {?|undefined} */
        JsonApiError.prototype.links;
        /** @type {?|undefined} */
        JsonApiError.prototype.status;
        /** @type {?|undefined} */
        JsonApiError.prototype.code;
        /** @type {?|undefined} */
        JsonApiError.prototype.title;
        /** @type {?|undefined} */
        JsonApiError.prototype.detail;
        /** @type {?|undefined} */
        JsonApiError.prototype.source;
        /** @type {?|undefined} */
        JsonApiError.prototype.meta;
    }
    var ErrorResponse = /** @class */ (function () {
        function ErrorResponse(errors) {
            this.errors = [];
            if (errors) {
                this.errors = errors;
            }
        }
        return ErrorResponse;
    }());
    if (false) {
        /** @type {?} */
        ErrorResponse.prototype.errors;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var   /**
     * @template T
     */
    JsonApiQueryData = /** @class */ (function () {
        function JsonApiQueryData(jsonApiModels, metaData) {
            this.jsonApiModels = jsonApiModels;
            this.metaData = metaData;
        }
        /**
         * @return {?}
         */
        JsonApiQueryData.prototype.getModels = /**
         * @return {?}
         */
        function () {
            return this.jsonApiModels;
        };
        /**
         * @return {?}
         */
        JsonApiQueryData.prototype.getMeta = /**
         * @return {?}
         */
        function () {
            return this.metaData;
        };
        return JsonApiQueryData;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        JsonApiQueryData.prototype.jsonApiModels;
        /**
         * @type {?}
         * @protected
         */
        JsonApiQueryData.prototype.metaData;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function Overrides() { }
    if (false) {
        /** @type {?|undefined} */
        Overrides.prototype.getDirtyAttributes;
        /** @type {?|undefined} */
        Overrides.prototype.toQueryString;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function JsonModelConverterConfig() { }
    if (false) {
        /** @type {?|undefined} */
        JsonModelConverterConfig.prototype.nullValue;
        /** @type {?|undefined} */
        JsonModelConverterConfig.prototype.hasMany;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function DatastoreConfig() { }
    if (false) {
        /** @type {?|undefined} */
        DatastoreConfig.prototype.apiVersion;
        /** @type {?|undefined} */
        DatastoreConfig.prototype.baseUrl;
        /** @type {?|undefined} */
        DatastoreConfig.prototype.models;
        /** @type {?|undefined} */
        DatastoreConfig.prototype.overrides;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     * @template T
     */
    function ModelConfig() { }
    if (false) {
        /** @type {?} */
        ModelConfig.prototype.type;
        /** @type {?|undefined} */
        ModelConfig.prototype.apiVersion;
        /** @type {?|undefined} */
        ModelConfig.prototype.baseUrl;
        /** @type {?|undefined} */
        ModelConfig.prototype.modelEndpointUrl;
        /** @type {?|undefined} */
        ModelConfig.prototype.meta;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AttributeDecoratorOptions() { }
    if (false) {
        /** @type {?|undefined} */
        AttributeDecoratorOptions.prototype.serializedName;
        /** @type {?|undefined} */
        AttributeDecoratorOptions.prototype.converter;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function PropertyConverter() { }
    if (false) {
        /**
         * @param {?} value
         * @return {?}
         */
        PropertyConverter.prototype.mask = function (value) { };
        /**
         * @param {?} value
         * @return {?}
         */
        PropertyConverter.prototype.unmask = function (value) { };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // tslint:disable-next-line:variable-name
    /**
     * HACK/FIXME:
     * Type 'symbol' cannot be used as an index type.
     * TypeScript 2.9.x
     * See https://github.com/Microsoft/TypeScript/issues/24587.
     * @type {?}
     */
    var AttributeMetadataIndex$1 = (/** @type {?} */ (AttributeMetadata));
    var JsonApiDatastore = /** @class */ (function () {
        function JsonApiDatastore(http) {
            this.http = http;
            this.globalRequestOptions = {};
            this.internalStore = {};
            this.toQueryString = this.datastoreConfig.overrides
                && this.datastoreConfig.overrides.toQueryString ?
                this.datastoreConfig.overrides.toQueryString : this._toQueryString;
        }
        Object.defineProperty(JsonApiDatastore.prototype, "headers", {
            set: /**
             * @param {?} headers
             * @return {?}
             */
            function (headers) {
                this.globalHeaders = headers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JsonApiDatastore.prototype, "requestOptions", {
            set: /**
             * @param {?} requestOptions
             * @return {?}
             */
            function (requestOptions) {
                this.globalRequestOptions = requestOptions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JsonApiDatastore.prototype, "datastoreConfig", {
            get: /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var configFromDecorator = Reflect.getMetadata('JsonApiDatastoreConfig', this.constructor);
                return Object.assign(configFromDecorator, this.config);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JsonApiDatastore.prototype, "getDirtyAttributes", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                if (this.datastoreConfig.overrides
                    && this.datastoreConfig.overrides.getDirtyAttributes) {
                    return this.datastoreConfig.overrides.getDirtyAttributes;
                }
                return JsonApiDatastore.getDirtyAttributes;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @param {?} attributesMetadata
         * @return {?}
         */
        JsonApiDatastore.getDirtyAttributes = /**
         * @private
         * @param {?} attributesMetadata
         * @return {?}
         */
        function (attributesMetadata) {
            /** @type {?} */
            var dirtyData = {};
            for (var propertyName in attributesMetadata) {
                if (attributesMetadata.hasOwnProperty(propertyName)) {
                    /** @type {?} */
                    var metadata = attributesMetadata[propertyName];
                    if (metadata.hasDirtyAttributes) {
                        /** @type {?} */
                        var attributeName = metadata.serializedName != null ? metadata.serializedName : propertyName;
                        dirtyData[attributeName] = metadata.serialisationValue ? metadata.serialisationValue : metadata.newValue;
                    }
                }
            }
            return dirtyData;
        };
        /**
         * @deprecated use findAll method to take all models
         */
        /**
         * @deprecated use findAll method to take all models
         * @template T
         * @param {?} modelType
         * @param {?=} params
         * @param {?=} headers
         * @param {?=} customUrl
         * @return {?}
         */
        JsonApiDatastore.prototype.query = /**
         * @deprecated use findAll method to take all models
         * @template T
         * @param {?} modelType
         * @param {?=} params
         * @param {?=} headers
         * @param {?=} customUrl
         * @return {?}
         */
        function (modelType, params, headers, customUrl) {
            var _this = this;
            /** @type {?} */
            var requestHeaders = this.buildHttpHeaders(headers);
            /** @type {?} */
            var url = this.buildUrl(modelType, params, undefined, customUrl);
            return this.http.get(url, { headers: requestHeaders })
                .pipe(operators.map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.extractQueryData(res, modelType); })), operators.catchError((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.handleError(res); })));
        };
        /**
         * @template T
         * @param {?} modelType
         * @param {?=} params
         * @param {?=} headers
         * @param {?=} customUrl
         * @return {?}
         */
        JsonApiDatastore.prototype.findAll = /**
         * @template T
         * @param {?} modelType
         * @param {?=} params
         * @param {?=} headers
         * @param {?=} customUrl
         * @return {?}
         */
        function (modelType, params, headers, customUrl) {
            var _this = this;
            /** @type {?} */
            var url = this.buildUrl(modelType, params, undefined, customUrl);
            /** @type {?} */
            var requestOptions = this.buildRequestOptions({ headers: headers, observe: 'response' });
            return this.http.get(url, requestOptions)
                .pipe(operators.map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.extractQueryData(res, modelType, true); })), operators.catchError((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.handleError(res); })));
        };
        /**
         * @template T
         * @param {?} modelType
         * @param {?} id
         * @param {?=} params
         * @param {?=} headers
         * @param {?=} customUrl
         * @return {?}
         */
        JsonApiDatastore.prototype.findRecord = /**
         * @template T
         * @param {?} modelType
         * @param {?} id
         * @param {?=} params
         * @param {?=} headers
         * @param {?=} customUrl
         * @return {?}
         */
        function (modelType, id, params, headers, customUrl) {
            var _this = this;
            /** @type {?} */
            var requestOptions = this.buildRequestOptions({ headers: headers, observe: 'response' });
            /** @type {?} */
            var url = this.buildUrl(modelType, params, id, customUrl);
            return this.http.get(url, requestOptions)
                .pipe(operators.map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.extractRecordData(res, modelType); })), operators.catchError((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.handleError(res); })));
        };
        /**
         * @template T
         * @param {?} modelType
         * @param {?=} data
         * @return {?}
         */
        JsonApiDatastore.prototype.createRecord = /**
         * @template T
         * @param {?} modelType
         * @param {?=} data
         * @return {?}
         */
        function (modelType, data) {
            return new modelType(this, { attributes: data });
        };
        /**
         * @template T
         * @param {?} attributesMetadata
         * @param {?} model
         * @param {?=} params
         * @param {?=} headers
         * @param {?=} customUrl
         * @return {?}
         */
        JsonApiDatastore.prototype.saveRecord = /**
         * @template T
         * @param {?} attributesMetadata
         * @param {?} model
         * @param {?=} params
         * @param {?=} headers
         * @param {?=} customUrl
         * @return {?}
         */
        function (attributesMetadata, model, params, headers, customUrl) {
            var _this = this;
            /** @type {?} */
            var modelType = (/** @type {?} */ (model.constructor));
            /** @type {?} */
            var modelConfig = model.modelConfig;
            /** @type {?} */
            var typeName = modelConfig.type;
            /** @type {?} */
            var relationships = this.getRelationships(model);
            /** @type {?} */
            var url = this.buildUrl(modelType, params, model.id, customUrl);
            /** @type {?} */
            var httpCall;
            /** @type {?} */
            var body = {
                data: {
                    relationships: relationships,
                    type: typeName,
                    id: model.id,
                    attributes: this.getDirtyAttributes(attributesMetadata, model)
                }
            };
            /** @type {?} */
            var requestOptions = this.buildRequestOptions({ headers: headers, observe: 'response' });
            if (model.id) {
                httpCall = (/** @type {?} */ (this.http.patch(url, body, requestOptions)));
            }
            else {
                httpCall = (/** @type {?} */ (this.http.post(url, body, requestOptions)));
            }
            return httpCall
                .pipe(operators.map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return [200, 201].indexOf(res.status) !== -1 ? _this.extractRecordData(res, modelType, model) : model; })), operators.catchError((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                if (res == null) {
                    return rxjs.of(model);
                }
                return _this.handleError(res);
            })), operators.map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.updateRelationships(res, relationships); })));
        };
        /**
         * @template T
         * @param {?} modelType
         * @param {?} id
         * @param {?=} headers
         * @param {?=} customUrl
         * @return {?}
         */
        JsonApiDatastore.prototype.deleteRecord = /**
         * @template T
         * @param {?} modelType
         * @param {?} id
         * @param {?=} headers
         * @param {?=} customUrl
         * @return {?}
         */
        function (modelType, id, headers, customUrl) {
            var _this = this;
            /** @type {?} */
            var requestOptions = this.buildRequestOptions({ headers: headers });
            /** @type {?} */
            var url = this.buildUrl(modelType, null, id, customUrl);
            return this.http.delete(url, requestOptions)
                .pipe(operators.catchError((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.handleError(res); })));
        };
        /**
         * @template T
         * @param {?} modelType
         * @param {?} id
         * @return {?}
         */
        JsonApiDatastore.prototype.peekRecord = /**
         * @template T
         * @param {?} modelType
         * @param {?} id
         * @return {?}
         */
        function (modelType, id) {
            /** @type {?} */
            var type = Reflect.getMetadata('JsonApiModelConfig', modelType).type;
            return this.internalStore[type] ? (/** @type {?} */ (this.internalStore[type][id])) : null;
        };
        /**
         * @template T
         * @param {?} modelType
         * @return {?}
         */
        JsonApiDatastore.prototype.peekAll = /**
         * @template T
         * @param {?} modelType
         * @return {?}
         */
        function (modelType) {
            /** @type {?} */
            var type = Reflect.getMetadata('JsonApiModelConfig', modelType).type;
            /** @type {?} */
            var typeStore = this.internalStore[type];
            return typeStore ? Object.keys(typeStore).map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return (/** @type {?} */ (typeStore[key])); })) : [];
        };
        /**
         * @template T
         * @param {?} modelType
         * @param {?} data
         * @return {?}
         */
        JsonApiDatastore.prototype.deserializeModel = /**
         * @template T
         * @param {?} modelType
         * @param {?} data
         * @return {?}
         */
        function (modelType, data) {
            data.attributes = this.transformSerializedNamesToPropertyNames(modelType, data.attributes);
            return new modelType(this, data);
        };
        /**
         * @param {?} modelOrModels
         * @return {?}
         */
        JsonApiDatastore.prototype.addToStore = /**
         * @param {?} modelOrModels
         * @return {?}
         */
        function (modelOrModels) {
            var e_1, _a;
            /** @type {?} */
            var models = Array.isArray(modelOrModels) ? modelOrModels : [modelOrModels];
            /** @type {?} */
            var type = models[0].modelConfig.type;
            /** @type {?} */
            var typeStore = this.internalStore[type];
            if (!typeStore) {
                typeStore = this.internalStore[type] = {};
            }
            try {
                for (var models_1 = __values(models), models_1_1 = models_1.next(); !models_1_1.done; models_1_1 = models_1.next()) {
                    var model = models_1_1.value;
                    typeStore[model.id] = model;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (models_1_1 && !models_1_1.done && (_a = models_1.return)) _a.call(models_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * @template T
         * @param {?} modelType
         * @param {?} attributes
         * @return {?}
         */
        JsonApiDatastore.prototype.transformSerializedNamesToPropertyNames = /**
         * @template T
         * @param {?} modelType
         * @param {?} attributes
         * @return {?}
         */
        function (modelType, attributes) {
            if (!attributes) {
                return {};
            }
            /** @type {?} */
            var serializedNameToPropertyName = this.getModelPropertyNames(modelType.prototype);
            /** @type {?} */
            var properties = {};
            Object.keys(serializedNameToPropertyName).forEach((/**
             * @param {?} serializedName
             * @return {?}
             */
            function (serializedName) {
                if (attributes[serializedName] !== undefined) {
                    properties[serializedNameToPropertyName[serializedName]] = attributes[serializedName];
                }
            }));
            return properties;
        };
        /**
         * @protected
         * @template T
         * @param {?} modelType
         * @param {?=} params
         * @param {?=} id
         * @param {?=} customUrl
         * @return {?}
         */
        JsonApiDatastore.prototype.buildUrl = /**
         * @protected
         * @template T
         * @param {?} modelType
         * @param {?=} params
         * @param {?=} id
         * @param {?=} customUrl
         * @return {?}
         */
        function (modelType, params, id, customUrl) {
            // TODO: use HttpParams instead of appending a string to the url
            /** @type {?} */
            var queryParams = this.toQueryString(params);
            if (customUrl) {
                return queryParams ? customUrl + "?" + queryParams : customUrl;
            }
            /** @type {?} */
            var modelConfig = Reflect.getMetadata('JsonApiModelConfig', modelType);
            /** @type {?} */
            var baseUrl = modelConfig.baseUrl || this.datastoreConfig.baseUrl;
            /** @type {?} */
            var apiVersion = modelConfig.apiVersion || this.datastoreConfig.apiVersion;
            /** @type {?} */
            var modelEndpointUrl = modelConfig.modelEndpointUrl || modelConfig.type;
            /** @type {?} */
            var url = [baseUrl, apiVersion, modelEndpointUrl, id].filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x; })).join('/');
            return queryParams ? url + "?" + queryParams : url;
        };
        /**
         * @protected
         * @param {?} data
         * @return {?}
         */
        JsonApiDatastore.prototype.getRelationships = /**
         * @protected
         * @param {?} data
         * @return {?}
         */
        function (data) {
            var _this = this;
            /** @type {?} */
            var relationships;
            /** @type {?} */
            var belongsToMetadata = Reflect.getMetadata('BelongsTo', data) || [];
            /** @type {?} */
            var hasManyMetadata = Reflect.getMetadata('HasMany', data) || [];
            var _loop_1 = function (key) {
                if (data.hasOwnProperty(key)) {
                    if (data[key] instanceof JsonApiModel) {
                        relationships = relationships || {};
                        if (data[key].id) {
                            /** @type {?} */
                            var entity = belongsToMetadata.find((/**
                             * @param {?} it
                             * @return {?}
                             */
                            function (it) { return it.propertyName === key; }));
                            /** @type {?} */
                            var relationshipKey = entity.relationship;
                            relationships[relationshipKey] = {
                                data: this_1.buildSingleRelationshipData(data[key])
                            };
                        }
                    }
                    else if (data[key] instanceof Array) {
                        /** @type {?} */
                        var entity = hasManyMetadata.find((/**
                         * @param {?} it
                         * @return {?}
                         */
                        function (it) { return it.propertyName === key; }));
                        if (entity && this_1.isValidToManyRelation(data[key])) {
                            relationships = relationships || {};
                            /** @type {?} */
                            var relationshipKey = entity.relationship;
                            /** @type {?} */
                            var relationshipData = data[key]
                                .filter((/**
                             * @param {?} model
                             * @return {?}
                             */
                            function (model) { return model.id; }))
                                .map((/**
                             * @param {?} model
                             * @return {?}
                             */
                            function (model) { return _this.buildSingleRelationshipData(model); }));
                            relationships[relationshipKey] = {
                                data: relationshipData
                            };
                        }
                    }
                    else if (data[key] === null) {
                        /** @type {?} */
                        var entity = belongsToMetadata.find((/**
                         * @param {?} entity
                         * @return {?}
                         */
                        function (entity) { return entity.propertyName === key; }));
                        if (entity) {
                            relationships = relationships || {};
                            relationships[entity.relationship] = {
                                data: null
                            };
                        }
                    }
                }
            };
            var this_1 = this;
            for (var key in data) {
                _loop_1(key);
            }
            return relationships;
        };
        /**
         * @protected
         * @param {?} objects
         * @return {?}
         */
        JsonApiDatastore.prototype.isValidToManyRelation = /**
         * @protected
         * @param {?} objects
         * @return {?}
         */
        function (objects) {
            if (!objects.length) {
                return true;
            }
            /** @type {?} */
            var isJsonApiModel = objects.every((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item instanceof JsonApiModel; }));
            if (!isJsonApiModel) {
                return false;
            }
            /** @type {?} */
            var types = objects.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.modelConfig.modelEndpointUrl || item.modelConfig.type; }));
            return types
                .filter((/**
             * @param {?} type
             * @param {?} index
             * @param {?} self
             * @return {?}
             */
            function (type, index, self) { return self.indexOf(type) === index; }))
                .length === 1;
        };
        /**
         * @protected
         * @param {?} model
         * @return {?}
         */
        JsonApiDatastore.prototype.buildSingleRelationshipData = /**
         * @protected
         * @param {?} model
         * @return {?}
         */
        function (model) {
            /** @type {?} */
            var relationshipType = model.modelConfig.type;
            /** @type {?} */
            var relationShipData = { type: relationshipType };
            if (model.id) {
                relationShipData.id = model.id;
            }
            else {
                /** @type {?} */
                var attributesMetadata = Reflect.getMetadata('Attribute', model);
                relationShipData.attributes = this.getDirtyAttributes(attributesMetadata, model);
            }
            return relationShipData;
        };
        /**
         * @protected
         * @template T
         * @param {?} response
         * @param {?} modelType
         * @param {?=} withMeta
         * @return {?}
         */
        JsonApiDatastore.prototype.extractQueryData = /**
         * @protected
         * @template T
         * @param {?} response
         * @param {?} modelType
         * @param {?=} withMeta
         * @return {?}
         */
        function (response, modelType, withMeta) {
            var _this = this;
            if (withMeta === void 0) { withMeta = false; }
            /** @type {?} */
            var body = response.body;
            /** @type {?} */
            var models = [];
            body.data.forEach((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var model = _this.deserializeModel(modelType, data);
                _this.addToStore(model);
                if (body.included) {
                    model.syncRelationships(data, body.included.concat(data));
                    _this.addToStore(model);
                }
                models.push(model);
            }));
            if (withMeta && withMeta === true) {
                return new JsonApiQueryData(models, this.parseMeta(body, modelType));
            }
            return models;
        };
        /**
         * @protected
         * @template T
         * @param {?} res
         * @param {?} modelType
         * @param {?=} model
         * @return {?}
         */
        JsonApiDatastore.prototype.extractRecordData = /**
         * @protected
         * @template T
         * @param {?} res
         * @param {?} modelType
         * @param {?=} model
         * @return {?}
         */
        function (res, modelType, model) {
            /** @type {?} */
            var body = res.body;
            // Error in Angular < 5.2.4 (see https://github.com/angular/angular/issues/20744)
            // null is converted to 'null', so this is temporary needed to make testcase possible
            // (and to avoid a decrease of the coverage)
            if (!body || body === 'null') {
                throw new Error('no body in response');
            }
            if (!body.data) {
                if (res.status === 201 || !model) {
                    throw new Error('expected data in response');
                }
                return model;
            }
            if (model) {
                model.modelInitialization = true;
                model.id = body.data.id;
                Object.assign(model, body.data.attributes);
                model.modelInitialization = false;
            }
            /** @type {?} */
            var deserializedModel = model || this.deserializeModel(modelType, body.data);
            this.addToStore(deserializedModel);
            if (body.included) {
                deserializedModel.syncRelationships(body.data, body.included);
                this.addToStore(deserializedModel);
            }
            return deserializedModel;
        };
        /**
         * @protected
         * @param {?} error
         * @return {?}
         */
        JsonApiDatastore.prototype.handleError = /**
         * @protected
         * @param {?} error
         * @return {?}
         */
        function (error) {
            if (error instanceof http.HttpErrorResponse &&
                error.error instanceof Object &&
                error.error.errors &&
                error.error.errors instanceof Array) {
                /** @type {?} */
                var errors = new ErrorResponse(error.error.errors);
                return rxjs.throwError(errors);
            }
            return rxjs.throwError(error);
        };
        /**
         * @protected
         * @param {?} body
         * @param {?} modelType
         * @return {?}
         */
        JsonApiDatastore.prototype.parseMeta = /**
         * @protected
         * @param {?} body
         * @param {?} modelType
         * @return {?}
         */
        function (body, modelType) {
            /** @type {?} */
            var metaModel = Reflect.getMetadata('JsonApiModelConfig', modelType).meta;
            return new metaModel(body);
        };
        /**
         * @deprecated use buildHttpHeaders method to build request headers
         */
        /**
         * @deprecated use buildHttpHeaders method to build request headers
         * @protected
         * @param {?=} customHeaders
         * @return {?}
         */
        JsonApiDatastore.prototype.getOptions = /**
         * @deprecated use buildHttpHeaders method to build request headers
         * @protected
         * @param {?=} customHeaders
         * @return {?}
         */
        function (customHeaders) {
            return {
                headers: this.buildHttpHeaders(customHeaders),
            };
        };
        /**
         * @protected
         * @param {?=} customHeaders
         * @return {?}
         */
        JsonApiDatastore.prototype.buildHttpHeaders = /**
         * @protected
         * @param {?=} customHeaders
         * @return {?}
         */
        function (customHeaders) {
            var _this = this;
            /** @type {?} */
            var requestHeaders = new http.HttpHeaders({
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            });
            if (this.globalHeaders) {
                this.globalHeaders.keys().forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    if (_this.globalHeaders.has(key)) {
                        requestHeaders = requestHeaders.set(key, _this.globalHeaders.get(key));
                    }
                }));
            }
            if (customHeaders) {
                customHeaders.keys().forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    if (customHeaders.has(key)) {
                        requestHeaders = requestHeaders.set(key, customHeaders.get(key));
                    }
                }));
            }
            return requestHeaders;
        };
        /**
         * @protected
         * @template T
         * @param {?} res
         * @param {?} attributesMetadata
         * @param {?} modelType
         * @return {?}
         */
        JsonApiDatastore.prototype.resetMetadataAttributes = /**
         * @protected
         * @template T
         * @param {?} res
         * @param {?} attributesMetadata
         * @param {?} modelType
         * @return {?}
         */
        function (res, attributesMetadata, modelType) {
            for (var propertyName in attributesMetadata) {
                if (attributesMetadata.hasOwnProperty(propertyName)) {
                    /** @type {?} */
                    var metadata = attributesMetadata[propertyName];
                    if (metadata.hasDirtyAttributes) {
                        metadata.hasDirtyAttributes = false;
                    }
                }
            }
            // @ts-ignore
            res[AttributeMetadataIndex$1] = attributesMetadata;
            return res;
        };
        /**
         * @protected
         * @template T
         * @param {?} model
         * @param {?} relationships
         * @return {?}
         */
        JsonApiDatastore.prototype.updateRelationships = /**
         * @protected
         * @template T
         * @param {?} model
         * @param {?} relationships
         * @return {?}
         */
        function (model, relationships) {
            /** @type {?} */
            var modelsTypes = Reflect.getMetadata('JsonApiDatastoreConfig', this.constructor).models;
            for (var relationship in relationships) {
                if (relationships.hasOwnProperty(relationship) && model.hasOwnProperty(relationship) && model[relationship]) {
                    /** @type {?} */
                    var relationshipModel = model[relationship];
                    /** @type {?} */
                    var hasMany = Reflect.getMetadata('HasMany', relationshipModel);
                    /** @type {?} */
                    var propertyHasMany = lodashEs.find(hasMany, (/**
                     * @param {?} property
                     * @return {?}
                     */
                    function (property) {
                        return modelsTypes[property.relationship] === model.constructor;
                    }));
                    if (propertyHasMany) {
                        relationshipModel[propertyHasMany.propertyName] = relationshipModel[propertyHasMany.propertyName] || [];
                        /** @type {?} */
                        var indexOfModel = relationshipModel[propertyHasMany.propertyName].indexOf(model);
                        if (indexOfModel === -1) {
                            relationshipModel[propertyHasMany.propertyName].push(model);
                        }
                        else {
                            relationshipModel[propertyHasMany.propertyName][indexOfModel] = model;
                        }
                    }
                }
            }
            return model;
        };
        /**
         * @protected
         * @param {?} model
         * @return {?}
         */
        JsonApiDatastore.prototype.getModelPropertyNames = /**
         * @protected
         * @param {?} model
         * @return {?}
         */
        function (model) {
            return Reflect.getMetadata('AttributeMapping', model) || [];
        };
        /**
         * @private
         * @param {?=} customOptions
         * @return {?}
         */
        JsonApiDatastore.prototype.buildRequestOptions = /**
         * @private
         * @param {?=} customOptions
         * @return {?}
         */
        function (customOptions) {
            if (customOptions === void 0) { customOptions = {}; }
            /** @type {?} */
            var httpHeaders = this.buildHttpHeaders(customOptions.headers);
            /** @type {?} */
            var requestOptions = Object.assign(customOptions, {
                headers: httpHeaders
            });
            return Object.assign(this.globalRequestOptions, requestOptions);
        };
        /**
         * @private
         * @param {?} params
         * @return {?}
         */
        JsonApiDatastore.prototype._toQueryString = /**
         * @private
         * @param {?} params
         * @return {?}
         */
        function (params) {
            return qs.stringify(params, { arrayFormat: 'brackets' });
        };
        JsonApiDatastore.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        JsonApiDatastore.ctorParameters = function () { return [
            { type: http.HttpClient }
        ]; };
        return JsonApiDatastore;
    }());
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        JsonApiDatastore.prototype.config;
        /**
         * @type {?}
         * @private
         */
        JsonApiDatastore.prototype.globalHeaders;
        /**
         * @type {?}
         * @private
         */
        JsonApiDatastore.prototype.globalRequestOptions;
        /**
         * @type {?}
         * @private
         */
        JsonApiDatastore.prototype.internalStore;
        /**
         * @type {?}
         * @private
         */
        JsonApiDatastore.prototype.toQueryString;
        /**
         * @type {?}
         * @protected
         */
        JsonApiDatastore.prototype.http;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PROVIDERS = [
        JsonApiDatastore
    ];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var JsonApiModule = /** @class */ (function () {
        function JsonApiModule() {
        }
        JsonApiModule.decorators = [
            { type: core.NgModule, args: [{
                        providers: [PROVIDERS],
                        exports: [http.HttpClientModule]
                    },] }
        ];
        return JsonApiModule;
    }());

    exports.Attribute = Attribute;
    exports.BelongsTo = BelongsTo;
    exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
    exports.ErrorResponse = ErrorResponse;
    exports.HasMany = HasMany;
    exports.JsonApiDatastore = JsonApiDatastore;
    exports.JsonApiDatastoreConfig = JsonApiDatastoreConfig;
    exports.JsonApiMetaModel = JsonApiMetaModel;
    exports.JsonApiModel = JsonApiModel;
    exports.JsonApiModelConfig = JsonApiModelConfig;
    exports.JsonApiModule = JsonApiModule;
    exports.JsonApiNestedModel = JsonApiNestedModel;
    exports.JsonApiQueryData = JsonApiQueryData;
    exports.JsonAttribute = JsonAttribute;
    exports.JsonModelConverter = JsonModelConverter;
    exports.NestedAttribute = NestedAttribute;
    exports.PROVIDERS = PROVIDERS;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=angular2-jsonapi.umd.js.map
