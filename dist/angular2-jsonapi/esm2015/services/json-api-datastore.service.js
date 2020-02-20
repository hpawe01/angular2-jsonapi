/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import find from 'lodash-es/find';
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
const AttributeMetadataIndex = (/** @type {?} */ (AttributeMetadata));
export class JsonApiDatastore {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.globalRequestOptions = {};
        this.internalStore = {};
        this.toQueryString = this.datastoreConfig.overrides
            && this.datastoreConfig.overrides.toQueryString ?
            this.datastoreConfig.overrides.toQueryString : this._toQueryString;
    }
    /**
     * @param {?} headers
     * @return {?}
     */
    set headers(headers) {
        this.globalHeaders = headers;
    }
    /**
     * @param {?} requestOptions
     * @return {?}
     */
    set requestOptions(requestOptions) {
        this.globalRequestOptions = requestOptions;
    }
    /**
     * @return {?}
     */
    get datastoreConfig() {
        /** @type {?} */
        const configFromDecorator = Reflect.getMetadata('JsonApiDatastoreConfig', this.constructor);
        return Object.assign(configFromDecorator, this.config);
    }
    /**
     * @private
     * @return {?}
     */
    get getDirtyAttributes() {
        if (this.datastoreConfig.overrides
            && this.datastoreConfig.overrides.getDirtyAttributes) {
            return this.datastoreConfig.overrides.getDirtyAttributes;
        }
        return JsonApiDatastore.getDirtyAttributes;
    }
    /**
     * @private
     * @param {?} attributesMetadata
     * @return {?}
     */
    static getDirtyAttributes(attributesMetadata) {
        /** @type {?} */
        const dirtyData = {};
        for (const propertyName in attributesMetadata) {
            if (attributesMetadata.hasOwnProperty(propertyName)) {
                /** @type {?} */
                const metadata = attributesMetadata[propertyName];
                if (metadata.hasDirtyAttributes) {
                    /** @type {?} */
                    const attributeName = metadata.serializedName != null ? metadata.serializedName : propertyName;
                    dirtyData[attributeName] = metadata.serialisationValue ? metadata.serialisationValue : metadata.newValue;
                }
            }
        }
        return dirtyData;
    }
    /**
     * @deprecated use findAll method to take all models
     * @template T
     * @param {?} modelType
     * @param {?=} params
     * @param {?=} headers
     * @param {?=} customUrl
     * @return {?}
     */
    query(modelType, params, headers, customUrl) {
        /** @type {?} */
        const requestHeaders = this.buildHttpHeaders(headers);
        /** @type {?} */
        const url = this.buildUrl(modelType, params, undefined, customUrl);
        return this.http.get(url, { headers: requestHeaders })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.extractQueryData(res, modelType))), catchError((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.handleError(res))));
    }
    /**
     * @template T
     * @param {?} modelType
     * @param {?=} params
     * @param {?=} headers
     * @param {?=} customUrl
     * @return {?}
     */
    findAll(modelType, params, headers, customUrl) {
        /** @type {?} */
        const url = this.buildUrl(modelType, params, undefined, customUrl);
        /** @type {?} */
        const requestOptions = this.buildRequestOptions({ headers, observe: 'response' });
        return this.http.get(url, requestOptions)
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.extractQueryData(res, modelType, true))), catchError((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.handleError(res))));
    }
    /**
     * @template T
     * @param {?} modelType
     * @param {?} id
     * @param {?=} params
     * @param {?=} headers
     * @param {?=} customUrl
     * @return {?}
     */
    findRecord(modelType, id, params, headers, customUrl) {
        /** @type {?} */
        const requestOptions = this.buildRequestOptions({ headers, observe: 'response' });
        /** @type {?} */
        const url = this.buildUrl(modelType, params, id, customUrl);
        return this.http.get(url, requestOptions)
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.extractRecordData(res, modelType))), catchError((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.handleError(res))));
    }
    /**
     * @template T
     * @param {?} modelType
     * @param {?=} data
     * @return {?}
     */
    createRecord(modelType, data) {
        return new modelType(this, { attributes: data });
    }
    /**
     * @template T
     * @param {?} attributesMetadata
     * @param {?} model
     * @param {?=} params
     * @param {?=} headers
     * @param {?=} customUrl
     * @return {?}
     */
    saveRecord(attributesMetadata, model, params, headers, customUrl) {
        /** @type {?} */
        const modelType = (/** @type {?} */ (model.constructor));
        /** @type {?} */
        const modelConfig = model.modelConfig;
        /** @type {?} */
        const typeName = modelConfig.type;
        /** @type {?} */
        const relationships = this.getRelationships(model);
        /** @type {?} */
        const url = this.buildUrl(modelType, params, model.id, customUrl);
        /** @type {?} */
        let httpCall;
        /** @type {?} */
        const body = {
            data: {
                relationships,
                type: typeName,
                id: model.id,
                attributes: this.getDirtyAttributes(attributesMetadata, model)
            }
        };
        /** @type {?} */
        const requestOptions = this.buildRequestOptions({ headers, observe: 'response' });
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
        (res) => [200, 201].indexOf(res.status) !== -1 ? this.extractRecordData(res, modelType, model) : model)), catchError((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (res == null) {
                return of(model);
            }
            return this.handleError(res);
        })), map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.updateRelationships(res, relationships))));
    }
    /**
     * @template T
     * @param {?} modelType
     * @param {?} id
     * @param {?=} headers
     * @param {?=} customUrl
     * @return {?}
     */
    deleteRecord(modelType, id, headers, customUrl) {
        /** @type {?} */
        const requestOptions = this.buildRequestOptions({ headers });
        /** @type {?} */
        const url = this.buildUrl(modelType, null, id, customUrl);
        return this.http.delete(url, requestOptions)
            .pipe(catchError((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.handleError(res))));
    }
    /**
     * @template T
     * @param {?} modelType
     * @param {?} id
     * @return {?}
     */
    peekRecord(modelType, id) {
        /** @type {?} */
        const type = Reflect.getMetadata('JsonApiModelConfig', modelType).type;
        return this.internalStore[type] ? (/** @type {?} */ (this.internalStore[type][id])) : null;
    }
    /**
     * @template T
     * @param {?} modelType
     * @return {?}
     */
    peekAll(modelType) {
        /** @type {?} */
        const type = Reflect.getMetadata('JsonApiModelConfig', modelType).type;
        /** @type {?} */
        const typeStore = this.internalStore[type];
        return typeStore ? Object.keys(typeStore).map((/**
         * @param {?} key
         * @return {?}
         */
        (key) => (/** @type {?} */ (typeStore[key])))) : [];
    }
    /**
     * @template T
     * @param {?} modelType
     * @param {?} data
     * @return {?}
     */
    deserializeModel(modelType, data) {
        data.attributes = this.transformSerializedNamesToPropertyNames(modelType, data.attributes);
        return new modelType(this, data);
    }
    /**
     * @param {?} modelOrModels
     * @return {?}
     */
    addToStore(modelOrModels) {
        /** @type {?} */
        const models = Array.isArray(modelOrModels) ? modelOrModels : [modelOrModels];
        /** @type {?} */
        const type = models[0].modelConfig.type;
        /** @type {?} */
        let typeStore = this.internalStore[type];
        if (!typeStore) {
            typeStore = this.internalStore[type] = {};
        }
        for (const model of models) {
            typeStore[model.id] = model;
        }
    }
    /**
     * @template T
     * @param {?} modelType
     * @param {?} attributes
     * @return {?}
     */
    transformSerializedNamesToPropertyNames(modelType, attributes) {
        if (!attributes) {
            return {};
        }
        /** @type {?} */
        const serializedNameToPropertyName = this.getModelPropertyNames(modelType.prototype);
        /** @type {?} */
        const properties = {};
        Object.keys(serializedNameToPropertyName).forEach((/**
         * @param {?} serializedName
         * @return {?}
         */
        (serializedName) => {
            if (attributes[serializedName] !== undefined) {
                properties[serializedNameToPropertyName[serializedName]] = attributes[serializedName];
            }
        }));
        return properties;
    }
    /**
     * @protected
     * @template T
     * @param {?} modelType
     * @param {?=} params
     * @param {?=} id
     * @param {?=} customUrl
     * @return {?}
     */
    buildUrl(modelType, params, id, customUrl) {
        // TODO: use HttpParams instead of appending a string to the url
        /** @type {?} */
        const queryParams = this.toQueryString(params);
        if (customUrl) {
            return queryParams ? `${customUrl}?${queryParams}` : customUrl;
        }
        /** @type {?} */
        const modelConfig = Reflect.getMetadata('JsonApiModelConfig', modelType);
        /** @type {?} */
        const baseUrl = modelConfig.baseUrl || this.datastoreConfig.baseUrl;
        /** @type {?} */
        const apiVersion = modelConfig.apiVersion || this.datastoreConfig.apiVersion;
        /** @type {?} */
        const modelEndpointUrl = modelConfig.modelEndpointUrl || modelConfig.type;
        /** @type {?} */
        const url = [baseUrl, apiVersion, modelEndpointUrl, id].filter((/**
         * @param {?} x
         * @return {?}
         */
        (x) => x)).join('/');
        return queryParams ? `${url}?${queryParams}` : url;
    }
    /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    getRelationships(data) {
        /** @type {?} */
        let relationships;
        /** @type {?} */
        const belongsToMetadata = Reflect.getMetadata('BelongsTo', data) || [];
        /** @type {?} */
        const hasManyMetadata = Reflect.getMetadata('HasMany', data) || [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key] instanceof JsonApiModel) {
                    relationships = relationships || {};
                    if (data[key].id) {
                        /** @type {?} */
                        const entity = belongsToMetadata.find((/**
                         * @param {?} it
                         * @return {?}
                         */
                        (it) => it.propertyName === key));
                        /** @type {?} */
                        const relationshipKey = entity.relationship;
                        relationships[relationshipKey] = {
                            data: this.buildSingleRelationshipData(data[key])
                        };
                    }
                }
                else if (data[key] instanceof Array) {
                    /** @type {?} */
                    const entity = hasManyMetadata.find((/**
                     * @param {?} it
                     * @return {?}
                     */
                    (it) => it.propertyName === key));
                    if (entity && this.isValidToManyRelation(data[key])) {
                        relationships = relationships || {};
                        /** @type {?} */
                        const relationshipKey = entity.relationship;
                        /** @type {?} */
                        const relationshipData = data[key]
                            .filter((/**
                         * @param {?} model
                         * @return {?}
                         */
                        (model) => model.id))
                            .map((/**
                         * @param {?} model
                         * @return {?}
                         */
                        (model) => this.buildSingleRelationshipData(model)));
                        relationships[relationshipKey] = {
                            data: relationshipData
                        };
                    }
                }
            }
        }
        return relationships;
    }
    /**
     * @protected
     * @param {?} objects
     * @return {?}
     */
    isValidToManyRelation(objects) {
        if (!objects.length) {
            return true;
        }
        /** @type {?} */
        const isJsonApiModel = objects.every((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item instanceof JsonApiModel));
        if (!isJsonApiModel) {
            return false;
        }
        /** @type {?} */
        const types = objects.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.modelConfig.modelEndpointUrl || item.modelConfig.type));
        return types
            .filter((/**
         * @param {?} type
         * @param {?} index
         * @param {?} self
         * @return {?}
         */
        (type, index, self) => self.indexOf(type) === index))
            .length === 1;
    }
    /**
     * @protected
     * @param {?} model
     * @return {?}
     */
    buildSingleRelationshipData(model) {
        /** @type {?} */
        const relationshipType = model.modelConfig.type;
        /** @type {?} */
        const relationShipData = { type: relationshipType };
        if (model.id) {
            relationShipData.id = model.id;
        }
        else {
            /** @type {?} */
            const attributesMetadata = Reflect.getMetadata('Attribute', model);
            relationShipData.attributes = this.getDirtyAttributes(attributesMetadata, model);
        }
        return relationShipData;
    }
    /**
     * @protected
     * @template T
     * @param {?} response
     * @param {?} modelType
     * @param {?=} withMeta
     * @return {?}
     */
    extractQueryData(response, modelType, withMeta = false) {
        /** @type {?} */
        const body = response.body;
        /** @type {?} */
        const models = [];
        body.data.forEach((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            const model = this.deserializeModel(modelType, data);
            this.addToStore(model);
            if (body.included) {
                model.syncRelationships(data, body.included.concat(data));
                this.addToStore(model);
            }
            models.push(model);
        }));
        if (withMeta && withMeta === true) {
            return new JsonApiQueryData(models, this.parseMeta(body, modelType));
        }
        return models;
    }
    /**
     * @protected
     * @template T
     * @param {?} res
     * @param {?} modelType
     * @param {?=} model
     * @return {?}
     */
    extractRecordData(res, modelType, model) {
        /** @type {?} */
        const body = res.body;
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
        const deserializedModel = model || this.deserializeModel(modelType, body.data);
        this.addToStore(deserializedModel);
        if (body.included) {
            deserializedModel.syncRelationships(body.data, body.included);
            this.addToStore(deserializedModel);
        }
        return deserializedModel;
    }
    /**
     * @protected
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        if (error instanceof HttpErrorResponse &&
            error.error instanceof Object &&
            error.error.errors &&
            error.error.errors instanceof Array) {
            /** @type {?} */
            const errors = new ErrorResponse(error.error.errors);
            return throwError(errors);
        }
        return throwError(error);
    }
    /**
     * @protected
     * @param {?} body
     * @param {?} modelType
     * @return {?}
     */
    parseMeta(body, modelType) {
        /** @type {?} */
        const metaModel = Reflect.getMetadata('JsonApiModelConfig', modelType).meta;
        return new metaModel(body);
    }
    /**
     * @deprecated use buildHttpHeaders method to build request headers
     * @protected
     * @param {?=} customHeaders
     * @return {?}
     */
    getOptions(customHeaders) {
        return {
            headers: this.buildHttpHeaders(customHeaders),
        };
    }
    /**
     * @protected
     * @param {?=} customHeaders
     * @return {?}
     */
    buildHttpHeaders(customHeaders) {
        /** @type {?} */
        let requestHeaders = new HttpHeaders({
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'
        });
        if (this.globalHeaders) {
            this.globalHeaders.keys().forEach((/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                if (this.globalHeaders.has(key)) {
                    requestHeaders = requestHeaders.set(key, this.globalHeaders.get(key));
                }
            }));
        }
        if (customHeaders) {
            customHeaders.keys().forEach((/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                if (customHeaders.has(key)) {
                    requestHeaders = requestHeaders.set(key, customHeaders.get(key));
                }
            }));
        }
        return requestHeaders;
    }
    /**
     * @protected
     * @template T
     * @param {?} res
     * @param {?} attributesMetadata
     * @param {?} modelType
     * @return {?}
     */
    resetMetadataAttributes(res, attributesMetadata, modelType) {
        for (const propertyName in attributesMetadata) {
            if (attributesMetadata.hasOwnProperty(propertyName)) {
                /** @type {?} */
                const metadata = attributesMetadata[propertyName];
                if (metadata.hasDirtyAttributes) {
                    metadata.hasDirtyAttributes = false;
                }
            }
        }
        // @ts-ignore
        res[AttributeMetadataIndex] = attributesMetadata;
        return res;
    }
    /**
     * @protected
     * @template T
     * @param {?} model
     * @param {?} relationships
     * @return {?}
     */
    updateRelationships(model, relationships) {
        /** @type {?} */
        const modelsTypes = Reflect.getMetadata('JsonApiDatastoreConfig', this.constructor).models;
        for (const relationship in relationships) {
            if (relationships.hasOwnProperty(relationship) && model.hasOwnProperty(relationship)) {
                /** @type {?} */
                const relationshipModel = model[relationship];
                /** @type {?} */
                const hasMany = Reflect.getMetadata('HasMany', relationshipModel);
                /** @type {?} */
                const propertyHasMany = find(hasMany, (/**
                 * @param {?} property
                 * @return {?}
                 */
                (property) => {
                    return modelsTypes[property.relationship] === model.constructor;
                }));
                if (propertyHasMany) {
                    relationshipModel[propertyHasMany.propertyName] = relationshipModel[propertyHasMany.propertyName] || [];
                    /** @type {?} */
                    const indexOfModel = relationshipModel[propertyHasMany.propertyName].indexOf(model);
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
    }
    /**
     * @protected
     * @param {?} model
     * @return {?}
     */
    getModelPropertyNames(model) {
        return Reflect.getMetadata('AttributeMapping', model) || [];
    }
    /**
     * @private
     * @param {?=} customOptions
     * @return {?}
     */
    buildRequestOptions(customOptions = {}) {
        /** @type {?} */
        const httpHeaders = this.buildHttpHeaders(customOptions.headers);
        /** @type {?} */
        const requestOptions = Object.assign(customOptions, {
            headers: httpHeaders
        });
        return Object.assign(this.globalRequestOptions, requestOptions);
    }
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    _toQueryString(params) {
        return qs.stringify(params, { arrayFormat: 'brackets' });
    }
}
JsonApiDatastore.decorators = [
    { type: Injectable }
];
/** @nocollapse */
JsonApiDatastore.ctorParameters = () => [
    { type: HttpClient }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1hcGktZGF0YXN0b3JlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsic2VydmljZXMvanNvbi1hcGktZGF0YXN0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQWdCLE1BQU0sc0JBQXNCLENBQUM7QUFDaEcsT0FBTyxJQUFJLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBR3pCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sa0JBQWtCLENBQUM7Ozs7Ozs7OztNQVdwQixzQkFBc0IsR0FBVyxtQkFBQSxpQkFBaUIsRUFBTztBQUcvRCxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBVTNCLFlBQXNCLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFOOUIseUJBQW9CLEdBQVcsRUFBRSxDQUFDO1FBQ2xDLGtCQUFhLEdBQXVELEVBQUUsQ0FBQztRQUN2RSxrQkFBYSxHQUE0QixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7ZUFDNUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsYUFB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O0lBQzFDLHlDQUErRTs7Ozs7SUFDL0UseUNBRXFFOzs7OztJQUV6RCxnQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgZmluZCBmcm9tICdsb2Rhc2gtZXMvZmluZCc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSnNvbkFwaU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL2pzb24tYXBpLm1vZGVsJztcclxuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSB9IGZyb20gJy4uL21vZGVscy9lcnJvci1yZXNwb25zZS5tb2RlbCc7XHJcbmltcG9ydCB7IEpzb25BcGlRdWVyeURhdGEgfSBmcm9tICcuLi9tb2RlbHMvanNvbi1hcGktcXVlcnktZGF0YSc7XHJcbmltcG9ydCAqIGFzIHFzIGZyb20gJ3FzJztcclxuaW1wb3J0IHsgRGF0YXN0b3JlQ29uZmlnIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9kYXRhc3RvcmUtY29uZmlnLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE1vZGVsQ29uZmlnIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9tb2RlbC1jb25maWcuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQXR0cmlidXRlTWV0YWRhdGEgfSBmcm9tICcuLi9jb25zdGFudHMvc3ltYm9scyc7XHJcbmltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XHJcblxyXG5leHBvcnQgdHlwZSBNb2RlbFR5cGU8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4gPSBuZXcoZGF0YXN0b3JlOiBKc29uQXBpRGF0YXN0b3JlLCBkYXRhOiBhbnkpID0+IFQ7XHJcblxyXG4vKipcclxuICogSEFDSy9GSVhNRTpcclxuICogVHlwZSAnc3ltYm9sJyBjYW5ub3QgYmUgdXNlZCBhcyBhbiBpbmRleCB0eXBlLlxyXG4gKiBUeXBlU2NyaXB0IDIuOS54XHJcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzI0NTg3LlxyXG4gKi9cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcclxuY29uc3QgQXR0cmlidXRlTWV0YWRhdGFJbmRleDogc3RyaW5nID0gQXR0cmlidXRlTWV0YWRhdGEgYXMgYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSnNvbkFwaURhdGFzdG9yZSB7XHJcblxyXG4gIHByb3RlY3RlZCBjb25maWc6IERhdGFzdG9yZUNvbmZpZztcclxuICBwcml2YXRlIGdsb2JhbEhlYWRlcnM6IEh0dHBIZWFkZXJzO1xyXG4gIHByaXZhdGUgZ2xvYmFsUmVxdWVzdE9wdGlvbnM6IG9iamVjdCA9IHt9O1xyXG4gIHByaXZhdGUgaW50ZXJuYWxTdG9yZTogeyBbdHlwZTogc3RyaW5nXTogeyBbaWQ6IHN0cmluZ106IEpzb25BcGlNb2RlbCB9IH0gPSB7fTtcclxuICBwcml2YXRlIHRvUXVlcnlTdHJpbmc6IChwYXJhbXM6IGFueSkgPT4gc3RyaW5nID0gdGhpcy5kYXRhc3RvcmVDb25maWcub3ZlcnJpZGVzXHJcbiAgJiYgdGhpcy5kYXRhc3RvcmVDb25maWcub3ZlcnJpZGVzLnRvUXVlcnlTdHJpbmcgP1xyXG4gICAgdGhpcy5kYXRhc3RvcmVDb25maWcub3ZlcnJpZGVzLnRvUXVlcnlTdHJpbmcgOiB0aGlzLl90b1F1ZXJ5U3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCkge1xyXG4gIH1cclxuXHJcbiAgc2V0IGhlYWRlcnMoaGVhZGVyczogSHR0cEhlYWRlcnMpIHtcclxuICAgIHRoaXMuZ2xvYmFsSGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgfVxyXG5cclxuICBzZXQgcmVxdWVzdE9wdGlvbnMocmVxdWVzdE9wdGlvbnM6IG9iamVjdCkge1xyXG4gICAgdGhpcy5nbG9iYWxSZXF1ZXN0T3B0aW9ucyA9IHJlcXVlc3RPcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBkYXRhc3RvcmVDb25maWcoKTogRGF0YXN0b3JlQ29uZmlnIHtcclxuICAgIGNvbnN0IGNvbmZpZ0Zyb21EZWNvcmF0b3I6IERhdGFzdG9yZUNvbmZpZyA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0pzb25BcGlEYXRhc3RvcmVDb25maWcnLCB0aGlzLmNvbnN0cnVjdG9yKTtcclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGNvbmZpZ0Zyb21EZWNvcmF0b3IsIHRoaXMuY29uZmlnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IGdldERpcnR5QXR0cmlidXRlcygpIHtcclxuICAgIGlmICh0aGlzLmRhdGFzdG9yZUNvbmZpZy5vdmVycmlkZXNcclxuICAgICAgJiYgdGhpcy5kYXRhc3RvcmVDb25maWcub3ZlcnJpZGVzLmdldERpcnR5QXR0cmlidXRlcykge1xyXG4gICAgICByZXR1cm4gdGhpcy5kYXRhc3RvcmVDb25maWcub3ZlcnJpZGVzLmdldERpcnR5QXR0cmlidXRlcztcclxuICAgIH1cclxuICAgIHJldHVybiBKc29uQXBpRGF0YXN0b3JlLmdldERpcnR5QXR0cmlidXRlcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGdldERpcnR5QXR0cmlidXRlcyhhdHRyaWJ1dGVzTWV0YWRhdGE6IGFueSk6IHsgc3RyaW5nOiBhbnkgfSB7XHJcbiAgICBjb25zdCBkaXJ0eURhdGE6IGFueSA9IHt9O1xyXG5cclxuICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIGluIGF0dHJpYnV0ZXNNZXRhZGF0YSkge1xyXG4gICAgICBpZiAoYXR0cmlidXRlc01ldGFkYXRhLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcclxuICAgICAgICBjb25zdCBtZXRhZGF0YTogYW55ID0gYXR0cmlidXRlc01ldGFkYXRhW3Byb3BlcnR5TmFtZV07XHJcblxyXG4gICAgICAgIGlmIChtZXRhZGF0YS5oYXNEaXJ0eUF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBtZXRhZGF0YS5zZXJpYWxpemVkTmFtZSAhPSBudWxsID8gbWV0YWRhdGEuc2VyaWFsaXplZE5hbWUgOiBwcm9wZXJ0eU5hbWU7XHJcbiAgICAgICAgICBkaXJ0eURhdGFbYXR0cmlidXRlTmFtZV0gPSBtZXRhZGF0YS5zZXJpYWxpc2F0aW9uVmFsdWUgPyBtZXRhZGF0YS5zZXJpYWxpc2F0aW9uVmFsdWUgOiBtZXRhZGF0YS5uZXdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBkaXJ0eURhdGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVwcmVjYXRlZCB1c2UgZmluZEFsbCBtZXRob2QgdG8gdGFrZSBhbGwgbW9kZWxzXHJcbiAgICovXHJcbiAgcXVlcnk8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oXHJcbiAgICBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPixcclxuICAgIHBhcmFtcz86IGFueSxcclxuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcclxuICAgIGN1c3RvbVVybD86IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8VFtdPiB7XHJcbiAgICBjb25zdCByZXF1ZXN0SGVhZGVyczogSHR0cEhlYWRlcnMgPSB0aGlzLmJ1aWxkSHR0cEhlYWRlcnMoaGVhZGVycyk7XHJcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMuYnVpbGRVcmwobW9kZWxUeXBlLCBwYXJhbXMsIHVuZGVmaW5lZCwgY3VzdG9tVXJsKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwge2hlYWRlcnM6IHJlcXVlc3RIZWFkZXJzfSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZXM6IGFueSkgPT4gdGhpcy5leHRyYWN0UXVlcnlEYXRhKHJlcywgbW9kZWxUeXBlKSksXHJcbiAgICAgICAgY2F0Y2hFcnJvcigocmVzOiBhbnkpID0+IHRoaXMuaGFuZGxlRXJyb3IocmVzKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaW5kQWxsPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sXHJcbiAgICBwYXJhbXM/OiBhbnksXHJcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXHJcbiAgICBjdXN0b21Vcmw/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPEpzb25BcGlRdWVyeURhdGE8VD4+IHtcclxuICAgIGNvbnN0IHVybDogc3RyaW5nID0gdGhpcy5idWlsZFVybChtb2RlbFR5cGUsIHBhcmFtcywgdW5kZWZpbmVkLCBjdXN0b21VcmwpO1xyXG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnM6IG9iamVjdCA9IHRoaXMuYnVpbGRSZXF1ZXN0T3B0aW9ucyh7aGVhZGVycywgb2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgcmVxdWVzdE9wdGlvbnMpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgocmVzOiBIdHRwUmVzcG9uc2U8b2JqZWN0PikgPT4gdGhpcy5leHRyYWN0UXVlcnlEYXRhKHJlcywgbW9kZWxUeXBlLCB0cnVlKSksXHJcbiAgICAgICAgY2F0Y2hFcnJvcigocmVzOiBhbnkpID0+IHRoaXMuaGFuZGxlRXJyb3IocmVzKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaW5kUmVjb3JkPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sXHJcbiAgICBpZDogc3RyaW5nLFxyXG4gICAgcGFyYW1zPzogYW55LFxyXG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLFxyXG4gICAgY3VzdG9tVXJsPzogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9uczogb2JqZWN0ID0gdGhpcy5idWlsZFJlcXVlc3RPcHRpb25zKHtoZWFkZXJzLCBvYnNlcnZlOiAncmVzcG9uc2UnfSk7XHJcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMuYnVpbGRVcmwobW9kZWxUeXBlLCBwYXJhbXMsIGlkLCBjdXN0b21VcmwpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgcmVxdWVzdE9wdGlvbnMpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgocmVzOiBIdHRwUmVzcG9uc2U8b2JqZWN0PikgPT4gdGhpcy5leHRyYWN0UmVjb3JkRGF0YShyZXMsIG1vZGVsVHlwZSkpLFxyXG4gICAgICAgIGNhdGNoRXJyb3IoKHJlczogYW55KSA9PiB0aGlzLmhhbmRsZUVycm9yKHJlcykpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY3JlYXRlUmVjb3JkPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LCBkYXRhPzogYW55KTogVCB7XHJcbiAgICByZXR1cm4gbmV3IG1vZGVsVHlwZSh0aGlzLCB7YXR0cmlidXRlczogZGF0YX0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNhdmVSZWNvcmQ8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oXHJcbiAgICBhdHRyaWJ1dGVzTWV0YWRhdGE6IGFueSxcclxuICAgIG1vZGVsOiBULFxyXG4gICAgcGFyYW1zPzogYW55LFxyXG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLFxyXG4gICAgY3VzdG9tVXJsPzogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICBjb25zdCBtb2RlbFR5cGUgPSBtb2RlbC5jb25zdHJ1Y3RvciBhcyBNb2RlbFR5cGU8VD47XHJcbiAgICBjb25zdCBtb2RlbENvbmZpZzogTW9kZWxDb25maWcgPSBtb2RlbC5tb2RlbENvbmZpZztcclxuICAgIGNvbnN0IHR5cGVOYW1lOiBzdHJpbmcgPSBtb2RlbENvbmZpZy50eXBlO1xyXG4gICAgY29uc3QgcmVsYXRpb25zaGlwczogYW55ID0gdGhpcy5nZXRSZWxhdGlvbnNoaXBzKG1vZGVsKTtcclxuICAgIGNvbnN0IHVybDogc3RyaW5nID0gdGhpcy5idWlsZFVybChtb2RlbFR5cGUsIHBhcmFtcywgbW9kZWwuaWQsIGN1c3RvbVVybCk7XHJcblxyXG4gICAgbGV0IGh0dHBDYWxsOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxvYmplY3Q+PjtcclxuICAgIGNvbnN0IGJvZHk6IGFueSA9IHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHJlbGF0aW9uc2hpcHMsXHJcbiAgICAgICAgdHlwZTogdHlwZU5hbWUsXHJcbiAgICAgICAgaWQ6IG1vZGVsLmlkLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuZ2V0RGlydHlBdHRyaWJ1dGVzKGF0dHJpYnV0ZXNNZXRhZGF0YSwgbW9kZWwpXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnM6IG9iamVjdCA9IHRoaXMuYnVpbGRSZXF1ZXN0T3B0aW9ucyh7aGVhZGVycywgb2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pO1xyXG5cclxuICAgIGlmIChtb2RlbC5pZCkge1xyXG4gICAgICBodHRwQ2FsbCA9IHRoaXMuaHR0cC5wYXRjaDxvYmplY3Q+KHVybCwgYm9keSwgcmVxdWVzdE9wdGlvbnMpIGFzIE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPG9iamVjdD4+O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaHR0cENhbGwgPSB0aGlzLmh0dHAucG9zdDxvYmplY3Q+KHVybCwgYm9keSwgcmVxdWVzdE9wdGlvbnMpIGFzIE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPG9iamVjdD4+O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBodHRwQ2FsbFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlcykgPT4gWzIwMCwgMjAxXS5pbmRleE9mKHJlcy5zdGF0dXMpICE9PSAtMSA/IHRoaXMuZXh0cmFjdFJlY29yZERhdGEocmVzLCBtb2RlbFR5cGUsIG1vZGVsKSA6IG1vZGVsKSxcclxuICAgICAgICBjYXRjaEVycm9yKChyZXMpID0+IHtcclxuICAgICAgICAgIGlmIChyZXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb2YobW9kZWwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IocmVzKTtcclxuICAgICAgICB9KSxcclxuICAgICAgICBtYXAoKHJlcykgPT4gdGhpcy51cGRhdGVSZWxhdGlvbnNoaXBzKHJlcywgcmVsYXRpb25zaGlwcykpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVsZXRlUmVjb3JkPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sXHJcbiAgICBpZDogc3RyaW5nLFxyXG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLFxyXG4gICAgY3VzdG9tVXJsPzogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnM6IG9iamVjdCA9IHRoaXMuYnVpbGRSZXF1ZXN0T3B0aW9ucyh7aGVhZGVyc30pO1xyXG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSB0aGlzLmJ1aWxkVXJsKG1vZGVsVHlwZSwgbnVsbCwgaWQsIGN1c3RvbVVybCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodXJsLCByZXF1ZXN0T3B0aW9ucylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgY2F0Y2hFcnJvcigocmVzOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4gdGhpcy5oYW5kbGVFcnJvcihyZXMpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHBlZWtSZWNvcmQ8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4obW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sIGlkOiBzdHJpbmcpOiBUIHwgbnVsbCB7XHJcbiAgICBjb25zdCB0eXBlOiBzdHJpbmcgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpTW9kZWxDb25maWcnLCBtb2RlbFR5cGUpLnR5cGU7XHJcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbFN0b3JlW3R5cGVdID8gdGhpcy5pbnRlcm5hbFN0b3JlW3R5cGVdW2lkXSBhcyBUIDogbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwZWVrQWxsPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+KTogQXJyYXk8VD4ge1xyXG4gICAgY29uc3QgdHlwZSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0pzb25BcGlNb2RlbENvbmZpZycsIG1vZGVsVHlwZSkudHlwZTtcclxuICAgIGNvbnN0IHR5cGVTdG9yZSA9IHRoaXMuaW50ZXJuYWxTdG9yZVt0eXBlXTtcclxuICAgIHJldHVybiB0eXBlU3RvcmUgPyBPYmplY3Qua2V5cyh0eXBlU3RvcmUpLm1hcCgoa2V5KSA9PiB0eXBlU3RvcmVba2V5XSBhcyBUKSA6IFtdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc2VyaWFsaXplTW9kZWw8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4obW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sIGRhdGE6IGFueSkge1xyXG4gICAgZGF0YS5hdHRyaWJ1dGVzID0gdGhpcy50cmFuc2Zvcm1TZXJpYWxpemVkTmFtZXNUb1Byb3BlcnR5TmFtZXMobW9kZWxUeXBlLCBkYXRhLmF0dHJpYnV0ZXMpO1xyXG4gICAgcmV0dXJuIG5ldyBtb2RlbFR5cGUodGhpcywgZGF0YSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkVG9TdG9yZShtb2RlbE9yTW9kZWxzOiBKc29uQXBpTW9kZWwgfCBKc29uQXBpTW9kZWxbXSk6IHZvaWQge1xyXG4gICAgY29uc3QgbW9kZWxzID0gQXJyYXkuaXNBcnJheShtb2RlbE9yTW9kZWxzKSA/IG1vZGVsT3JNb2RlbHMgOiBbbW9kZWxPck1vZGVsc107XHJcbiAgICBjb25zdCB0eXBlOiBzdHJpbmcgPSBtb2RlbHNbMF0ubW9kZWxDb25maWcudHlwZTtcclxuICAgIGxldCB0eXBlU3RvcmUgPSB0aGlzLmludGVybmFsU3RvcmVbdHlwZV07XHJcblxyXG4gICAgaWYgKCF0eXBlU3RvcmUpIHtcclxuICAgICAgdHlwZVN0b3JlID0gdGhpcy5pbnRlcm5hbFN0b3JlW3R5cGVdID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBtb2RlbCBvZiBtb2RlbHMpIHtcclxuICAgICAgdHlwZVN0b3JlW21vZGVsLmlkXSA9IG1vZGVsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHRyYW5zZm9ybVNlcmlhbGl6ZWROYW1lc1RvUHJvcGVydHlOYW1lczxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPiwgYXR0cmlidXRlczogYW55KSB7XHJcbiAgICBpZiAoIWF0dHJpYnV0ZXMpIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlcmlhbGl6ZWROYW1lVG9Qcm9wZXJ0eU5hbWUgPSB0aGlzLmdldE1vZGVsUHJvcGVydHlOYW1lcyhtb2RlbFR5cGUucHJvdG90eXBlKTtcclxuICAgIGNvbnN0IHByb3BlcnRpZXM6IGFueSA9IHt9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKHNlcmlhbGl6ZWROYW1lVG9Qcm9wZXJ0eU5hbWUpLmZvckVhY2goKHNlcmlhbGl6ZWROYW1lKSA9PiB7XHJcbiAgICAgIGlmIChhdHRyaWJ1dGVzW3NlcmlhbGl6ZWROYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcHJvcGVydGllc1tzZXJpYWxpemVkTmFtZVRvUHJvcGVydHlOYW1lW3NlcmlhbGl6ZWROYW1lXV0gPSBhdHRyaWJ1dGVzW3NlcmlhbGl6ZWROYW1lXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRVcmw8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oXHJcbiAgICBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPixcclxuICAgIHBhcmFtcz86IGFueSxcclxuICAgIGlkPzogc3RyaW5nLFxyXG4gICAgY3VzdG9tVXJsPzogc3RyaW5nXHJcbiAgKTogc3RyaW5nIHtcclxuICAgIC8vIFRPRE86IHVzZSBIdHRwUGFyYW1zIGluc3RlYWQgb2YgYXBwZW5kaW5nIGEgc3RyaW5nIHRvIHRoZSB1cmxcclxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBzdHJpbmcgPSB0aGlzLnRvUXVlcnlTdHJpbmcocGFyYW1zKTtcclxuXHJcbiAgICBpZiAoY3VzdG9tVXJsKSB7XHJcbiAgICAgIHJldHVybiBxdWVyeVBhcmFtcyA/IGAke2N1c3RvbVVybH0/JHtxdWVyeVBhcmFtc31gIDogY3VzdG9tVXJsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1vZGVsQ29uZmlnOiBNb2RlbENvbmZpZyA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0pzb25BcGlNb2RlbENvbmZpZycsIG1vZGVsVHlwZSk7XHJcblxyXG4gICAgY29uc3QgYmFzZVVybCA9IG1vZGVsQ29uZmlnLmJhc2VVcmwgfHwgdGhpcy5kYXRhc3RvcmVDb25maWcuYmFzZVVybDtcclxuICAgIGNvbnN0IGFwaVZlcnNpb24gPSBtb2RlbENvbmZpZy5hcGlWZXJzaW9uIHx8IHRoaXMuZGF0YXN0b3JlQ29uZmlnLmFwaVZlcnNpb247XHJcbiAgICBjb25zdCBtb2RlbEVuZHBvaW50VXJsOiBzdHJpbmcgPSBtb2RlbENvbmZpZy5tb2RlbEVuZHBvaW50VXJsIHx8IG1vZGVsQ29uZmlnLnR5cGU7XHJcblxyXG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSBbYmFzZVVybCwgYXBpVmVyc2lvbiwgbW9kZWxFbmRwb2ludFVybCwgaWRdLmZpbHRlcigoeCkgPT4geCkuam9pbignLycpO1xyXG5cclxuICAgIHJldHVybiBxdWVyeVBhcmFtcyA/IGAke3VybH0/JHtxdWVyeVBhcmFtc31gIDogdXJsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldFJlbGF0aW9uc2hpcHMoZGF0YTogYW55KTogYW55IHtcclxuICAgIGxldCByZWxhdGlvbnNoaXBzOiBhbnk7XHJcblxyXG4gICAgY29uc3QgYmVsb25nc1RvTWV0YWRhdGE6IGFueVtdID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnQmVsb25nc1RvJywgZGF0YSkgfHwgW107XHJcbiAgICBjb25zdCBoYXNNYW55TWV0YWRhdGE6IGFueVtdID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSGFzTWFueScsIGRhdGEpIHx8IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcclxuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIGlmIChkYXRhW2tleV0gaW5zdGFuY2VvZiBKc29uQXBpTW9kZWwpIHtcclxuICAgICAgICAgIHJlbGF0aW9uc2hpcHMgPSByZWxhdGlvbnNoaXBzIHx8IHt9O1xyXG5cclxuICAgICAgICAgIGlmIChkYXRhW2tleV0uaWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZW50aXR5ID0gYmVsb25nc1RvTWV0YWRhdGEuZmluZCgoaXQ6IGFueSkgPT4gaXQucHJvcGVydHlOYW1lID09PSBrZXkpO1xyXG4gICAgICAgICAgICBjb25zdCByZWxhdGlvbnNoaXBLZXkgPSBlbnRpdHkucmVsYXRpb25zaGlwO1xyXG4gICAgICAgICAgICByZWxhdGlvbnNoaXBzW3JlbGF0aW9uc2hpcEtleV0gPSB7XHJcbiAgICAgICAgICAgICAgZGF0YTogdGhpcy5idWlsZFNpbmdsZVJlbGF0aW9uc2hpcERhdGEoZGF0YVtrZXldKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YVtrZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgIGNvbnN0IGVudGl0eSA9IGhhc01hbnlNZXRhZGF0YS5maW5kKChpdDogYW55KSA9PiBpdC5wcm9wZXJ0eU5hbWUgPT09IGtleSk7XHJcbiAgICAgICAgICBpZiAoZW50aXR5ICYmIHRoaXMuaXNWYWxpZFRvTWFueVJlbGF0aW9uKGRhdGFba2V5XSkpIHtcclxuICAgICAgICAgICAgcmVsYXRpb25zaGlwcyA9IHJlbGF0aW9uc2hpcHMgfHwge307XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZWxhdGlvbnNoaXBLZXkgPSBlbnRpdHkucmVsYXRpb25zaGlwO1xyXG4gICAgICAgICAgICBjb25zdCByZWxhdGlvbnNoaXBEYXRhID0gZGF0YVtrZXldXHJcbiAgICAgICAgICAgICAgLmZpbHRlcigobW9kZWw6IEpzb25BcGlNb2RlbCkgPT4gbW9kZWwuaWQpXHJcbiAgICAgICAgICAgICAgLm1hcCgobW9kZWw6IEpzb25BcGlNb2RlbCkgPT4gdGhpcy5idWlsZFNpbmdsZVJlbGF0aW9uc2hpcERhdGEobW9kZWwpKTtcclxuXHJcbiAgICAgICAgICAgIHJlbGF0aW9uc2hpcHNbcmVsYXRpb25zaGlwS2V5XSA9IHtcclxuICAgICAgICAgICAgICBkYXRhOiByZWxhdGlvbnNoaXBEYXRhXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlbGF0aW9uc2hpcHM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaXNWYWxpZFRvTWFueVJlbGF0aW9uKG9iamVjdHM6IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgIGlmICghb2JqZWN0cy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpc0pzb25BcGlNb2RlbCA9IG9iamVjdHMuZXZlcnkoKGl0ZW0pID0+IGl0ZW0gaW5zdGFuY2VvZiBKc29uQXBpTW9kZWwpO1xyXG4gICAgaWYgKCFpc0pzb25BcGlNb2RlbCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0eXBlcyA9IG9iamVjdHMubWFwKChpdGVtOiBKc29uQXBpTW9kZWwpID0+IGl0ZW0ubW9kZWxDb25maWcubW9kZWxFbmRwb2ludFVybCB8fCBpdGVtLm1vZGVsQ29uZmlnLnR5cGUpO1xyXG4gICAgcmV0dXJuIHR5cGVzXHJcbiAgICAgIC5maWx0ZXIoKHR5cGU6IHN0cmluZywgaW5kZXg6IG51bWJlciwgc2VsZjogc3RyaW5nW10pID0+IHNlbGYuaW5kZXhPZih0eXBlKSA9PT0gaW5kZXgpXHJcbiAgICAgIC5sZW5ndGggPT09IDE7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRTaW5nbGVSZWxhdGlvbnNoaXBEYXRhKG1vZGVsOiBKc29uQXBpTW9kZWwpOiBhbnkge1xyXG4gICAgY29uc3QgcmVsYXRpb25zaGlwVHlwZTogc3RyaW5nID0gbW9kZWwubW9kZWxDb25maWcudHlwZTtcclxuICAgIGNvbnN0IHJlbGF0aW9uU2hpcERhdGE6IHsgdHlwZTogc3RyaW5nLCBpZD86IHN0cmluZywgYXR0cmlidXRlcz86IGFueSB9ID0ge3R5cGU6IHJlbGF0aW9uc2hpcFR5cGV9O1xyXG5cclxuICAgIGlmIChtb2RlbC5pZCkge1xyXG4gICAgICByZWxhdGlvblNoaXBEYXRhLmlkID0gbW9kZWwuaWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzTWV0YWRhdGE6IGFueSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0F0dHJpYnV0ZScsIG1vZGVsKTtcclxuICAgICAgcmVsYXRpb25TaGlwRGF0YS5hdHRyaWJ1dGVzID0gdGhpcy5nZXREaXJ0eUF0dHJpYnV0ZXMoYXR0cmlidXRlc01ldGFkYXRhLCBtb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlbGF0aW9uU2hpcERhdGE7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZXh0cmFjdFF1ZXJ5RGF0YTxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8b2JqZWN0PixcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgd2l0aE1ldGEgPSBmYWxzZVxyXG4gICk6IEFycmF5PFQ+IHwgSnNvbkFwaVF1ZXJ5RGF0YTxUPiB7XHJcbiAgICBjb25zdCBib2R5OiBhbnkgPSByZXNwb25zZS5ib2R5O1xyXG4gICAgY29uc3QgbW9kZWxzOiBUW10gPSBbXTtcclxuXHJcbiAgICBib2R5LmRhdGEuZm9yRWFjaCgoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZGVsOiBUID0gdGhpcy5kZXNlcmlhbGl6ZU1vZGVsKG1vZGVsVHlwZSwgZGF0YSk7XHJcbiAgICAgIHRoaXMuYWRkVG9TdG9yZShtb2RlbCk7XHJcblxyXG4gICAgICBpZiAoYm9keS5pbmNsdWRlZCkge1xyXG4gICAgICAgIG1vZGVsLnN5bmNSZWxhdGlvbnNoaXBzKGRhdGEsIGJvZHkuaW5jbHVkZWQuY29uY2F0KGRhdGEpKTtcclxuICAgICAgICB0aGlzLmFkZFRvU3RvcmUobW9kZWwpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBtb2RlbHMucHVzaChtb2RlbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAod2l0aE1ldGEgJiYgd2l0aE1ldGEgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIG5ldyBKc29uQXBpUXVlcnlEYXRhKG1vZGVscywgdGhpcy5wYXJzZU1ldGEoYm9keSwgbW9kZWxUeXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1vZGVscztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBleHRyYWN0UmVjb3JkRGF0YTxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIHJlczogSHR0cFJlc3BvbnNlPG9iamVjdD4sXHJcbiAgICBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPixcclxuICAgIG1vZGVsPzogVFxyXG4gICk6IFQge1xyXG4gICAgY29uc3QgYm9keTogYW55ID0gcmVzLmJvZHk7XHJcbiAgICAvLyBFcnJvciBpbiBBbmd1bGFyIDwgNS4yLjQgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yMDc0NClcclxuICAgIC8vIG51bGwgaXMgY29udmVydGVkIHRvICdudWxsJywgc28gdGhpcyBpcyB0ZW1wb3JhcnkgbmVlZGVkIHRvIG1ha2UgdGVzdGNhc2UgcG9zc2libGVcclxuICAgIC8vIChhbmQgdG8gYXZvaWQgYSBkZWNyZWFzZSBvZiB0aGUgY292ZXJhZ2UpXHJcbiAgICBpZiAoIWJvZHkgfHwgYm9keSA9PT0gJ251bGwnKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gYm9keSBpbiByZXNwb25zZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghYm9keS5kYXRhKSB7XHJcbiAgICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDEgfHwgIW1vZGVsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHBlY3RlZCBkYXRhIGluIHJlc3BvbnNlJyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RlbCkge1xyXG4gICAgICBtb2RlbC5tb2RlbEluaXRpYWxpemF0aW9uID0gdHJ1ZTtcclxuICAgICAgbW9kZWwuaWQgPSBib2R5LmRhdGEuaWQ7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24obW9kZWwsIGJvZHkuZGF0YS5hdHRyaWJ1dGVzKTtcclxuICAgICAgbW9kZWwubW9kZWxJbml0aWFsaXphdGlvbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlc2VyaWFsaXplZE1vZGVsID0gbW9kZWwgfHwgdGhpcy5kZXNlcmlhbGl6ZU1vZGVsKG1vZGVsVHlwZSwgYm9keS5kYXRhKTtcclxuICAgIHRoaXMuYWRkVG9TdG9yZShkZXNlcmlhbGl6ZWRNb2RlbCk7XHJcbiAgICBpZiAoYm9keS5pbmNsdWRlZCkge1xyXG4gICAgICBkZXNlcmlhbGl6ZWRNb2RlbC5zeW5jUmVsYXRpb25zaGlwcyhib2R5LmRhdGEsIGJvZHkuaW5jbHVkZWQpO1xyXG4gICAgICB0aGlzLmFkZFRvU3RvcmUoZGVzZXJpYWxpemVkTW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZXNlcmlhbGl6ZWRNb2RlbDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGlmIChcclxuICAgICAgZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSAmJlxyXG4gICAgICBlcnJvci5lcnJvciBpbnN0YW5jZW9mIE9iamVjdCAmJlxyXG4gICAgICBlcnJvci5lcnJvci5lcnJvcnMgJiZcclxuICAgICAgZXJyb3IuZXJyb3IuZXJyb3JzIGluc3RhbmNlb2YgQXJyYXlcclxuICAgICkge1xyXG4gICAgICBjb25zdCBlcnJvcnM6IEVycm9yUmVzcG9uc2UgPSBuZXcgRXJyb3JSZXNwb25zZShlcnJvci5lcnJvci5lcnJvcnMpO1xyXG4gICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBwYXJzZU1ldGEoYm9keTogYW55LCBtb2RlbFR5cGU6IE1vZGVsVHlwZTxKc29uQXBpTW9kZWw+KTogYW55IHtcclxuICAgIGNvbnN0IG1ldGFNb2RlbDogYW55ID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaU1vZGVsQ29uZmlnJywgbW9kZWxUeXBlKS5tZXRhO1xyXG4gICAgcmV0dXJuIG5ldyBtZXRhTW9kZWwoYm9keSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVwcmVjYXRlZCB1c2UgYnVpbGRIdHRwSGVhZGVycyBtZXRob2QgdG8gYnVpbGQgcmVxdWVzdCBoZWFkZXJzXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGdldE9wdGlvbnMoY3VzdG9tSGVhZGVycz86IEh0dHBIZWFkZXJzKTogYW55IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuYnVpbGRIdHRwSGVhZGVycyhjdXN0b21IZWFkZXJzKSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRIdHRwSGVhZGVycyhjdXN0b21IZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBIdHRwSGVhZGVycyB7XHJcbiAgICBsZXQgcmVxdWVzdEhlYWRlcnM6IEh0dHBIZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJyxcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5nbG9iYWxIZWFkZXJzKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsSGVhZGVycy5rZXlzKCkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2xvYmFsSGVhZGVycy5oYXMoa2V5KSkge1xyXG4gICAgICAgICAgcmVxdWVzdEhlYWRlcnMgPSByZXF1ZXN0SGVhZGVycy5zZXQoa2V5LCB0aGlzLmdsb2JhbEhlYWRlcnMuZ2V0KGtleSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN1c3RvbUhlYWRlcnMpIHtcclxuICAgICAgY3VzdG9tSGVhZGVycy5rZXlzKCkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgaWYgKGN1c3RvbUhlYWRlcnMuaGFzKGtleSkpIHtcclxuICAgICAgICAgIHJlcXVlc3RIZWFkZXJzID0gcmVxdWVzdEhlYWRlcnMuc2V0KGtleSwgY3VzdG9tSGVhZGVycy5nZXQoa2V5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVxdWVzdEhlYWRlcnM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVzZXRNZXRhZGF0YUF0dHJpYnV0ZXM8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4ocmVzOiBULCBhdHRyaWJ1dGVzTWV0YWRhdGE6IGFueSwgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4pIHtcclxuICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIGluIGF0dHJpYnV0ZXNNZXRhZGF0YSkge1xyXG4gICAgICBpZiAoYXR0cmlidXRlc01ldGFkYXRhLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcclxuICAgICAgICBjb25zdCBtZXRhZGF0YTogYW55ID0gYXR0cmlidXRlc01ldGFkYXRhW3Byb3BlcnR5TmFtZV07XHJcblxyXG4gICAgICAgIGlmIChtZXRhZGF0YS5oYXNEaXJ0eUF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgIG1ldGFkYXRhLmhhc0RpcnR5QXR0cmlidXRlcyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHJlc1tBdHRyaWJ1dGVNZXRhZGF0YUluZGV4XSA9IGF0dHJpYnV0ZXNNZXRhZGF0YTtcclxuICAgIHJldHVybiByZXM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdXBkYXRlUmVsYXRpb25zaGlwczxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihtb2RlbDogVCwgcmVsYXRpb25zaGlwczogYW55KTogVCB7XHJcbiAgICBjb25zdCBtb2RlbHNUeXBlczogYW55ID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaURhdGFzdG9yZUNvbmZpZycsIHRoaXMuY29uc3RydWN0b3IpLm1vZGVscztcclxuXHJcbiAgICBmb3IgKGNvbnN0IHJlbGF0aW9uc2hpcCBpbiByZWxhdGlvbnNoaXBzKSB7XHJcbiAgICAgIGlmIChyZWxhdGlvbnNoaXBzLmhhc093blByb3BlcnR5KHJlbGF0aW9uc2hpcCkgJiYgbW9kZWwuaGFzT3duUHJvcGVydHkocmVsYXRpb25zaGlwKSkge1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aW9uc2hpcE1vZGVsOiBKc29uQXBpTW9kZWwgPSBtb2RlbFtyZWxhdGlvbnNoaXBdO1xyXG4gICAgICAgIGNvbnN0IGhhc01hbnk6IGFueVtdID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSGFzTWFueScsIHJlbGF0aW9uc2hpcE1vZGVsKTtcclxuICAgICAgICBjb25zdCBwcm9wZXJ0eUhhc01hbnk6IGFueSA9IGZpbmQoaGFzTWFueSwgKHByb3BlcnR5KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gbW9kZWxzVHlwZXNbcHJvcGVydHkucmVsYXRpb25zaGlwXSA9PT0gbW9kZWwuY29uc3RydWN0b3I7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0eUhhc01hbnkpIHtcclxuICAgICAgICAgIHJlbGF0aW9uc2hpcE1vZGVsW3Byb3BlcnR5SGFzTWFueS5wcm9wZXJ0eU5hbWVdID0gcmVsYXRpb25zaGlwTW9kZWxbcHJvcGVydHlIYXNNYW55LnByb3BlcnR5TmFtZV0gfHwgW107XHJcblxyXG4gICAgICAgICAgY29uc3QgaW5kZXhPZk1vZGVsID0gcmVsYXRpb25zaGlwTW9kZWxbcHJvcGVydHlIYXNNYW55LnByb3BlcnR5TmFtZV0uaW5kZXhPZihtb2RlbCk7XHJcblxyXG4gICAgICAgICAgaWYgKGluZGV4T2ZNb2RlbCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmVsYXRpb25zaGlwTW9kZWxbcHJvcGVydHlIYXNNYW55LnByb3BlcnR5TmFtZV0ucHVzaChtb2RlbCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWxhdGlvbnNoaXBNb2RlbFtwcm9wZXJ0eUhhc01hbnkucHJvcGVydHlOYW1lXVtpbmRleE9mTW9kZWxdID0gbW9kZWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1vZGVsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldE1vZGVsUHJvcGVydHlOYW1lcyhtb2RlbDogSnNvbkFwaU1vZGVsKSB7XHJcbiAgICByZXR1cm4gUmVmbGVjdC5nZXRNZXRhZGF0YSgnQXR0cmlidXRlTWFwcGluZycsIG1vZGVsKSB8fCBbXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRSZXF1ZXN0T3B0aW9ucyhjdXN0b21PcHRpb25zOiBhbnkgPSB7fSk6IG9iamVjdCB7XHJcbiAgICBjb25zdCBodHRwSGVhZGVyczogSHR0cEhlYWRlcnMgPSB0aGlzLmJ1aWxkSHR0cEhlYWRlcnMoY3VzdG9tT3B0aW9ucy5oZWFkZXJzKTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9uczogb2JqZWN0ID0gT2JqZWN0LmFzc2lnbihjdXN0b21PcHRpb25zLCB7XHJcbiAgICAgIGhlYWRlcnM6IGh0dHBIZWFkZXJzXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbFJlcXVlc3RPcHRpb25zLCByZXF1ZXN0T3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF90b1F1ZXJ5U3RyaW5nKHBhcmFtczogYW55KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBxcy5zdHJpbmdpZnkocGFyYW1zLCB7YXJyYXlGb3JtYXQ6ICdicmFja2V0cyd9KTtcclxuICB9XHJcbn1cclxuIl19