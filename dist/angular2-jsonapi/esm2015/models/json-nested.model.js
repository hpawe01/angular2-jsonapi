/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class JsonApiNestedModel {
    /**
     * @param {?=} data
     */
    constructor(data) {
        this.nestedDataSerialization = false;
        if (data) {
            Object.assign(this, data);
        }
    }
    /**
     * @return {?}
     */
    get modelConfig() {
        return Reflect.getMetadata('JsonApiModelConfig', this.constructor);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    fill(data) {
        Object.assign(this, data);
    }
    /**
     * @return {?}
     */
    serialize() {
        return this.transformSerializedNamesToPropertyNames();
    }
    /**
     * @protected
     * @template T
     * @return {?}
     */
    transformSerializedNamesToPropertyNames() {
        /** @type {?} */
        const serializedNameToPropertyName = this.getModelPropertyNames();
        /** @type {?} */
        const properties = {};
        Object.keys(serializedNameToPropertyName).forEach((/**
         * @param {?} serializedName
         * @return {?}
         */
        (serializedName) => {
            if (this && this[serializedName] !== null &&
                this[serializedName] !== undefined && serializedName !== 'nestedDataSerialization') {
                properties[serializedNameToPropertyName[serializedName]] = this[serializedName];
            }
        }));
        return properties;
    }
    /**
     * @protected
     * @return {?}
     */
    getModelPropertyNames() {
        return Reflect.getMetadata('AttributeMapping', this) || [];
    }
}
if (false) {
    /** @type {?} */
    JsonApiNestedModel.prototype.nestedDataSerialization;
    /* Skipping unhandled member: [key: string]: any;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1uZXN0ZWQubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsibW9kZWxzL2pzb24tbmVzdGVkLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBSzdCLFlBQVksSUFBVTtRQUZmLDRCQUF1QixHQUFHLEtBQUssQ0FBQztRQUdyQyxJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7OztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckUsQ0FBQzs7Ozs7SUFFTSxJQUFJLENBQUMsSUFBUztRQUNuQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDOzs7O0lBRU0sU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLHVDQUF1QyxFQUFFLENBQUM7SUFDeEQsQ0FBQzs7Ozs7O0lBRVMsdUNBQXVDOztjQUN6Qyw0QkFBNEIsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUU7O2NBQzNELFVBQVUsR0FBUSxFQUFFO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUNuRSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBSTtnQkFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxjQUFjLEtBQUsseUJBQXlCLEVBQUU7Z0JBQ3BGLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNqRjtRQUNILENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFFUyxxQkFBcUI7UUFDN0IsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3RCxDQUFDO0NBQ0Y7OztJQXBDQyxxREFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbENvbmZpZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvbW9kZWwtY29uZmlnLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEpzb25BcGlNb2RlbCB9IGZyb20gJy4vanNvbi1hcGkubW9kZWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25BcGlOZXN0ZWRNb2RlbCB7XHJcbiAgW2tleTogc3RyaW5nXTogYW55O1xyXG5cclxuICBwdWJsaWMgbmVzdGVkRGF0YVNlcmlhbGl6YXRpb24gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YT86IGFueSkge1xyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBtb2RlbENvbmZpZygpOiBNb2RlbENvbmZpZyB7XHJcbiAgICByZXR1cm4gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkFwaU1vZGVsQ29uZmlnJywgdGhpcy5jb25zdHJ1Y3Rvcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmlsbChkYXRhOiBhbnkpIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VyaWFsaXplKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1TZXJpYWxpemVkTmFtZXNUb1Byb3BlcnR5TmFtZXMoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB0cmFuc2Zvcm1TZXJpYWxpemVkTmFtZXNUb1Byb3BlcnR5TmFtZXM8VCBleHRlbmRzIEpzb25BcGlNb2RlbD4oKSB7XHJcbiAgICBjb25zdCBzZXJpYWxpemVkTmFtZVRvUHJvcGVydHlOYW1lID0gdGhpcy5nZXRNb2RlbFByb3BlcnR5TmFtZXMoKTtcclxuICAgIGNvbnN0IHByb3BlcnRpZXM6IGFueSA9IHt9O1xyXG4gICAgT2JqZWN0LmtleXMoc2VyaWFsaXplZE5hbWVUb1Byb3BlcnR5TmFtZSkuZm9yRWFjaCgoc2VyaWFsaXplZE5hbWUpID0+IHtcclxuICAgICAgaWYgKHRoaXMgJiYgdGhpc1tzZXJpYWxpemVkTmFtZV0gIT09IG51bGwgJiZcclxuICAgICAgICB0aGlzW3NlcmlhbGl6ZWROYW1lXSAhPT0gdW5kZWZpbmVkICYmIHNlcmlhbGl6ZWROYW1lICE9PSAnbmVzdGVkRGF0YVNlcmlhbGl6YXRpb24nKSB7XHJcbiAgICAgICAgcHJvcGVydGllc1tzZXJpYWxpemVkTmFtZVRvUHJvcGVydHlOYW1lW3NlcmlhbGl6ZWROYW1lXV0gPSB0aGlzW3NlcmlhbGl6ZWROYW1lXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0TW9kZWxQcm9wZXJ0eU5hbWVzKCkge1xyXG4gICAgcmV0dXJuIFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0F0dHJpYnV0ZU1hcHBpbmcnLCB0aGlzKSB8fCBbXTtcclxuICB9XHJcbn1cclxuIl19