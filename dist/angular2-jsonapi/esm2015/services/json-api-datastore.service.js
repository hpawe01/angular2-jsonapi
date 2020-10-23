/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
                else if (data[key] === null) {
                    /** @type {?} */
                    const entity = belongsToMetadata.find((/**
                     * @param {?} entity
                     * @return {?}
                     */
                    (entity) => entity.propertyName === key));
                    if (entity) {
                        relationships = relationships || {};
                        relationships[entity.relationship] = {
                            data: null
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
            if (relationships.hasOwnProperty(relationship) && model.hasOwnProperty(relationship) && model[relationship]) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1hcGktZGF0YXN0b3JlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsic2VydmljZXMvanNvbi1hcGktZGF0YXN0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQWdCLE1BQU0sc0JBQXNCLENBQUM7QUFDaEcsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBYyxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFHekIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxrQkFBa0IsQ0FBQzs7Ozs7Ozs7O01BV3BCLHNCQUFzQixHQUFXLG1CQUFBLGlCQUFpQixFQUFPO0FBRy9ELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUFVM0IsWUFBc0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQU45Qix5QkFBb0IsR0FBVyxFQUFFLENBQUM7UUFDbEMsa0JBQWEsR0FBdUQsRUFBRSxDQUFDO1FBQ3ZFLGtCQUFhLEdBQTRCLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUztlQUM1RSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMs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TSxDQUFDLGFBQWEsRUFBRTtZQUMxRCxPQUFPLEVBQUUsV0FBVztTQUNyQixDQUFDO1FBRUYsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNsRSxDQUFDOzs7Ozs7SUFFTyxjQUFjLENBQUMsTUFBVztRQUNoQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUMsV0FBVyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7O1lBMWVGLFVBQVU7Ozs7WUF4QkYsVUFBVTs7Ozs7OztJQTJCakIsa0NBQWtDOzs7OztJQUNsQyx5Q0FBbUM7Ozs7O0lBQ25DLGdEQUEwQzs7Ozs7SUFDMUMseUNBQStFOzs7OztJQUMvRSx5Q0FFcUU7Ozs7O0lBRXpELGdDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IGZpbmQgfSBmcm9tICdsb2Rhc2gtZXMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEpzb25BcGlNb2RlbCB9IGZyb20gJy4uL21vZGVscy9qc29uLWFwaS5tb2RlbCc7XHJcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuLi9tb2RlbHMvZXJyb3ItcmVzcG9uc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBKc29uQXBpUXVlcnlEYXRhIH0gZnJvbSAnLi4vbW9kZWxzL2pzb24tYXBpLXF1ZXJ5LWRhdGEnO1xyXG5pbXBvcnQgKiBhcyBxcyBmcm9tICdxcyc7XHJcbmltcG9ydCB7IERhdGFzdG9yZUNvbmZpZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvZGF0YXN0b3JlLWNvbmZpZy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBNb2RlbENvbmZpZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvbW9kZWwtY29uZmlnLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZU1ldGFkYXRhIH0gZnJvbSAnLi4vY29uc3RhbnRzL3N5bWJvbHMnO1xyXG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xyXG5cclxuZXhwb3J0IHR5cGUgTW9kZWxUeXBlPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+ID0gbmV3KGRhdGFzdG9yZTogSnNvbkFwaURhdGFzdG9yZSwgZGF0YTogYW55KSA9PiBUO1xyXG5cclxuLyoqXHJcbiAqIEhBQ0svRklYTUU6XHJcbiAqIFR5cGUgJ3N5bWJvbCcgY2Fubm90IGJlIHVzZWQgYXMgYW4gaW5kZXggdHlwZS5cclxuICogVHlwZVNjcmlwdCAyLjkueFxyXG4gKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8yNDU4Ny5cclxuICovXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXHJcbmNvbnN0IEF0dHJpYnV0ZU1ldGFkYXRhSW5kZXg6IHN0cmluZyA9IEF0dHJpYnV0ZU1ldGFkYXRhIGFzIGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEpzb25BcGlEYXRhc3RvcmUge1xyXG5cclxuICBwcm90ZWN0ZWQgY29uZmlnOiBEYXRhc3RvcmVDb25maWc7XHJcbiAgcHJpdmF0ZSBnbG9iYWxIZWFkZXJzOiBIdHRwSGVhZGVycztcclxuICBwcml2YXRlIGdsb2JhbFJlcXVlc3RPcHRpb25zOiBvYmplY3QgPSB7fTtcclxuICBwcml2YXRlIGludGVybmFsU3RvcmU6IHsgW3R5cGU6IHN0cmluZ106IHsgW2lkOiBzdHJpbmddOiBKc29uQXBpTW9kZWwgfSB9ID0ge307XHJcbiAgcHJpdmF0ZSB0b1F1ZXJ5U3RyaW5nOiAocGFyYW1zOiBhbnkpID0+IHN0cmluZyA9IHRoaXMuZGF0YXN0b3JlQ29uZmlnLm92ZXJyaWRlc1xyXG4gICYmIHRoaXMuZGF0YXN0b3JlQ29uZmlnLm92ZXJyaWRlcy50b1F1ZXJ5U3RyaW5nID9cclxuICAgIHRoaXMuZGF0YXN0b3JlQ29uZmlnLm92ZXJyaWRlcy50b1F1ZXJ5U3RyaW5nIDogdGhpcy5fdG9RdWVyeVN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICB9XHJcblxyXG4gIHNldCBoZWFkZXJzKGhlYWRlcnM6IEh0dHBIZWFkZXJzKSB7XHJcbiAgICB0aGlzLmdsb2JhbEhlYWRlcnMgPSBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgc2V0IHJlcXVlc3RPcHRpb25zKHJlcXVlc3RPcHRpb25zOiBvYmplY3QpIHtcclxuICAgIHRoaXMuZ2xvYmFsUmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0T3B0aW9ucztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZGF0YXN0b3JlQ29uZmlnKCk6IERhdGFzdG9yZUNvbmZpZyB7XHJcbiAgICBjb25zdCBjb25maWdGcm9tRGVjb3JhdG9yOiBEYXRhc3RvcmVDb25maWcgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpRGF0YXN0b3JlQ29uZmlnJywgdGhpcy5jb25zdHJ1Y3Rvcik7XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihjb25maWdGcm9tRGVjb3JhdG9yLCB0aGlzLmNvbmZpZyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBnZXREaXJ0eUF0dHJpYnV0ZXMoKSB7XHJcbiAgICBpZiAodGhpcy5kYXRhc3RvcmVDb25maWcub3ZlcnJpZGVzXHJcbiAgICAgICYmIHRoaXMuZGF0YXN0b3JlQ29uZmlnLm92ZXJyaWRlcy5nZXREaXJ0eUF0dHJpYnV0ZXMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZGF0YXN0b3JlQ29uZmlnLm92ZXJyaWRlcy5nZXREaXJ0eUF0dHJpYnV0ZXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gSnNvbkFwaURhdGFzdG9yZS5nZXREaXJ0eUF0dHJpYnV0ZXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBnZXREaXJ0eUF0dHJpYnV0ZXMoYXR0cmlidXRlc01ldGFkYXRhOiBhbnkpOiB7IHN0cmluZzogYW55IH0ge1xyXG4gICAgY29uc3QgZGlydHlEYXRhOiBhbnkgPSB7fTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBpbiBhdHRyaWJ1dGVzTWV0YWRhdGEpIHtcclxuICAgICAgaWYgKGF0dHJpYnV0ZXNNZXRhZGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XHJcbiAgICAgICAgY29uc3QgbWV0YWRhdGE6IGFueSA9IGF0dHJpYnV0ZXNNZXRhZGF0YVtwcm9wZXJ0eU5hbWVdO1xyXG5cclxuICAgICAgICBpZiAobWV0YWRhdGEuaGFzRGlydHlBdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gbWV0YWRhdGEuc2VyaWFsaXplZE5hbWUgIT0gbnVsbCA/IG1ldGFkYXRhLnNlcmlhbGl6ZWROYW1lIDogcHJvcGVydHlOYW1lO1xyXG4gICAgICAgICAgZGlydHlEYXRhW2F0dHJpYnV0ZU5hbWVdID0gbWV0YWRhdGEuc2VyaWFsaXNhdGlvblZhbHVlID8gbWV0YWRhdGEuc2VyaWFsaXNhdGlvblZhbHVlIDogbWV0YWRhdGEubmV3VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGlydHlEYXRhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlcHJlY2F0ZWQgdXNlIGZpbmRBbGwgbWV0aG9kIHRvIHRha2UgYWxsIG1vZGVsc1xyXG4gICAqL1xyXG4gIHF1ZXJ5PFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sXHJcbiAgICBwYXJhbXM/OiBhbnksXHJcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXHJcbiAgICBjdXN0b21Vcmw/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnM6IEh0dHBIZWFkZXJzID0gdGhpcy5idWlsZEh0dHBIZWFkZXJzKGhlYWRlcnMpO1xyXG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSB0aGlzLmJ1aWxkVXJsKG1vZGVsVHlwZSwgcGFyYW1zLCB1bmRlZmluZWQsIGN1c3RvbVVybCk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIHtoZWFkZXJzOiByZXF1ZXN0SGVhZGVyc30pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgocmVzOiBhbnkpID0+IHRoaXMuZXh0cmFjdFF1ZXJ5RGF0YShyZXMsIG1vZGVsVHlwZSkpLFxyXG4gICAgICAgIGNhdGNoRXJyb3IoKHJlczogYW55KSA9PiB0aGlzLmhhbmRsZUVycm9yKHJlcykpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmluZEFsbDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgcGFyYW1zPzogYW55LFxyXG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLFxyXG4gICAgY3VzdG9tVXJsPzogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxKc29uQXBpUXVlcnlEYXRhPFQ+PiB7XHJcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMuYnVpbGRVcmwobW9kZWxUeXBlLCBwYXJhbXMsIHVuZGVmaW5lZCwgY3VzdG9tVXJsKTtcclxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zOiBvYmplY3QgPSB0aGlzLmJ1aWxkUmVxdWVzdE9wdGlvbnMoe2hlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZSd9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIHJlcXVlc3RPcHRpb25zKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlczogSHR0cFJlc3BvbnNlPG9iamVjdD4pID0+IHRoaXMuZXh0cmFjdFF1ZXJ5RGF0YShyZXMsIG1vZGVsVHlwZSwgdHJ1ZSkpLFxyXG4gICAgICAgIGNhdGNoRXJyb3IoKHJlczogYW55KSA9PiB0aGlzLmhhbmRsZUVycm9yKHJlcykpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmluZFJlY29yZDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgaWQ6IHN0cmluZyxcclxuICAgIHBhcmFtcz86IGFueSxcclxuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcclxuICAgIGN1c3RvbVVybD86IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnM6IG9iamVjdCA9IHRoaXMuYnVpbGRSZXF1ZXN0T3B0aW9ucyh7aGVhZGVycywgb2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pO1xyXG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSB0aGlzLmJ1aWxkVXJsKG1vZGVsVHlwZSwgcGFyYW1zLCBpZCwgY3VzdG9tVXJsKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIHJlcXVlc3RPcHRpb25zKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlczogSHR0cFJlc3BvbnNlPG9iamVjdD4pID0+IHRoaXMuZXh0cmFjdFJlY29yZERhdGEocmVzLCBtb2RlbFR5cGUpKSxcclxuICAgICAgICBjYXRjaEVycm9yKChyZXM6IGFueSkgPT4gdGhpcy5oYW5kbGVFcnJvcihyZXMpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNyZWF0ZVJlY29yZDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPiwgZGF0YT86IGFueSk6IFQge1xyXG4gICAgcmV0dXJuIG5ldyBtb2RlbFR5cGUodGhpcywge2F0dHJpYnV0ZXM6IGRhdGF9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzYXZlUmVjb3JkPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgYXR0cmlidXRlc01ldGFkYXRhOiBhbnksXHJcbiAgICBtb2RlbDogVCxcclxuICAgIHBhcmFtcz86IGFueSxcclxuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcclxuICAgIGN1c3RvbVVybD86IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgY29uc3QgbW9kZWxUeXBlID0gbW9kZWwuY29uc3RydWN0b3IgYXMgTW9kZWxUeXBlPFQ+O1xyXG4gICAgY29uc3QgbW9kZWxDb25maWc6IE1vZGVsQ29uZmlnID0gbW9kZWwubW9kZWxDb25maWc7XHJcbiAgICBjb25zdCB0eXBlTmFtZTogc3RyaW5nID0gbW9kZWxDb25maWcudHlwZTtcclxuICAgIGNvbnN0IHJlbGF0aW9uc2hpcHM6IGFueSA9IHRoaXMuZ2V0UmVsYXRpb25zaGlwcyhtb2RlbCk7XHJcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMuYnVpbGRVcmwobW9kZWxUeXBlLCBwYXJhbXMsIG1vZGVsLmlkLCBjdXN0b21VcmwpO1xyXG5cclxuICAgIGxldCBodHRwQ2FsbDogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8b2JqZWN0Pj47XHJcbiAgICBjb25zdCBib2R5OiBhbnkgPSB7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICByZWxhdGlvbnNoaXBzLFxyXG4gICAgICAgIHR5cGU6IHR5cGVOYW1lLFxyXG4gICAgICAgIGlkOiBtb2RlbC5pZCxcclxuICAgICAgICBhdHRyaWJ1dGVzOiB0aGlzLmdldERpcnR5QXR0cmlidXRlcyhhdHRyaWJ1dGVzTWV0YWRhdGEsIG1vZGVsKVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zOiBvYmplY3QgPSB0aGlzLmJ1aWxkUmVxdWVzdE9wdGlvbnMoe2hlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZSd9KTtcclxuXHJcbiAgICBpZiAobW9kZWwuaWQpIHtcclxuICAgICAgaHR0cENhbGwgPSB0aGlzLmh0dHAucGF0Y2g8b2JqZWN0Pih1cmwsIGJvZHksIHJlcXVlc3RPcHRpb25zKSBhcyBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxvYmplY3Q+PjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGh0dHBDYWxsID0gdGhpcy5odHRwLnBvc3Q8b2JqZWN0Pih1cmwsIGJvZHksIHJlcXVlc3RPcHRpb25zKSBhcyBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxvYmplY3Q+PjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaHR0cENhbGxcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZXMpID0+IFsyMDAsIDIwMV0uaW5kZXhPZihyZXMuc3RhdHVzKSAhPT0gLTEgPyB0aGlzLmV4dHJhY3RSZWNvcmREYXRhKHJlcywgbW9kZWxUeXBlLCBtb2RlbCkgOiBtb2RlbCksXHJcbiAgICAgICAgY2F0Y2hFcnJvcigocmVzKSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKG1vZGVsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZUVycm9yKHJlcyk7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgbWFwKChyZXMpID0+IHRoaXMudXBkYXRlUmVsYXRpb25zaGlwcyhyZXMsIHJlbGF0aW9uc2hpcHMpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlbGV0ZVJlY29yZDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgaWQ6IHN0cmluZyxcclxuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcclxuICAgIGN1c3RvbVVybD86IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zOiBvYmplY3QgPSB0aGlzLmJ1aWxkUmVxdWVzdE9wdGlvbnMoe2hlYWRlcnN9KTtcclxuICAgIGNvbnN0IHVybDogc3RyaW5nID0gdGhpcy5idWlsZFVybChtb2RlbFR5cGUsIG51bGwsIGlkLCBjdXN0b21VcmwpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHVybCwgcmVxdWVzdE9wdGlvbnMpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGNhdGNoRXJyb3IoKHJlczogSHR0cEVycm9yUmVzcG9uc2UpID0+IHRoaXMuaGFuZGxlRXJyb3IocmVzKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwZWVrUmVjb3JkPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LCBpZDogc3RyaW5nKTogVCB8IG51bGwge1xyXG4gICAgY29uc3QgdHlwZTogc3RyaW5nID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaU1vZGVsQ29uZmlnJywgbW9kZWxUeXBlKS50eXBlO1xyXG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxTdG9yZVt0eXBlXSA/IHRoaXMuaW50ZXJuYWxTdG9yZVt0eXBlXVtpZF0gYXMgVCA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcGVla0FsbDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPik6IEFycmF5PFQ+IHtcclxuICAgIGNvbnN0IHR5cGUgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpTW9kZWxDb25maWcnLCBtb2RlbFR5cGUpLnR5cGU7XHJcbiAgICBjb25zdCB0eXBlU3RvcmUgPSB0aGlzLmludGVybmFsU3RvcmVbdHlwZV07XHJcbiAgICByZXR1cm4gdHlwZVN0b3JlID8gT2JqZWN0LmtleXModHlwZVN0b3JlKS5tYXAoKGtleSkgPT4gdHlwZVN0b3JlW2tleV0gYXMgVCkgOiBbXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZXNlcmlhbGl6ZU1vZGVsPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LCBkYXRhOiBhbnkpIHtcclxuICAgIGRhdGEuYXR0cmlidXRlcyA9IHRoaXMudHJhbnNmb3JtU2VyaWFsaXplZE5hbWVzVG9Qcm9wZXJ0eU5hbWVzKG1vZGVsVHlwZSwgZGF0YS5hdHRyaWJ1dGVzKTtcclxuICAgIHJldHVybiBuZXcgbW9kZWxUeXBlKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZFRvU3RvcmUobW9kZWxPck1vZGVsczogSnNvbkFwaU1vZGVsIHwgSnNvbkFwaU1vZGVsW10pOiB2b2lkIHtcclxuICAgIGNvbnN0IG1vZGVscyA9IEFycmF5LmlzQXJyYXkobW9kZWxPck1vZGVscykgPyBtb2RlbE9yTW9kZWxzIDogW21vZGVsT3JNb2RlbHNdO1xyXG4gICAgY29uc3QgdHlwZTogc3RyaW5nID0gbW9kZWxzWzBdLm1vZGVsQ29uZmlnLnR5cGU7XHJcbiAgICBsZXQgdHlwZVN0b3JlID0gdGhpcy5pbnRlcm5hbFN0b3JlW3R5cGVdO1xyXG5cclxuICAgIGlmICghdHlwZVN0b3JlKSB7XHJcbiAgICAgIHR5cGVTdG9yZSA9IHRoaXMuaW50ZXJuYWxTdG9yZVt0eXBlXSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgbW9kZWwgb2YgbW9kZWxzKSB7XHJcbiAgICAgIHR5cGVTdG9yZVttb2RlbC5pZF0gPSBtb2RlbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB0cmFuc2Zvcm1TZXJpYWxpemVkTmFtZXNUb1Byb3BlcnR5TmFtZXM8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4obW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sIGF0dHJpYnV0ZXM6IGFueSkge1xyXG4gICAgaWYgKCFhdHRyaWJ1dGVzKSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZXJpYWxpemVkTmFtZVRvUHJvcGVydHlOYW1lID0gdGhpcy5nZXRNb2RlbFByb3BlcnR5TmFtZXMobW9kZWxUeXBlLnByb3RvdHlwZSk7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzOiBhbnkgPSB7fTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhzZXJpYWxpemVkTmFtZVRvUHJvcGVydHlOYW1lKS5mb3JFYWNoKChzZXJpYWxpemVkTmFtZSkgPT4ge1xyXG4gICAgICBpZiAoYXR0cmlidXRlc1tzZXJpYWxpemVkTmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHByb3BlcnRpZXNbc2VyaWFsaXplZE5hbWVUb1Byb3BlcnR5TmFtZVtzZXJpYWxpemVkTmFtZV1dID0gYXR0cmlidXRlc1tzZXJpYWxpemVkTmFtZV07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkVXJsPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sXHJcbiAgICBwYXJhbXM/OiBhbnksXHJcbiAgICBpZD86IHN0cmluZyxcclxuICAgIGN1c3RvbVVybD86IHN0cmluZ1xyXG4gICk6IHN0cmluZyB7XHJcbiAgICAvLyBUT0RPOiB1c2UgSHR0cFBhcmFtcyBpbnN0ZWFkIG9mIGFwcGVuZGluZyBhIHN0cmluZyB0byB0aGUgdXJsXHJcbiAgICBjb25zdCBxdWVyeVBhcmFtczogc3RyaW5nID0gdGhpcy50b1F1ZXJ5U3RyaW5nKHBhcmFtcyk7XHJcblxyXG4gICAgaWYgKGN1c3RvbVVybCkge1xyXG4gICAgICByZXR1cm4gcXVlcnlQYXJhbXMgPyBgJHtjdXN0b21Vcmx9PyR7cXVlcnlQYXJhbXN9YCA6IGN1c3RvbVVybDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtb2RlbENvbmZpZzogTW9kZWxDb25maWcgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpTW9kZWxDb25maWcnLCBtb2RlbFR5cGUpO1xyXG5cclxuICAgIGNvbnN0IGJhc2VVcmwgPSBtb2RlbENvbmZpZy5iYXNlVXJsIHx8IHRoaXMuZGF0YXN0b3JlQ29uZmlnLmJhc2VVcmw7XHJcbiAgICBjb25zdCBhcGlWZXJzaW9uID0gbW9kZWxDb25maWcuYXBpVmVyc2lvbiB8fCB0aGlzLmRhdGFzdG9yZUNvbmZpZy5hcGlWZXJzaW9uO1xyXG4gICAgY29uc3QgbW9kZWxFbmRwb2ludFVybDogc3RyaW5nID0gbW9kZWxDb25maWcubW9kZWxFbmRwb2ludFVybCB8fCBtb2RlbENvbmZpZy50eXBlO1xyXG5cclxuICAgIGNvbnN0IHVybDogc3RyaW5nID0gW2Jhc2VVcmwsIGFwaVZlcnNpb24sIG1vZGVsRW5kcG9pbnRVcmwsIGlkXS5maWx0ZXIoKHgpID0+IHgpLmpvaW4oJy8nKTtcclxuXHJcbiAgICByZXR1cm4gcXVlcnlQYXJhbXMgPyBgJHt1cmx9PyR7cXVlcnlQYXJhbXN9YCA6IHVybDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRSZWxhdGlvbnNoaXBzKGRhdGE6IGFueSk6IGFueSB7XHJcbiAgICBsZXQgcmVsYXRpb25zaGlwczogYW55O1xyXG5cclxuICAgIGNvbnN0IGJlbG9uZ3NUb01ldGFkYXRhOiBhbnlbXSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0JlbG9uZ3NUbycsIGRhdGEpIHx8IFtdO1xyXG4gICAgY29uc3QgaGFzTWFueU1ldGFkYXRhOiBhbnlbXSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0hhc01hbnknLCBkYXRhKSB8fCBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XHJcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBpZiAoZGF0YVtrZXldIGluc3RhbmNlb2YgSnNvbkFwaU1vZGVsKSB7XHJcbiAgICAgICAgICByZWxhdGlvbnNoaXBzID0gcmVsYXRpb25zaGlwcyB8fCB7fTtcclxuXHJcbiAgICAgICAgICBpZiAoZGF0YVtrZXldLmlkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IGJlbG9uZ3NUb01ldGFkYXRhLmZpbmQoKGl0OiBhbnkpID0+IGl0LnByb3BlcnR5TmFtZSA9PT0ga2V5KTtcclxuICAgICAgICAgICAgY29uc3QgcmVsYXRpb25zaGlwS2V5ID0gZW50aXR5LnJlbGF0aW9uc2hpcDtcclxuICAgICAgICAgICAgcmVsYXRpb25zaGlwc1tyZWxhdGlvbnNoaXBLZXldID0ge1xyXG4gICAgICAgICAgICAgIGRhdGE6IHRoaXMuYnVpbGRTaW5nbGVSZWxhdGlvbnNoaXBEYXRhKGRhdGFba2V5XSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBjb25zdCBlbnRpdHkgPSBoYXNNYW55TWV0YWRhdGEuZmluZCgoaXQ6IGFueSkgPT4gaXQucHJvcGVydHlOYW1lID09PSBrZXkpO1xyXG4gICAgICAgICAgaWYgKGVudGl0eSAmJiB0aGlzLmlzVmFsaWRUb01hbnlSZWxhdGlvbihkYXRhW2tleV0pKSB7XHJcbiAgICAgICAgICAgIHJlbGF0aW9uc2hpcHMgPSByZWxhdGlvbnNoaXBzIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVsYXRpb25zaGlwS2V5ID0gZW50aXR5LnJlbGF0aW9uc2hpcDtcclxuICAgICAgICAgICAgY29uc3QgcmVsYXRpb25zaGlwRGF0YSA9IGRhdGFba2V5XVxyXG4gICAgICAgICAgICAgIC5maWx0ZXIoKG1vZGVsOiBKc29uQXBpTW9kZWwpID0+IG1vZGVsLmlkKVxyXG4gICAgICAgICAgICAgIC5tYXAoKG1vZGVsOiBKc29uQXBpTW9kZWwpID0+IHRoaXMuYnVpbGRTaW5nbGVSZWxhdGlvbnNoaXBEYXRhKG1vZGVsKSk7XHJcblxyXG4gICAgICAgICAgICByZWxhdGlvbnNoaXBzW3JlbGF0aW9uc2hpcEtleV0gPSB7XHJcbiAgICAgICAgICAgICAgZGF0YTogcmVsYXRpb25zaGlwRGF0YVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gIGVsc2UgaWYgKGRhdGFba2V5XSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgY29uc3QgZW50aXR5ID0gYmVsb25nc1RvTWV0YWRhdGEuZmluZCgoZW50aXR5OiBhbnkpID0+IGVudGl0eS5wcm9wZXJ0eU5hbWUgPT09IGtleSk7XHJcblxyXG4gICAgICAgICAgaWYgKGVudGl0eSkge1xyXG4gICAgICAgICAgICByZWxhdGlvbnNoaXBzID0gcmVsYXRpb25zaGlwcyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgIHJlbGF0aW9uc2hpcHNbZW50aXR5LnJlbGF0aW9uc2hpcF0gPSB7XHJcbiAgICAgICAgICAgICAgZGF0YTogbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZWxhdGlvbnNoaXBzO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGlzVmFsaWRUb01hbnlSZWxhdGlvbihvYmplY3RzOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIW9iamVjdHMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaXNKc29uQXBpTW9kZWwgPSBvYmplY3RzLmV2ZXJ5KChpdGVtKSA9PiBpdGVtIGluc3RhbmNlb2YgSnNvbkFwaU1vZGVsKTtcclxuICAgIGlmICghaXNKc29uQXBpTW9kZWwpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdHlwZXMgPSBvYmplY3RzLm1hcCgoaXRlbTogSnNvbkFwaU1vZGVsKSA9PiBpdGVtLm1vZGVsQ29uZmlnLm1vZGVsRW5kcG9pbnRVcmwgfHwgaXRlbS5tb2RlbENvbmZpZy50eXBlKTtcclxuICAgIHJldHVybiB0eXBlc1xyXG4gICAgICAuZmlsdGVyKCh0eXBlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIHNlbGY6IHN0cmluZ1tdKSA9PiBzZWxmLmluZGV4T2YodHlwZSkgPT09IGluZGV4KVxyXG4gICAgICAubGVuZ3RoID09PSAxO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkU2luZ2xlUmVsYXRpb25zaGlwRGF0YShtb2RlbDogSnNvbkFwaU1vZGVsKTogYW55IHtcclxuICAgIGNvbnN0IHJlbGF0aW9uc2hpcFR5cGU6IHN0cmluZyA9IG1vZGVsLm1vZGVsQ29uZmlnLnR5cGU7XHJcbiAgICBjb25zdCByZWxhdGlvblNoaXBEYXRhOiB7IHR5cGU6IHN0cmluZywgaWQ/OiBzdHJpbmcsIGF0dHJpYnV0ZXM/OiBhbnkgfSA9IHt0eXBlOiByZWxhdGlvbnNoaXBUeXBlfTtcclxuXHJcbiAgICBpZiAobW9kZWwuaWQpIHtcclxuICAgICAgcmVsYXRpb25TaGlwRGF0YS5pZCA9IG1vZGVsLmlkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgYXR0cmlidXRlc01ldGFkYXRhOiBhbnkgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdBdHRyaWJ1dGUnLCBtb2RlbCk7XHJcbiAgICAgIHJlbGF0aW9uU2hpcERhdGEuYXR0cmlidXRlcyA9IHRoaXMuZ2V0RGlydHlBdHRyaWJ1dGVzKGF0dHJpYnV0ZXNNZXRhZGF0YSwgbW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZWxhdGlvblNoaXBEYXRhO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGV4dHJhY3RRdWVyeURhdGE8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oXHJcbiAgICByZXNwb25zZTogSHR0cFJlc3BvbnNlPG9iamVjdD4sXHJcbiAgICBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPixcclxuICAgIHdpdGhNZXRhID0gZmFsc2VcclxuICApOiBBcnJheTxUPiB8IEpzb25BcGlRdWVyeURhdGE8VD4ge1xyXG4gICAgY29uc3QgYm9keTogYW55ID0gcmVzcG9uc2UuYm9keTtcclxuICAgIGNvbnN0IG1vZGVsczogVFtdID0gW107XHJcblxyXG4gICAgYm9keS5kYXRhLmZvckVhY2goKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBtb2RlbDogVCA9IHRoaXMuZGVzZXJpYWxpemVNb2RlbChtb2RlbFR5cGUsIGRhdGEpO1xyXG4gICAgICB0aGlzLmFkZFRvU3RvcmUobW9kZWwpO1xyXG5cclxuICAgICAgaWYgKGJvZHkuaW5jbHVkZWQpIHtcclxuICAgICAgICBtb2RlbC5zeW5jUmVsYXRpb25zaGlwcyhkYXRhLCBib2R5LmluY2x1ZGVkLmNvbmNhdChkYXRhKSk7XHJcbiAgICAgICAgdGhpcy5hZGRUb1N0b3JlKG1vZGVsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbW9kZWxzLnB1c2gobW9kZWwpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHdpdGhNZXRhICYmIHdpdGhNZXRhID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiBuZXcgSnNvbkFwaVF1ZXJ5RGF0YShtb2RlbHMsIHRoaXMucGFyc2VNZXRhKGJvZHksIG1vZGVsVHlwZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtb2RlbHM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZXh0cmFjdFJlY29yZERhdGE8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oXHJcbiAgICByZXM6IEh0dHBSZXNwb25zZTxvYmplY3Q+LFxyXG4gICAgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sXHJcbiAgICBtb2RlbD86IFRcclxuICApOiBUIHtcclxuICAgIGNvbnN0IGJvZHk6IGFueSA9IHJlcy5ib2R5O1xyXG4gICAgLy8gRXJyb3IgaW4gQW5ndWxhciA8IDUuMi40IChzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjA3NDQpXHJcbiAgICAvLyBudWxsIGlzIGNvbnZlcnRlZCB0byAnbnVsbCcsIHNvIHRoaXMgaXMgdGVtcG9yYXJ5IG5lZWRlZCB0byBtYWtlIHRlc3RjYXNlIHBvc3NpYmxlXHJcbiAgICAvLyAoYW5kIHRvIGF2b2lkIGEgZGVjcmVhc2Ugb2YgdGhlIGNvdmVyYWdlKVxyXG4gICAgaWYgKCFib2R5IHx8IGJvZHkgPT09ICdudWxsJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGJvZHkgaW4gcmVzcG9uc2UnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWJvZHkuZGF0YSkge1xyXG4gICAgICBpZiAocmVzLnN0YXR1cyA9PT0gMjAxIHx8ICFtb2RlbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgZGF0YSBpbiByZXNwb25zZScpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBtb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kZWwpIHtcclxuICAgICAgbW9kZWwubW9kZWxJbml0aWFsaXphdGlvbiA9IHRydWU7XHJcbiAgICAgIG1vZGVsLmlkID0gYm9keS5kYXRhLmlkO1xyXG4gICAgICBPYmplY3QuYXNzaWduKG1vZGVsLCBib2R5LmRhdGEuYXR0cmlidXRlcyk7XHJcbiAgICAgIG1vZGVsLm1vZGVsSW5pdGlhbGl6YXRpb24gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZXNlcmlhbGl6ZWRNb2RlbCA9IG1vZGVsIHx8IHRoaXMuZGVzZXJpYWxpemVNb2RlbChtb2RlbFR5cGUsIGJvZHkuZGF0YSk7XHJcbiAgICB0aGlzLmFkZFRvU3RvcmUoZGVzZXJpYWxpemVkTW9kZWwpO1xyXG4gICAgaWYgKGJvZHkuaW5jbHVkZWQpIHtcclxuICAgICAgZGVzZXJpYWxpemVkTW9kZWwuc3luY1JlbGF0aW9uc2hpcHMoYm9keS5kYXRhLCBib2R5LmluY2x1ZGVkKTtcclxuICAgICAgdGhpcy5hZGRUb1N0b3JlKGRlc2VyaWFsaXplZE1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGVzZXJpYWxpemVkTW9kZWw7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UgJiZcclxuICAgICAgZXJyb3IuZXJyb3IgaW5zdGFuY2VvZiBPYmplY3QgJiZcclxuICAgICAgZXJyb3IuZXJyb3IuZXJyb3JzICYmXHJcbiAgICAgIGVycm9yLmVycm9yLmVycm9ycyBpbnN0YW5jZW9mIEFycmF5XHJcbiAgICApIHtcclxuICAgICAgY29uc3QgZXJyb3JzOiBFcnJvclJlc3BvbnNlID0gbmV3IEVycm9yUmVzcG9uc2UoZXJyb3IuZXJyb3IuZXJyb3JzKTtcclxuICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3JzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcGFyc2VNZXRhKGJvZHk6IGFueSwgbW9kZWxUeXBlOiBNb2RlbFR5cGU8SnNvbkFwaU1vZGVsPik6IGFueSB7XHJcbiAgICBjb25zdCBtZXRhTW9kZWw6IGFueSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0pzb25BcGlNb2RlbENvbmZpZycsIG1vZGVsVHlwZSkubWV0YTtcclxuICAgIHJldHVybiBuZXcgbWV0YU1vZGVsKGJvZHkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlcHJlY2F0ZWQgdXNlIGJ1aWxkSHR0cEhlYWRlcnMgbWV0aG9kIHRvIGJ1aWxkIHJlcXVlc3QgaGVhZGVyc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBnZXRPcHRpb25zKGN1c3RvbUhlYWRlcnM/OiBIdHRwSGVhZGVycyk6IGFueSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBoZWFkZXJzOiB0aGlzLmJ1aWxkSHR0cEhlYWRlcnMoY3VzdG9tSGVhZGVycyksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkSHR0cEhlYWRlcnMoY3VzdG9tSGVhZGVycz86IEh0dHBIZWFkZXJzKTogSHR0cEhlYWRlcnMge1xyXG4gICAgbGV0IHJlcXVlc3RIZWFkZXJzOiBIdHRwSGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XHJcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL3ZuZC5hcGkranNvbicsXHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuZ2xvYmFsSGVhZGVycykge1xyXG4gICAgICB0aGlzLmdsb2JhbEhlYWRlcnMua2V5cygpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmdsb2JhbEhlYWRlcnMuaGFzKGtleSkpIHtcclxuICAgICAgICAgIHJlcXVlc3RIZWFkZXJzID0gcmVxdWVzdEhlYWRlcnMuc2V0KGtleSwgdGhpcy5nbG9iYWxIZWFkZXJzLmdldChrZXkpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjdXN0b21IZWFkZXJzKSB7XHJcbiAgICAgIGN1c3RvbUhlYWRlcnMua2V5cygpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgIGlmIChjdXN0b21IZWFkZXJzLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgICByZXF1ZXN0SGVhZGVycyA9IHJlcXVlc3RIZWFkZXJzLnNldChrZXksIGN1c3RvbUhlYWRlcnMuZ2V0KGtleSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3RIZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHJlc2V0TWV0YWRhdGFBdHRyaWJ1dGVzPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KHJlczogVCwgYXR0cmlidXRlc01ldGFkYXRhOiBhbnksIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+KSB7XHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBpbiBhdHRyaWJ1dGVzTWV0YWRhdGEpIHtcclxuICAgICAgaWYgKGF0dHJpYnV0ZXNNZXRhZGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XHJcbiAgICAgICAgY29uc3QgbWV0YWRhdGE6IGFueSA9IGF0dHJpYnV0ZXNNZXRhZGF0YVtwcm9wZXJ0eU5hbWVdO1xyXG5cclxuICAgICAgICBpZiAobWV0YWRhdGEuaGFzRGlydHlBdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICBtZXRhZGF0YS5oYXNEaXJ0eUF0dHJpYnV0ZXMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICByZXNbQXR0cmlidXRlTWV0YWRhdGFJbmRleF0gPSBhdHRyaWJ1dGVzTWV0YWRhdGE7XHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHVwZGF0ZVJlbGF0aW9uc2hpcHM8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4obW9kZWw6IFQsIHJlbGF0aW9uc2hpcHM6IGFueSk6IFQge1xyXG4gICAgY29uc3QgbW9kZWxzVHlwZXM6IGFueSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0pzb25BcGlEYXRhc3RvcmVDb25maWcnLCB0aGlzLmNvbnN0cnVjdG9yKS5tb2RlbHM7XHJcblxyXG4gICAgZm9yIChjb25zdCByZWxhdGlvbnNoaXAgaW4gcmVsYXRpb25zaGlwcykge1xyXG4gICAgICBpZiAocmVsYXRpb25zaGlwcy5oYXNPd25Qcm9wZXJ0eShyZWxhdGlvbnNoaXApICYmIG1vZGVsLmhhc093blByb3BlcnR5KHJlbGF0aW9uc2hpcCkgJiYgbW9kZWxbcmVsYXRpb25zaGlwXSkge1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aW9uc2hpcE1vZGVsOiBKc29uQXBpTW9kZWwgPSBtb2RlbFtyZWxhdGlvbnNoaXBdO1xyXG4gICAgICAgIGNvbnN0IGhhc01hbnk6IGFueVtdID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSGFzTWFueScsIHJlbGF0aW9uc2hpcE1vZGVsKTtcclxuICAgICAgICBjb25zdCBwcm9wZXJ0eUhhc01hbnk6IGFueSA9IGZpbmQoaGFzTWFueSwgKHByb3BlcnR5KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gbW9kZWxzVHlwZXNbcHJvcGVydHkucmVsYXRpb25zaGlwXSA9PT0gbW9kZWwuY29uc3RydWN0b3I7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0eUhhc01hbnkpIHtcclxuICAgICAgICAgIHJlbGF0aW9uc2hpcE1vZGVsW3Byb3BlcnR5SGFzTWFueS5wcm9wZXJ0eU5hbWVdID0gcmVsYXRpb25zaGlwTW9kZWxbcHJvcGVydHlIYXNNYW55LnByb3BlcnR5TmFtZV0gfHwgW107XHJcblxyXG4gICAgICAgICAgY29uc3QgaW5kZXhPZk1vZGVsID0gcmVsYXRpb25zaGlwTW9kZWxbcHJvcGVydHlIYXNNYW55LnByb3BlcnR5TmFtZV0uaW5kZXhPZihtb2RlbCk7XHJcblxyXG4gICAgICAgICAgaWYgKGluZGV4T2ZNb2RlbCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmVsYXRpb25zaGlwTW9kZWxbcHJvcGVydHlIYXNNYW55LnByb3BlcnR5TmFtZV0ucHVzaChtb2RlbCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWxhdGlvbnNoaXBNb2RlbFtwcm9wZXJ0eUhhc01hbnkucHJvcGVydHlOYW1lXVtpbmRleE9mTW9kZWxdID0gbW9kZWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1vZGVsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldE1vZGVsUHJvcGVydHlOYW1lcyhtb2RlbDogSnNvbkFwaU1vZGVsKSB7XHJcbiAgICByZXR1cm4gUmVmbGVjdC5nZXRNZXRhZGF0YSgnQXR0cmlidXRlTWFwcGluZycsIG1vZGVsKSB8fCBbXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRSZXF1ZXN0T3B0aW9ucyhjdXN0b21PcHRpb25zOiBhbnkgPSB7fSk6IG9iamVjdCB7XHJcbiAgICBjb25zdCBodHRwSGVhZGVyczogSHR0cEhlYWRlcnMgPSB0aGlzLmJ1aWxkSHR0cEhlYWRlcnMoY3VzdG9tT3B0aW9ucy5oZWFkZXJzKTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9uczogb2JqZWN0ID0gT2JqZWN0LmFzc2lnbihjdXN0b21PcHRpb25zLCB7XHJcbiAgICAgIGhlYWRlcnM6IGh0dHBIZWFkZXJzXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbFJlcXVlc3RPcHRpb25zLCByZXF1ZXN0T3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF90b1F1ZXJ5U3RyaW5nKHBhcmFtczogYW55KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBxcy5zdHJpbmdpZnkocGFyYW1zLCB7YXJyYXlGb3JtYXQ6ICdicmFja2V0cyd9KTtcclxuICB9XHJcbn1cclxuIl19