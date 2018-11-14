import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonApiModel } from '../models/json-api.model';
import { JsonApiQueryData } from '../models/json-api-query-data';
import { DatastoreConfig } from '../interfaces/datastore-config.interface';
export declare type ModelType<T extends JsonApiModel> = {
    new (datastore: JsonApiDatastore, data: any): T;
};
export declare class JsonApiDatastore {
    protected http: HttpClient;
    private _headers;
    private _store;
    private toQueryString;
    private readonly getDirtyAttributes;
    protected config: DatastoreConfig;
    constructor(http: HttpClient);
    /** @deprecated - use findAll method to take all models **/
    query<T extends JsonApiModel>(modelType: ModelType<T>, params?: any, headers?: HttpHeaders, customUrl?: string): Observable<T[]>;
    findAll<T extends JsonApiModel>(modelType: ModelType<T>, params?: any, headers?: HttpHeaders, customUrl?: string): Observable<JsonApiQueryData<T>>;
    findRecord<T extends JsonApiModel>(modelType: ModelType<T>, id: string, params?: any, headers?: HttpHeaders, customUrl?: string): Observable<T>;
    createRecord<T extends JsonApiModel>(modelType: ModelType<T>, data?: any): T;
    private static getDirtyAttributes;
    saveRecord<T extends JsonApiModel>(attributesMetadata: any, model: T, params?: any, headers?: HttpHeaders, customUrl?: string): Observable<T>;
    deleteRecord<T extends JsonApiModel>(modelType: ModelType<T>, id: string, headers?: HttpHeaders, customUrl?: string): Observable<Response>;
    peekRecord<T extends JsonApiModel>(modelType: ModelType<T>, id: string): T | null;
    peekAll<T extends JsonApiModel>(modelType: ModelType<T>): T[];
    headers: HttpHeaders;
    protected buildUrl<T extends JsonApiModel>(modelType: ModelType<T>, params?: any, id?: string, customUrl?: string): string;
    protected getRelationships(data: any): any;
    protected isValidToManyRelation(objects: Array<any>): boolean;
    protected buildSingleRelationshipData(model: JsonApiModel): any;
    protected extractQueryData<T extends JsonApiModel>(body: any, modelType: ModelType<T>, withMeta?: boolean): T[] | JsonApiQueryData<T>;
    deserializeModel<T extends JsonApiModel>(modelType: ModelType<T>, data: any): T;
    protected extractRecordData<T extends JsonApiModel>(res: HttpResponse<Object>, modelType: ModelType<T>, model?: T): T;
    protected handleError(error: any): Observable<any>;
    protected parseMeta(body: any, modelType: ModelType<JsonApiModel>): any;
    /** @deprecated - use buildHeaders method to build request headers **/
    protected getOptions(customHeaders?: HttpHeaders): any;
    protected buildHeaders(customHeaders?: HttpHeaders): HttpHeaders;
    private _toQueryString;
    addToStore(modelOrModels: JsonApiModel | JsonApiModel[]): void;
    protected resetMetadataAttributes<T extends JsonApiModel>(res: T, attributesMetadata: any, modelType: ModelType<T>): T;
    protected updateRelationships<T extends JsonApiModel>(model: T, relationships: any): T;
    protected readonly datastoreConfig: DatastoreConfig;
    transformSerializedNamesToPropertyNames<T extends JsonApiModel>(modelType: ModelType<T>, attributes: any): any;
    protected getModelPropertyNames(model: JsonApiModel): any;
}
