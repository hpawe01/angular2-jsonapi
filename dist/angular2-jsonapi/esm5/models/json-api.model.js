/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
                    this[AttributeMetadata][propertyName].hasDirtyAttributes = !_.isEqual(attributesMetadata[propertyName].oldValue, attributesMetadata[propertyName].newValue);
                    this[AttributeMetadata][propertyName].serialisationValue = attributesMetadata[propertyName].converter(Reflect.getMetadata('design:type', this, propertyName), _.cloneDeep(attributesMetadata[propertyName].newValue), true);
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
                    this[propertyName] = _.cloneDeep(attributesMetadata[propertyName].oldValue);
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
                for (var hasMany_1 = tslib_1.__values(hasMany), hasMany_1_1 = hasMany_1.next(); !hasMany_1_1.done; hasMany_1_1 = hasMany_1.next()) {
                    var metadata = hasMany_1_1.value;
                    /** @type {?} */
                    var relationship = data.relationships ? data.relationships[metadata.relationship] : null;
                    if (relationship && relationship.data && Array.isArray(relationship.data)) {
                        /** @type {?} */
                        var allModels = [];
                        /** @type {?} */
                        var modelTypesFetched = [];
                        try {
                            for (var _c = (e_2 = void 0, tslib_1.__values(Object.keys(relationship.data))), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var typeIndex = _d.value;
                                /** @type {?} */
                                var typeName = relationship.data[typeIndex].type;
                                if (!includes(modelTypesFetched, typeName)) {
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
                for (var belongsTo_1 = tslib_1.__values(belongsTo), belongsTo_1_1 = belongsTo_1.next(); !belongsTo_1_1.done; belongsTo_1_1 = belongsTo_1.next()) {
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
            var relationshipData = find(included, (/** @type {?} */ ({ id: item.id, type: typeName })));
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
        var relationshipData = find(included, (/** @type {?} */ ({ id: id, type: typeName })));
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
            _.extend(peek, this.internalDatastore.transformSerializedNamesToPropertyNames(modelType, data.attributes));
            return peek;
        }
        /** @type {?} */
        var newObject = this.internalDatastore.deserializeModel(modelType, data);
        this.internalDatastore.addToStore(newObject);
        return newObject;
    };
    return JsonApiModel;
}());
export { JsonApiModel };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1hcGkubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsibW9kZWxzL2pzb24tYXBpLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxJQUFJLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEMsT0FBTyxRQUFRLE1BQU0sb0JBQW9CLENBQUM7QUFJMUMsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7OztJQVVuRCxzQkFBc0IsR0FBVyxtQkFBQSxpQkFBaUIsRUFBTztBQUUvRDtJQVFFLHNCQUFvQixpQkFBbUMsRUFBRSxJQUFVO1FBQS9DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFOaEQsd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBT2pDLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUNoQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7O0lBRU0sNENBQXFCOzs7SUFBNUI7UUFDRSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7O0lBRU0sd0NBQWlCOzs7Ozs7SUFBeEIsVUFBeUIsSUFBUyxFQUFFLFFBQWEsRUFBRSxlQUE0QjtRQUM3RSxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssUUFBUSxFQUFFO1lBQ3BDLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxFQUFFOztnQkFDSixtQkFBbUIsR0FBRyxlQUFlO1lBRXpDLElBQUksbUJBQW1CLEtBQUss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QUMsQ0FBQztnQkFDdEQsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2FBQzlFO1lBRUQsT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFFRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7Ozs7O0lBRU8sbUNBQVk7Ozs7Ozs7SUFBcEIsVUFBNkMsU0FBdUIsRUFBRSxJQUFTOztZQUN2RSxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUVsRSxJQUFJLElBQUksRUFBRTtZQUNSLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1Q0FBdUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0csT0FBTyxJQUFJLENBQUM7U0FDYjs7WUFFSyxTQUFTLEdBQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7UUFDN0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU3QyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBclBELElBcVBDOzs7O0lBcFBDLDBCQUFXOztJQUNYLDJDQUFtQzs7SUFJbkMsc0NBQTJCOzs7OztJQUVmLHlDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaW5kIGZyb20gJ2xvZGFzaC1lcy9maW5kJztcclxuaW1wb3J0IGluY2x1ZGVzIGZyb20gJ2xvZGFzaC1lcy9pbmNsdWRlcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSnNvbkFwaURhdGFzdG9yZSwgTW9kZWxUeXBlIH0gZnJvbSAnLi4vc2VydmljZXMvanNvbi1hcGktZGF0YXN0b3JlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNb2RlbENvbmZpZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvbW9kZWwtY29uZmlnLmludGVyZmFjZSc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgQXR0cmlidXRlTWV0YWRhdGEgfSBmcm9tICcuLi9jb25zdGFudHMvc3ltYm9scyc7XHJcbmltcG9ydCB7IEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuLyoqXHJcbiAqIEhBQ0svRklYTUU6XHJcbiAqIFR5cGUgJ3N5bWJvbCcgY2Fubm90IGJlIHVzZWQgYXMgYW4gaW5kZXggdHlwZS5cclxuICogVHlwZVNjcmlwdCAyLjkueFxyXG4gKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8yNDU4Ny5cclxuICovXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXHJcbmNvbnN0IEF0dHJpYnV0ZU1ldGFkYXRhSW5kZXg6IHN0cmluZyA9IEF0dHJpYnV0ZU1ldGFkYXRhIGFzIGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uQXBpTW9kZWwge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIG1vZGVsSW5pdGlhbGl6YXRpb24gPSBmYWxzZTtcclxuXHJcbiAgW2tleTogc3RyaW5nXTogYW55O1xyXG5cclxuICBsYXN0U3luY01vZGVsczogQXJyYXk8YW55PjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbnRlcm5hbERhdGFzdG9yZTogSnNvbkFwaURhdGFzdG9yZSwgZGF0YT86IGFueSkge1xyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgdGhpcy5tb2RlbEluaXRpYWxpemF0aW9uID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YS5hdHRyaWJ1dGVzKTtcclxuICAgICAgdGhpcy5tb2RlbEluaXRpYWxpemF0aW9uID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNNb2RlbEluaXRpYWxpemF0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZWxJbml0aWFsaXphdGlvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzeW5jUmVsYXRpb25zaGlwcyhkYXRhOiBhbnksIGluY2x1ZGVkOiBhbnksIHJlbWFpbmluZ01vZGVscz86IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmxhc3RTeW5jTW9kZWxzID09PSBpbmNsdWRlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgbGV0IG1vZGVsc0ZvclByb2Nlc3NpbmcgPSByZW1haW5pbmdNb2RlbHM7XHJcblxyXG4gICAgICBpZiAobW9kZWxzRm9yUHJvY2Vzc2luZyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbW9kZWxzRm9yUHJvY2Vzc2luZyA9IFtdLmNvbmNhdChpbmNsdWRlZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucGFyc2VIYXNNYW55KGRhdGEsIGluY2x1ZGVkLCBtb2RlbHNGb3JQcm9jZXNzaW5nKTtcclxuICAgICAgdGhpcy5wYXJzZUJlbG9uZ3NUbyhkYXRhLCBpbmNsdWRlZCwgbW9kZWxzRm9yUHJvY2Vzc2luZyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sYXN0U3luY01vZGVscyA9IGluY2x1ZGVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNhdmUocGFyYW1zPzogYW55LCBoZWFkZXJzPzogSHR0cEhlYWRlcnMsIGN1c3RvbVVybD86IHN0cmluZyk6IE9ic2VydmFibGU8dGhpcz4ge1xyXG4gICAgdGhpcy5jaGVja0NoYW5nZXMoKTtcclxuICAgIGNvbnN0IGF0dHJpYnV0ZXNNZXRhZGF0YTogYW55ID0gdGhpc1tBdHRyaWJ1dGVNZXRhZGF0YUluZGV4XTtcclxuICAgIHJldHVybiB0aGlzLmludGVybmFsRGF0YXN0b3JlLnNhdmVSZWNvcmQoYXR0cmlidXRlc01ldGFkYXRhLCB0aGlzLCBwYXJhbXMsIGhlYWRlcnMsIGN1c3RvbVVybCk7XHJcbiAgfVxyXG5cclxuICBnZXQgaGFzRGlydHlBdHRyaWJ1dGVzKCkge1xyXG4gICAgdGhpcy5jaGVja0NoYW5nZXMoKTtcclxuICAgIGNvbnN0IGF0dHJpYnV0ZXNNZXRhZGF0YTogYW55ID0gdGhpc1tBdHRyaWJ1dGVNZXRhZGF0YUluZGV4XTtcclxuICAgIGxldCBoYXNEaXJ0eUF0dHJpYnV0ZXMgPSBmYWxzZTtcclxuICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIGluIGF0dHJpYnV0ZXNNZXRhZGF0YSkge1xyXG4gICAgICBpZiAoYXR0cmlidXRlc01ldGFkYXRhLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcclxuICAgICAgICBjb25zdCBtZXRhZGF0YTogYW55ID0gYXR0cmlidXRlc01ldGFkYXRhW3Byb3BlcnR5TmFtZV07XHJcbiAgICAgICAgaWYgKG1ldGFkYXRhLmhhc0RpcnR5QXR0cmlidXRlcykge1xyXG4gICAgICAgICAgaGFzRGlydHlBdHRyaWJ1dGVzID0gdHJ1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhhc0RpcnR5QXR0cmlidXRlcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hlY2tDaGFuZ2VzKCkge1xyXG4gICAgY29uc3QgYXR0cmlidXRlc01ldGFkYXRhOiBhbnkgPSB0aGlzW0F0dHJpYnV0ZU1ldGFkYXRhXTtcclxuICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIGluIGF0dHJpYnV0ZXNNZXRhZGF0YSkge1xyXG4gICAgICBpZiAoYXR0cmlidXRlc01ldGFkYXRhLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcclxuICAgICAgICBjb25zdCBtZXRhZGF0YTogYW55ID0gYXR0cmlidXRlc01ldGFkYXRhW3Byb3BlcnR5TmFtZV07XHJcbiAgICAgICAgaWYgKG1ldGFkYXRhLm5lc3RlZCkge1xyXG4gICAgICAgICAgdGhpc1tBdHRyaWJ1dGVNZXRhZGF0YV1bcHJvcGVydHlOYW1lXS5oYXNEaXJ0eUF0dHJpYnV0ZXMgPSAhXy5pc0VxdWFsKFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzTWV0YWRhdGFbcHJvcGVydHlOYW1lXS5vbGRWYWx1ZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlc01ldGFkYXRhW3Byb3BlcnR5TmFtZV0ubmV3VmFsdWVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzW0F0dHJpYnV0ZU1ldGFkYXRhXVtwcm9wZXJ0eU5hbWVdLnNlcmlhbGlzYXRpb25WYWx1ZSA9IGF0dHJpYnV0ZXNNZXRhZGF0YVtwcm9wZXJ0eU5hbWVdLmNvbnZlcnRlcihcclxuICAgICAgICAgICAgUmVmbGVjdC5nZXRNZXRhZGF0YSgnZGVzaWduOnR5cGUnLCB0aGlzLCBwcm9wZXJ0eU5hbWUpLFxyXG4gICAgICAgICAgICBfLmNsb25lRGVlcChhdHRyaWJ1dGVzTWV0YWRhdGFbcHJvcGVydHlOYW1lXS5uZXdWYWx1ZSksXHJcbiAgICAgICAgICAgIHRydWVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcm9sbGJhY2tBdHRyaWJ1dGVzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgYXR0cmlidXRlc01ldGFkYXRhOiBhbnkgPSB0aGlzW0F0dHJpYnV0ZU1ldGFkYXRhSW5kZXhdO1xyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgaW4gYXR0cmlidXRlc01ldGFkYXRhKSB7XHJcbiAgICAgIGlmIChhdHRyaWJ1dGVzTWV0YWRhdGEuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xyXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzTWV0YWRhdGFbcHJvcGVydHlOYW1lXS5oYXNEaXJ0eUF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IF8uY2xvbmVEZWVwKGF0dHJpYnV0ZXNNZXRhZGF0YVtwcm9wZXJ0eU5hbWVdLm9sZFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBtb2RlbENvbmZpZygpOiBNb2RlbENvbmZpZyB7XHJcbiAgICByZXR1cm4gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaU1vZGVsQ29uZmlnJywgdGhpcy5jb25zdHJ1Y3Rvcik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlSGFzTWFueShkYXRhOiBhbnksIGluY2x1ZGVkOiBhbnksIHJlbWFpbmluZ01vZGVsczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgY29uc3QgaGFzTWFueTogYW55ID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSGFzTWFueScsIHRoaXMpO1xyXG5cclxuICAgIGlmIChoYXNNYW55KSB7XHJcbiAgICAgIGZvciAoY29uc3QgbWV0YWRhdGEgb2YgaGFzTWFueSkge1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aW9uc2hpcDogYW55ID0gZGF0YS5yZWxhdGlvbnNoaXBzID8gZGF0YS5yZWxhdGlvbnNoaXBzW21ldGFkYXRhLnJlbGF0aW9uc2hpcF0gOiBudWxsO1xyXG5cclxuICAgICAgICBpZiAocmVsYXRpb25zaGlwICYmIHJlbGF0aW9uc2hpcC5kYXRhICYmIEFycmF5LmlzQXJyYXkocmVsYXRpb25zaGlwLmRhdGEpKSB7XHJcbiAgICAgICAgICBsZXQgYWxsTW9kZWxzOiBKc29uQXBpTW9kZWxbXSA9IFtdO1xyXG4gICAgICAgICAgY29uc3QgbW9kZWxUeXBlc0ZldGNoZWQ6IGFueSA9IFtdO1xyXG5cclxuICAgICAgICAgIGZvciAoY29uc3QgdHlwZUluZGV4IG9mIE9iamVjdC5rZXlzKHJlbGF0aW9uc2hpcC5kYXRhKSkge1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlTmFtZTogc3RyaW5nID0gcmVsYXRpb25zaGlwLmRhdGFbdHlwZUluZGV4XS50eXBlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpbmNsdWRlcyhtb2RlbFR5cGVzRmV0Y2hlZCwgdHlwZU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgbW9kZWxUeXBlc0ZldGNoZWQucHVzaCh0eXBlTmFtZSk7XHJcbiAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgICAgICAgICAgIGNvbnN0IG1vZGVsVHlwZTogTW9kZWxUeXBlPHRoaXM+ID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaURhdGFzdG9yZUNvbmZpZycsIHRoaXMuaW50ZXJuYWxEYXRhc3RvcmUuY29uc3RydWN0b3IpLm1vZGVsc1t0eXBlTmFtZV07XHJcblxyXG4gICAgICAgICAgICAgIGlmIChtb2RlbFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbGF0aW9uc2hpcE1vZGVsczogSnNvbkFwaU1vZGVsW10gPSB0aGlzLmdldEhhc01hbnlSZWxhdGlvbnNoaXAoXHJcbiAgICAgICAgICAgICAgICAgIG1vZGVsVHlwZSxcclxuICAgICAgICAgICAgICAgICAgcmVsYXRpb25zaGlwLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgIGluY2x1ZGVkLFxyXG4gICAgICAgICAgICAgICAgICB0eXBlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgcmVtYWluaW5nTW9kZWxzXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZWxhdGlvbnNoaXBNb2RlbHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICBhbGxNb2RlbHMgPSBhbGxNb2RlbHMuY29uY2F0KHJlbGF0aW9uc2hpcE1vZGVscyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IHttZXNzYWdlOiBgcGFyc2VIYXNNYW55IC0gTW9kZWwgdHlwZSBmb3IgcmVsYXRpb25zaGlwICR7dHlwZU5hbWV9IG5vdCBmb3VuZC5gfTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzW21ldGFkYXRhLnByb3BlcnR5TmFtZV0gPSBhbGxNb2RlbHM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlQmVsb25nc1RvKGRhdGE6IGFueSwgaW5jbHVkZWQ6IEFycmF5PGFueT4sIHJlbWFpbmluZ01vZGVsczogQXJyYXk8YW55Pik6IHZvaWQge1xyXG4gICAgY29uc3QgYmVsb25nc1RvOiBhbnkgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdCZWxvbmdzVG8nLCB0aGlzKTtcclxuXHJcbiAgICBpZiAoYmVsb25nc1RvKSB7XHJcbiAgICAgIGZvciAoY29uc3QgbWV0YWRhdGEgb2YgYmVsb25nc1RvKSB7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpb25zaGlwOiBhbnkgPSBkYXRhLnJlbGF0aW9uc2hpcHMgPyBkYXRhLnJlbGF0aW9uc2hpcHNbbWV0YWRhdGEucmVsYXRpb25zaGlwXSA6IG51bGw7XHJcbiAgICAgICAgaWYgKHJlbGF0aW9uc2hpcCAmJiByZWxhdGlvbnNoaXAuZGF0YSkge1xyXG4gICAgICAgICAgY29uc3QgZGF0YVJlbGF0aW9uc2hpcDogYW55ID0gKHJlbGF0aW9uc2hpcC5kYXRhIGluc3RhbmNlb2YgQXJyYXkpID8gcmVsYXRpb25zaGlwLmRhdGFbMF0gOiByZWxhdGlvbnNoaXAuZGF0YTtcclxuICAgICAgICAgIGlmIChkYXRhUmVsYXRpb25zaGlwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGVOYW1lOiBzdHJpbmcgPSBkYXRhUmVsYXRpb25zaGlwLnR5cGU7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgICAgICAgICAgY29uc3QgbW9kZWxUeXBlOiBNb2RlbFR5cGU8dGhpcz4gPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpRGF0YXN0b3JlQ29uZmlnJywgdGhpcy5pbnRlcm5hbERhdGFzdG9yZS5jb25zdHJ1Y3RvcikubW9kZWxzW3R5cGVOYW1lXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtb2RlbFR5cGUpIHtcclxuICAgICAgICAgICAgICBjb25zdCByZWxhdGlvbnNoaXBNb2RlbCA9IHRoaXMuZ2V0QmVsb25nc1RvUmVsYXRpb25zaGlwKFxyXG4gICAgICAgICAgICAgICAgbW9kZWxUeXBlLFxyXG4gICAgICAgICAgICAgICAgZGF0YVJlbGF0aW9uc2hpcCxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGVkLFxyXG4gICAgICAgICAgICAgICAgdHlwZU5hbWUsXHJcbiAgICAgICAgICAgICAgICByZW1haW5pbmdNb2RlbHNcclxuICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICBpZiAocmVsYXRpb25zaGlwTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbbWV0YWRhdGEucHJvcGVydHlOYW1lXSA9IHJlbGF0aW9uc2hpcE1vZGVsO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aHJvdyB7bWVzc2FnZTogYHBhcnNlQmVsb25nc1RvIC0gTW9kZWwgdHlwZSBmb3IgcmVsYXRpb25zaGlwICR7dHlwZU5hbWV9IG5vdCBmb3VuZC5gfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRIYXNNYW55UmVsYXRpb25zaGlwPFQgZXh0ZW5kcyBKc29uQXBpTW9kZWw+KFxyXG4gICAgbW9kZWxUeXBlOiBNb2RlbFR5cGU8VD4sXHJcbiAgICBkYXRhOiBhbnksXHJcbiAgICBpbmNsdWRlZDogYW55LFxyXG4gICAgdHlwZU5hbWU6IHN0cmluZyxcclxuICAgIHJlbWFpbmluZ01vZGVsczogQXJyYXk8YW55PlxyXG4gICk6IEFycmF5PFQ+IHtcclxuICAgIGNvbnN0IHJlbGF0aW9uc2hpcExpc3Q6IEFycmF5PFQ+ID0gW107XHJcblxyXG4gICAgZGF0YS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgcmVsYXRpb25zaGlwRGF0YTogYW55ID0gZmluZChpbmNsdWRlZCwge2lkOiBpdGVtLmlkLCB0eXBlOiB0eXBlTmFtZX0gYXMgYW55KTtcclxuXHJcbiAgICAgIGlmIChyZWxhdGlvbnNoaXBEYXRhKSB7XHJcbiAgICAgICAgY29uc3QgbmV3T2JqZWN0OiBUID0gdGhpcy5jcmVhdGVPclBlZWsobW9kZWxUeXBlLCByZWxhdGlvbnNoaXBEYXRhKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5kZXhPZk5ld2x5Rm91bmRNb2RlbCA9IHJlbWFpbmluZ01vZGVscy5pbmRleE9mKHJlbGF0aW9uc2hpcERhdGEpO1xyXG4gICAgICAgIGNvbnN0IG1vZGVsc0ZvclByb2Nlc3NpbmcgPSByZW1haW5pbmdNb2RlbHMuY29uY2F0KFtdKTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4T2ZOZXdseUZvdW5kTW9kZWwgIT09IC0xKSB7XHJcbiAgICAgICAgICBtb2RlbHNGb3JQcm9jZXNzaW5nLnNwbGljZShpbmRleE9mTmV3bHlGb3VuZE1vZGVsLCAxKTtcclxuICAgICAgICAgIG5ld09iamVjdC5zeW5jUmVsYXRpb25zaGlwcyhyZWxhdGlvbnNoaXBEYXRhLCBpbmNsdWRlZCwgbW9kZWxzRm9yUHJvY2Vzc2luZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZWxhdGlvbnNoaXBMaXN0LnB1c2gobmV3T2JqZWN0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlbGF0aW9uc2hpcExpc3Q7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEJlbG9uZ3NUb1JlbGF0aW9uc2hpcDxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihcclxuICAgIG1vZGVsVHlwZTogTW9kZWxUeXBlPFQ+LFxyXG4gICAgZGF0YTogYW55LFxyXG4gICAgaW5jbHVkZWQ6IEFycmF5PGFueT4sXHJcbiAgICB0eXBlTmFtZTogc3RyaW5nLFxyXG4gICAgcmVtYWluaW5nTW9kZWxzOiBBcnJheTxhbnk+XHJcbiAgKTogVCB8IG51bGwge1xyXG4gICAgY29uc3QgaWQ6IHN0cmluZyA9IGRhdGEuaWQ7XHJcblxyXG4gICAgY29uc3QgcmVsYXRpb25zaGlwRGF0YTogYW55ID0gZmluZChpbmNsdWRlZCwge2lkLCB0eXBlOiB0eXBlTmFtZX0gYXMgYW55KTtcclxuXHJcbiAgICBpZiAocmVsYXRpb25zaGlwRGF0YSkge1xyXG4gICAgICBjb25zdCBuZXdPYmplY3Q6IFQgPSB0aGlzLmNyZWF0ZU9yUGVlayhtb2RlbFR5cGUsIHJlbGF0aW9uc2hpcERhdGEpO1xyXG5cclxuICAgICAgY29uc3QgaW5kZXhPZk5ld2x5Rm91bmRNb2RlbCA9IHJlbWFpbmluZ01vZGVscy5pbmRleE9mKHJlbGF0aW9uc2hpcERhdGEpO1xyXG4gICAgICBjb25zdCBtb2RlbHNGb3JQcm9jZXNzaW5nID0gcmVtYWluaW5nTW9kZWxzLmNvbmNhdChbXSk7XHJcblxyXG4gICAgICBpZiAoaW5kZXhPZk5ld2x5Rm91bmRNb2RlbCAhPT0gLTEpIHtcclxuICAgICAgICBtb2RlbHNGb3JQcm9jZXNzaW5nLnNwbGljZShpbmRleE9mTmV3bHlGb3VuZE1vZGVsLCAxKTtcclxuICAgICAgICBuZXdPYmplY3Quc3luY1JlbGF0aW9uc2hpcHMocmVsYXRpb25zaGlwRGF0YSwgaW5jbHVkZWQsIG1vZGVsc0ZvclByb2Nlc3NpbmcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3T2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmludGVybmFsRGF0YXN0b3JlLnBlZWtSZWNvcmQobW9kZWxUeXBlLCBpZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZU9yUGVlazxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPihtb2RlbFR5cGU6IE1vZGVsVHlwZTxUPiwgZGF0YTogYW55KTogVCB7XHJcbiAgICBjb25zdCBwZWVrID0gdGhpcy5pbnRlcm5hbERhdGFzdG9yZS5wZWVrUmVjb3JkKG1vZGVsVHlwZSwgZGF0YS5pZCk7XHJcblxyXG4gICAgaWYgKHBlZWspIHtcclxuICAgICAgXy5leHRlbmQocGVlaywgdGhpcy5pbnRlcm5hbERhdGFzdG9yZS50cmFuc2Zvcm1TZXJpYWxpemVkTmFtZXNUb1Byb3BlcnR5TmFtZXMobW9kZWxUeXBlLCBkYXRhLmF0dHJpYnV0ZXMpKTtcclxuICAgICAgcmV0dXJuIHBlZWs7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3T2JqZWN0OiBUID0gdGhpcy5pbnRlcm5hbERhdGFzdG9yZS5kZXNlcmlhbGl6ZU1vZGVsKG1vZGVsVHlwZSwgZGF0YSk7XHJcbiAgICB0aGlzLmludGVybmFsRGF0YXN0b3JlLmFkZFRvU3RvcmUobmV3T2JqZWN0KTtcclxuXHJcbiAgICByZXR1cm4gbmV3T2JqZWN0O1xyXG4gIH1cclxufVxyXG4iXX0=