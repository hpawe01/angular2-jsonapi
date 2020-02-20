/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var JsonApiNestedModel = /** @class */ (function () {
    function JsonApiNestedModel(data) {
        this.nestedDataSerialization = false;
        if (data) {
            Object.assign(this, data);
        }
    }
    Object.defineProperty(JsonApiNestedModel.prototype, "modelConfig", {
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
     * @param {?} data
     * @return {?}
     */
    JsonApiNestedModel.prototype.fill = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        Object.assign(this, data);
    };
    /**
     * @return {?}
     */
    JsonApiNestedModel.prototype.serialize = /**
     * @return {?}
     */
    function () {
        return this.transformSerializedNamesToPropertyNames();
    };
    /**
     * @protected
     * @template T
     * @return {?}
     */
    JsonApiNestedModel.prototype.transformSerializedNamesToPropertyNames = /**
     * @protected
     * @template T
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var serializedNameToPropertyName = this.getModelPropertyNames();
        /** @type {?} */
        var properties = {};
        Object.keys(serializedNameToPropertyName).forEach((/**
         * @param {?} serializedName
         * @return {?}
         */
        function (serializedName) {
            if (_this && _this[serializedName] !== null &&
                _this[serializedName] !== undefined && serializedName !== 'nestedDataSerialization') {
                properties[serializedNameToPropertyName[serializedName]] = _this[serializedName];
            }
        }));
        return properties;
    };
    /**
     * @protected
     * @return {?}
     */
    JsonApiNestedModel.prototype.getModelPropertyNames = /**
     * @protected
     * @return {?}
     */
    function () {
        return Reflect.getMetadata('AttributeMapping', this) || [];
    };
    return JsonApiNestedModel;
}());
export { JsonApiNestedModel };
if (false) {
    /** @type {?} */
    JsonApiNestedModel.prototype.nestedDataSerialization;
    /* Skipping unhandled member: [key: string]: any;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1uZXN0ZWQubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsibW9kZWxzL2pzb24tbmVzdGVkLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQTtJQUtFLDRCQUFZLElBQVU7UUFGZiw0QkFBdUIsR0FBRyxLQUFLLENBQUM7UUFHckMsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRCxzQkFBSSwyQ0FBVzs7OztRQUFmO1lBQ0UsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRSxDQUFDOzs7T0FBQTs7Ozs7SUFFTSxpQ0FBSTs7OztJQUFYLFVBQVksSUFBUztRQUNuQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDOzs7O0lBRU0sc0NBQVM7OztJQUFoQjtRQUNFLE9BQU8sSUFBSSxDQUFDLHVDQUF1QyxFQUFFLENBQUM7SUFDeEQsQ0FBQzs7Ozs7O0lBRVMsb0VBQXVDOzs7OztJQUFqRDtRQUFBLGlCQVdDOztZQVZPLDRCQUE0QixHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRTs7WUFDM0QsVUFBVSxHQUFRLEVBQUU7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLGNBQWM7WUFDL0QsSUFBSSxLQUFJLElBQUksS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUk7Z0JBQ3ZDLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxTQUFTLElBQUksY0FBYyxLQUFLLHlCQUF5QixFQUFFO2dCQUNwRixVQUFVLENBQUMsNEJBQTRCLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDakY7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBRVMsa0RBQXFCOzs7O0lBQS9CO1FBQ0UsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3RCxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDOzs7O0lBcENDLHFEQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsQ29uZmlnIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9tb2RlbC1jb25maWcuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSnNvbkFwaU1vZGVsIH0gZnJvbSAnLi9qc29uLWFwaS5tb2RlbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkFwaU5lc3RlZE1vZGVsIHtcclxuICBba2V5OiBzdHJpbmddOiBhbnk7XHJcblxyXG4gIHB1YmxpYyBuZXN0ZWREYXRhU2VyaWFsaXphdGlvbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhPzogYW55KSB7XHJcbiAgICBpZiAoZGF0YSkge1xyXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IG1vZGVsQ29uZmlnKCk6IE1vZGVsQ29uZmlnIHtcclxuICAgIHJldHVybiBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXBpTW9kZWxDb25maWcnLCB0aGlzLmNvbnN0cnVjdG9yKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaWxsKGRhdGE6IGFueSkge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXJpYWxpemUoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybVNlcmlhbGl6ZWROYW1lc1RvUHJvcGVydHlOYW1lcygpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHRyYW5zZm9ybVNlcmlhbGl6ZWROYW1lc1RvUHJvcGVydHlOYW1lczxUIGV4dGVuZHMgSnNvbkFwaU1vZGVsPigpIHtcclxuICAgIGNvbnN0IHNlcmlhbGl6ZWROYW1lVG9Qcm9wZXJ0eU5hbWUgPSB0aGlzLmdldE1vZGVsUHJvcGVydHlOYW1lcygpO1xyXG4gICAgY29uc3QgcHJvcGVydGllczogYW55ID0ge307XHJcbiAgICBPYmplY3Qua2V5cyhzZXJpYWxpemVkTmFtZVRvUHJvcGVydHlOYW1lKS5mb3JFYWNoKChzZXJpYWxpemVkTmFtZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcyAmJiB0aGlzW3NlcmlhbGl6ZWROYW1lXSAhPT0gbnVsbCAmJlxyXG4gICAgICAgIHRoaXNbc2VyaWFsaXplZE5hbWVdICE9PSB1bmRlZmluZWQgJiYgc2VyaWFsaXplZE5hbWUgIT09ICduZXN0ZWREYXRhU2VyaWFsaXphdGlvbicpIHtcclxuICAgICAgICBwcm9wZXJ0aWVzW3NlcmlhbGl6ZWROYW1lVG9Qcm9wZXJ0eU5hbWVbc2VyaWFsaXplZE5hbWVdXSA9IHRoaXNbc2VyaWFsaXplZE5hbWVdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcHJvcGVydGllcztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRNb2RlbFByb3BlcnR5TmFtZXMoKSB7XHJcbiAgICByZXR1cm4gUmVmbGVjdC5nZXRNZXRhZGF0YSgnQXR0cmlidXRlTWFwcGluZycsIHRoaXMpIHx8IFtdO1xyXG4gIH1cclxufVxyXG4iXX0=