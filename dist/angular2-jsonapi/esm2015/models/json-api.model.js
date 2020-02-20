/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import find from 'lodash-es/find';
import includes from 'lodash-es/includes';
import * as _ from 'lodash';
import { AttributeMetadata } from '../constants/symbols';
// tslint:disable-next-line:variable-name
/**
 * HACK/FIXME:
 * Type 'symbol' cannot be used as an index type.
 * TypeScript 2.9.x
 * See https://github.com/Microsoft/TypeScript/issues/24587.
 * @type {?}
 */
const AttributeMetadataIndex = (/** @type {?} */ (AttributeMetadata));
export class JsonApiModel {
    /**
     * @param {?} internalDatastore
     * @param {?=} data
     */
    constructor(internalDatastore, data) {
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
    isModelInitialization() {
        return this.modelInitialization;
    }
    /**
     * @param {?} data
     * @param {?} included
     * @param {?=} remainingModels
     * @return {?}
     */
    syncRelationships(data, included, remainingModels) {
        if (this.lastSyncModels === included) {
            return;
        }
        if (data) {
            /** @type {?} */
            let modelsForProcessing = remainingModels;
            if (modelsForProcessing === undefined) {
                modelsForProcessing = [].concat(included);
            }
            this.parseHasMany(data, included, modelsForProcessing);
            this.parseBelongsTo(data, included, modelsForProcessing);
        }
        this.lastSyncModels = included;
    }
    /**
     * @param {?=} params
     * @param {?=} headers
     * @param {?=} customUrl
     * @return {?}
     */
    save(params, headers, customUrl) {
        this.checkChanges();
        /** @type {?} */
        const attributesMetadata = this[AttributeMetadataIndex];
        return this.internalDatastore.saveRecord(attributesMetadata, this, params, headers, customUrl);
    }
    /**
     * @return {?}
     */
    get hasDirtyAttributes() {
        this.checkChanges();
        /** @type {?} */
        const attributesMetadata = this[AttributeMetadataIndex];
        /** @type {?} */
        let hasDirtyAttributes = false;
        for (const propertyName in attributesMetadata) {
            if (attributesMetadata.hasOwnProperty(propertyName)) {
                /** @type {?} */
                const metadata = attributesMetadata[propertyName];
                if (metadata.hasDirtyAttributes) {
                    hasDirtyAttributes = true;
                    break;
                }
            }
        }
        return hasDirtyAttributes;
    }
    /**
     * @private
     * @return {?}
     */
    checkChanges() {
        /** @type {?} */
        const attributesMetadata = this[AttributeMetadata];
        for (const propertyName in attributesMetadata) {
            if (attributesMetadata.hasOwnProperty(propertyName)) {
                /** @type {?} */
                const metadata = attributesMetadata[propertyName];
                if (metadata.nested) {
                    this[AttributeMetadata][propertyName].hasDirtyAttributes = !_.isEqual(attributesMetadata[propertyName].oldValue, attributesMetadata[propertyName].newValue);
                    this[AttributeMetadata][propertyName].serialisationValue = attributesMetadata[propertyName].converter(Reflect.getMetadata('design:type', this, propertyName), _.cloneDeep(attributesMetadata[propertyName].newValue), true);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    rollbackAttributes() {
        /** @type {?} */
        const attributesMetadata = this[AttributeMetadataIndex];
        for (const propertyName in attributesMetadata) {
            if (attributesMetadata.hasOwnProperty(propertyName)) {
                if (attributesMetadata[propertyName].hasDirtyAttributes) {
                    this[propertyName] = _.cloneDeep(attributesMetadata[propertyName].oldValue);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    get modelConfig() {
        return Reflect.getMetadata('JsonApiModelConfig', this.constructor);
    }
    /**
     * @private
     * @param {?} data
     * @param {?} included
     * @param {?} remainingModels
     * @return {?}
     */
    parseHasMany(data, included, remainingModels) {
        /** @type {?} */
        const hasMany = Reflect.getMetadata('HasMany', this);
        if (hasMany) {
            for (const metadata of hasMany) {
                /** @type {?} */
                const relationship = data.relationships ? data.relationships[metadata.relationship] : null;
                if (relationship && relationship.data && Array.isArray(relationship.data)) {
                    /** @type {?} */
                    let allModels = [];
                    /** @type {?} */
                    const modelTypesFetched = [];
                    for (const typeIndex of Object.keys(relationship.data)) {
                        /** @type {?} */
                        const typeName = relationship.data[typeIndex].type;
                        if (!includes(modelTypesFetched, typeName)) {
                            modelTypesFetched.push(typeName);
                            // tslint:disable-next-line:max-line-length
                            /** @type {?} */
                            const modelType = Reflect.getMetadata('JsonApiDatastoreConfig', this.internalDatastore.constructor).models[typeName];
                            if (modelType) {
                                /** @type {?} */
                                const relationshipModels = this.getHasManyRelationship(modelType, relationship.data, included, typeName, remainingModels);
                                if (relationshipModels.length > 0) {
                                    allModels = allModels.concat(relationshipModels);
                                }
                            }
                            else {
                                throw { message: `parseHasMany - Model type for relationship ${typeName} not found.` };
                            }
                        }
                    }
                    this[metadata.propertyName] = allModels;
                }
            }
        }
    }
    /**
     * @private
     * @param {?} data
     * @param {?} included
     * @param {?} remainingModels
     * @return {?}
     */
    parseBelongsTo(data, included, remainingModels) {
        /** @type {?} */
        const belongsTo = Reflect.getMetadata('BelongsTo', this);
        if (belongsTo) {
            for (const metadata of belongsTo) {
                /** @type {?} */
                const relationship = data.relationships ? data.relationships[metadata.relationship] : null;
                if (relationship && relationship.data) {
                    /** @type {?} */
                    const dataRelationship = (relationship.data instanceof Array) ? relationship.data[0] : relationship.data;
                    if (dataRelationship) {
                        /** @type {?} */
                        const typeName = dataRelationship.type;
                        // tslint:disable-next-line:max-line-length
                        /** @type {?} */
                        const modelType = Reflect.getMetadata('JsonApiDatastoreConfig', this.internalDatastore.constructor).models[typeName];
                        if (modelType) {
                            /** @type {?} */
                            const relationshipModel = this.getBelongsToRelationship(modelType, dataRelationship, included, typeName, remainingModels);
                            if (relationshipModel) {
                                this[metadata.propertyName] = relationshipModel;
                            }
                        }
                        else {
                            throw { message: `parseBelongsTo - Model type for relationship ${typeName} not found.` };
                        }
                    }
                }
            }
        }
    }
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
    getHasManyRelationship(modelType, data, included, typeName, remainingModels) {
        /** @type {?} */
        const relationshipList = [];
        data.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            const relationshipData = find(included, (/** @type {?} */ ({ id: item.id, type: typeName })));
            if (relationshipData) {
                /** @type {?} */
                const newObject = this.createOrPeek(modelType, relationshipData);
                /** @type {?} */
                const indexOfNewlyFoundModel = remainingModels.indexOf(relationshipData);
                /** @type {?} */
                const modelsForProcessing = remainingModels.concat([]);
                if (indexOfNewlyFoundModel !== -1) {
                    modelsForProcessing.splice(indexOfNewlyFoundModel, 1);
                    newObject.syncRelationships(relationshipData, included, modelsForProcessing);
                }
                relationshipList.push(newObject);
            }
        }));
        return relationshipList;
    }
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
    getBelongsToRelationship(modelType, data, included, typeName, remainingModels) {
        /** @type {?} */
        const id = data.id;
        /** @type {?} */
        const relationshipData = find(included, (/** @type {?} */ ({ id, type: typeName })));
        if (relationshipData) {
            /** @type {?} */
            const newObject = this.createOrPeek(modelType, relationshipData);
            /** @type {?} */
            const indexOfNewlyFoundModel = remainingModels.indexOf(relationshipData);
            /** @type {?} */
            const modelsForProcessing = remainingModels.concat([]);
            if (indexOfNewlyFoundModel !== -1) {
                modelsForProcessing.splice(indexOfNewlyFoundModel, 1);
                newObject.syncRelationships(relationshipData, included, modelsForProcessing);
            }
            return newObject;
        }
        return this.internalDatastore.peekRecord(modelType, id);
    }
    /**
     * @private
     * @template T
     * @param {?} modelType
     * @param {?} data
     * @return {?}
     */
    createOrPeek(modelType, data) {
        /** @type {?} */
        const peek = this.internalDatastore.peekRecord(modelType, data.id);
        if (peek) {
            _.extend(peek, this.internalDatastore.transformSerializedNamesToPropertyNames(modelType, data.attributes));
            return peek;
        }
        /** @type {?} */
        const newObject = this.internalDatastore.deserializeModel(modelType, data);
        this.internalDatastore.addToStore(newObject);
        return newObject;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1hcGkubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsibW9kZWxzL2pzb24tYXBpLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLElBQUksTUFBTSxnQkFBZ0IsQ0FBQztBQUNsQyxPQUFPLFFBQVEsTUFBTSxvQkFBb0IsQ0FBQztBQUkxQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7Ozs7O01BVW5ELHNCQUFzQixHQUFXLG1CQUFBLGlCQUFpQixFQUFPO0FBRS9ELE1BQU0sT0FBTyxZQUFZOzs7OztJQVF2QixZQUFvQixpQkFBbUMsRUFBRSxJQUFVO1FBQS9DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFOaEQsd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBT2pDLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUNoQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7O0lBRU0scUJBQXFCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7Ozs7Ozs7SUFFTSxpQkFBaUIsQ0FBQyxJQUFTLEVBQUUsUUFBYSxFQUFFLGVBQTRCO1FBQzdFLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxRQUFRLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLEVBQUU7O2dCQUNKLG1CQUFtQixHQUFHLGVBQWU7WUFFekMsSUFBSSxtQkFBbUIsS0FBSyxT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QUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7UUFFbEUsSUFBSSxJQUFJLEVBQUU7WUFDUixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsdUNBQXVDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzNHLE9BQU8sSUFBSSxDQUFDO1NBQ2I7O2NBRUssU0FBUyxHQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO1FBQzdFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0MsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGOzs7SUFwUEMsMEJBQVc7O0lBQ1gsMkNBQW1DOztJQUluQyxzQ0FBMkI7Ozs7O0lBRWYseUNBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpbmQgZnJvbSAnbG9kYXNoLWVzL2ZpbmQnO1xyXG5pbXBvcnQgaW5jbHVkZXMgZnJvbSAnbG9kYXNoLWVzL2luY2x1ZGVzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBKc29uQXBpRGF0YXN0b3JlLCBNb2RlbFR5cGUgfSBmcm9tICcuLi9zZXJ2aWNlcy9qc29uLWFwaS1kYXRhc3RvcmUuc2VydmljZSc7XHJcbmltcG9ydCB7IE1vZGVsQ29uZmlnIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9tb2RlbC1jb25maWcuaW50ZXJmYWNlJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVNZXRhZGF0YSB9IGZyb20gJy4uL2NvbnN0YW50cy9zeW1ib2xzJztcclxuaW1wb3J0IHsgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG4vKipcclxuICogSEFDSy9GSVhNRTpcclxuICogVHlwZSAnc3ltYm9sJyBjYW5ub3QgYmUgdXNlZCBhcyBhbiBpbmRleCB0eXBlLlxyXG4gKiBUeXBlU2NyaXB0IDIuOS54XHJcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzI0NTg3LlxyXG4gKi9cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcclxuY29uc3QgQXR0cmlidXRlTWV0YWRhdGFJbmRleDogc3RyaW5nID0gQXR0cmlidXRlTWV0YWRhdGEgYXMgYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25BcGlNb2RlbCB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBwdWJsaWMgbW9kZWxJbml0aWFsaXphdGlvbiA9IGZhbHNlO1xyXG5cclxuICBba2V5OiBzdHJpbmddOiBhbnk7XHJcblxyXG4gIGxhc3RTeW5jTW9kZWxzOiBBcnJheTxhbnk+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGludGVybmFsRGF0YXN0b3JlOiBKc29uQXBpRGF0YXN0b3JlLCBkYXRhPzogYW55KSB7XHJcbiAgICBpZiAoZGF0YSkge1xyXG4gICAgICB0aGlzLm1vZGVsSW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgICB0aGlzLmlkID0gZGF0YS5pZDtcclxuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhLmF0dHJpYnV0ZXMpO1xyXG4gICAgICB0aGlzLm1vZGVsSW5pdGlhbGl6YXRpb24gPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc01vZGVsSW5pdGlhbGl6YXRpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5tb2RlbEluaXRpYWxpemF0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN5bmNSZWxhdGlvbnNoaXBzKGRhdGE6IGFueSwgaW5jbHVkZWQ6IGFueSwgcmVtYWluaW5nTW9kZWxzPzogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubGFzdFN5bmNNb2RlbHMgPT09IGluY2x1ZGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGF0YSkge1xyXG4gICAgICBsZXQgbW9kZWxzRm9yUHJvY2Vzc2luZyA9IHJlbWFpbmluZ01vZGVscztcclxuXHJcbiAgICAgIGlmIChtb2RlbHNGb3JQcm9jZXNzaW5nID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBtb2RlbHNGb3JQcm9jZXNzaW5nID0gW10uY29uY2F0KGluY2x1ZGVkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wYXJzZUhhc01hbnkoZGF0YSwgaW5jbHVkZWQsIG1vZGVsc0ZvclByb2Nlc3NpbmcpO1xyXG4gICAgICB0aGlzLnBhcnNlQmVsb25nc1RvKGRhdGEsIGluY2x1ZGVkLCBtb2RlbHNGb3JQcm9jZXNzaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxhc3RTeW5jTW9kZWxzID0gaW5jbHVkZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2F2ZShwYXJhbXM/OiBhbnksIGhlYWRlcnM/OiBIdHRwSGVhZGVycywgY3VzdG9tVXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTx0aGlzPiB7XHJcbiAgICB0aGlzLmNoZWNrQ2hhbmdlcygpO1xyXG4gICAgY29uc3QgYXR0cmlidXRlc01ldGFkYXRhOiBhbnkgPSB0aGlzW0F0dHJpYnV0ZU1ldGFkYXRhSW5kZXhdO1xyXG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxEYXRhc3RvcmUuc2F2ZVJlY29yZChhdHRyaWJ1dGVzTWV0YWRhdGEsIHRoaXMsIHBhcmFtcywgaGVhZGVycywgY3VzdG9tVXJsKTtcclxuICB9XHJcblxyXG4gIGdldCBoYXNEaXJ0eUF0dHJpYnV0ZXMoKSB7XHJcbiAgICB0aGlzLmNoZWNrQ2hhbmdlcygpO1xyXG4gICAgY29uc3QgYXR0cmlidXRlc01ldGFkYXRhOiBhbnkgPSB0aGlzW0F0dHJpYnV0ZU1ldGFkYXRhSW5kZXhdO1xyXG4gICAgbGV0IGhhc0RpcnR5QXR0cmlidXRlcyA9IGZhbHNlO1xyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgaW4gYXR0cmlidXRlc01ldGFkYXRhKSB7XHJcbiAgICAgIGlmIChhdHRyaWJ1dGVzTWV0YWRhdGEuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhOiBhbnkgPSBhdHRyaWJ1dGVzTWV0YWRhdGFbcHJvcGVydHlOYW1lXTtcclxuICAgICAgICBpZiAobWV0YWRhdGEuaGFzRGlydHlBdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICBoYXNEaXJ0eUF0dHJpYnV0ZXMgPSB0cnVlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGFzRGlydHlBdHRyaWJ1dGVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGVja0NoYW5nZXMoKSB7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGVzTWV0YWRhdGE6IGFueSA9IHRoaXNbQXR0cmlidXRlTWV0YWRhdGFdO1xyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgaW4gYXR0cmlidXRlc01ldGFkYXRhKSB7XHJcbiAgICAgIGlmIChhdHRyaWJ1dGVzTWV0YWRhdGEuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhOiBhbnkgPSBhdHRyaWJ1dGVzTWV0YWRhdGFbcHJvcGVydHlOYW1lXTtcclxuICAgICAgICBpZiAobWV0YWRhdGEubmVzdGVkKSB7XHJcbiAgICAgICAgICB0aGlzW0F0dHJpYnV0ZU1ldGFkYXRhXVtwcm9wZXJ0eU5hbWVdLmhhc0RpcnR5QXR0cmlidXRlcyA9ICFfLmlzRXF1YWwoXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXNNZXRhZGF0YVtwcm9wZXJ0eU5hbWVdLm9sZFZhbHVlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzTWV0YWRhdGFbcHJvcGVydHlOYW1lXS5uZXdWYWx1ZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXNbQXR0cmlidXRlTWV0YWRhdGFdW3Byb3BlcnR5TmFtZV0uc2VyaWFsaXNhdGlvblZhbHVlID0gYXR0cmlidXRlc01ldGFkYXRhW3Byb3BlcnR5TmFtZV0uY29udmVydGVyKFxyXG4gICAgICAgICAgICBSZWZsZWN0LmdldE1ldGFkYXRhKCdkZXNpZ246dHlwZScsIHRoaXMsIHByb3BlcnR5TmFtZSksXHJcbiAgICAgICAgICAgIF8uY2xvbmVEZWVwKGF0dHJpYnV0ZXNNZXRhZGF0YVtwcm9wZXJ0eU5hbWVdLm5ld1ZhbHVlKSxcclxuICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByb2xsYmFja0F0dHJpYnV0ZXMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGVzTWV0YWRhdGE6IGFueSA9IHRoaXNbQXR0cmlidXRlTWV0YWRhdGFJbmRleF07XHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBpbiBhdHRyaWJ1dGVzTWV0YWRhdGEpIHtcclxuICAgICAgaWYgKGF0dHJpYnV0ZXNNZXRhZGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXNNZXRhZGF0YVtwcm9wZXJ0eU5hbWVdLmhhc0RpcnR5QXR0cmlidXRlcykge1xyXG4gICAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gXy5jbG9uZURlZXAoYXR0cmlidXRlc01ldGFkYXRhW3Byb3BlcnR5TmFtZV0ub2xkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IG1vZGVsQ29uZmlnKCk6IE1vZGVsQ29uZmlnIHtcclxuICAgIHJldHVybiBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpTW9kZWxDb25maWcnLCB0aGlzLmNvbnN0cnVjdG9yKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VIYXNNYW55KGRhdGE6IGFueSwgaW5jbHVkZWQ6IGFueSwgcmVtYWluaW5nTW9kZWxzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBjb25zdCBoYXNNYW55OiBhbnkgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdIYXNNYW55JywgdGhpcyk7XHJcblxyXG4gICAgaWYgKGhhc01hbnkpIHtcclxuICAgICAgZm9yIChjb25zdCBtZXRhZGF0YSBvZiBoYXNNYW55KSB7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpb25zaGlwOiBhbnkgPSBkYXRhLnJlbGF0aW9uc2hpcHMgPyBkYXRhLnJlbGF0aW9uc2hpcHNbbWV0YWRhdGEucmVsYXRpb25zaGlwXSA6IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChyZWxhdGlvbnNoaXAgJiYgcmVsYXRpb25zaGlwLmRhdGEgJiYgQXJyYXkuaXNBcnJheShyZWxhdGlvbnNoaXAuZGF0YSkpIHtcclxuICAgICAgICAgIGxldCBhbGxNb2RlbHM6IEpzb25BcGlNb2RlbFtdID0gW107XHJcbiAgICAgICAgICBjb25zdCBtb2RlbFR5cGVzRmV0Y2hlZDogYW55ID0gW107XHJcblxyXG4gICAgICAgICAgZm9yIChjb25zdCB0eXBlSW5kZXggb2YgT2JqZWN0LmtleXMocmVsYXRpb25zaGlwLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGVOYW1lOiBzdHJpbmcgPSByZWxhdGlvbnNoaXAuZGF0YVt0eXBlSW5kZXhdLnR5cGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWluY2x1ZGVzKG1vZGVsVHlwZXNGZXRjaGVkLCB0eXBlTmFtZSkpIHtcclxuICAgICAgICAgICAgICBtb2RlbFR5cGVzRmV0Y2hlZC5wdXNoKHR5cGVOYW1lKTtcclxuICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgICAgICAgY29uc3QgbW9kZWxUeXBlOiBNb2RlbFR5cGU8dGhpcz4gPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpRGF0YXN0b3JlQ29uZmlnJywgdGhpcy5pbnRlcm5hbERhdGFzdG9yZS5jb25zdHJ1Y3RvcikubW9kZWxzW3R5cGVOYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKG1vZGVsVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVsYXRpb25zaGlwTW9kZWxzOiBKc29uQXBpTW9kZWxbXSA9IHRoaXMuZ2V0SGFzTWFueVJlbGF0aW9uc2hpcChcclxuICAgICAgICAgICAgICAgICAgbW9kZWxUeXBlLFxyXG4gICAgICAgICAgICAgICAgICByZWxhdGlvbnNoaXAuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgaW5jbHVkZWQsXHJcbiAgICAgICAgICAgICAgICAgIHR5cGVOYW1lLFxyXG4gICAgICAgICAgICAgICAgICByZW1haW5pbmdNb2RlbHNcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlbGF0aW9uc2hpcE1vZGVscy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGFsbE1vZGVscyA9IGFsbE1vZGVscy5jb25jYXQocmVsYXRpb25zaGlwTW9kZWxzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cge21lc3NhZ2U6IGBwYXJzZUhhc01hbnkgLSBNb2RlbCB0eXBlIGZvciByZWxhdGlvbnNoaXAgJHt0eXBlTmFtZX0gbm90IGZvdW5kLmB9O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXNbbWV0YWRhdGEucHJvcGVydHlOYW1lXSA9IGFsbE1vZGVscztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VCZWxvbmdzVG8oZGF0YTogYW55LCBpbmNsdWRlZDogQXJyYXk8YW55PiwgcmVtYWluaW5nTW9kZWxzOiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBjb25zdCBiZWxvbmdzVG86IGFueSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0JlbG9uZ3NUbycsIHRoaXMpO1xyXG5cclxuICAgIGlmIChiZWxvbmdzVG8pIHtcclxuICAgICAgZm9yIChjb25zdCBtZXRhZGF0YSBvZiBiZWxvbmdzVG8pIHtcclxuICAgICAgICBjb25zdCByZWxhdGlvbnNoaXA6IGFueSA9IGRhdGEucmVsYXRpb25zaGlwcyA/IGRhdGEucmVsYXRpb25zaGlwc1ttZXRhZGF0YS5yZWxhdGlvbnNoaXBdIDogbnVsbDtcclxuICAgICAgICBpZiAocmVsYXRpb25zaGlwICYmIHJlbGF0aW9uc2hpcC5kYXRhKSB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhUmVsYXRpb25zaGlwOiBhbnkgPSAocmVsYXRpb25zaGlwLmRhdGEgaW5zdGFuY2VvZiBBcnJheSkgPyByZWxhdGlvbnNoaXAuZGF0YVswXSA6IHJlbGF0aW9uc2hpcC5kYXRhO1xyXG4gICAgICAgICAgaWYgKGRhdGFSZWxhdGlvbnNoaXApIHtcclxuICAgICAgICAgICAgY29uc3QgdHlwZU5hbWU6IHN0cmluZyA9IGRhdGFSZWxhdGlvbnNoaXAudHlwZTtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgICAgICAgICBjb25zdCBtb2RlbFR5cGU6IE1vZGVsVHlwZTx0aGlzPiA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0pzb25BcGlEYXRhc3RvcmVDb25maWcnLCB0aGlzLmludGVybmFsRGF0YXN0b3JlLmNvbnN0cnVjdG9yKS5tb2RlbHNbdHlwZU5hbWVdO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1vZGVsVHlwZSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHJlbGF0aW9uc2hpcE1vZGVsID0gdGhpcy5nZXRCZWxvbmdzVG9SZWxhdGlvbnNoaXAoXHJcbiAgICAgICAgICAgICAgICBtb2RlbFR5cGUsXHJcbiAgICAgICAgICAgICAgICBkYXRhUmVsYXRpb25zaGlwLFxyXG4gICAgICAgICAgICAgICAgaW5jbHVkZWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlTmFtZSxcclxuICAgICAgICAgICAgICAgIHJlbWFpbmluZ01vZGVsc1xyXG4gICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChyZWxhdGlvbnNoaXBNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc1ttZXRhZGF0YS5wcm9wZXJ0eU5hbWVdID0gcmVsYXRpb25zaGlwTW9kZWw7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRocm93IHttZXNzYWdlOiBgcGFyc2VCZWxvbmdzVG8gLSBNb2RlbCB0eXBlIGZvciByZWxhdGlvbnNoaXAgJHt0eXBlTmFtZX0gbm90IGZvdW5kLmB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEhhc01hbnlSZWxhdGlvbnNoaXA8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oXHJcbiAgICBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPixcclxuICAgIGRhdGE6IGFueSxcclxuICAgIGluY2x1ZGVkOiBhbnksXHJcbiAgICB0eXBlTmFtZTogc3RyaW5nLFxyXG4gICAgcmVtYWluaW5nTW9kZWxzOiBBcnJheTxhbnk+XHJcbiAgKTogQXJyYXk8VD4ge1xyXG4gICAgY29uc3QgcmVsYXRpb25zaGlwTGlzdDogQXJyYXk8VD4gPSBbXTtcclxuXHJcbiAgICBkYXRhLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCByZWxhdGlvbnNoaXBEYXRhOiBhbnkgPSBmaW5kKGluY2x1ZGVkLCB7aWQ6IGl0ZW0uaWQsIHR5cGU6IHR5cGVOYW1lfSBhcyBhbnkpO1xyXG5cclxuICAgICAgaWYgKHJlbGF0aW9uc2hpcERhdGEpIHtcclxuICAgICAgICBjb25zdCBuZXdPYmplY3Q6IFQgPSB0aGlzLmNyZWF0ZU9yUGVlayhtb2RlbFR5cGUsIHJlbGF0aW9uc2hpcERhdGEpO1xyXG5cclxuICAgICAgICBjb25zdCBpbmRleE9mTmV3bHlGb3VuZE1vZGVsID0gcmVtYWluaW5nTW9kZWxzLmluZGV4T2YocmVsYXRpb25zaGlwRGF0YSk7XHJcbiAgICAgICAgY29uc3QgbW9kZWxzRm9yUHJvY2Vzc2luZyA9IHJlbWFpbmluZ01vZGVscy5jb25jYXQoW10pO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXhPZk5ld2x5Rm91bmRNb2RlbCAhPT0gLTEpIHtcclxuICAgICAgICAgIG1vZGVsc0ZvclByb2Nlc3Npbmcuc3BsaWNlKGluZGV4T2ZOZXdseUZvdW5kTW9kZWwsIDEpO1xyXG4gICAgICAgICAgbmV3T2JqZWN0LnN5bmNSZWxhdGlvbnNoaXBzKHJlbGF0aW9uc2hpcERhdGEsIGluY2x1ZGVkLCBtb2RlbHNGb3JQcm9jZXNzaW5nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbGF0aW9uc2hpcExpc3QucHVzaChuZXdPYmplY3QpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVsYXRpb25zaGlwTGlzdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QmVsb25nc1RvUmVsYXRpb25zaGlwPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sXHJcbiAgICBkYXRhOiBhbnksXHJcbiAgICBpbmNsdWRlZDogQXJyYXk8YW55PixcclxuICAgIHR5cGVOYW1lOiBzdHJpbmcsXHJcbiAgICByZW1haW5pbmdNb2RlbHM6IEFycmF5PGFueT5cclxuICApOiBUIHwgbnVsbCB7XHJcbiAgICBjb25zdCBpZDogc3RyaW5nID0gZGF0YS5pZDtcclxuXHJcbiAgICBjb25zdCByZWxhdGlvbnNoaXBEYXRhOiBhbnkgPSBmaW5kKGluY2x1ZGVkLCB7aWQsIHR5cGU6IHR5cGVOYW1lfSBhcyBhbnkpO1xyXG5cclxuICAgIGlmIChyZWxhdGlvbnNoaXBEYXRhKSB7XHJcbiAgICAgIGNvbnN0IG5ld09iamVjdDogVCA9IHRoaXMuY3JlYXRlT3JQZWVrKG1vZGVsVHlwZSwgcmVsYXRpb25zaGlwRGF0YSk7XHJcblxyXG4gICAgICBjb25zdCBpbmRleE9mTmV3bHlGb3VuZE1vZGVsID0gcmVtYWluaW5nTW9kZWxzLmluZGV4T2YocmVsYXRpb25zaGlwRGF0YSk7XHJcbiAgICAgIGNvbnN0IG1vZGVsc0ZvclByb2Nlc3NpbmcgPSByZW1haW5pbmdNb2RlbHMuY29uY2F0KFtdKTtcclxuXHJcbiAgICAgIGlmIChpbmRleE9mTmV3bHlGb3VuZE1vZGVsICE9PSAtMSkge1xyXG4gICAgICAgIG1vZGVsc0ZvclByb2Nlc3Npbmcuc3BsaWNlKGluZGV4T2ZOZXdseUZvdW5kTW9kZWwsIDEpO1xyXG4gICAgICAgIG5ld09iamVjdC5zeW5jUmVsYXRpb25zaGlwcyhyZWxhdGlvbnNoaXBEYXRhLCBpbmNsdWRlZCwgbW9kZWxzRm9yUHJvY2Vzc2luZyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXdPYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxEYXRhc3RvcmUucGVla1JlY29yZChtb2RlbFR5cGUsIGlkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlT3JQZWVrPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LCBkYXRhOiBhbnkpOiBUIHtcclxuICAgIGNvbnN0IHBlZWsgPSB0aGlzLmludGVybmFsRGF0YXN0b3JlLnBlZWtSZWNvcmQobW9kZWxUeXBlLCBkYXRhLmlkKTtcclxuXHJcbiAgICBpZiAocGVlaykge1xyXG4gICAgICBfLmV4dGVuZChwZWVrLCB0aGlzLmludGVybmFsRGF0YXN0b3JlLnRyYW5zZm9ybVNlcmlhbGl6ZWROYW1lc1RvUHJvcGVydHlOYW1lcyhtb2RlbFR5cGUsIGRhdGEuYXR0cmlidXRlcykpO1xyXG4gICAgICByZXR1cm4gcGVlaztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdPYmplY3Q6IFQgPSB0aGlzLmludGVybmFsRGF0YXN0b3JlLmRlc2VyaWFsaXplTW9kZWwobW9kZWxUeXBlLCBkYXRhKTtcclxuICAgIHRoaXMuaW50ZXJuYWxEYXRhc3RvcmUuYWRkVG9TdG9yZShuZXdPYmplY3QpO1xyXG5cclxuICAgIHJldHVybiBuZXdPYmplY3Q7XHJcbiAgfVxyXG59XHJcbiJdfQ==