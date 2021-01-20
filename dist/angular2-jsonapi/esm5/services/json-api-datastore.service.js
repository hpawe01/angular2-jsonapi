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
                     * @param {?} anEntity
                     * @return {?}
                     */
                    function (anEntity) { return anEntity.propertyName === key; }));
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
        /** @type {?} */
        var resourceObjects = tslib_1.__spread(body.data, (body.included || []));
        body.data.forEach((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var model = _this.deserializeModel(modelType, data);
            _this.addToStore(model);
            model.syncRelationships(data, resourceObjects);
            _this.addToStore(model);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1hcGktZGF0YXN0b3JlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsic2VydmljZXMvanNvbi1hcGktZGF0YXN0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFnQixNQUFNLHNCQUFzQixDQUFDO0FBQ2hHLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBR3pCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sa0JBQWtCLENBQUM7Ozs7Ozs7OztJQVdwQixzQkFBc0IsR0FBVyxtQkFBQSxpQkFBaUIsRUFBTztBQUUvRDtJQVdFLDBCQUFzQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBTjlCLHlCQUFvQixHQUFXLEVBQUUsQ0FBQztRQUNsQyxrQkFBYSxHQUF1RCxFQUFFLENBQUM7UUFDdkUsa0JBQWEsR0FBNEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTO2VBQzVFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFD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QUFVOztJQW1nQm5CLHVCQUFDO0NBQUEsQUEzZUQsSUEyZUM7U0ExZVksZ0JBQWdCOzs7Ozs7SUFFM0Isa0NBQWtDOzs7OztJQUNsQyx5Q0FBbUM7Ozs7O0lBQ25DLGdEQUEwQzs7Ozs7SUFDMUMseUNBQStFOzs7OztJQUMvRSx5Q0FFcUU7Ozs7O0lBRXpELGdDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IGZpbmQgfSBmcm9tICdsb2Rhc2gtZXMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEpzb25BcGlNb2RlbCB9IGZyb20gJy4uL21vZGVscy9qc29uLWFwaS5tb2RlbCc7XHJcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuLi9tb2RlbHMvZXJyb3ItcmVzcG9uc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBKc29uQXBpUXVlcnlEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL2pzb24tYXBpLXF1ZXJ5LWRhdGEnO1xyXG5pbXBvcnQgKiBhcyBxcyBmcm9tICdxcyc7XHJcbmltcG9ydCB7IERhdGFzdG9yZUNvbmZpZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvZGF0YXN0b3JlLWNvbmZpZy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBNb2RlbENvbmZpZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvbW9kZWwtY29uZmlnLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZU1ldGFkYXRhIH0gZnJvbSAnLi4vY29uc3RhbnRzL3N5bWJvbHMnO1xyXG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xyXG5cclxuZXhwb3J0IHR5cGUgTW9kZWxUeXBlPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+ID0gbmV3KGRhdGFzdG9yZTogSnNvbkFwaURhdGFzdG9yZSwgZGF0YTogYW55KSA9PiBUO1xyXG5cclxuLyoqXHJcbiAqIEhBQ0svRklYTUU6XHJcbiAqIFR5cGUgJ3N5bWJvbCcgY2Fubm90IGJlIHVzZWQgYXMgYW4gaW5kZXggdHlwZS5cclxuICogVHlwZVNjcmlwdCAyLjkueFxyXG4gKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8yNDU4Ny5cclxuICovXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXHJcbmNvbnN0IEF0dHJpYnV0ZU1ldGFkYXRhSW5kZXg6IHN0cmluZyA9IEF0dHJpYnV0ZU1ldGFkYXRhIGFzIGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEpzb25BcGlEYXRhc3RvcmUge1xyXG5cclxuICBwcm90ZWN0ZWQgY29uZmlnOiBEYXRhc3RvcmVDb25maWc7XHJcbiAgcHJpdmF0ZSBnbG9iYWxIZWFkZXJzOiBIdHRwSGVhZGVycztcclxuICBwcml2YXRlIGdsb2JhbFJlcXVlc3RPcHRpb25zOiBvYmplY3QgPSB7fTtcclxuICBwcml2YXRlIGludGVybmFsU3RvcmU6IHsgW3R5cGU6IHN0cmluZ106IHsgW2lkOiBzdHJpbmddOiBKc29uQXBpTW9kZWwgfSB9ID0ge307XHJcbiAgcHJpdmF0ZSB0b1F1ZXJ5U3RyaW5nOiAocGFyYW1zOiBhbnkpID0+IHN0cmluZyA9IHRoaXMuZGF0YXN0b3JlQ29uZmlnLm92ZXJyaWRlc1xyXG4gICYmIHRoaXMuZGF0YXN0b3JlQ29uZmlnLm92ZXJyaWRlcy50b1F1ZXJ5U3RyaW5nID9cclxuICAgIHRoaXMuZGF0YXN0b3JlQ29uZmlnLm92ZXJyaWRlcy50b1F1ZXJ5U3RyaW5nIDogdGhpcy5fdG9RdWVyeVN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICB9XHJcblxyXG4gIHNldCBoZWFkZXJzKGhlYWRlcnM6IEh0dHBIZWFkZXJzKSB7XHJcbiAgICB0aGlzLmdsb2JhbEhlYWRlcnMgPSBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgc2V0IHJlcXVlc3RPcHRpb25zKHJlcXVlc3RPcHRpb25zOiBvYmplY3QpIHtcclxuICAgIHRoaXMuZ2xvYmFsUmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0T3B0aW9ucztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZGF0YXN0b3JlQ29uZmlnKCk6IERhdGFzdG9yZUNvbmZpZyB7XHJcbiAgICBjb25zdCBjb25maWdGcm9tRGVjb3JhdG9yOiBEYXRhc3RvcmVDb25maWcgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpRGF0YXN0b3JlQ29uZmlnJywgdGhpcy5jb25zdHJ1Y3Rvcik7XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihjb25maWdGcm9tRGVjb3JhdG9yLCB0aGlzLmNvbmZpZyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBnZXREaXJ0eUF0dHJpYnV0ZXMoKSB7XHJcbiAgICBpZiAodGhpcy5kYXRhc3RvcmVDb25maWcub3ZlcnJpZGVzXHJcbiAgICAgICYmIHRoaXMuZGF0YXN0b3JlQ29uZmlnLm92ZXJyaWRlcy5nZXREaXJ0eUF0dHJpYnV0ZXMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGF0YXN0b3JlQ29uZmlnLm92ZXJyaWRlcy5nZXREaXJ0eUF0dHJpYnV0ZXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gSnNvbkFwaURhdGFzdG9yZS5nZXREaXJ0eUF0dHJpYnV0ZXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBnZXREaXJ0eUF0dHJpYnV0ZXMoYXR0cmlidXRlc01ldGFkYXRhOiBhbnkpOiB7IHN0cmluZzogYW55IH0ge1xyXG4gICAgY29uc3QgZGlydHlEYXRhOiBhbnkgPSB7fTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBpbiBhdHRyaWJ1dGVzTWV0YWRhdGEpIHtcclxuICAgICAgaWYgKGF0dHJpYnV0ZXNNZXRhZGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XHJcbiAgICAgICAgY29uc3QgbWV0YWRhdGE6IGFueSA9IGF0dHJpYnV0ZXNNZXRhZGF0YVtwcm9wZXJ0eU5hbWVdO1xyXG5cclxuICAgICAgICBpZiAobWV0YWRhdGEuaGFzRGlydHlBdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gbWV0YWRhdGEuc2VyaWFsaXplZE5hbWUgIT0gbnVsbCA/IG1ldGFkYXRhLnNlcmlhbGl6ZWROYW1lIDogcHJvcGVydHlOYW1lO1xyXG4gICAgICAgICAgZGlydHlEYXRhW2F0dHJpYnV0ZU5hbWVdID0gbWV0YWRhdGEuc2VyaWFsaXNhdGlvblZhbHVlID8gbWV0YWRhdGEuc2VyaWFsaXNhdGlvblZhbHVlIDogbWV0YWRhdGEubmV3VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGlydHlEYXRhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlcHJlY2F0ZWQgdXNlIGZpbmRBbGwgbWV0aG9kIHRvIHRha2UgYWxsIG1vZGVsc1xyXG4gICAqL1xyXG4gIHF1ZXJ5PFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sXHJcbiAgICBwYXJhbXM/OiBhbnksXHJcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXHJcbiAgICBjdXN0b21Vcmw/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnM6IEh0dHBIZWFkZXJzID0gdGhpcy5idWlsZEh0dHBIZWFkZXJzKGhlYWRlcnMpO1xyXG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSB0aGlzLmJ1aWxkVXJsKG1vZGVsVHlwZSwgcGFyYW1zLCB1bmRlZmluZWQsIGN1c3RvbVVybCk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIHtoZWFkZXJzOiByZXF1ZXN0SGVhZGVyc30pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgocmVzOiBhbnkpID0+IHRoaXMuZXh0cmFjdFF1ZXJ5RGF0YShyZXMsIG1vZGVsVHlwZSkpLFxyXG4gICAgICAgIGNhdGNoRXJyb3IoKHJlczogYW55KSA9PiB0aGlzLmhhbmRsZUVycm9yKHJlcykpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmluZEFsbDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgcGFyYW1zPzogYW55LFxyXG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLFxyXG4gICAgY3VzdG9tVXJsPzogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxKc29uQXBpUXVlcnlEYXRhPFQ+PiB7XHJcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMuYnVpbGRVcmwobW9kZWxUeXBlLCBwYXJhbXMsIHVuZGVmaW5lZCwgY3VzdG9tVXJsKTtcclxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zOiBvYmplY3QgPSB0aGlzLmJ1aWxkUmVxdWVzdE9wdGlvbnMoe2hlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZSd9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIHJlcXVlc3RPcHRpb25zKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlczogSHR0cFJlc3BvbnNlPG9iamVjdD4pID0+IHRoaXMuZXh0cmFjdFF1ZXJ5RGF0YShyZXMsIG1vZGVsVHlwZSwgdHJ1ZSkpLFxyXG4gICAgICAgIGNhdGNoRXJyb3IoKHJlczogYW55KSA9PiB0aGlzLmhhbmRsZUVycm9yKHJlcykpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmluZFJlY29yZDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgaWQ6IHN0cmluZyxcclxuICAgIHBhcmFtcz86IGFueSxcclxuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcclxuICAgIGN1c3RvbVVybD86IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnM6IG9iamVjdCA9IHRoaXMuYnVpbGRSZXF1ZXN0T3B0aW9ucyh7aGVhZGVycywgb2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pO1xyXG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSB0aGlzLmJ1aWxkVXJsKG1vZGVsVHlwZSwgcGFyYW1zLCBpZCwgY3VzdG9tVXJsKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIHJlcXVlc3RPcHRpb25zKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlczogSHR0cFJlc3BvbnNlPG9iamVjdD4pID0+IHRoaXMuZXh0cmFjdFJlY29yZERhdGEocmVzLCBtb2RlbFR5cGUpKSxcclxuICAgICAgICBjYXRjaEVycm9yKChyZXM6IGFueSkgPT4gdGhpcy5oYW5kbGVFcnJvcihyZXMpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNyZWF0ZVJlY29yZDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPiwgZGF0YT86IGFueSk6IFQge1xyXG4gICAgcmV0dXJuIG5ldyBtb2RlbFR5cGUodGhpcywge2F0dHJpYnV0ZXM6IGRhdGF9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzYXZlUmVjb3JkPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgYXR0cmlidXRlc01ldGFkYXRhOiBhbnksXHJcbiAgICBtb2RlbDogVCxcclxuICAgIHBhcmFtcz86IGFueSxcclxuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcclxuICAgIGN1c3RvbVVybD86IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgY29uc3QgbW9kZWxUeXBlID0gbW9kZWwuY29uc3RydWN0b3IgYXMgTW9kZWxUeXBlPFQ+O1xyXG4gICAgY29uc3QgbW9kZWxDb25maWc6IE1vZGVsQ29uZmlnID0gbW9kZWwubW9kZWxDb25maWc7XHJcbiAgICBjb25zdCB0eXBlTmFtZTogc3RyaW5nID0gbW9kZWxDb25maWcudHlwZTtcclxuICAgIGNvbnN0IHJlbGF0aW9uc2hpcHM6IGFueSA9IHRoaXMuZ2V0UmVsYXRpb25zaGlwcyhtb2RlbCk7XHJcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMuYnVpbGRVcmwobW9kZWxUeXBlLCBwYXJhbXMsIG1vZGVsLmlkLCBjdXN0b21VcmwpO1xyXG5cclxuICAgIGxldCBodHRwQ2FsbDogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8b2JqZWN0Pj47XHJcbiAgICBjb25zdCBib2R5OiBhbnkgPSB7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICByZWxhdGlvbnNoaXBzLFxyXG4gICAgICAgIHR5cGU6IHR5cGVOYW1lLFxyXG4gICAgICAgIGlkOiBtb2RlbC5pZCxcclxuICAgICAgICBhdHRyaWJ1dGVzOiB0aGlzLmdldERpcnR5QXR0cmlidXRlcyhhdHRyaWJ1dGVzTWV0YWRhdGEsIG1vZGVsKVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zOiBvYmplY3QgPSB0aGlzLmJ1aWxkUmVxdWVzdE9wdGlvbnMoe2hlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZSd9KTtcclxuXHJcbiAgICBpZiAobW9kZWwuaWQpIHtcclxuICAgICAgaHR0cENhbGwgPSB0aGlzLmh0dHAucGF0Y2g8b2JqZWN0Pih1cmwsIGJvZHksIHJlcXVlc3RPcHRpb25zKSBhcyBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxvYmplY3Q+PjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGh0dHBDYWxsID0gdGhpcy5odHRwLnBvc3Q8b2JqZWN0Pih1cmwsIGJvZHksIHJlcXVlc3RPcHRpb25zKSBhcyBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxvYmplY3Q+PjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaHR0cENhbGxcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZXMpID0+IFsyMDAsIDIwMV0uaW5kZXhPZihyZXMuc3RhdHVzKSAhPT0gLTEgPyB0aGlzLmV4dHJhY3RSZWNvcmREYXRhKHJlcywgbW9kZWxUeXBlLCBtb2RlbCkgOiBtb2RlbCksXHJcbiAgICAgICAgY2F0Y2hFcnJvcigocmVzKSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKG1vZGVsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZUVycm9yKHJlcyk7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgbWFwKChyZXMpID0+IHRoaXMudXBkYXRlUmVsYXRpb25zaGlwcyhyZXMsIHJlbGF0aW9uc2hpcHMpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlbGV0ZVJlY29yZDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgaWQ6IHN0cmluZyxcclxuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcclxuICAgIGN1c3RvbVVybD86IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zOiBvYmplY3QgPSB0aGlzLmJ1aWxkUmVxdWVzdE9wdGlvbnMoe2hlYWRlcnN9KTtcclxuICAgIGNvbnN0IHVybDogc3RyaW5nID0gdGhpcy5idWlsZFVybChtb2RlbFR5cGUsIG51bGwsIGlkLCBjdXN0b21VcmwpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHVybCwgcmVxdWVzdE9wdGlvbnMpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGNhdGNoRXJyb3IoKHJlczogSHR0cEVycm9yUmVzcG9uc2UpID0+IHRoaXMuaGFuZGxlRXJyb3IocmVzKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwZWVrUmVjb3JkPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LCBpZDogc3RyaW5nKTogVCB8IG51bGwge1xyXG4gICAgY29uc3QgdHlwZTogc3RyaW5nID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaU1vZGVsQ29uZmlnJywgbW9kZWxUeXBlKS50eXBlO1xyXG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxTdG9yZVt0eXBlXSA/IHRoaXMuaW50ZXJuYWxTdG9yZVt0eXBlXVtpZF0gYXMgVCA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcGVla0FsbDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPik6IEFycmF5PFQ+IHtcclxuICAgIGNvbnN0IHR5cGUgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpTW9kZWxDb25maWcnLCBtb2RlbFR5cGUpLnR5cGU7XHJcbiAgICBjb25zdCB0eXBlU3RvcmUgPSB0aGlzLmludGVybmFsU3RvcmVbdHlwZV07XHJcbiAgICByZXR1cm4gdHlwZVN0b3JlID8gT2JqZWN0LmtleXModHlwZVN0b3JlKS5tYXAoKGtleSkgPT4gdHlwZVN0b3JlW2tleV0gYXMgVCkgOiBbXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXNlcmlhbGl6ZU1vZGVsPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LCBkYXRhOiBhbnkpIHtcclxuICAgIGRhdGEuYXR0cmlidXRlcyA9IHRoaXMudHJhbnNmb3JtU2VyaWFsaXplZE5hbWVzVG9Qcm9wZXJ0eU5hbWVzKG1vZGVsVHlwZSwgZGF0YS5hdHRyaWJ1dGVzKTtcclxuICAgIHJldHVybiBuZXcgbW9kZWxUeXBlKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZFRvU3RvcmUobW9kZWxPck1vZGVsczogSnNvbkFwaU1vZGVsIHwgSnNvbkFwaU1vZGVsW10pOiB2b2lkIHtcclxuICAgIGNvbnN0IG1vZGVscyA9IEFycmF5LmlzQXJyYXkobW9kZWxPck1vZGVscykgPyBtb2RlbE9yTW9kZWxzIDogW21vZGVsT3JNb2RlbHNdO1xyXG4gICAgY29uc3QgdHlwZTogc3RyaW5nID0gbW9kZWxzWzBdLm1vZGVsQ29uZmlnLnR5cGU7XHJcbiAgICBsZXQgdHlwZVN0b3JlID0gdGhpcy5pbnRlcm5hbFN0b3JlW3R5cGVdO1xyXG5cclxuICAgIGlmICghdHlwZVN0b3JlKSB7XHJcbiAgICAgIHR5cGVTdG9yZSA9IHRoaXMuaW50ZXJuYWxTdG9yZVt0eXBlXSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgbW9kZWwgb2YgbW9kZWxzKSB7XHJcbiAgICAgIHR5cGVTdG9yZVttb2RlbC5pZF0gPSBtb2RlbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB0cmFuc2Zvcm1TZXJpYWxpemVkTmFtZXNUb1Byb3BlcnR5TmFtZXM8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4obW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sIGF0dHJpYnV0ZXM6IGFueSkge1xyXG4gICAgaWYgKCFhdHRyaWJ1dGVzKSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZXJpYWxpemVkTmFtZVRvUHJvcGVydHlOYW1lID0gdGhpcy5nZXRNb2RlbFByb3BlcnR5TmFtZXMobW9kZWxUeXBlLnByb3RvdHlwZSk7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzOiBhbnkgPSB7fTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhzZXJpYWxpemVkTmFtZVRvUHJvcGVydHlOYW1lKS5mb3JFYWNoKChzZXJpYWxpemVkTmFtZSkgPT4ge1xyXG4gICAgICBpZiAoYXR0cmlidXRlc1tzZXJpYWxpemVkTmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHByb3BlcnRpZXNbc2VyaWFsaXplZE5hbWVUb1Byb3BlcnR5TmFtZVtzZXJpYWxpemVkTmFtZV1dID0gYXR0cmlidXRlc1tzZXJpYWxpemVkTmFtZV07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkVXJsPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sXHJcbiAgICBwYXJhbXM/OiBhbnksXHJcbiAgICBpZD86IHN0cmluZyxcclxuICAgIGN1c3RvbVVybD86IHN0cmluZ1xyXG4gICk6IHN0cmluZyB7XHJcbiAgICAvLyBUT0RPOiB1c2UgSHR0cFBhcmFtcyBpbnN0ZWFkIG9mIGFwcGVuZGluZyBhIHN0cmluZyB0byB0aGUgdXJsXHJcbiAgICBjb25zdCBxdWVyeVBhcmFtczogc3RyaW5nID0gdGhpcy50b1F1ZXJ5U3RyaW5nKHBhcmFtcyk7XHJcblxyXG4gICAgaWYgKGN1c3RvbVVybCkge1xyXG4gICAgICByZXR1cm4gcXVlcnlQYXJhbXMgPyBgJHtjdXN0b21Vcmx9PyR7cXVlcnlQYXJhbXN9YCA6IGN1c3RvbVVybDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtb2RlbENvbmZpZzogTW9kZWxDb25maWcgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpTW9kZWxDb25maWcnLCBtb2RlbFR5cGUpO1xyXG5cclxuICAgIGNvbnN0IGJhc2VVcmwgPSBtb2RlbENvbmZpZy5iYXNlVXJsIHx8IHRoaXMuZGF0YXN0b3JlQ29uZmlnLmJhc2VVcmw7XHJcbiAgICBjb25zdCBhcGlWZXJzaW9uID0gbW9kZWxDb25maWcuYXBpVmVyc2lvbiB8fCB0aGlzLmRhdGFzdG9yZUNvbmZpZy5hcGlWZXJzaW9uO1xyXG4gICAgY29uc3QgbW9kZWxFbmRwb2ludFVybDogc3RyaW5nID0gbW9kZWxDb25maWcubW9kZWxFbmRwb2ludFVybCB8fCBtb2RlbENvbmZpZy50eXBlO1xyXG5cclxuICAgIGNvbnN0IHVybDogc3RyaW5nID0gW2Jhc2VVcmwsIGFwaVZlcnNpb24sIG1vZGVsRW5kcG9pbnRVcmwsIGlkXS5maWx0ZXIoKHgpID0+IHgpLmpvaW4oJy8nKTtcclxuXHJcbiAgICByZXR1cm4gcXVlcnlQYXJhbXMgPyBgJHt1cmx9PyR7cXVlcnlQYXJhbXN9YCA6IHVybDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRSZWxhdGlvbnNoaXBzKGRhdGE6IGFueSk6IGFueSB7XHJcbiAgICBsZXQgcmVsYXRpb25zaGlwczogYW55O1xyXG5cclxuICAgIGNvbnN0IGJlbG9uZ3NUb01ldGFkYXRhOiBhbnlbXSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0JlbG9uZ3NUbycsIGRhdGEpIHx8IFtdO1xyXG4gICAgY29uc3QgaGFzTWFueU1ldGFkYXRhOiBhbnlbXSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0hhc01hbnknLCBkYXRhKSB8fCBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBpZiAoZGF0YVtrZXldIGluc3RhbmNlb2YgSnNvbkFwaU1vZGVsKSB7XHJcbiAgICAgICAgICByZWxhdGlvbnNoaXBzID0gcmVsYXRpb25zaGlwcyB8fCB7fTtcclxuXHJcbiAgICAgICAgICBpZiAoZGF0YVtrZXldLmlkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IGJlbG9uZ3NUb01ldGFkYXRhLmZpbmQoKGl0OiBhbnkpID0+IGl0LnByb3BlcnR5TmFtZSA9PT0ga2V5KTtcclxuICAgICAgICAgICAgY29uc3QgcmVsYXRpb25zaGlwS2V5ID0gZW50aXR5LnJlbGF0aW9uc2hpcDtcclxuICAgICAgICAgICAgcmVsYXRpb25zaGlwc1tyZWxhdGlvbnNoaXBLZXldID0ge1xyXG4gICAgICAgICAgICAgIGRhdGE6IHRoaXMuYnVpbGRTaW5nbGVSZWxhdGlvbnNoaXBEYXRhKGRhdGFba2V5XSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBjb25zdCBlbnRpdHkgPSBoYXNNYW55TWV0YWRhdGEuZmluZCgoaXQ6IGFueSkgPT4gaXQucHJvcGVydHlOYW1lID09PSBrZXkpO1xyXG4gICAgICAgICAgaWYgKGVudGl0eSAmJiB0aGlzLmlzVmFsaWRUb01hbnlSZWxhdGlvbihkYXRhW2tleV0pKSB7XHJcbiAgICAgICAgICAgIHJlbGF0aW9uc2hpcHMgPSByZWxhdGlvbnNoaXBzIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVsYXRpb25zaGlwS2V5ID0gZW50aXR5LnJlbGF0aW9uc2hpcDtcclxuICAgICAgICAgICAgY29uc3QgcmVsYXRpb25zaGlwRGF0YSA9IGRhdGFba2V5XVxyXG4gICAgICAgICAgICAgIC5maWx0ZXIoKG1vZGVsOiBKc29uQXBpTW9kZWwpID0+IG1vZGVsLmlkKVxyXG4gICAgICAgICAgICAgIC5tYXAoKG1vZGVsOiBKc29uQXBpTW9kZWwpID0+IHRoaXMuYnVpbGRTaW5nbGVSZWxhdGlvbnNoaXBEYXRhKG1vZGVsKSk7XHJcblxyXG4gICAgICAgICAgICByZWxhdGlvbnNoaXBzW3JlbGF0aW9uc2hpcEtleV0gPSB7XHJcbiAgICAgICAgICAgICAgZGF0YTogcmVsYXRpb25zaGlwRGF0YVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gIGVsc2UgaWYgKGRhdGFba2V5XSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgY29uc3QgZW50aXR5ID0gYmVsb25nc1RvTWV0YWRhdGEuZmluZCgoYW5FbnRpdHk6IGFueSkgPT4gYW5FbnRpdHkucHJvcGVydHlOYW1lID09PSBrZXkpO1xyXG5cclxuICAgICAgICAgIGlmIChlbnRpdHkpIHtcclxuICAgICAgICAgICAgcmVsYXRpb25zaGlwcyA9IHJlbGF0aW9uc2hpcHMgfHwge307XHJcblxyXG4gICAgICAgICAgICByZWxhdGlvbnNoaXBzW2VudGl0eS5yZWxhdGlvbnNoaXBdID0ge1xyXG4gICAgICAgICAgICAgIGRhdGE6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVsYXRpb25zaGlwcztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpc1ZhbGlkVG9NYW55UmVsYXRpb24ob2JqZWN0czogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCFvYmplY3RzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGlzSnNvbkFwaU1vZGVsID0gb2JqZWN0cy5ldmVyeSgoaXRlbSkgPT4gaXRlbSBpbnN0YW5jZW9mIEpzb25BcGlNb2RlbCk7XHJcbiAgICBpZiAoIWlzSnNvbkFwaU1vZGVsKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHR5cGVzID0gb2JqZWN0cy5tYXAoKGl0ZW06IEpzb25BcGlNb2RlbCkgPT4gaXRlbS5tb2RlbENvbmZpZy5tb2RlbEVuZHBvaW50VXJsIHx8IGl0ZW0ubW9kZWxDb25maWcudHlwZSk7XHJcbiAgICByZXR1cm4gdHlwZXNcclxuICAgICAgLmZpbHRlcigodHlwZTogc3RyaW5nLCBpbmRleDogbnVtYmVyLCBzZWxmOiBzdHJpbmdbXSkgPT4gc2VsZi5pbmRleE9mKHR5cGUpID09PSBpbmRleClcclxuICAgICAgLmxlbmd0aCA9PT0gMTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZFNpbmdsZVJlbGF0aW9uc2hpcERhdGEobW9kZWw6IEpzb25BcGlNb2RlbCk6IGFueSB7XHJcbiAgICBjb25zdCByZWxhdGlvbnNoaXBUeXBlOiBzdHJpbmcgPSBtb2RlbC5tb2RlbENvbmZpZy50eXBlO1xyXG4gICAgY29uc3QgcmVsYXRpb25TaGlwRGF0YTogeyB0eXBlOiBzdHJpbmcsIGlkPzogc3RyaW5nLCBhdHRyaWJ1dGVzPzogYW55IH0gPSB7dHlwZTogcmVsYXRpb25zaGlwVHlwZX07XHJcblxyXG4gICAgaWYgKG1vZGVsLmlkKSB7XHJcbiAgICAgIHJlbGF0aW9uU2hpcERhdGEuaWQgPSBtb2RlbC5pZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZXNNZXRhZGF0YTogYW55ID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnQXR0cmlidXRlJywgbW9kZWwpO1xyXG4gICAgICByZWxhdGlvblNoaXBEYXRhLmF0dHJpYnV0ZXMgPSB0aGlzLmdldERpcnR5QXR0cmlidXRlcyhhdHRyaWJ1dGVzTWV0YWRhdGEsIG1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVsYXRpb25TaGlwRGF0YTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBleHRyYWN0UXVlcnlEYXRhPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgcmVzcG9uc2U6IEh0dHBSZXNwb25zZTxvYmplY3Q+LFxyXG4gICAgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sXHJcbiAgICB3aXRoTWV0YSA9IGZhbHNlXHJcbiAgKTogQXJyYXk8VD4gfCBKc29uQXBpUXVlcnlEYXRhPFQ+IHtcclxuICAgIGNvbnN0IGJvZHk6IGFueSA9IHJlc3BvbnNlLmJvZHk7XHJcbiAgICBjb25zdCBtb2RlbHM6IFRbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0IHJlc291cmNlT2JqZWN0cyA9IFsuLi5ib2R5LmRhdGEsIC4uLihib2R5LmluY2x1ZGVkIHx8IFtdKV07XHJcblxyXG4gICAgYm9keS5kYXRhLmZvckVhY2goKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBtb2RlbDogVCA9IHRoaXMuZGVzZXJpYWxpemVNb2RlbChtb2RlbFR5cGUsIGRhdGEpO1xyXG4gICAgICB0aGlzLmFkZFRvU3RvcmUobW9kZWwpO1xyXG5cclxuICAgICAgbW9kZWwuc3luY1JlbGF0aW9uc2hpcHMoZGF0YSwgcmVzb3VyY2VPYmplY3RzKTtcclxuICAgICAgdGhpcy5hZGRUb1N0b3JlKG1vZGVsKTtcclxuXHJcbiAgICAgIG1vZGVscy5wdXNoKG1vZGVsKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh3aXRoTWV0YSAmJiB3aXRoTWV0YSA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gbmV3IEpzb25BcGlRdWVyeURhdGEobW9kZWxzLCB0aGlzLnBhcnNlTWV0YShib2R5LCBtb2RlbFR5cGUpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbW9kZWxzO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGV4dHJhY3RSZWNvcmREYXRhPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgcmVzOiBIdHRwUmVzcG9uc2U8b2JqZWN0PixcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgbW9kZWw/OiBUXHJcbiAgKTogVCB7XHJcbiAgICBjb25zdCBib2R5OiBhbnkgPSByZXMuYm9keTtcclxuICAgIC8vIEVycm9yIGluIEFuZ3VsYXIgPCA1LjIuNCAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzIwNzQ0KVxyXG4gICAgLy8gbnVsbCBpcyBjb252ZXJ0ZWQgdG8gJ251bGwnLCBzbyB0aGlzIGlzIHRlbXBvcmFyeSBuZWVkZWQgdG8gbWFrZSB0ZXN0Y2FzZSBwb3NzaWJsZVxyXG4gICAgLy8gKGFuZCB0byBhdm9pZCBhIGRlY3JlYXNlIG9mIHRoZSBjb3ZlcmFnZSlcclxuICAgIGlmICghYm9keSB8fCBib2R5ID09PSAnbnVsbCcpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBib2R5IGluIHJlc3BvbnNlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFib2R5LmRhdGEpIHtcclxuICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMSB8fCAhbW9kZWwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIGRhdGEgaW4gcmVzcG9uc2UnKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGVsKSB7XHJcbiAgICAgIG1vZGVsLm1vZGVsSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICBtb2RlbC5pZCA9IGJvZHkuZGF0YS5pZDtcclxuICAgICAgT2JqZWN0LmFzc2lnbihtb2RlbCwgYm9keS5kYXRhLmF0dHJpYnV0ZXMpO1xyXG4gICAgICBtb2RlbC5tb2RlbEluaXRpYWxpemF0aW9uID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGVzZXJpYWxpemVkTW9kZWwgPSBtb2RlbCB8fCB0aGlzLmRlc2VyaWFsaXplTW9kZWwobW9kZWxUeXBlLCBib2R5LmRhdGEpO1xyXG4gICAgdGhpcy5hZGRUb1N0b3JlKGRlc2VyaWFsaXplZE1vZGVsKTtcclxuICAgIGlmIChib2R5LmluY2x1ZGVkKSB7XHJcbiAgICAgIGRlc2VyaWFsaXplZE1vZGVsLnN5bmNSZWxhdGlvbnNoaXBzKGJvZHkuZGF0YSwgYm9keS5pbmNsdWRlZCk7XHJcbiAgICAgIHRoaXMuYWRkVG9TdG9yZShkZXNlcmlhbGl6ZWRNb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRlc2VyaWFsaXplZE1vZGVsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgaWYgKFxyXG4gICAgICBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlICYmXHJcbiAgICAgIGVycm9yLmVycm9yIGluc3RhbmNlb2YgT2JqZWN0ICYmXHJcbiAgICAgIGVycm9yLmVycm9yLmVycm9ycyAmJlxyXG4gICAgICBlcnJvci5lcnJvci5lcnJvcnMgaW5zdGFuY2VvZiBBcnJheVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yczogRXJyb3JSZXNwb25zZSA9IG5ldyBFcnJvclJlc3BvbnNlKGVycm9yLmVycm9yLmVycm9ycyk7XHJcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9ycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHBhcnNlTWV0YShib2R5OiBhbnksIG1vZGVsVHlwZTogTW9kZWxUeXBlPEpzb25BcGlNb2RlbD4pOiBhbnkge1xyXG4gICAgY29uc3QgbWV0YU1vZGVsOiBhbnkgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpTW9kZWxDb25maWcnLCBtb2RlbFR5cGUpLm1ldGE7XHJcbiAgICByZXR1cm4gbmV3IG1ldGFNb2RlbChib2R5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkIHVzZSBidWlsZEh0dHBIZWFkZXJzIG1ldGhvZCB0byBidWlsZCByZXF1ZXN0IGhlYWRlcnNcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZ2V0T3B0aW9ucyhjdXN0b21IZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBhbnkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaGVhZGVyczogdGhpcy5idWlsZEh0dHBIZWFkZXJzKGN1c3RvbUhlYWRlcnMpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZEh0dHBIZWFkZXJzKGN1c3RvbUhlYWRlcnM/OiBIdHRwSGVhZGVycyk6IEh0dHBIZWFkZXJzIHtcclxuICAgIGxldCByZXF1ZXN0SGVhZGVyczogSHR0cEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nLFxyXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbidcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLmdsb2JhbEhlYWRlcnMpIHtcclxuICAgICAgdGhpcy5nbG9iYWxIZWFkZXJzLmtleXMoKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5nbG9iYWxIZWFkZXJzLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgICByZXF1ZXN0SGVhZGVycyA9IHJlcXVlc3RIZWFkZXJzLnNldChrZXksIHRoaXMuZ2xvYmFsSGVhZGVycy5nZXQoa2V5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VzdG9tSGVhZGVycykge1xyXG4gICAgICBjdXN0b21IZWFkZXJzLmtleXMoKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICBpZiAoY3VzdG9tSGVhZGVycy5oYXMoa2V5KSkge1xyXG4gICAgICAgICAgcmVxdWVzdEhlYWRlcnMgPSByZXF1ZXN0SGVhZGVycy5zZXQoa2V5LCBjdXN0b21IZWFkZXJzLmdldChrZXkpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXF1ZXN0SGVhZGVycztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByZXNldE1ldGFkYXRhQXR0cmlidXRlczxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihyZXM6IFQsIGF0dHJpYnV0ZXNNZXRhZGF0YTogYW55LCBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPikge1xyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgaW4gYXR0cmlidXRlc01ldGFkYXRhKSB7XHJcbiAgICAgIGlmIChhdHRyaWJ1dGVzTWV0YWRhdGEuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhOiBhbnkgPSBhdHRyaWJ1dGVzTWV0YWRhdGFbcHJvcGVydHlOYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKG1ldGFkYXRhLmhhc0RpcnR5QXR0cmlidXRlcykge1xyXG4gICAgICAgICAgbWV0YWRhdGEuaGFzRGlydHlBdHRyaWJ1dGVzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgcmVzW0F0dHJpYnV0ZU1ldGFkYXRhSW5kZXhdID0gYXR0cmlidXRlc01ldGFkYXRhO1xyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB1cGRhdGVSZWxhdGlvbnNoaXBzPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KG1vZGVsOiBULCByZWxhdGlvbnNoaXBzOiBhbnkpOiBUIHtcclxuICAgIGNvbnN0IG1vZGVsc1R5cGVzOiBhbnkgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpRGF0YXN0b3JlQ29uZmlnJywgdGhpcy5jb25zdHJ1Y3RvcikubW9kZWxzO1xyXG5cclxuICAgIGZvciAoY29uc3QgcmVsYXRpb25zaGlwIGluIHJlbGF0aW9uc2hpcHMpIHtcclxuICAgICAgaWYgKHJlbGF0aW9uc2hpcHMuaGFzT3duUHJvcGVydHkocmVsYXRpb25zaGlwKSAmJiBtb2RlbC5oYXNPd25Qcm9wZXJ0eShyZWxhdGlvbnNoaXApICYmIG1vZGVsW3JlbGF0aW9uc2hpcF0pIHtcclxuICAgICAgICBjb25zdCByZWxhdGlvbnNoaXBNb2RlbDogSnNvbkFwaU1vZGVsID0gbW9kZWxbcmVsYXRpb25zaGlwXTtcclxuICAgICAgICBjb25zdCBoYXNNYW55OiBhbnlbXSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0hhc01hbnknLCByZWxhdGlvbnNoaXBNb2RlbCk7XHJcbiAgICAgICAgY29uc3QgcHJvcGVydHlIYXNNYW55OiBhbnkgPSBmaW5kKGhhc01hbnksIChwcm9wZXJ0eSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG1vZGVsc1R5cGVzW3Byb3BlcnR5LnJlbGF0aW9uc2hpcF0gPT09IG1vZGVsLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocHJvcGVydHlIYXNNYW55KSB7XHJcbiAgICAgICAgICByZWxhdGlvbnNoaXBNb2RlbFtwcm9wZXJ0eUhhc01hbnkucHJvcGVydHlOYW1lXSA9IHJlbGF0aW9uc2hpcE1vZGVsW3Byb3BlcnR5SGFzTWFueS5wcm9wZXJ0eU5hbWVdIHx8IFtdO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGluZGV4T2ZNb2RlbCA9IHJlbGF0aW9uc2hpcE1vZGVsW3Byb3BlcnR5SGFzTWFueS5wcm9wZXJ0eU5hbWVdLmluZGV4T2YobW9kZWwpO1xyXG5cclxuICAgICAgICAgIGlmIChpbmRleE9mTW9kZWwgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJlbGF0aW9uc2hpcE1vZGVsW3Byb3BlcnR5SGFzTWFueS5wcm9wZXJ0eU5hbWVdLnB1c2gobW9kZWwpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVsYXRpb25zaGlwTW9kZWxbcHJvcGVydHlIYXNNYW55LnByb3BlcnR5TmFtZV1baW5kZXhPZk1vZGVsXSA9IG1vZGVsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtb2RlbDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRNb2RlbFByb3BlcnR5TmFtZXMobW9kZWw6IEpzb25BcGlNb2RlbCkge1xyXG4gICAgcmV0dXJuIFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0F0dHJpYnV0ZU1hcHBpbmcnLCBtb2RlbCkgfHwgW107XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkUmVxdWVzdE9wdGlvbnMoY3VzdG9tT3B0aW9uczogYW55ID0ge30pOiBvYmplY3Qge1xyXG4gICAgY29uc3QgaHR0cEhlYWRlcnM6IEh0dHBIZWFkZXJzID0gdGhpcy5idWlsZEh0dHBIZWFkZXJzKGN1c3RvbU9wdGlvbnMuaGVhZGVycyk7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnM6IG9iamVjdCA9IE9iamVjdC5hc3NpZ24oY3VzdG9tT3B0aW9ucywge1xyXG4gICAgICBoZWFkZXJzOiBodHRwSGVhZGVyc1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWxSZXF1ZXN0T3B0aW9ucywgcmVxdWVzdE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdG9RdWVyeVN0cmluZyhwYXJhbXM6IGFueSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gcXMuc3RyaW5naWZ5KHBhcmFtcywge2FycmF5Rm9ybWF0OiAnYnJhY2tldHMnfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==