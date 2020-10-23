/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { find } from 'lodash-es';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { JsonApiModel } from '../models/json-api.model';
import { ErrorResponse } from '../models/error-response.model';
import { JsonApiQueryData } from '../models/json-api-query-data';
import * as qs from 'qs';
import { AttributeMetadata } from '../constants/symbols';
import 'reflect-metadata';
// tslint:disable-next-line:variable-name
/**
 * HACK/FIXME:
 * Type 'symbol' cannot be used as an index type.
 * TypeScript 2.9.x
 * See https://github.com/Microsoft/TypeScript/issues/24587.
 * @type {?}
 */
var AttributeMetadataIndex = (/** @type {?} */ (AttributeMetadata));
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
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.extractQueryData(res, modelType); })), catchError((/**
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
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.extractQueryData(res, modelType, true); })), catchError((/**
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
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.extractRecordData(res, modelType); })), catchError((/**
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
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return [200, 201].indexOf(res.status) !== -1 ? _this.extractRecordData(res, modelType, model) : model; })), catchError((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res == null) {
                return of(model);
            }
            return _this.handleError(res);
        })), map((/**
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
            .pipe(catchError((/**
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
            for (var models_1 = tslib_1.__values(models), models_1_1 = models_1.next(); !models_1_1.done; models_1_1 = models_1.next()) {
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
        if (error instanceof HttpErrorResponse &&
            error.error instanceof Object &&
            error.error.errors &&
            error.error.errors instanceof Array) {
            /** @type {?} */
            var errors = new ErrorResponse(error.error.errors);
            return throwError(errors);
        }
        return throwError(error);
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
        var requestHeaders = new HttpHeaders({
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
        res[AttributeMetadataIndex] = attributesMetadata;
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
                var propertyHasMany = find(hasMany, (/**
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
        { type: Injectable }
    ];
    /** @nocollapse */
    JsonApiDatastore.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return JsonApiDatastore;
}());
export { JsonApiDatastore };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1hcGktZGF0YXN0b3JlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsic2VydmljZXMvanNvbi1hcGktZGF0YXN0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFnQixNQUFNLHNCQUFzQixDQUFDO0FBQ2hHLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBR3pCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sa0JBQWtCLENBQUM7Ozs7Ozs7OztJQVdwQixzQkFBc0IsR0FBVyxtQkFBQSxpQkFBaUIsRUFBTztBQUUvRDtJQVdFLDBCQUFzQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBTjlCLHlCQUFvQixHQUFXLEVBQUUsQ0FBQztRQUNsQyxrQkFBYSxHQUF1RCxFQUFFLENBQUM7UUFDdkUsa0JBQWEsR0FBNEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTO2VBQzVFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFD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SUFtZ0JuQix1QkFBQztDQUFBLEFBM2VELElBMmVDO1NBMWVZLGdCQUFnQjs7Ozs7O0lBRTNCLGtDQUFrQzs7Ozs7SUFDbEMseUNBQW1DOzs7OztJQUNuQyxnREFBMEM7Ozs7O0lBQzFDLHlDQUErRTs7Ozs7SUFDL0UseUNBRXFFOzs7OztJQUV6RCxnQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBmaW5kIH0gZnJvbSAnbG9kYXNoLWVzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBKc29uQXBpTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvanNvbi1hcGkubW9kZWwnO1xyXG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgSnNvbkFwaVF1ZXJ5RGF0YSB9IGZyb20gJy4uL21vZGVscy9qc29uLWFwaS1xdWVyeS1kYXRhJztcclxuaW1wb3J0ICogYXMgcXMgZnJvbSAncXMnO1xyXG5pbXBvcnQgeyBEYXRhc3RvcmVDb25maWcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2RhdGFzdG9yZS1jb25maWcuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTW9kZWxDb25maWcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL21vZGVsLWNvbmZpZy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVNZXRhZGF0YSB9IGZyb20gJy4uL2NvbnN0YW50cy9zeW1ib2xzJztcclxuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcclxuXHJcbmV4cG9ydCB0eXBlIE1vZGVsVHlwZTxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPiA9IG5ldyhkYXRhc3RvcmU6IEpzb25BcGlEYXRhc3RvcmUsIGRhdGE6IGFueSkgPT4gVDtcclxuXHJcbi8qKlxyXG4gKiBIQUNLL0ZJWE1FOlxyXG4gKiBUeXBlICdzeW1ib2wnIGNhbm5vdCBiZSB1c2VkIGFzIGFuIGluZGV4IHR5cGUuXHJcbiAqIFR5cGVTY3JpcHQgMi45LnhcclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMjQ1ODcuXHJcbiAqL1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxyXG5jb25zdCBBdHRyaWJ1dGVNZXRhZGF0YUluZGV4OiBzdHJpbmcgPSBBdHRyaWJ1dGVNZXRhZGF0YSBhcyBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBKc29uQXBpRGF0YXN0b3JlIHtcclxuXHJcbiAgcHJvdGVjdGVkIGNvbmZpZzogRGF0YXN0b3JlQ29uZmlnO1xyXG4gIHByaXZhdGUgZ2xvYmFsSGVhZGVyczogSHR0cEhlYWRlcnM7XHJcbiAgcHJpdmF0ZSBnbG9iYWxSZXF1ZXN0T3B0aW9uczogb2JqZWN0ID0ge307XHJcbiAgcHJpdmF0ZSBpbnRlcm5hbFN0b3JlOiB7IFt0eXBlOiBzdHJpbmddOiB7IFtpZDogc3RyaW5nXTogSnNvbkFwaU1vZGVsIH0gfSA9IHt9O1xyXG4gIHByaXZhdGUgdG9RdWVyeVN0cmluZzogKHBhcmFtczogYW55KSA9PiBzdHJpbmcgPSB0aGlzLmRhdGFzdG9yZUNvbmZpZy5vdmVycmlkZXNcclxuICAmJiB0aGlzLmRhdGFzdG9yZUNvbmZpZy5vdmVycmlkZXMudG9RdWVyeVN0cmluZyA/XHJcbiAgICB0aGlzLmRhdGFzdG9yZUNvbmZpZy5vdmVycmlkZXMudG9RdWVyeVN0cmluZyA6IHRoaXMuX3RvUXVlcnlTdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgfVxyXG5cclxuICBzZXQgaGVhZGVycyhoZWFkZXJzOiBIdHRwSGVhZGVycykge1xyXG4gICAgdGhpcy5nbG9iYWxIZWFkZXJzID0gaGVhZGVycztcclxuICB9XHJcblxyXG4gIHNldCByZXF1ZXN0T3B0aW9ucyhyZXF1ZXN0T3B0aW9uczogb2JqZWN0KSB7XHJcbiAgICB0aGlzLmdsb2JhbFJlcXVlc3RPcHRpb25zID0gcmVxdWVzdE9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGRhdGFzdG9yZUNvbmZpZygpOiBEYXRhc3RvcmVDb25maWcge1xyXG4gICAgY29uc3QgY29uZmlnRnJvbURlY29yYXRvcjogRGF0YXN0b3JlQ29uZmlnID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaURhdGFzdG9yZUNvbmZpZycsIHRoaXMuY29uc3RydWN0b3IpO1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oY29uZmlnRnJvbURlY29yYXRvciwgdGhpcy5jb25maWcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXQgZ2V0RGlydHlBdHRyaWJ1dGVzKCkge1xyXG4gICAgaWYgKHRoaXMuZGF0YXN0b3JlQ29uZmlnLm92ZXJyaWRlc1xyXG4gICAgICAmJiB0aGlzLmRhdGFzdG9yZUNvbmZpZy5vdmVycmlkZXMuZ2V0RGlydHlBdHRyaWJ1dGVzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRhdGFzdG9yZUNvbmZpZy5vdmVycmlkZXMuZ2V0RGlydHlBdHRyaWJ1dGVzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEpzb25BcGlEYXRhc3RvcmUuZ2V0RGlydHlBdHRyaWJ1dGVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0RGlydHlBdHRyaWJ1dGVzKGF0dHJpYnV0ZXNNZXRhZGF0YTogYW55KTogeyBzdHJpbmc6IGFueSB9IHtcclxuICAgIGNvbnN0IGRpcnR5RGF0YTogYW55ID0ge307XHJcblxyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgaW4gYXR0cmlidXRlc01ldGFkYXRhKSB7XHJcbiAgICAgIGlmIChhdHRyaWJ1dGVzTWV0YWRhdGEuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhOiBhbnkgPSBhdHRyaWJ1dGVzTWV0YWRhdGFbcHJvcGVydHlOYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKG1ldGFkYXRhLmhhc0RpcnR5QXR0cmlidXRlcykge1xyXG4gICAgICAgICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IG1ldGFkYXRhLnNlcmlhbGl6ZWROYW1lICE9IG51bGwgPyBtZXRhZGF0YS5zZXJpYWxpemVkTmFtZSA6IHByb3BlcnR5TmFtZTtcclxuICAgICAgICAgIGRpcnR5RGF0YVthdHRyaWJ1dGVOYW1lXSA9IG1ldGFkYXRhLnNlcmlhbGlzYXRpb25WYWx1ZSA/IG1ldGFkYXRhLnNlcmlhbGlzYXRpb25WYWx1ZSA6IG1ldGFkYXRhLm5ld1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRpcnR5RGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkIHVzZSBmaW5kQWxsIG1ldGhvZCB0byB0YWtlIGFsbCBtb2RlbHNcclxuICAgKi9cclxuICBxdWVyeTxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgcGFyYW1zPzogYW55LFxyXG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLFxyXG4gICAgY3VzdG9tVXJsPzogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzOiBIdHRwSGVhZGVycyA9IHRoaXMuYnVpbGRIdHRwSGVhZGVycyhoZWFkZXJzKTtcclxuICAgIGNvbnN0IHVybDogc3RyaW5nID0gdGhpcy5idWlsZFVybChtb2RlbFR5cGUsIHBhcmFtcywgdW5kZWZpbmVkLCBjdXN0b21VcmwpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCB7aGVhZGVyczogcmVxdWVzdEhlYWRlcnN9KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlczogYW55KSA9PiB0aGlzLmV4dHJhY3RRdWVyeURhdGEocmVzLCBtb2RlbFR5cGUpKSxcclxuICAgICAgICBjYXRjaEVycm9yKChyZXM6IGFueSkgPT4gdGhpcy5oYW5kbGVFcnJvcihyZXMpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbmRBbGw8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oXHJcbiAgICBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPixcclxuICAgIHBhcmFtcz86IGFueSxcclxuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcclxuICAgIGN1c3RvbVVybD86IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8SnNvbkFwaVF1ZXJ5RGF0YTxUPj4ge1xyXG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSB0aGlzLmJ1aWxkVXJsKG1vZGVsVHlwZSwgcGFyYW1zLCB1bmRlZmluZWQsIGN1c3RvbVVybCk7XHJcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9uczogb2JqZWN0ID0gdGhpcy5idWlsZFJlcXVlc3RPcHRpb25zKHtoZWFkZXJzLCBvYnNlcnZlOiAncmVzcG9uc2UnfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCByZXF1ZXN0T3B0aW9ucylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZXM6IEh0dHBSZXNwb25zZTxvYmplY3Q+KSA9PiB0aGlzLmV4dHJhY3RRdWVyeURhdGEocmVzLCBtb2RlbFR5cGUsIHRydWUpKSxcclxuICAgICAgICBjYXRjaEVycm9yKChyZXM6IGFueSkgPT4gdGhpcy5oYW5kbGVFcnJvcihyZXMpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbmRSZWNvcmQ8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oXHJcbiAgICBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPixcclxuICAgIGlkOiBzdHJpbmcsXHJcbiAgICBwYXJhbXM/OiBhbnksXHJcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXHJcbiAgICBjdXN0b21Vcmw/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zOiBvYmplY3QgPSB0aGlzLmJ1aWxkUmVxdWVzdE9wdGlvbnMoe2hlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZSd9KTtcclxuICAgIGNvbnN0IHVybDogc3RyaW5nID0gdGhpcy5idWlsZFVybChtb2RlbFR5cGUsIHBhcmFtcywgaWQsIGN1c3RvbVVybCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCByZXF1ZXN0T3B0aW9ucylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZXM6IEh0dHBSZXNwb25zZTxvYmplY3Q+KSA9PiB0aGlzLmV4dHJhY3RSZWNvcmREYXRhKHJlcywgbW9kZWxUeXBlKSksXHJcbiAgICAgICAgY2F0Y2hFcnJvcigocmVzOiBhbnkpID0+IHRoaXMuaGFuZGxlRXJyb3IocmVzKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjcmVhdGVSZWNvcmQ8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4obW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sIGRhdGE/OiBhbnkpOiBUIHtcclxuICAgIHJldHVybiBuZXcgbW9kZWxUeXBlKHRoaXMsIHthdHRyaWJ1dGVzOiBkYXRhfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2F2ZVJlY29yZDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIGF0dHJpYnV0ZXNNZXRhZGF0YTogYW55LFxyXG4gICAgbW9kZWw6IFQsXHJcbiAgICBwYXJhbXM/OiBhbnksXHJcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXHJcbiAgICBjdXN0b21Vcmw/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIGNvbnN0IG1vZGVsVHlwZSA9IG1vZGVsLmNvbnN0cnVjdG9yIGFzIE1vZGVsVHlwZTxUPjtcclxuICAgIGNvbnN0IG1vZGVsQ29uZmlnOiBNb2RlbENvbmZpZyA9IG1vZGVsLm1vZGVsQ29uZmlnO1xyXG4gICAgY29uc3QgdHlwZU5hbWU6IHN0cmluZyA9IG1vZGVsQ29uZmlnLnR5cGU7XHJcbiAgICBjb25zdCByZWxhdGlvbnNoaXBzOiBhbnkgPSB0aGlzLmdldFJlbGF0aW9uc2hpcHMobW9kZWwpO1xyXG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSB0aGlzLmJ1aWxkVXJsKG1vZGVsVHlwZSwgcGFyYW1zLCBtb2RlbC5pZCwgY3VzdG9tVXJsKTtcclxuXHJcbiAgICBsZXQgaHR0cENhbGw6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPG9iamVjdD4+O1xyXG4gICAgY29uc3QgYm9keTogYW55ID0ge1xyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcmVsYXRpb25zaGlwcyxcclxuICAgICAgICB0eXBlOiB0eXBlTmFtZSxcclxuICAgICAgICBpZDogbW9kZWwuaWQsXHJcbiAgICAgICAgYXR0cmlidXRlczogdGhpcy5nZXREaXJ0eUF0dHJpYnV0ZXMoYXR0cmlidXRlc01ldGFkYXRhLCBtb2RlbClcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9uczogb2JqZWN0ID0gdGhpcy5idWlsZFJlcXVlc3RPcHRpb25zKHtoZWFkZXJzLCBvYnNlcnZlOiAncmVzcG9uc2UnfSk7XHJcblxyXG4gICAgaWYgKG1vZGVsLmlkKSB7XHJcbiAgICAgIGh0dHBDYWxsID0gdGhpcy5odHRwLnBhdGNoPG9iamVjdD4odXJsLCBib2R5LCByZXF1ZXN0T3B0aW9ucykgYXMgT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8b2JqZWN0Pj47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBodHRwQ2FsbCA9IHRoaXMuaHR0cC5wb3N0PG9iamVjdD4odXJsLCBib2R5LCByZXF1ZXN0T3B0aW9ucykgYXMgT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8b2JqZWN0Pj47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGh0dHBDYWxsXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgocmVzKSA9PiBbMjAwLCAyMDFdLmluZGV4T2YocmVzLnN0YXR1cykgIT09IC0xID8gdGhpcy5leHRyYWN0UmVjb3JkRGF0YShyZXMsIG1vZGVsVHlwZSwgbW9kZWwpIDogbW9kZWwpLFxyXG4gICAgICAgIGNhdGNoRXJyb3IoKHJlcykgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihtb2RlbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcihyZXMpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIG1hcCgocmVzKSA9PiB0aGlzLnVwZGF0ZVJlbGF0aW9uc2hpcHMocmVzLCByZWxhdGlvbnNoaXBzKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZWxldGVSZWNvcmQ8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oXHJcbiAgICBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPixcclxuICAgIGlkOiBzdHJpbmcsXHJcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXHJcbiAgICBjdXN0b21Vcmw/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9uczogb2JqZWN0ID0gdGhpcy5idWlsZFJlcXVlc3RPcHRpb25zKHtoZWFkZXJzfSk7XHJcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMuYnVpbGRVcmwobW9kZWxUeXBlLCBudWxsLCBpZCwgY3VzdG9tVXJsKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZSh1cmwsIHJlcXVlc3RPcHRpb25zKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBjYXRjaEVycm9yKChyZXM6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB0aGlzLmhhbmRsZUVycm9yKHJlcykpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcGVla1JlY29yZDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPiwgaWQ6IHN0cmluZyk6IFQgfCBudWxsIHtcclxuICAgIGNvbnN0IHR5cGU6IHN0cmluZyA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0pzb25BcGlNb2RlbENvbmZpZycsIG1vZGVsVHlwZSkudHlwZTtcclxuICAgIHJldHVybiB0aGlzLmludGVybmFsU3RvcmVbdHlwZV0gPyB0aGlzLmludGVybmFsU3RvcmVbdHlwZV1baWRdIGFzIFQgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHBlZWtBbGw8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4obW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4pOiBBcnJheTxUPiB7XHJcbiAgICBjb25zdCB0eXBlID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaU1vZGVsQ29uZmlnJywgbW9kZWxUeXBlKS50eXBlO1xyXG4gICAgY29uc3QgdHlwZVN0b3JlID0gdGhpcy5pbnRlcm5hbFN0b3JlW3R5cGVdO1xyXG4gICAgcmV0dXJuIHR5cGVTdG9yZSA/IE9iamVjdC5rZXlzKHR5cGVTdG9yZSkubWFwKChrZXkpID0+IHR5cGVTdG9yZVtrZXldIGFzIFQpIDogW107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzZXJpYWxpemVNb2RlbDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPiwgZGF0YTogYW55KSB7XHJcbiAgICBkYXRhLmF0dHJpYnV0ZXMgPSB0aGlzLnRyYW5zZm9ybVNlcmlhbGl6ZWROYW1lc1RvUHJvcGVydHlOYW1lcyhtb2RlbFR5cGUsIGRhdGEuYXR0cmlidXRlcyk7XHJcbiAgICByZXR1cm4gbmV3IG1vZGVsVHlwZSh0aGlzLCBkYXRhKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRUb1N0b3JlKG1vZGVsT3JNb2RlbHM6IEpzb25BcGlNb2RlbCB8IEpzb25BcGlNb2RlbFtdKTogdm9pZCB7XHJcbiAgICBjb25zdCBtb2RlbHMgPSBBcnJheS5pc0FycmF5KG1vZGVsT3JNb2RlbHMpID8gbW9kZWxPck1vZGVscyA6IFttb2RlbE9yTW9kZWxzXTtcclxuICAgIGNvbnN0IHR5cGU6IHN0cmluZyA9IG1vZGVsc1swXS5tb2RlbENvbmZpZy50eXBlO1xyXG4gICAgbGV0IHR5cGVTdG9yZSA9IHRoaXMuaW50ZXJuYWxTdG9yZVt0eXBlXTtcclxuXHJcbiAgICBpZiAoIXR5cGVTdG9yZSkge1xyXG4gICAgICB0eXBlU3RvcmUgPSB0aGlzLmludGVybmFsU3RvcmVbdHlwZV0gPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IG1vZGVsIG9mIG1vZGVscykge1xyXG4gICAgICB0eXBlU3RvcmVbbW9kZWwuaWRdID0gbW9kZWw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdHJhbnNmb3JtU2VyaWFsaXplZE5hbWVzVG9Qcm9wZXJ0eU5hbWVzPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LCBhdHRyaWJ1dGVzOiBhbnkpIHtcclxuICAgIGlmICghYXR0cmlidXRlcykge1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VyaWFsaXplZE5hbWVUb1Byb3BlcnR5TmFtZSA9IHRoaXMuZ2V0TW9kZWxQcm9wZXJ0eU5hbWVzKG1vZGVsVHlwZS5wcm90b3R5cGUpO1xyXG4gICAgY29uc3QgcHJvcGVydGllczogYW55ID0ge307XHJcblxyXG4gICAgT2JqZWN0LmtleXMoc2VyaWFsaXplZE5hbWVUb1Byb3BlcnR5TmFtZSkuZm9yRWFjaCgoc2VyaWFsaXplZE5hbWUpID0+IHtcclxuICAgICAgaWYgKGF0dHJpYnV0ZXNbc2VyaWFsaXplZE5hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBwcm9wZXJ0aWVzW3NlcmlhbGl6ZWROYW1lVG9Qcm9wZXJ0eU5hbWVbc2VyaWFsaXplZE5hbWVdXSA9IGF0dHJpYnV0ZXNbc2VyaWFsaXplZE5hbWVdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcHJvcGVydGllcztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZFVybDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgcGFyYW1zPzogYW55LFxyXG4gICAgaWQ/OiBzdHJpbmcsXHJcbiAgICBjdXN0b21Vcmw/OiBzdHJpbmdcclxuICApOiBzdHJpbmcge1xyXG4gICAgLy8gVE9ETzogdXNlIEh0dHBQYXJhbXMgaW5zdGVhZCBvZiBhcHBlbmRpbmcgYSBzdHJpbmcgdG8gdGhlIHVybFxyXG4gICAgY29uc3QgcXVlcnlQYXJhbXM6IHN0cmluZyA9IHRoaXMudG9RdWVyeVN0cmluZyhwYXJhbXMpO1xyXG5cclxuICAgIGlmIChjdXN0b21VcmwpIHtcclxuICAgICAgcmV0dXJuIHF1ZXJ5UGFyYW1zID8gYCR7Y3VzdG9tVXJsfT8ke3F1ZXJ5UGFyYW1zfWAgOiBjdXN0b21Vcmw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbW9kZWxDb25maWc6IE1vZGVsQ29uZmlnID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaU1vZGVsQ29uZmlnJywgbW9kZWxUeXBlKTtcclxuXHJcbiAgICBjb25zdCBiYXNlVXJsID0gbW9kZWxDb25maWcuYmFzZVVybCB8fCB0aGlzLmRhdGFzdG9yZUNvbmZpZy5iYXNlVXJsO1xyXG4gICAgY29uc3QgYXBpVmVyc2lvbiA9IG1vZGVsQ29uZmlnLmFwaVZlcnNpb24gfHwgdGhpcy5kYXRhc3RvcmVDb25maWcuYXBpVmVyc2lvbjtcclxuICAgIGNvbnN0IG1vZGVsRW5kcG9pbnRVcmw6IHN0cmluZyA9IG1vZGVsQ29uZmlnLm1vZGVsRW5kcG9pbnRVcmwgfHwgbW9kZWxDb25maWcudHlwZTtcclxuXHJcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IFtiYXNlVXJsLCBhcGlWZXJzaW9uLCBtb2RlbEVuZHBvaW50VXJsLCBpZF0uZmlsdGVyKCh4KSA9PiB4KS5qb2luKCcvJyk7XHJcblxyXG4gICAgcmV0dXJuIHF1ZXJ5UGFyYW1zID8gYCR7dXJsfT8ke3F1ZXJ5UGFyYW1zfWAgOiB1cmw7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0UmVsYXRpb25zaGlwcyhkYXRhOiBhbnkpOiBhbnkge1xyXG4gICAgbGV0IHJlbGF0aW9uc2hpcHM6IGFueTtcclxuXHJcbiAgICBjb25zdCBiZWxvbmdzVG9NZXRhZGF0YTogYW55W10gPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdCZWxvbmdzVG8nLCBkYXRhKSB8fCBbXTtcclxuICAgIGNvbnN0IGhhc01hbnlNZXRhZGF0YTogYW55W10gPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdIYXNNYW55JywgZGF0YSkgfHwgW107XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgaWYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIEpzb25BcGlNb2RlbCkge1xyXG4gICAgICAgICAgcmVsYXRpb25zaGlwcyA9IHJlbGF0aW9uc2hpcHMgfHwge307XHJcblxyXG4gICAgICAgICAgaWYgKGRhdGFba2V5XS5pZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlbnRpdHkgPSBiZWxvbmdzVG9NZXRhZGF0YS5maW5kKChpdDogYW55KSA9PiBpdC5wcm9wZXJ0eU5hbWUgPT09IGtleSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbGF0aW9uc2hpcEtleSA9IGVudGl0eS5yZWxhdGlvbnNoaXA7XHJcbiAgICAgICAgICAgIHJlbGF0aW9uc2hpcHNbcmVsYXRpb25zaGlwS2V5XSA9IHtcclxuICAgICAgICAgICAgICBkYXRhOiB0aGlzLmJ1aWxkU2luZ2xlUmVsYXRpb25zaGlwRGF0YShkYXRhW2tleV0pXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgY29uc3QgZW50aXR5ID0gaGFzTWFueU1ldGFkYXRhLmZpbmQoKGl0OiBhbnkpID0+IGl0LnByb3BlcnR5TmFtZSA9PT0ga2V5KTtcclxuICAgICAgICAgIGlmIChlbnRpdHkgJiYgdGhpcy5pc1ZhbGlkVG9NYW55UmVsYXRpb24oZGF0YVtrZXldKSkge1xyXG4gICAgICAgICAgICByZWxhdGlvbnNoaXBzID0gcmVsYXRpb25zaGlwcyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlbGF0aW9uc2hpcEtleSA9IGVudGl0eS5yZWxhdGlvbnNoaXA7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbGF0aW9uc2hpcERhdGEgPSBkYXRhW2tleV1cclxuICAgICAgICAgICAgICAuZmlsdGVyKChtb2RlbDogSnNvbkFwaU1vZGVsKSA9PiBtb2RlbC5pZClcclxuICAgICAgICAgICAgICAubWFwKChtb2RlbDogSnNvbkFwaU1vZGVsKSA9PiB0aGlzLmJ1aWxkU2luZ2xlUmVsYXRpb25zaGlwRGF0YShtb2RlbCkpO1xyXG5cclxuICAgICAgICAgICAgcmVsYXRpb25zaGlwc1tyZWxhdGlvbnNoaXBLZXldID0ge1xyXG4gICAgICAgICAgICAgIGRhdGE6IHJlbGF0aW9uc2hpcERhdGFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9ICBlbHNlIGlmIChkYXRhW2tleV0gPT09IG51bGwpIHtcclxuICAgICAgICAgIGNvbnN0IGVudGl0eSA9IGJlbG9uZ3NUb01ldGFkYXRhLmZpbmQoKGVudGl0eTogYW55KSA9PiBlbnRpdHkucHJvcGVydHlOYW1lID09PSBrZXkpO1xyXG5cclxuICAgICAgICAgIGlmIChlbnRpdHkpIHtcclxuICAgICAgICAgICAgcmVsYXRpb25zaGlwcyA9IHJlbGF0aW9uc2hpcHMgfHwge307XHJcblxyXG4gICAgICAgICAgICByZWxhdGlvbnNoaXBzW2VudGl0eS5yZWxhdGlvbnNoaXBdID0ge1xyXG4gICAgICAgICAgICAgIGRhdGE6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVsYXRpb25zaGlwcztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpc1ZhbGlkVG9NYW55UmVsYXRpb24ob2JqZWN0czogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCFvYmplY3RzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGlzSnNvbkFwaU1vZGVsID0gb2JqZWN0cy5ldmVyeSgoaXRlbSkgPT4gaXRlbSBpbnN0YW5jZW9mIEpzb25BcGlNb2RlbCk7XHJcbiAgICBpZiAoIWlzSnNvbkFwaU1vZGVsKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHR5cGVzID0gb2JqZWN0cy5tYXAoKGl0ZW06IEpzb25BcGlNb2RlbCkgPT4gaXRlbS5tb2RlbENvbmZpZy5tb2RlbEVuZHBvaW50VXJsIHx8IGl0ZW0ubW9kZWxDb25maWcudHlwZSk7XHJcbiAgICByZXR1cm4gdHlwZXNcclxuICAgICAgLmZpbHRlcigodHlwZTogc3RyaW5nLCBpbmRleDogbnVtYmVyLCBzZWxmOiBzdHJpbmdbXSkgPT4gc2VsZi5pbmRleE9mKHR5cGUpID09PSBpbmRleClcclxuICAgICAgLmxlbmd0aCA9PT0gMTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZFNpbmdsZVJlbGF0aW9uc2hpcERhdGEobW9kZWw6IEpzb25BcGlNb2RlbCk6IGFueSB7XHJcbiAgICBjb25zdCByZWxhdGlvbnNoaXBUeXBlOiBzdHJpbmcgPSBtb2RlbC5tb2RlbENvbmZpZy50eXBlO1xyXG4gICAgY29uc3QgcmVsYXRpb25TaGlwRGF0YTogeyB0eXBlOiBzdHJpbmcsIGlkPzogc3RyaW5nLCBhdHRyaWJ1dGVzPzogYW55IH0gPSB7dHlwZTogcmVsYXRpb25zaGlwVHlwZX07XHJcblxyXG4gICAgaWYgKG1vZGVsLmlkKSB7XHJcbiAgICAgIHJlbGF0aW9uU2hpcERhdGEuaWQgPSBtb2RlbC5pZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZXNNZXRhZGF0YTogYW55ID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnQXR0cmlidXRlJywgbW9kZWwpO1xyXG4gICAgICByZWxhdGlvblNoaXBEYXRhLmF0dHJpYnV0ZXMgPSB0aGlzLmdldERpcnR5QXR0cmlidXRlcyhhdHRyaWJ1dGVzTWV0YWRhdGEsIG1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVsYXRpb25TaGlwRGF0YTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBleHRyYWN0UXVlcnlEYXRhPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgcmVzcG9uc2U6IEh0dHBSZXNwb25zZTxvYmplY3Q+LFxyXG4gICAgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sXHJcbiAgICB3aXRoTWV0YSA9IGZhbHNlXHJcbiAgKTogQXJyYXk8VD4gfCBKc29uQXBpUXVlcnlEYXRhPFQ+IHtcclxuICAgIGNvbnN0IGJvZHk6IGFueSA9IHJlc3BvbnNlLmJvZHk7XHJcbiAgICBjb25zdCBtb2RlbHM6IFRbXSA9IFtdO1xyXG5cclxuICAgIGJvZHkuZGF0YS5mb3JFYWNoKChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgbW9kZWw6IFQgPSB0aGlzLmRlc2VyaWFsaXplTW9kZWwobW9kZWxUeXBlLCBkYXRhKTtcclxuICAgICAgdGhpcy5hZGRUb1N0b3JlKG1vZGVsKTtcclxuXHJcbiAgICAgIGlmIChib2R5LmluY2x1ZGVkKSB7XHJcbiAgICAgICAgbW9kZWwuc3luY1JlbGF0aW9uc2hpcHMoZGF0YSwgYm9keS5pbmNsdWRlZC5jb25jYXQoZGF0YSkpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9TdG9yZShtb2RlbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG1vZGVscy5wdXNoKG1vZGVsKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh3aXRoTWV0YSAmJiB3aXRoTWV0YSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gbmV3IEpzb25BcGlRdWVyeURhdGEobW9kZWxzLCB0aGlzLnBhcnNlTWV0YShib2R5LCBtb2RlbFR5cGUpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbW9kZWxzO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGV4dHJhY3RSZWNvcmREYXRhPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgcmVzOiBIdHRwUmVzcG9uc2U8b2JqZWN0PixcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgbW9kZWw/OiBUXHJcbiAgKTogVCB7XHJcbiAgICBjb25zdCBib2R5OiBhbnkgPSByZXMuYm9keTtcclxuICAgIC8vIEVycm9yIGluIEFuZ3VsYXIgPCA1LjIuNCAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzIwNzQ0KVxyXG4gICAgLy8gbnVsbCBpcyBjb252ZXJ0ZWQgdG8gJ251bGwnLCBzbyB0aGlzIGlzIHRlbXBvcmFyeSBuZWVkZWQgdG8gbWFrZSB0ZXN0Y2FzZSBwb3NzaWJsZVxyXG4gICAgLy8gKGFuZCB0byBhdm9pZCBhIGRlY3JlYXNlIG9mIHRoZSBjb3ZlcmFnZSlcclxuICAgIGlmICghYm9keSB8fCBib2R5ID09PSAnbnVsbCcpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBib2R5IGluIHJlc3BvbnNlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFib2R5LmRhdGEpIHtcclxuICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMSB8fCAhbW9kZWwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIGRhdGEgaW4gcmVzcG9uc2UnKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGVsKSB7XHJcbiAgICAgIG1vZGVsLm1vZGVsSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICBtb2RlbC5pZCA9IGJvZHkuZGF0YS5pZDtcclxuICAgICAgT2JqZWN0LmFzc2lnbihtb2RlbCwgYm9keS5kYXRhLmF0dHJpYnV0ZXMpO1xyXG4gICAgICBtb2RlbC5tb2RlbEluaXRpYWxpemF0aW9uID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGVzZXJpYWxpemVkTW9kZWwgPSBtb2RlbCB8fCB0aGlzLmRlc2VyaWFsaXplTW9kZWwobW9kZWxUeXBlLCBib2R5LmRhdGEpO1xyXG4gICAgdGhpcy5hZGRUb1N0b3JlKGRlc2VyaWFsaXplZE1vZGVsKTtcclxuICAgIGlmIChib2R5LmluY2x1ZGVkKSB7XHJcbiAgICAgIGRlc2VyaWFsaXplZE1vZGVsLnN5bmNSZWxhdGlvbnNoaXBzKGJvZHkuZGF0YSwgYm9keS5pbmNsdWRlZCk7XHJcbiAgICAgIHRoaXMuYWRkVG9TdG9yZShkZXNlcmlhbGl6ZWRNb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRlc2VyaWFsaXplZE1vZGVsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgaWYgKFxyXG4gICAgICBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlICYmXHJcbiAgICAgIGVycm9yLmVycm9yIGluc3RhbmNlb2YgT2JqZWN0ICYmXHJcbiAgICAgIGVycm9yLmVycm9yLmVycm9ycyAmJlxyXG4gICAgICBlcnJvci5lcnJvci5lcnJvcnMgaW5zdGFuY2VvZiBBcnJheVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yczogRXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKGVycm9yLmVycm9yLmVycm9ycyk7XHJcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9ycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHBhcnNlTWV0YShib2R5OiBhbnksIG1vZGVsVHlwZTogTW9kZWxUeXBlPEpzb25BcGlNb2RlbD4pOiBhbnkge1xyXG4gICAgY29uc3QgbWV0YU1vZGVsOiBhbnkgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpTW9kZWxDb25maWcnLCBtb2RlbFR5cGUpLm1ldGE7XHJcbiAgICByZXR1cm4gbmV3IG1ldGFNb2RlbChib2R5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkIHVzZSBidWlsZEh0dHBIZWFkZXJzIG1ldGhvZCB0byBidWlsZCByZXF1ZXN0IGhlYWRlcnNcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZ2V0T3B0aW9ucyhjdXN0b21IZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBhbnkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaGVhZGVyczogdGhpcy5idWlsZEh0dHBIZWFkZXJzKGN1c3RvbUhlYWRlcnMpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZEh0dHBIZWFkZXJzKGN1c3RvbUhlYWRlcnM/OiBIdHRwSGVhZGVycyk6IEh0dHBIZWFkZXJzIHtcclxuICAgIGxldCByZXF1ZXN0SGVhZGVyczogSHR0cEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nLFxyXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbidcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLmdsb2JhbEhlYWRlcnMpIHtcclxuICAgICAgdGhpcy5nbG9iYWxIZWFkZXJzLmtleXMoKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5nbG9iYWxIZWFkZXJzLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgICByZXF1ZXN0SGVhZGVycyA9IHJlcXVlc3RIZWFkZXJzLnNldChrZXksIHRoaXMuZ2xvYmFsSGVhZGVycy5nZXQoa2V5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VzdG9tSGVhZGVycykge1xyXG4gICAgICBjdXN0b21IZWFkZXJzLmtleXMoKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICBpZiAoY3VzdG9tSGVhZGVycy5oYXMoa2V5KSkge1xyXG4gICAgICAgICAgcmVxdWVzdEhlYWRlcnMgPSByZXF1ZXN0SGVhZGVycy5zZXQoa2V5LCBjdXN0b21IZWFkZXJzLmdldChrZXkpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXF1ZXN0SGVhZGVycztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByZXNldE1ldGFkYXRhQXR0cmlidXRlczxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihyZXM6IFQsIGF0dHJpYnV0ZXNNZXRhZGF0YTogYW55LCBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPikge1xyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgaW4gYXR0cmlidXRlc01ldGFkYXRhKSB7XHJcbiAgICAgIGlmIChhdHRyaWJ1dGVzTWV0YWRhdGEuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhOiBhbnkgPSBhdHRyaWJ1dGVzTWV0YWRhdGFbcHJvcGVydHlOYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKG1ldGFkYXRhLmhhc0RpcnR5QXR0cmlidXRlcykge1xyXG4gICAgICAgICAgbWV0YWRhdGEuaGFzRGlydHlBdHRyaWJ1dGVzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgcmVzW0F0dHJpYnV0ZU1ldGFkYXRhSW5kZXhdID0gYXR0cmlidXRlc01ldGFkYXRhO1xyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB1cGRhdGVSZWxhdGlvbnNoaXBzPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KG1vZGVsOiBULCByZWxhdGlvbnNoaXBzOiBhbnkpOiBUIHtcclxuICAgIGNvbnN0IG1vZGVsc1R5cGVzOiBhbnkgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpRGF0YXN0b3JlQ29uZmlnJywgdGhpcy5jb25zdHJ1Y3RvcikubW9kZWxzO1xyXG5cclxuICAgIGZvciAoY29uc3QgcmVsYXRpb25zaGlwIGluIHJlbGF0aW9uc2hpcHMpIHtcclxuICAgICAgaWYgKHJlbGF0aW9uc2hpcHMuaGFzT3duUHJvcGVydHkocmVsYXRpb25zaGlwKSAmJiBtb2RlbC5oYXNPd25Qcm9wZXJ0eShyZWxhdGlvbnNoaXApICYmIG1vZGVsW3JlbGF0aW9uc2hpcF0pIHtcclxuICAgICAgICBjb25zdCByZWxhdGlvbnNoaXBNb2RlbDogSnNvbkFwaU1vZGVsID0gbW9kZWxbcmVsYXRpb25zaGlwXTtcclxuICAgICAgICBjb25zdCBoYXNNYW55OiBhbnlbXSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0hhc01hbnknLCByZWxhdGlvbnNoaXBNb2RlbCk7XHJcbiAgICAgICAgY29uc3QgcHJvcGVydHlIYXNNYW55OiBhbnkgPSBmaW5kKGhhc01hbnksIChwcm9wZXJ0eSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG1vZGVsc1R5cGVzW3Byb3BlcnR5LnJlbGF0aW9uc2hpcF0gPT09IG1vZGVsLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocHJvcGVydHlIYXNNYW55KSB7XHJcbiAgICAgICAgICByZWxhdGlvbnNoaXBNb2RlbFtwcm9wZXJ0eUhhc01hbnkucHJvcGVydHlOYW1lXSA9IHJlbGF0aW9uc2hpcE1vZGVsW3Byb3BlcnR5SGFzTWFueS5wcm9wZXJ0eU5hbWVdIHx8IFtdO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGluZGV4T2ZNb2RlbCA9IHJlbGF0aW9uc2hpcE1vZGVsW3Byb3BlcnR5SGFzTWFueS5wcm9wZXJ0eU5hbWVdLmluZGV4T2YobW9kZWwpO1xyXG5cclxuICAgICAgICAgIGlmIChpbmRleE9mTW9kZWwgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJlbGF0aW9uc2hpcE1vZGVsW3Byb3BlcnR5SGFzTWFueS5wcm9wZXJ0eU5hbWVdLnB1c2gobW9kZWwpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVsYXRpb25zaGlwTW9kZWxbcHJvcGVydHlIYXNNYW55LnByb3BlcnR5TmFtZV1baW5kZXhPZk1vZGVsXSA9IG1vZGVsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtb2RlbDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRNb2RlbFByb3BlcnR5TmFtZXMobW9kZWw6IEpzb25BcGlNb2RlbCkge1xyXG4gICAgcmV0dXJuIFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0F0dHJpYnV0ZU1hcHBpbmcnLCBtb2RlbCkgfHwgW107XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkUmVxdWVzdE9wdGlvbnMoY3VzdG9tT3B0aW9uczogYW55ID0ge30pOiBvYmplY3Qge1xyXG4gICAgY29uc3QgaHR0cEhlYWRlcnM6IEh0dHBIZWFkZXJzID0gdGhpcy5idWlsZEh0dHBIZWFkZXJzKGN1c3RvbU9wdGlvbnMuaGVhZGVycyk7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnM6IG9iamVjdCA9IE9iamVjdC5hc3NpZ24oY3VzdG9tT3B0aW9ucywge1xyXG4gICAgICBoZWFkZXJzOiBodHRwSGVhZGVyc1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWxSZXF1ZXN0T3B0aW9ucywgcmVxdWVzdE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdG9RdWVyeVN0cmluZyhwYXJhbXM6IGFueSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gcXMuc3RyaW5naWZ5KHBhcmFtcywge2FycmF5Rm9ybWF0OiAnYnJhY2tldHMnfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==