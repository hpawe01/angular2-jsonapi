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
                     * @param {?} anEntity
                     * @return {?}
                     */
                    (anEntity) => anEntity.propertyName === key));
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
        /** @type {?} */
        const resourceObjects = [...body.data, ...(body.included || [])];
        body.data.forEach((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            const model = this.deserializeModel(modelType, data);
            this.addToStore(model);
            model.syncRelationships(data, resourceObjects);
            this.addToStore(model);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1hcGktZGF0YXN0b3JlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsic2VydmljZXMvanNvbi1hcGktZGF0YXN0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQWdCLE1BQU0sc0JBQXNCLENBQUM7QUFDaEcsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBYyxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFHekIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxrQkFBa0IsQ0FBQzs7Ozs7Ozs7O01BV3BCLHNCQUFzQixHQUFXLG1CQUFBLGlCQUFpQixFQUFPO0FBRy9ELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUFVM0IsWUFBc0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQU45Qix5QkFBb0IsR0FBVyxFQUFFLENBQUM7UUFDbEMsa0JBQWEsR0FBdUQsRUFBRSxDQUFDO1FBQ3ZFLGtCQUFhLEdBQTRCLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUztlQUM1RSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMs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LEdBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7WUFDMUQsT0FBTyxFQUFFLFdBQVc7U0FDckIsQ0FBQztRQUVGLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7Ozs7O0lBRU8sY0FBYyxDQUFDLE1BQVc7UUFDaEMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7OztZQTFlRixVQUFVOzs7O1lBeEJGLFVBQVU7Ozs7Ozs7SUEyQmpCLGtDQUFrQzs7Ozs7SUFDbEMseUNBQW1DOzs7OztJQUNuQyxnREFBMEM7Ozs7O0lBQzFDLHlDQUErRTs7Ozs7SUFDL0UseUNBRXFFOzs7OztJQUV6RCxnQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBmaW5kIH0gZnJvbSAnbG9kYXNoLWVzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBKc29uQXBpTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvanNvbi1hcGkubW9kZWwnO1xyXG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWxzL2Vycm9yLXJlc3BvbnNlLm1vZGVsJztcclxuaW1wb3J0IHsgSnNvbkFwaVF1ZXJ5RGF0YSB9IGZyb20gJy4uL21vZGVscy9qc29uLWFwaS1xdWVyeS1kYXRhJztcclxuaW1wb3J0ICogYXMgcXMgZnJvbSAncXMnO1xyXG5pbXBvcnQgeyBEYXRhc3RvcmVDb25maWcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2RhdGFzdG9yZS1jb25maWcuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTW9kZWxDb25maWcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL21vZGVsLWNvbmZpZy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVNZXRhZGF0YSB9IGZyb20gJy4uL2NvbnN0YW50cy9zeW1ib2xzJztcclxuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcclxuXHJcbmV4cG9ydCB0eXBlIE1vZGVsVHlwZTxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPiA9IG5ldyhkYXRhc3RvcmU6IEpzb25BcGlEYXRhc3RvcmUsIGRhdGE6IGFueSkgPT4gVDtcclxuXHJcbi8qKlxyXG4gKiBIQUNLL0ZJWE1FOlxyXG4gKiBUeXBlICdzeW1ib2wnIGNhbm5vdCBiZSB1c2VkIGFzIGFuIGluZGV4IHR5cGUuXHJcbiAqIFR5cGVTY3JpcHQgMi45LnhcclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMjQ1ODcuXHJcbiAqL1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxyXG5jb25zdCBBdHRyaWJ1dGVNZXRhZGF0YUluZGV4OiBzdHJpbmcgPSBBdHRyaWJ1dGVNZXRhZGF0YSBhcyBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBKc29uQXBpRGF0YXN0b3JlIHtcclxuXHJcbiAgcHJvdGVjdGVkIGNvbmZpZzogRGF0YXN0b3JlQ29uZmlnO1xyXG4gIHByaXZhdGUgZ2xvYmFsSGVhZGVyczogSHR0cEhlYWRlcnM7XHJcbiAgcHJpdmF0ZSBnbG9iYWxSZXF1ZXN0T3B0aW9uczogb2JqZWN0ID0ge307XHJcbiAgcHJpdmF0ZSBpbnRlcm5hbFN0b3JlOiB7IFt0eXBlOiBzdHJpbmddOiB7IFtpZDogc3RyaW5nXTogSnNvbkFwaU1vZGVsIH0gfSA9IHt9O1xyXG4gIHByaXZhdGUgdG9RdWVyeVN0cmluZzogKHBhcmFtczogYW55KSA9PiBzdHJpbmcgPSB0aGlzLmRhdGFzdG9yZUNvbmZpZy5vdmVycmlkZXNcclxuICAmJiB0aGlzLmRhdGFzdG9yZUNvbmZpZy5vdmVycmlkZXMudG9RdWVyeVN0cmluZyA/XHJcbiAgICB0aGlzLmRhdGFzdG9yZUNvbmZpZy5vdmVycmlkZXMudG9RdWVyeVN0cmluZyA6IHRoaXMuX3RvUXVlcnlTdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgfVxyXG5cclxuICBzZXQgaGVhZGVycyhoZWFkZXJzOiBIdHRwSGVhZGVycykge1xyXG4gICAgdGhpcy5nbG9iYWxIZWFkZXJzID0gaGVhZGVycztcclxuICB9XHJcblxyXG4gIHNldCByZXF1ZXN0T3B0aW9ucyhyZXF1ZXN0T3B0aW9uczogb2JqZWN0KSB7XHJcbiAgICB0aGlzLmdsb2JhbFJlcXVlc3RPcHRpb25zID0gcmVxdWVzdE9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGRhdGFzdG9yZUNvbmZpZygpOiBEYXRhc3RvcmVDb25maWcge1xyXG4gICAgY29uc3QgY29uZmlnRnJvbURlY29yYXRvcjogRGF0YXN0b3JlQ29uZmlnID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaURhdGFzdG9yZUNvbmZpZycsIHRoaXMuY29uc3RydWN0b3IpO1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oY29uZmlnRnJvbURlY29yYXRvciwgdGhpcy5jb25maWcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXQgZ2V0RGlydHlBdHRyaWJ1dGVzKCkge1xyXG4gICAgaWYgKHRoaXMuZGF0YXN0b3JlQ29uZmlnLm92ZXJyaWRlc1xyXG4gICAgICAmJiB0aGlzLmRhdGFzdG9yZUNvbmZpZy5vdmVycmlkZXMuZ2V0RGlydHlBdHRyaWJ1dGVzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRhdGFzdG9yZUNvbmZpZy5vdmVycmlkZXMuZ2V0RGlydHlBdHRyaWJ1dGVzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEpzb25BcGlEYXRhc3RvcmUuZ2V0RGlydHlBdHRyaWJ1dGVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0RGlydHlBdHRyaWJ1dGVzKGF0dHJpYnV0ZXNNZXRhZGF0YTogYW55KTogeyBzdHJpbmc6IGFueSB9IHtcclxuICAgIGNvbnN0IGRpcnR5RGF0YTogYW55ID0ge307XHJcblxyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgaW4gYXR0cmlidXRlc01ldGFkYXRhKSB7XHJcbiAgICAgIGlmIChhdHRyaWJ1dGVzTWV0YWRhdGEuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhOiBhbnkgPSBhdHRyaWJ1dGVzTWV0YWRhdGFbcHJvcGVydHlOYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKG1ldGFkYXRhLmhhc0RpcnR5QXR0cmlidXRlcykge1xyXG4gICAgICAgICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IG1ldGFkYXRhLnNlcmlhbGl6ZWROYW1lICE9IG51bGwgPyBtZXRhZGF0YS5zZXJpYWxpemVkTmFtZSA6IHByb3BlcnR5TmFtZTtcclxuICAgICAgICAgIGRpcnR5RGF0YVthdHRyaWJ1dGVOYW1lXSA9IG1ldGFkYXRhLnNlcmlhbGlzYXRpb25WYWx1ZSA/IG1ldGFkYXRhLnNlcmlhbGlzYXRpb25WYWx1ZSA6IG1ldGFkYXRhLm5ld1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRpcnR5RGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkIHVzZSBmaW5kQWxsIG1ldGhvZCB0byB0YWtlIGFsbCBtb2RlbHNcclxuICAgKi9cclxuICBxdWVyeTxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgcGFyYW1zPzogYW55LFxyXG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLFxyXG4gICAgY3VzdG9tVXJsPzogc3RyaW5nXHJcbiAgKTogT2JzZXJ2YWJsZTxUW10+IHtcclxuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzOiBIdHRwSGVhZGVycyA9IHRoaXMuYnVpbGRIdHRwSGVhZGVycyhoZWFkZXJzKTtcclxuICAgIGNvbnN0IHVybDogc3RyaW5nID0gdGhpcy5idWlsZFVybChtb2RlbFR5cGUsIHBhcmFtcywgdW5kZWZpbmVkLCBjdXN0b21VcmwpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCB7aGVhZGVyczogcmVxdWVzdEhlYWRlcnN9KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlczogYW55KSA9PiB0aGlzLmV4dHJhY3RRdWVyeURhdGEocmVzLCBtb2RlbFR5cGUpKSxcclxuICAgICAgICBjYXRjaEVycm9yKChyZXM6IGFueSkgPT4gdGhpcy5oYW5kbGVFcnJvcihyZXMpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbmRBbGw8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oXHJcbiAgICBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPixcclxuICAgIHBhcmFtcz86IGFueSxcclxuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcclxuICAgIGN1c3RvbVVybD86IHN0cmluZ1xyXG4gICk6IE9ic2VydmFibGU8SnNvbkFwaVF1ZXJ5RGF0YTxUPj4ge1xyXG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSB0aGlzLmJ1aWxkVXJsKG1vZGVsVHlwZSwgcGFyYW1zLCB1bmRlZmluZWQsIGN1c3RvbVVybCk7XHJcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9uczogb2JqZWN0ID0gdGhpcy5idWlsZFJlcXVlc3RPcHRpb25zKHtoZWFkZXJzLCBvYnNlcnZlOiAncmVzcG9uc2UnfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCByZXF1ZXN0T3B0aW9ucylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZXM6IEh0dHBSZXNwb25zZTxvYmplY3Q+KSA9PiB0aGlzLmV4dHJhY3RRdWVyeURhdGEocmVzLCBtb2RlbFR5cGUsIHRydWUpKSxcclxuICAgICAgICBjYXRjaEVycm9yKChyZXM6IGFueSkgPT4gdGhpcy5oYW5kbGVFcnJvcihyZXMpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbmRSZWNvcmQ8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oXHJcbiAgICBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPixcclxuICAgIGlkOiBzdHJpbmcsXHJcbiAgICBwYXJhbXM/OiBhbnksXHJcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXHJcbiAgICBjdXN0b21Vcmw/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zOiBvYmplY3QgPSB0aGlzLmJ1aWxkUmVxdWVzdE9wdGlvbnMoe2hlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZSd9KTtcclxuICAgIGNvbnN0IHVybDogc3RyaW5nID0gdGhpcy5idWlsZFVybChtb2RlbFR5cGUsIHBhcmFtcywgaWQsIGN1c3RvbVVybCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCByZXF1ZXN0T3B0aW9ucylcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZXM6IEh0dHBSZXNwb25zZTxvYmplY3Q+KSA9PiB0aGlzLmV4dHJhY3RSZWNvcmREYXRhKHJlcywgbW9kZWxUeXBlKSksXHJcbiAgICAgICAgY2F0Y2hFcnJvcigocmVzOiBhbnkpID0+IHRoaXMuaGFuZGxlRXJyb3IocmVzKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjcmVhdGVSZWNvcmQ8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4obW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sIGRhdGE/OiBhbnkpOiBUIHtcclxuICAgIHJldHVybiBuZXcgbW9kZWxUeXBlKHRoaXMsIHthdHRyaWJ1dGVzOiBkYXRhfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2F2ZVJlY29yZDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIGF0dHJpYnV0ZXNNZXRhZGF0YTogYW55LFxyXG4gICAgbW9kZWw6IFQsXHJcbiAgICBwYXJhbXM/OiBhbnksXHJcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXHJcbiAgICBjdXN0b21Vcmw/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIGNvbnN0IG1vZGVsVHlwZSA9IG1vZGVsLmNvbnN0cnVjdG9yIGFzIE1vZGVsVHlwZTxUPjtcclxuICAgIGNvbnN0IG1vZGVsQ29uZmlnOiBNb2RlbENvbmZpZyA9IG1vZGVsLm1vZGVsQ29uZmlnO1xyXG4gICAgY29uc3QgdHlwZU5hbWU6IHN0cmluZyA9IG1vZGVsQ29uZmlnLnR5cGU7XHJcbiAgICBjb25zdCByZWxhdGlvbnNoaXBzOiBhbnkgPSB0aGlzLmdldFJlbGF0aW9uc2hpcHMobW9kZWwpO1xyXG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSB0aGlzLmJ1aWxkVXJsKG1vZGVsVHlwZSwgcGFyYW1zLCBtb2RlbC5pZCwgY3VzdG9tVXJsKTtcclxuXHJcbiAgICBsZXQgaHR0cENhbGw6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPG9iamVjdD4+O1xyXG4gICAgY29uc3QgYm9keTogYW55ID0ge1xyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcmVsYXRpb25zaGlwcyxcclxuICAgICAgICB0eXBlOiB0eXBlTmFtZSxcclxuICAgICAgICBpZDogbW9kZWwuaWQsXHJcbiAgICAgICAgYXR0cmlidXRlczogdGhpcy5nZXREaXJ0eUF0dHJpYnV0ZXMoYXR0cmlidXRlc01ldGFkYXRhLCBtb2RlbClcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9uczogb2JqZWN0ID0gdGhpcy5idWlsZFJlcXVlc3RPcHRpb25zKHtoZWFkZXJzLCBvYnNlcnZlOiAncmVzcG9uc2UnfSk7XHJcblxyXG4gICAgaWYgKG1vZGVsLmlkKSB7XHJcbiAgICAgIGh0dHBDYWxsID0gdGhpcy5odHRwLnBhdGNoPG9iamVjdD4odXJsLCBib2R5LCByZXF1ZXN0T3B0aW9ucykgYXMgT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8b2JqZWN0Pj47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBodHRwQ2FsbCA9IHRoaXMuaHR0cC5wb3N0PG9iamVjdD4odXJsLCBib2R5LCByZXF1ZXN0T3B0aW9ucykgYXMgT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8b2JqZWN0Pj47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGh0dHBDYWxsXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgocmVzKSA9PiBbMjAwLCAyMDFdLmluZGV4T2YocmVzLnN0YXR1cykgIT09IC0xID8gdGhpcy5leHRyYWN0UmVjb3JkRGF0YShyZXMsIG1vZGVsVHlwZSwgbW9kZWwpIDogbW9kZWwpLFxyXG4gICAgICAgIGNhdGNoRXJyb3IoKHJlcykgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihtb2RlbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVFcnJvcihyZXMpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIG1hcCgocmVzKSA9PiB0aGlzLnVwZGF0ZVJlbGF0aW9uc2hpcHMocmVzLCByZWxhdGlvbnNoaXBzKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZWxldGVSZWNvcmQ8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oXHJcbiAgICBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPixcclxuICAgIGlkOiBzdHJpbmcsXHJcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXHJcbiAgICBjdXN0b21Vcmw/OiBzdHJpbmdcclxuICApOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9uczogb2JqZWN0ID0gdGhpcy5idWlsZFJlcXVlc3RPcHRpb25zKHtoZWFkZXJzfSk7XHJcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMuYnVpbGRVcmwobW9kZWxUeXBlLCBudWxsLCBpZCwgY3VzdG9tVXJsKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZSh1cmwsIHJlcXVlc3RPcHRpb25zKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBjYXRjaEVycm9yKChyZXM6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB0aGlzLmhhbmRsZUVycm9yKHJlcykpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcGVla1JlY29yZDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPiwgaWQ6IHN0cmluZyk6IFQgfCBudWxsIHtcclxuICAgIGNvbnN0IHR5cGU6IHN0cmluZyA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0pzb25BcGlNb2RlbENvbmZpZycsIG1vZGVsVHlwZSkudHlwZTtcclxuICAgIHJldHVybiB0aGlzLmludGVybmFsU3RvcmVbdHlwZV0gPyB0aGlzLmludGVybmFsU3RvcmVbdHlwZV1baWRdIGFzIFQgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHBlZWtBbGw8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4obW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4pOiBBcnJheTxUPiB7XHJcbiAgICBjb25zdCB0eXBlID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaU1vZGVsQ29uZmlnJywgbW9kZWxUeXBlKS50eXBlO1xyXG4gICAgY29uc3QgdHlwZVN0b3JlID0gdGhpcy5pbnRlcm5hbFN0b3JlW3R5cGVdO1xyXG4gICAgcmV0dXJuIHR5cGVTdG9yZSA/IE9iamVjdC5rZXlzKHR5cGVTdG9yZSkubWFwKChrZXkpID0+IHR5cGVTdG9yZVtrZXldIGFzIFQpIDogW107XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVzZXJpYWxpemVNb2RlbDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPiwgZGF0YTogYW55KSB7XHJcbiAgICBkYXRhLmF0dHJpYnV0ZXMgPSB0aGlzLnRyYW5zZm9ybVNlcmlhbGl6ZWROYW1lc1RvUHJvcGVydHlOYW1lcyhtb2RlbFR5cGUsIGRhdGEuYXR0cmlidXRlcyk7XHJcbiAgICByZXR1cm4gbmV3IG1vZGVsVHlwZSh0aGlzLCBkYXRhKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRUb1N0b3JlKG1vZGVsT3JNb2RlbHM6IEpzb25BcGlNb2RlbCB8IEpzb25BcGlNb2RlbFtdKTogdm9pZCB7XHJcbiAgICBjb25zdCBtb2RlbHMgPSBBcnJheS5pc0FycmF5KG1vZGVsT3JNb2RlbHMpID8gbW9kZWxPck1vZGVscyA6IFttb2RlbE9yTW9kZWxzXTtcclxuICAgIGNvbnN0IHR5cGU6IHN0cmluZyA9IG1vZGVsc1swXS5tb2RlbENvbmZpZy50eXBlO1xyXG4gICAgbGV0IHR5cGVTdG9yZSA9IHRoaXMuaW50ZXJuYWxTdG9yZVt0eXBlXTtcclxuXHJcbiAgICBpZiAoIXR5cGVTdG9yZSkge1xyXG4gICAgICB0eXBlU3RvcmUgPSB0aGlzLmludGVybmFsU3RvcmVbdHlwZV0gPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IG1vZGVsIG9mIG1vZGVscykge1xyXG4gICAgICB0eXBlU3RvcmVbbW9kZWwuaWRdID0gbW9kZWw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdHJhbnNmb3JtU2VyaWFsaXplZE5hbWVzVG9Qcm9wZXJ0eU5hbWVzPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LCBhdHRyaWJ1dGVzOiBhbnkpIHtcclxuICAgIGlmICghYXR0cmlidXRlcykge1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VyaWFsaXplZE5hbWVUb1Byb3BlcnR5TmFtZSA9IHRoaXMuZ2V0TW9kZWxQcm9wZXJ0eU5hbWVzKG1vZGVsVHlwZS5wcm90b3R5cGUpO1xyXG4gICAgY29uc3QgcHJvcGVydGllczogYW55ID0ge307XHJcblxyXG4gICAgT2JqZWN0LmtleXMoc2VyaWFsaXplZE5hbWVUb1Byb3BlcnR5TmFtZSkuZm9yRWFjaCgoc2VyaWFsaXplZE5hbWUpID0+IHtcclxuICAgICAgaWYgKGF0dHJpYnV0ZXNbc2VyaWFsaXplZE5hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBwcm9wZXJ0aWVzW3NlcmlhbGl6ZWROYW1lVG9Qcm9wZXJ0eU5hbWVbc2VyaWFsaXplZE5hbWVdXSA9IGF0dHJpYnV0ZXNbc2VyaWFsaXplZE5hbWVdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcHJvcGVydGllcztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZFVybDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgcGFyYW1zPzogYW55LFxyXG4gICAgaWQ/OiBzdHJpbmcsXHJcbiAgICBjdXN0b21Vcmw/OiBzdHJpbmdcclxuICApOiBzdHJpbmcge1xyXG4gICAgLy8gVE9ETzogdXNlIEh0dHBQYXJhbXMgaW5zdGVhZCBvZiBhcHBlbmRpbmcgYSBzdHJpbmcgdG8gdGhlIHVybFxyXG4gICAgY29uc3QgcXVlcnlQYXJhbXM6IHN0cmluZyA9IHRoaXMudG9RdWVyeVN0cmluZyhwYXJhbXMpO1xyXG5cclxuICAgIGlmIChjdXN0b21VcmwpIHtcclxuICAgICAgcmV0dXJuIHF1ZXJ5UGFyYW1zID8gYCR7Y3VzdG9tVXJsfT8ke3F1ZXJ5UGFyYW1zfWAgOiBjdXN0b21Vcmw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbW9kZWxDb25maWc6IE1vZGVsQ29uZmlnID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaU1vZGVsQ29uZmlnJywgbW9kZWxUeXBlKTtcclxuXHJcbiAgICBjb25zdCBiYXNlVXJsID0gbW9kZWxDb25maWcuYmFzZVVybCB8fCB0aGlzLmRhdGFzdG9yZUNvbmZpZy5iYXNlVXJsO1xyXG4gICAgY29uc3QgYXBpVmVyc2lvbiA9IG1vZGVsQ29uZmlnLmFwaVZlcnNpb24gfHwgdGhpcy5kYXRhc3RvcmVDb25maWcuYXBpVmVyc2lvbjtcclxuICAgIGNvbnN0IG1vZGVsRW5kcG9pbnRVcmw6IHN0cmluZyA9IG1vZGVsQ29uZmlnLm1vZGVsRW5kcG9pbnRVcmwgfHwgbW9kZWxDb25maWcudHlwZTtcclxuXHJcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IFtiYXNlVXJsLCBhcGlWZXJzaW9uLCBtb2RlbEVuZHBvaW50VXJsLCBpZF0uZmlsdGVyKCh4KSA9PiB4KS5qb2luKCcvJyk7XHJcblxyXG4gICAgcmV0dXJuIHF1ZXJ5UGFyYW1zID8gYCR7dXJsfT8ke3F1ZXJ5UGFyYW1zfWAgOiB1cmw7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0UmVsYXRpb25zaGlwcyhkYXRhOiBhbnkpOiBhbnkge1xyXG4gICAgbGV0IHJlbGF0aW9uc2hpcHM6IGFueTtcclxuXHJcbiAgICBjb25zdCBiZWxvbmdzVG9NZXRhZGF0YTogYW55W10gPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdCZWxvbmdzVG8nLCBkYXRhKSB8fCBbXTtcclxuICAgIGNvbnN0IGhhc01hbnlNZXRhZGF0YTogYW55W10gPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdIYXNNYW55JywgZGF0YSkgfHwgW107XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgaWYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIEpzb25BcGlNb2RlbCkge1xyXG4gICAgICAgICAgcmVsYXRpb25zaGlwcyA9IHJlbGF0aW9uc2hpcHMgfHwge307XHJcblxyXG4gICAgICAgICAgaWYgKGRhdGFba2V5XS5pZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlbnRpdHkgPSBiZWxvbmdzVG9NZXRhZGF0YS5maW5kKChpdDogYW55KSA9PiBpdC5wcm9wZXJ0eU5hbWUgPT09IGtleSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbGF0aW9uc2hpcEtleSA9IGVudGl0eS5yZWxhdGlvbnNoaXA7XHJcbiAgICAgICAgICAgIHJlbGF0aW9uc2hpcHNbcmVsYXRpb25zaGlwS2V5XSA9IHtcclxuICAgICAgICAgICAgICBkYXRhOiB0aGlzLmJ1aWxkU2luZ2xlUmVsYXRpb25zaGlwRGF0YShkYXRhW2tleV0pXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgY29uc3QgZW50aXR5ID0gaGFzTWFueU1ldGFkYXRhLmZpbmQoKGl0OiBhbnkpID0+IGl0LnByb3BlcnR5TmFtZSA9PT0ga2V5KTtcclxuICAgICAgICAgIGlmIChlbnRpdHkgJiYgdGhpcy5pc1ZhbGlkVG9NYW55UmVsYXRpb24oZGF0YVtrZXldKSkge1xyXG4gICAgICAgICAgICByZWxhdGlvbnNoaXBzID0gcmVsYXRpb25zaGlwcyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlbGF0aW9uc2hpcEtleSA9IGVudGl0eS5yZWxhdGlvbnNoaXA7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbGF0aW9uc2hpcERhdGEgPSBkYXRhW2tleV1cclxuICAgICAgICAgICAgICAuZmlsdGVyKChtb2RlbDogSnNvbkFwaU1vZGVsKSA9PiBtb2RlbC5pZClcclxuICAgICAgICAgICAgICAubWFwKChtb2RlbDogSnNvbkFwaU1vZGVsKSA9PiB0aGlzLmJ1aWxkU2luZ2xlUmVsYXRpb25zaGlwRGF0YShtb2RlbCkpO1xyXG5cclxuICAgICAgICAgICAgcmVsYXRpb25zaGlwc1tyZWxhdGlvbnNoaXBLZXldID0ge1xyXG4gICAgICAgICAgICAgIGRhdGE6IHJlbGF0aW9uc2hpcERhdGFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9ICBlbHNlIGlmIChkYXRhW2tleV0gPT09IG51bGwpIHtcclxuICAgICAgICAgIGNvbnN0IGVudGl0eSA9IGJlbG9uZ3NUb01ldGFkYXRhLmZpbmQoKGFuRW50aXR5OiBhbnkpID0+IGFuRW50aXR5LnByb3BlcnR5TmFtZSA9PT0ga2V5KTtcclxuXHJcbiAgICAgICAgICBpZiAoZW50aXR5KSB7XHJcbiAgICAgICAgICAgIHJlbGF0aW9uc2hpcHMgPSByZWxhdGlvbnNoaXBzIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgcmVsYXRpb25zaGlwc1tlbnRpdHkucmVsYXRpb25zaGlwXSA9IHtcclxuICAgICAgICAgICAgICBkYXRhOiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlbGF0aW9uc2hpcHM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaXNWYWxpZFRvTWFueVJlbGF0aW9uKG9iamVjdHM6IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgIGlmICghb2JqZWN0cy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpc0pzb25BcGlNb2RlbCA9IG9iamVjdHMuZXZlcnkoKGl0ZW0pID0+IGl0ZW0gaW5zdGFuY2VvZiBKc29uQXBpTW9kZWwpO1xyXG4gICAgaWYgKCFpc0pzb25BcGlNb2RlbCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0eXBlcyA9IG9iamVjdHMubWFwKChpdGVtOiBKc29uQXBpTW9kZWwpID0+IGl0ZW0ubW9kZWxDb25maWcubW9kZWxFbmRwb2ludFVybCB8fCBpdGVtLm1vZGVsQ29uZmlnLnR5cGUpO1xyXG4gICAgcmV0dXJuIHR5cGVzXHJcbiAgICAgIC5maWx0ZXIoKHR5cGU6IHN0cmluZywgaW5kZXg6IG51bWJlciwgc2VsZjogc3RyaW5nW10pID0+IHNlbGYuaW5kZXhPZih0eXBlKSA9PT0gaW5kZXgpXHJcbiAgICAgIC5sZW5ndGggPT09IDE7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRTaW5nbGVSZWxhdGlvbnNoaXBEYXRhKG1vZGVsOiBKc29uQXBpTW9kZWwpOiBhbnkge1xyXG4gICAgY29uc3QgcmVsYXRpb25zaGlwVHlwZTogc3RyaW5nID0gbW9kZWwubW9kZWxDb25maWcudHlwZTtcclxuICAgIGNvbnN0IHJlbGF0aW9uU2hpcERhdGE6IHsgdHlwZTogc3RyaW5nLCBpZD86IHN0cmluZywgYXR0cmlidXRlcz86IGFueSB9ID0ge3R5cGU6IHJlbGF0aW9uc2hpcFR5cGV9O1xyXG5cclxuICAgIGlmIChtb2RlbC5pZCkge1xyXG4gICAgICByZWxhdGlvblNoaXBEYXRhLmlkID0gbW9kZWwuaWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzTWV0YWRhdGE6IGFueSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0F0dHJpYnV0ZScsIG1vZGVsKTtcclxuICAgICAgcmVsYXRpb25TaGlwRGF0YS5hdHRyaWJ1dGVzID0gdGhpcy5nZXREaXJ0eUF0dHJpYnV0ZXMoYXR0cmlidXRlc01ldGFkYXRhLCBtb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlbGF0aW9uU2hpcERhdGE7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZXh0cmFjdFF1ZXJ5RGF0YTxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8b2JqZWN0PixcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgd2l0aE1ldGEgPSBmYWxzZVxyXG4gICk6IEFycmF5PFQ+IHwgSnNvbkFwaVF1ZXJ5RGF0YTxUPiB7XHJcbiAgICBjb25zdCBib2R5OiBhbnkgPSByZXNwb25zZS5ib2R5O1xyXG4gICAgY29uc3QgbW9kZWxzOiBUW10gPSBbXTtcclxuXHJcbiAgICBjb25zdCByZXNvdXJjZU9iamVjdHMgPSBbLi4uYm9keS5kYXRhLCAuLi4oYm9keS5pbmNsdWRlZCB8fCBbXSldO1xyXG5cclxuICAgIGJvZHkuZGF0YS5mb3JFYWNoKChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgbW9kZWw6IFQgPSB0aGlzLmRlc2VyaWFsaXplTW9kZWwobW9kZWxUeXBlLCBkYXRhKTtcclxuICAgICAgdGhpcy5hZGRUb1N0b3JlKG1vZGVsKTtcclxuXHJcbiAgICAgIG1vZGVsLnN5bmNSZWxhdGlvbnNoaXBzKGRhdGEsIHJlc291cmNlT2JqZWN0cyk7XHJcbiAgICAgIHRoaXMuYWRkVG9TdG9yZShtb2RlbCk7XHJcblxyXG4gICAgICBtb2RlbHMucHVzaChtb2RlbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAod2l0aE1ldGEgJiYgd2l0aE1ldGEgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIG5ldyBKc29uQXBpUXVlcnlEYXRhKG1vZGVscywgdGhpcy5wYXJzZU1ldGEoYm9keSwgbW9kZWxUeXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1vZGVscztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBleHRyYWN0UmVjb3JkRGF0YTxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIHJlczogSHR0cFJlc3BvbnNlPG9iamVjdD4sXHJcbiAgICBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPixcclxuICAgIG1vZGVsPzogVFxyXG4gICk6IFQge1xyXG4gICAgY29uc3QgYm9keTogYW55ID0gcmVzLmJvZHk7XHJcbiAgICAvLyBFcnJvciBpbiBBbmd1bGFyIDwgNS4yLjQgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yMDc0NClcclxuICAgIC8vIG51bGwgaXMgY29udmVydGVkIHRvICdudWxsJywgc28gdGhpcyBpcyB0ZW1wb3JhcnkgbmVlZGVkIHRvIG1ha2UgdGVzdGNhc2UgcG9zc2libGVcclxuICAgIC8vIChhbmQgdG8gYXZvaWQgYSBkZWNyZWFzZSBvZiB0aGUgY292ZXJhZ2UpXHJcbiAgICBpZiAoIWJvZHkgfHwgYm9keSA9PT0gJ251bGwnKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gYm9keSBpbiByZXNwb25zZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghYm9keS5kYXRhKSB7XHJcbiAgICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDEgfHwgIW1vZGVsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHBlY3RlZCBkYXRhIGluIHJlc3BvbnNlJyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RlbCkge1xyXG4gICAgICBtb2RlbC5tb2RlbEluaXRpYWxpemF0aW9uID0gdHJ1ZTtcclxuICAgICAgbW9kZWwuaWQgPSBib2R5LmRhdGEuaWQ7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24obW9kZWwsIGJvZHkuZGF0YS5hdHRyaWJ1dGVzKTtcclxuICAgICAgbW9kZWwubW9kZWxJbml0aWFsaXphdGlvbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlc2VyaWFsaXplZE1vZGVsID0gbW9kZWwgfHwgdGhpcy5kZXNlcmlhbGl6ZU1vZGVsKG1vZGVsVHlwZSwgYm9keS5kYXRhKTtcclxuICAgIHRoaXMuYWRkVG9TdG9yZShkZXNlcmlhbGl6ZWRNb2RlbCk7XHJcbiAgICBpZiAoYm9keS5pbmNsdWRlZCkge1xyXG4gICAgICBkZXNlcmlhbGl6ZWRNb2RlbC5zeW5jUmVsYXRpb25zaGlwcyhib2R5LmRhdGEsIGJvZHkuaW5jbHVkZWQpO1xyXG4gICAgICB0aGlzLmFkZFRvU3RvcmUoZGVzZXJpYWxpemVkTW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZXNlcmlhbGl6ZWRNb2RlbDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGlmIChcclxuICAgICAgZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSAmJlxyXG4gICAgICBlcnJvci5lcnJvciBpbnN0YW5jZW9mIE9iamVjdCAmJlxyXG4gICAgICBlcnJvci5lcnJvci5lcnJvcnMgJiZcclxuICAgICAgZXJyb3IuZXJyb3IuZXJyb3JzIGluc3RhbmNlb2YgQXJyYXlcclxuICAgICkge1xyXG4gICAgICBjb25zdCBlcnJvcnM6IEVycm9yUmVzcG9uc2UgPSBuZXcgRXJyb3JSZXNwb25zZShlcnJvci5lcnJvci5lcnJvcnMpO1xyXG4gICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBwYXJzZU1ldGEoYm9keTogYW55LCBtb2RlbFR5cGU6IE1vZGVsVHlwZTxKc29uQXBpTW9kZWw+KTogYW55IHtcclxuICAgIGNvbnN0IG1ldGFNb2RlbDogYW55ID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaU1vZGVsQ29uZmlnJywgbW9kZWxUeXBlKS5tZXRhO1xyXG4gICAgcmV0dXJuIG5ldyBtZXRhTW9kZWwoYm9keSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVwcmVjYXRlZCB1c2UgYnVpbGRIdHRwSGVhZGVycyBtZXRob2QgdG8gYnVpbGQgcmVxdWVzdCBoZWFkZXJzXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGdldE9wdGlvbnMoY3VzdG9tSGVhZGVycz86IEh0dHBIZWFkZXJzKTogYW55IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuYnVpbGRIdHRwSGVhZGVycyhjdXN0b21IZWFkZXJzKSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRIdHRwSGVhZGVycyhjdXN0b21IZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBIdHRwSGVhZGVycyB7XHJcbiAgICBsZXQgcmVxdWVzdEhlYWRlcnM6IEh0dHBIZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vdm5kLmFwaStqc29uJyxcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi92bmQuYXBpK2pzb24nXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5nbG9iYWxIZWFkZXJzKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsSGVhZGVycy5rZXlzKCkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2xvYmFsSGVhZGVycy5oYXMoa2V5KSkge1xyXG4gICAgICAgICAgcmVxdWVzdEhlYWRlcnMgPSByZXF1ZXN0SGVhZGVycy5zZXQoa2V5LCB0aGlzLmdsb2JhbEhlYWRlcnMuZ2V0KGtleSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN1c3RvbUhlYWRlcnMpIHtcclxuICAgICAgY3VzdG9tSGVhZGVycy5rZXlzKCkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgaWYgKGN1c3RvbUhlYWRlcnMuaGFzKGtleSkpIHtcclxuICAgICAgICAgIHJlcXVlc3RIZWFkZXJzID0gcmVxdWVzdEhlYWRlcnMuc2V0KGtleSwgY3VzdG9tSGVhZGVycy5nZXQoa2V5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVxdWVzdEhlYWRlcnM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVzZXRNZXRhZGF0YUF0dHJpYnV0ZXM8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4ocmVzOiBULCBhdHRyaWJ1dGVzTWV0YWRhdGE6IGFueSwgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4pIHtcclxuICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIGluIGF0dHJpYnV0ZXNNZXRhZGF0YSkge1xyXG4gICAgICBpZiAoYXR0cmlidXRlc01ldGFkYXRhLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcclxuICAgICAgICBjb25zdCBtZXRhZGF0YTogYW55ID0gYXR0cmlidXRlc01ldGFkYXRhW3Byb3BlcnR5TmFtZV07XHJcblxyXG4gICAgICAgIGlmIChtZXRhZGF0YS5oYXNEaXJ0eUF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgIG1ldGFkYXRhLmhhc0RpcnR5QXR0cmlidXRlcyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHJlc1tBdHRyaWJ1dGVNZXRhZGF0YUluZGV4XSA9IGF0dHJpYnV0ZXNNZXRhZGF0YTtcclxuICAgIHJldHVybiByZXM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdXBkYXRlUmVsYXRpb25zaGlwczxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihtb2RlbDogVCwgcmVsYXRpb25zaGlwczogYW55KTogVCB7XHJcbiAgICBjb25zdCBtb2RlbHNUeXBlczogYW55ID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaURhdGFzdG9yZUNvbmZpZycsIHRoaXMuY29uc3RydWN0b3IpLm1vZGVscztcclxuXHJcbiAgICBmb3IgKGNvbnN0IHJlbGF0aW9uc2hpcCBpbiByZWxhdGlvbnNoaXBzKSB7XHJcbiAgICAgIGlmIChyZWxhdGlvbnNoaXBzLmhhc093blByb3BlcnR5KHJlbGF0aW9uc2hpcCkgJiYgbW9kZWwuaGFzT3duUHJvcGVydHkocmVsYXRpb25zaGlwKSAmJiBtb2RlbFtyZWxhdGlvbnNoaXBdKSB7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpb25zaGlwTW9kZWw6IEpzb25BcGlNb2RlbCA9IG1vZGVsW3JlbGF0aW9uc2hpcF07XHJcbiAgICAgICAgY29uc3QgaGFzTWFueTogYW55W10gPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdIYXNNYW55JywgcmVsYXRpb25zaGlwTW9kZWwpO1xyXG4gICAgICAgIGNvbnN0IHByb3BlcnR5SGFzTWFueTogYW55ID0gZmluZChoYXNNYW55LCAocHJvcGVydHkpID0+IHtcclxuICAgICAgICAgIHJldHVybiBtb2RlbHNUeXBlc1twcm9wZXJ0eS5yZWxhdGlvbnNoaXBdID09PSBtb2RlbC5jb25zdHJ1Y3RvcjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHByb3BlcnR5SGFzTWFueSkge1xyXG4gICAgICAgICAgcmVsYXRpb25zaGlwTW9kZWxbcHJvcGVydHlIYXNNYW55LnByb3BlcnR5TmFtZV0gPSByZWxhdGlvbnNoaXBNb2RlbFtwcm9wZXJ0eUhhc01hbnkucHJvcGVydHlOYW1lXSB8fCBbXTtcclxuXHJcbiAgICAgICAgICBjb25zdCBpbmRleE9mTW9kZWwgPSByZWxhdGlvbnNoaXBNb2RlbFtwcm9wZXJ0eUhhc01hbnkucHJvcGVydHlOYW1lXS5pbmRleE9mKG1vZGVsKTtcclxuXHJcbiAgICAgICAgICBpZiAoaW5kZXhPZk1vZGVsID09PSAtMSkge1xyXG4gICAgICAgICAgICByZWxhdGlvbnNoaXBNb2RlbFtwcm9wZXJ0eUhhc01hbnkucHJvcGVydHlOYW1lXS5wdXNoKG1vZGVsKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlbGF0aW9uc2hpcE1vZGVsW3Byb3BlcnR5SGFzTWFueS5wcm9wZXJ0eU5hbWVdW2luZGV4T2ZNb2RlbF0gPSBtb2RlbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbW9kZWw7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0TW9kZWxQcm9wZXJ0eU5hbWVzKG1vZGVsOiBKc29uQXBpTW9kZWwpIHtcclxuICAgIHJldHVybiBSZWZsZWN0LmdldE1ldGFkYXRhKCdBdHRyaWJ1dGVNYXBwaW5nJywgbW9kZWwpIHx8IFtdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZFJlcXVlc3RPcHRpb25zKGN1c3RvbU9wdGlvbnM6IGFueSA9IHt9KTogb2JqZWN0IHtcclxuICAgIGNvbnN0IGh0dHBIZWFkZXJzOiBIdHRwSGVhZGVycyA9IHRoaXMuYnVpbGRIdHRwSGVhZGVycyhjdXN0b21PcHRpb25zLmhlYWRlcnMpO1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zOiBvYmplY3QgPSBPYmplY3QuYXNzaWduKGN1c3RvbU9wdGlvbnMsIHtcclxuICAgICAgaGVhZGVyczogaHR0cEhlYWRlcnNcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsUmVxdWVzdE9wdGlvbnMsIHJlcXVlc3RPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3RvUXVlcnlTdHJpbmcocGFyYW1zOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHFzLnN0cmluZ2lmeShwYXJhbXMsIHthcnJheUZvcm1hdDogJ2JyYWNrZXRzJ30pO1xyXG4gIH1cclxufVxyXG4iXX0=