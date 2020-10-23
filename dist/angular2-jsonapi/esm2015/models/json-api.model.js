/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { find, includes } from 'lodash-es';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1hcGkubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsibW9kZWxzL2pzb24tYXBpLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUkzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7Ozs7O01BVW5ELHNCQUFzQixHQUFXLG1CQUFBLGlCQUFpQixFQUFPO0FBRS9ELE1BQU0sT0FBTyxZQUFZOzs7OztJQVF2QixZQUFvQixpQkFBbUMsRUFBRSxJQUFVO1FBQS9DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFOaEQsd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBT2pDLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUNoQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7O0lBRU0scUJBQXFCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7Ozs7Ozs7SUFFTSxpQkFBaUIsQ0FBQyxJQUFTLEVBQUUsUUFBYSxFQUFFLGVBQTRCO1FBQzdFLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxRQUFRLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLEVBQUU7O2dCQUNKLG1CQUFtQixHQUFHLGVBQWU7WUFFekMsSUFBSSxtQkFBbUIsS0FBSyxTQUFTLEVBQUU7Z0JBQ3JD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QUksQ0FBQyxFQUFFLENBQUM7UUFFbEUsSUFBSSxJQUFJLEVBQUU7WUFDUixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsdUNBQXVDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzNHLE9BQU8sSUFBSSxDQUFDO1NBQ2I7O2NBRUssU0FBUyxHQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO1FBQzdFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0MsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGOzs7SUFwUEMsMEJBQVc7O0lBQ1gsMkNBQW1DOztJQUluQyxzQ0FBMkI7Ozs7O0lBRWYseUNBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmluZCwgaW5jbHVkZXMgfSBmcm9tICdsb2Rhc2gtZXMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEpzb25BcGlEYXRhc3RvcmUsIE1vZGVsVHlwZSB9IGZyb20gJy4uL3NlcnZpY2VzL2pzb24tYXBpLWRhdGFzdG9yZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTW9kZWxDb25maWcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL21vZGVsLWNvbmZpZy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZU1ldGFkYXRhIH0gZnJvbSAnLi4vY29uc3RhbnRzL3N5bWJvbHMnO1xyXG5pbXBvcnQgeyBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbi8qKlxyXG4gKiBIQUNLL0ZJWE1FOlxyXG4gKiBUeXBlICdzeW1ib2wnIGNhbm5vdCBiZSB1c2VkIGFzIGFuIGluZGV4IHR5cGUuXHJcbiAqIFR5cGVTY3JpcHQgMi45LnhcclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMjQ1ODcuXHJcbiAqL1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxyXG5jb25zdCBBdHRyaWJ1dGVNZXRhZGF0YUluZGV4OiBzdHJpbmcgPSBBdHRyaWJ1dGVNZXRhZGF0YSBhcyBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkFwaU1vZGVsIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIHB1YmxpYyBtb2RlbEluaXRpYWxpemF0aW9uID0gZmFsc2U7XHJcblxyXG4gIFtrZXk6IHN0cmluZ106IGFueTtcclxuXHJcbiAgbGFzdFN5bmNNb2RlbHM6IEFycmF5PGFueT47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW50ZXJuYWxEYXRhc3RvcmU6IEpzb25BcGlEYXRhc3RvcmUsIGRhdGE/OiBhbnkpIHtcclxuICAgIGlmIChkYXRhKSB7XHJcbiAgICAgIHRoaXMubW9kZWxJbml0aWFsaXphdGlvbiA9IHRydWU7XHJcbiAgICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEuYXR0cmlidXRlcyk7XHJcbiAgICAgIHRoaXMubW9kZWxJbml0aWFsaXphdGlvbiA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzTW9kZWxJbml0aWFsaXphdGlvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm1vZGVsSW5pdGlhbGl6YXRpb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3luY1JlbGF0aW9uc2hpcHMoZGF0YTogYW55LCBpbmNsdWRlZDogYW55LCByZW1haW5pbmdNb2RlbHM/OiBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5sYXN0U3luY01vZGVscyA9PT0gaW5jbHVkZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYXRhKSB7XHJcbiAgICAgIGxldCBtb2RlbHNGb3JQcm9jZXNzaW5nID0gcmVtYWluaW5nTW9kZWxzO1xyXG5cclxuICAgICAgaWYgKG1vZGVsc0ZvclByb2Nlc3NpbmcgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG1vZGVsc0ZvclByb2Nlc3NpbmcgPSBbXS5jb25jYXQoaW5jbHVkZWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnBhcnNlSGFzTWFueShkYXRhLCBpbmNsdWRlZCwgbW9kZWxzRm9yUHJvY2Vzc2luZyk7XHJcbiAgICAgIHRoaXMucGFyc2VCZWxvbmdzVG8oZGF0YSwgaW5jbHVkZWQsIG1vZGVsc0ZvclByb2Nlc3NpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGFzdFN5bmNNb2RlbHMgPSBpbmNsdWRlZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzYXZlKHBhcmFtcz86IGFueSwgaGVhZGVycz86IEh0dHBIZWFkZXJzLCBjdXN0b21Vcmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPHRoaXM+IHtcclxuICAgIHRoaXMuY2hlY2tDaGFuZ2VzKCk7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGVzTWV0YWRhdGE6IGFueSA9IHRoaXNbQXR0cmlidXRlTWV0YWRhdGFJbmRleF07XHJcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbERhdGFzdG9yZS5zYXZlUmVjb3JkKGF0dHJpYnV0ZXNNZXRhZGF0YSwgdGhpcywgcGFyYW1zLCBoZWFkZXJzLCBjdXN0b21VcmwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGhhc0RpcnR5QXR0cmlidXRlcygpIHtcclxuICAgIHRoaXMuY2hlY2tDaGFuZ2VzKCk7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGVzTWV0YWRhdGE6IGFueSA9IHRoaXNbQXR0cmlidXRlTWV0YWRhdGFJbmRleF07XHJcbiAgICBsZXQgaGFzRGlydHlBdHRyaWJ1dGVzID0gZmFsc2U7XHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBpbiBhdHRyaWJ1dGVzTWV0YWRhdGEpIHtcclxuICAgICAgaWYgKGF0dHJpYnV0ZXNNZXRhZGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XHJcbiAgICAgICAgY29uc3QgbWV0YWRhdGE6IGFueSA9IGF0dHJpYnV0ZXNNZXRhZGF0YVtwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgIGlmIChtZXRhZGF0YS5oYXNEaXJ0eUF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgIGhhc0RpcnR5QXR0cmlidXRlcyA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBoYXNEaXJ0eUF0dHJpYnV0ZXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoZWNrQ2hhbmdlcygpIHtcclxuICAgIGNvbnN0IGF0dHJpYnV0ZXNNZXRhZGF0YTogYW55ID0gdGhpc1tBdHRyaWJ1dGVNZXRhZGF0YV07XHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBpbiBhdHRyaWJ1dGVzTWV0YWRhdGEpIHtcclxuICAgICAgaWYgKGF0dHJpYnV0ZXNNZXRhZGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XHJcbiAgICAgICAgY29uc3QgbWV0YWRhdGE6IGFueSA9IGF0dHJpYnV0ZXNNZXRhZGF0YVtwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgIGlmIChtZXRhZGF0YS5uZXN0ZWQpIHtcclxuICAgICAgICAgIHRoaXNbQXR0cmlidXRlTWV0YWRhdGFdW3Byb3BlcnR5TmFtZV0uaGFzRGlydHlBdHRyaWJ1dGVzID0gIV8uaXNFcXVhbChcclxuICAgICAgICAgICAgYXR0cmlidXRlc01ldGFkYXRhW3Byb3BlcnR5TmFtZV0ub2xkVmFsdWUsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXNNZXRhZGF0YVtwcm9wZXJ0eU5hbWVdLm5ld1ZhbHVlXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpc1tBdHRyaWJ1dGVNZXRhZGF0YV1bcHJvcGVydHlOYW1lXS5zZXJpYWxpc2F0aW9uVmFsdWUgPSBhdHRyaWJ1dGVzTWV0YWRhdGFbcHJvcGVydHlOYW1lXS5jb252ZXJ0ZXIoXHJcbiAgICAgICAgICAgIFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgdGhpcywgcHJvcGVydHlOYW1lKSxcclxuICAgICAgICAgICAgXy5jbG9uZURlZXAoYXR0cmlidXRlc01ldGFkYXRhW3Byb3BlcnR5TmFtZV0ubmV3VmFsdWUpLFxyXG4gICAgICAgICAgICB0cnVlXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJvbGxiYWNrQXR0cmlidXRlcygpOiB2b2lkIHtcclxuICAgIGNvbnN0IGF0dHJpYnV0ZXNNZXRhZGF0YTogYW55ID0gdGhpc1tBdHRyaWJ1dGVNZXRhZGF0YUluZGV4XTtcclxuICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIGluIGF0dHJpYnV0ZXNNZXRhZGF0YSkge1xyXG4gICAgICBpZiAoYXR0cmlidXRlc01ldGFkYXRhLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcclxuICAgICAgICBpZiAoYXR0cmlidXRlc01ldGFkYXRhW3Byb3BlcnR5TmFtZV0uaGFzRGlydHlBdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBfLmNsb25lRGVlcChhdHRyaWJ1dGVzTWV0YWRhdGFbcHJvcGVydHlOYW1lXS5vbGRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgbW9kZWxDb25maWcoKTogTW9kZWxDb25maWcge1xyXG4gICAgcmV0dXJuIFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0pzb25BcGlNb2RlbENvbmZpZycsIHRoaXMuY29uc3RydWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZUhhc01hbnkoZGF0YTogYW55LCBpbmNsdWRlZDogYW55LCByZW1haW5pbmdNb2RlbHM6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGNvbnN0IGhhc01hbnk6IGFueSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0hhc01hbnknLCB0aGlzKTtcclxuXHJcbiAgICBpZiAoaGFzTWFueSkge1xyXG4gICAgICBmb3IgKGNvbnN0IG1ldGFkYXRhIG9mIGhhc01hbnkpIHtcclxuICAgICAgICBjb25zdCByZWxhdGlvbnNoaXA6IGFueSA9IGRhdGEucmVsYXRpb25zaGlwcyA/IGRhdGEucmVsYXRpb25zaGlwc1ttZXRhZGF0YS5yZWxhdGlvbnNoaXBdIDogbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHJlbGF0aW9uc2hpcCAmJiByZWxhdGlvbnNoaXAuZGF0YSAmJiBBcnJheS5pc0FycmF5KHJlbGF0aW9uc2hpcC5kYXRhKSkge1xyXG4gICAgICAgICAgbGV0IGFsbE1vZGVsczogSnNvbkFwaU1vZGVsW10gPSBbXTtcclxuICAgICAgICAgIGNvbnN0IG1vZGVsVHlwZXNGZXRjaGVkOiBhbnkgPSBbXTtcclxuXHJcbiAgICAgICAgICBmb3IgKGNvbnN0IHR5cGVJbmRleCBvZiBPYmplY3Qua2V5cyhyZWxhdGlvbnNoaXAuZGF0YSkpIHtcclxuICAgICAgICAgICAgY29uc3QgdHlwZU5hbWU6IHN0cmluZyA9IHJlbGF0aW9uc2hpcC5kYXRhW3R5cGVJbmRleF0udHlwZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaW5jbHVkZXMobW9kZWxUeXBlc0ZldGNoZWQsIHR5cGVOYW1lKSkge1xyXG4gICAgICAgICAgICAgIG1vZGVsVHlwZXNGZXRjaGVkLnB1c2godHlwZU5hbWUpO1xyXG4gICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgICAgICAgICAgICBjb25zdCBtb2RlbFR5cGU6IE1vZGVsVHlwZTx0aGlzPiA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0pzb25BcGlEYXRhc3RvcmVDb25maWcnLCB0aGlzLmludGVybmFsRGF0YXN0b3JlLmNvbnN0cnVjdG9yKS5tb2RlbHNbdHlwZU5hbWVdO1xyXG5cclxuICAgICAgICAgICAgICBpZiAobW9kZWxUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWxhdGlvbnNoaXBNb2RlbHM6IEpzb25BcGlNb2RlbFtdID0gdGhpcy5nZXRIYXNNYW55UmVsYXRpb25zaGlwKFxyXG4gICAgICAgICAgICAgICAgICBtb2RlbFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgIHJlbGF0aW9uc2hpcC5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICBpbmNsdWRlZCxcclxuICAgICAgICAgICAgICAgICAgdHlwZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgIHJlbWFpbmluZ01vZGVsc1xyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVsYXRpb25zaGlwTW9kZWxzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgYWxsTW9kZWxzID0gYWxsTW9kZWxzLmNvbmNhdChyZWxhdGlvbnNoaXBNb2RlbHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB7bWVzc2FnZTogYHBhcnNlSGFzTWFueSAtIE1vZGVsIHR5cGUgZm9yIHJlbGF0aW9uc2hpcCAke3R5cGVOYW1lfSBub3QgZm91bmQuYH07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpc1ttZXRhZGF0YS5wcm9wZXJ0eU5hbWVdID0gYWxsTW9kZWxzO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZUJlbG9uZ3NUbyhkYXRhOiBhbnksIGluY2x1ZGVkOiBBcnJheTxhbnk+LCByZW1haW5pbmdNb2RlbHM6IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGNvbnN0IGJlbG9uZ3NUbzogYW55ID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnQmVsb25nc1RvJywgdGhpcyk7XHJcblxyXG4gICAgaWYgKGJlbG9uZ3NUbykge1xyXG4gICAgICBmb3IgKGNvbnN0IG1ldGFkYXRhIG9mIGJlbG9uZ3NUbykge1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aW9uc2hpcDogYW55ID0gZGF0YS5yZWxhdGlvbnNoaXBzID8gZGF0YS5yZWxhdGlvbnNoaXBzW21ldGFkYXRhLnJlbGF0aW9uc2hpcF0gOiBudWxsO1xyXG4gICAgICAgIGlmIChyZWxhdGlvbnNoaXAgJiYgcmVsYXRpb25zaGlwLmRhdGEpIHtcclxuICAgICAgICAgIGNvbnN0IGRhdGFSZWxhdGlvbnNoaXA6IGFueSA9IChyZWxhdGlvbnNoaXAuZGF0YSBpbnN0YW5jZW9mIEFycmF5KSA/IHJlbGF0aW9uc2hpcC5kYXRhWzBdIDogcmVsYXRpb25zaGlwLmRhdGE7XHJcbiAgICAgICAgICBpZiAoZGF0YVJlbGF0aW9uc2hpcCkge1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlTmFtZTogc3RyaW5nID0gZGF0YVJlbGF0aW9uc2hpcC50eXBlO1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsVHlwZTogTW9kZWxUeXBlPHRoaXM+ID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaURhdGFzdG9yZUNvbmZpZycsIHRoaXMuaW50ZXJuYWxEYXRhc3RvcmUuY29uc3RydWN0b3IpLm1vZGVsc1t0eXBlTmFtZV07XHJcblxyXG4gICAgICAgICAgICBpZiAobW9kZWxUeXBlKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgcmVsYXRpb25zaGlwTW9kZWwgPSB0aGlzLmdldEJlbG9uZ3NUb1JlbGF0aW9uc2hpcChcclxuICAgICAgICAgICAgICAgIG1vZGVsVHlwZSxcclxuICAgICAgICAgICAgICAgIGRhdGFSZWxhdGlvbnNoaXAsXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlZCxcclxuICAgICAgICAgICAgICAgIHR5cGVOYW1lLFxyXG4gICAgICAgICAgICAgICAgcmVtYWluaW5nTW9kZWxzXHJcbiAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHJlbGF0aW9uc2hpcE1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW21ldGFkYXRhLnByb3BlcnR5TmFtZV0gPSByZWxhdGlvbnNoaXBNb2RlbDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cge21lc3NhZ2U6IGBwYXJzZUJlbG9uZ3NUbyAtIE1vZGVsIHR5cGUgZm9yIHJlbGF0aW9uc2hpcCAke3R5cGVOYW1lfSBub3QgZm91bmQuYH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0SGFzTWFueVJlbGF0aW9uc2hpcDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgZGF0YTogYW55LFxyXG4gICAgaW5jbHVkZWQ6IGFueSxcclxuICAgIHR5cGVOYW1lOiBzdHJpbmcsXHJcbiAgICByZW1haW5pbmdNb2RlbHM6IEFycmF5PGFueT5cclxuICApOiBBcnJheTxUPiB7XHJcbiAgICBjb25zdCByZWxhdGlvbnNoaXBMaXN0OiBBcnJheTxUPiA9IFtdO1xyXG5cclxuICAgIGRhdGEuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlbGF0aW9uc2hpcERhdGE6IGFueSA9IGZpbmQoaW5jbHVkZWQsIHtpZDogaXRlbS5pZCwgdHlwZTogdHlwZU5hbWV9IGFzIGFueSk7XHJcblxyXG4gICAgICBpZiAocmVsYXRpb25zaGlwRGF0YSkge1xyXG4gICAgICAgIGNvbnN0IG5ld09iamVjdDogVCA9IHRoaXMuY3JlYXRlT3JQZWVrKG1vZGVsVHlwZSwgcmVsYXRpb25zaGlwRGF0YSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGluZGV4T2ZOZXdseUZvdW5kTW9kZWwgPSByZW1haW5pbmdNb2RlbHMuaW5kZXhPZihyZWxhdGlvbnNoaXBEYXRhKTtcclxuICAgICAgICBjb25zdCBtb2RlbHNGb3JQcm9jZXNzaW5nID0gcmVtYWluaW5nTW9kZWxzLmNvbmNhdChbXSk7XHJcblxyXG4gICAgICAgIGlmIChpbmRleE9mTmV3bHlGb3VuZE1vZGVsICE9PSAtMSkge1xyXG4gICAgICAgICAgbW9kZWxzRm9yUHJvY2Vzc2luZy5zcGxpY2UoaW5kZXhPZk5ld2x5Rm91bmRNb2RlbCwgMSk7XHJcbiAgICAgICAgICBuZXdPYmplY3Quc3luY1JlbGF0aW9uc2hpcHMocmVsYXRpb25zaGlwRGF0YSwgaW5jbHVkZWQsIG1vZGVsc0ZvclByb2Nlc3NpbmcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVsYXRpb25zaGlwTGlzdC5wdXNoKG5ld09iamVjdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZWxhdGlvbnNoaXBMaXN0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRCZWxvbmdzVG9SZWxhdGlvbnNoaXA8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oXHJcbiAgICBtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPixcclxuICAgIGRhdGE6IGFueSxcclxuICAgIGluY2x1ZGVkOiBBcnJheTxhbnk+LFxyXG4gICAgdHlwZU5hbWU6IHN0cmluZyxcclxuICAgIHJlbWFpbmluZ01vZGVsczogQXJyYXk8YW55PlxyXG4gICk6IFQgfCBudWxsIHtcclxuICAgIGNvbnN0IGlkOiBzdHJpbmcgPSBkYXRhLmlkO1xyXG5cclxuICAgIGNvbnN0IHJlbGF0aW9uc2hpcERhdGE6IGFueSA9IGZpbmQoaW5jbHVkZWQsIHtpZCwgdHlwZTogdHlwZU5hbWV9IGFzIGFueSk7XHJcblxyXG4gICAgaWYgKHJlbGF0aW9uc2hpcERhdGEpIHtcclxuICAgICAgY29uc3QgbmV3T2JqZWN0OiBUID0gdGhpcy5jcmVhdGVPclBlZWsobW9kZWxUeXBlLCByZWxhdGlvbnNoaXBEYXRhKTtcclxuXHJcbiAgICAgIGNvbnN0IGluZGV4T2ZOZXdseUZvdW5kTW9kZWwgPSByZW1haW5pbmdNb2RlbHMuaW5kZXhPZihyZWxhdGlvbnNoaXBEYXRhKTtcclxuICAgICAgY29uc3QgbW9kZWxzRm9yUHJvY2Vzc2luZyA9IHJlbWFpbmluZ01vZGVscy5jb25jYXQoW10pO1xyXG5cclxuICAgICAgaWYgKGluZGV4T2ZOZXdseUZvdW5kTW9kZWwgIT09IC0xKSB7XHJcbiAgICAgICAgbW9kZWxzRm9yUHJvY2Vzc2luZy5zcGxpY2UoaW5kZXhPZk5ld2x5Rm91bmRNb2RlbCwgMSk7XHJcbiAgICAgICAgbmV3T2JqZWN0LnN5bmNSZWxhdGlvbnNoaXBzKHJlbGF0aW9uc2hpcERhdGEsIGluY2x1ZGVkLCBtb2RlbHNGb3JQcm9jZXNzaW5nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ld09iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbERhdGFzdG9yZS5wZWVrUmVjb3JkKG1vZGVsVHlwZSwgaWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVPclBlZWs8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4obW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sIGRhdGE6IGFueSk6IFQge1xyXG4gICAgY29uc3QgcGVlayA9IHRoaXMuaW50ZXJuYWxEYXRhc3RvcmUucGVla1JlY29yZChtb2RlbFR5cGUsIGRhdGEuaWQpO1xyXG5cclxuICAgIGlmIChwZWVrKSB7XHJcbiAgICAgIF8uZXh0ZW5kKHBlZWssIHRoaXMuaW50ZXJuYWxEYXRhc3RvcmUudHJhbnNmb3JtU2VyaWFsaXplZE5hbWVzVG9Qcm9wZXJ0eU5hbWVzKG1vZGVsVHlwZSwgZGF0YS5hdHRyaWJ1dGVzKSk7XHJcbiAgICAgIHJldHVybiBwZWVrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld09iamVjdDogVCA9IHRoaXMuaW50ZXJuYWxEYXRhc3RvcmUuZGVzZXJpYWxpemVNb2RlbChtb2RlbFR5cGUsIGRhdGEpO1xyXG4gICAgdGhpcy5pbnRlcm5hbERhdGFzdG9yZS5hZGRUb1N0b3JlKG5ld09iamVjdCk7XHJcblxyXG4gICAgcmV0dXJuIG5ld09iamVjdDtcclxuICB9XHJcbn1cclxuIl19