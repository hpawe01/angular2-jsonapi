/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AttributeMetadata } from '../constants/symbols';
import * as _ from 'lodash';
/**
 * @param {?=} options
 * @return {?}
 */
export function NestedAttribute(options) {
    if (options === void 0) { options = {}; }
    return (/**
     * @param {?} target
     * @param {?} propertyName
     * @return {?}
     */
    function (target, propertyName) {
        /** @type {?} */
        var converter = (/**
         * @param {?} dataType
         * @param {?} value
         * @param {?=} forSerialisation
         * @return {?}
         */
        function (dataType, value, forSerialisation) {
            if (forSerialisation === void 0) { forSerialisation = false; }
            /** @type {?} */
            var attrConverter;
            if (options.converter) {
                attrConverter = options.converter;
            }
            else {
                /** @type {?} */
                var datatype = new dataType();
                if (datatype.mask && datatype.unmask) {
                    attrConverter = datatype;
                }
            }
            if (attrConverter) {
                if (!forSerialisation) {
                    return attrConverter.mask(value);
                }
                return attrConverter.unmask(value);
            }
            return value;
        });
        /** @type {?} */
        var saveAnnotations = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var metadata = Reflect.getMetadata('NestedAttribute', target) || {};
            metadata[propertyName] = {
                marked: true
            };
            Reflect.defineMetadata('NestedAttribute', metadata, target);
            /** @type {?} */
            var mappingMetadata = Reflect.getMetadata('AttributeMapping', target) || {};
            /** @type {?} */
            var serializedPropertyName = options.serializedName !== undefined ? options.serializedName : propertyName;
            mappingMetadata[serializedPropertyName] = propertyName;
            Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
        });
        /** @type {?} */
        var updateMetadata = (/**
         * @param {?} instance
         * @return {?}
         */
        function (instance) {
            /** @type {?} */
            var newValue = instance["_" + propertyName];
            if (!instance[AttributeMetadata]) {
                instance[AttributeMetadata] = {};
            }
            if (instance[AttributeMetadata][propertyName] && !instance.isModelInitialization()) {
                instance[AttributeMetadata][propertyName].newValue = newValue;
                instance[AttributeMetadata][propertyName].hasDirtyAttributes = !_.isEqual(instance[AttributeMetadata][propertyName].oldValue, newValue);
                instance[AttributeMetadata][propertyName].serialisationValue = newValue;
            }
            else {
                /** @type {?} */
                var oldValue = _.cloneDeep(newValue);
                instance[AttributeMetadata][propertyName] = {
                    newValue: newValue,
                    oldValue: oldValue,
                    converter: converter,
                    nested: true,
                    hasDirtyAttributes: !_.isEqual(newValue, oldValue)
                };
            }
        });
        /** @type {?} */
        var getter = (/**
         * @return {?}
         */
        function () {
            return this["_" + propertyName];
        });
        /** @type {?} */
        var setter = (/**
         * @param {?} newVal
         * @return {?}
         */
        function (newVal) {
            /** @type {?} */
            var targetType = Reflect.getMetadata('design:type', target, propertyName);
            this["_" + propertyName] = converter(targetType, newVal);
            updateMetadata(this);
        });
        if (delete target[propertyName]) {
            saveAnnotations();
            Object.defineProperty(target, propertyName, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLWF0dHJpYnV0ZS5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9uZXN0ZWQtYXR0cmlidXRlLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFekQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7O0FBRTVCLE1BQU0sVUFBVSxlQUFlLENBQUMsT0FBdUM7SUFBdkMsd0JBQUEsRUFBQSxZQUF1QztJQUNyRTs7Ozs7SUFBTyxVQUFDLE1BQVcsRUFBRSxZQUFvQjs7WUFDakMsU0FBUzs7Ozs7O1FBQUcsVUFBQyxRQUFhLEVBQUUsS0FBVSxFQUFFLGdCQUF3QjtZQUF4QixpQ0FBQSxFQUFBLHdCQUF3Qjs7Z0JBQ2hFLGFBQWE7WUFFakIsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUNyQixhQUFhLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQzthQUNuQztpQkFBTTs7b0JBQ0MsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFO2dCQUUvQixJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtvQkFDcEMsYUFBYSxHQUFHLFFBQVEsQ0FBQztpQkFDMUI7YUFDRjtZQUVELElBQUksYUFBYSxFQUFFO2dCQUNqQixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3JCLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEM7Z0JBQ0QsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BDO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUE7O1lBRUssZUFBZTs7O1FBQUc7O2dCQUNoQixRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxN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dCB7IEF0dHJpYnV0ZU1ldGFkYXRhIH0gZnJvbSAnLi4vY29uc3RhbnRzL3N5bWJvbHMnO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVEZWNvcmF0b3JPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hdHRyaWJ1dGUtZGVjb3JhdG9yLW9wdGlvbnMuaW50ZXJmYWNlJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE5lc3RlZEF0dHJpYnV0ZShvcHRpb25zOiBBdHRyaWJ1dGVEZWNvcmF0b3JPcHRpb25zID0ge30pOiBQcm9wZXJ0eURlY29yYXRvciB7XHJcbiAgcmV0dXJuICh0YXJnZXQ6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IGNvbnZlcnRlciA9IChkYXRhVHlwZTogYW55LCB2YWx1ZTogYW55LCBmb3JTZXJpYWxpc2F0aW9uID0gZmFsc2UpOiBhbnkgPT4ge1xyXG4gICAgICBsZXQgYXR0ckNvbnZlcnRlcjtcclxuXHJcbiAgICAgIGlmIChvcHRpb25zLmNvbnZlcnRlcikge1xyXG4gICAgICAgIGF0dHJDb252ZXJ0ZXIgPSBvcHRpb25zLmNvbnZlcnRlcjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBkYXRhdHlwZSA9IG5ldyBkYXRhVHlwZSgpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YXR5cGUubWFzayAmJiBkYXRhdHlwZS51bm1hc2spIHtcclxuICAgICAgICAgIGF0dHJDb252ZXJ0ZXIgPSBkYXRhdHlwZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhdHRyQ29udmVydGVyKSB7XHJcbiAgICAgICAgaWYgKCFmb3JTZXJpYWxpc2F0aW9uKSB7XHJcbiAgICAgICAgICByZXR1cm4gYXR0ckNvbnZlcnRlci5tYXNrKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF0dHJDb252ZXJ0ZXIudW5tYXNrKHZhbHVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzYXZlQW5ub3RhdGlvbnMgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnTmVzdGVkQXR0cmlidXRlJywgdGFyZ2V0KSB8fCB7fTtcclxuXHJcbiAgICAgIG1ldGFkYXRhW3Byb3BlcnR5TmFtZV0gPSB7XHJcbiAgICAgICAgbWFya2VkOiB0cnVlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKCdOZXN0ZWRBdHRyaWJ1dGUnLCBtZXRhZGF0YSwgdGFyZ2V0KTtcclxuXHJcbiAgICAgIGNvbnN0IG1hcHBpbmdNZXRhZGF0YSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0F0dHJpYnV0ZU1hcHBpbmcnLCB0YXJnZXQpIHx8IHt9O1xyXG4gICAgICBjb25zdCBzZXJpYWxpemVkUHJvcGVydHlOYW1lID0gb3B0aW9ucy5zZXJpYWxpemVkTmFtZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5zZXJpYWxpemVkTmFtZSA6IHByb3BlcnR5TmFtZTtcclxuICAgICAgbWFwcGluZ01ldGFkYXRhW3NlcmlhbGl6ZWRQcm9wZXJ0eU5hbWVdID0gcHJvcGVydHlOYW1lO1xyXG4gICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKCdBdHRyaWJ1dGVNYXBwaW5nJywgbWFwcGluZ01ldGFkYXRhLCB0YXJnZXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCB1cGRhdGVNZXRhZGF0YSA9IChpbnN0YW5jZTogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gaW5zdGFuY2VbYF8ke3Byb3BlcnR5TmFtZX1gXTtcclxuXHJcbiAgICAgIGlmICghaW5zdGFuY2VbQXR0cmlidXRlTWV0YWRhdGFdKSB7XHJcbiAgICAgICAgaW5zdGFuY2VbQXR0cmlidXRlTWV0YWRhdGFdID0ge307XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGluc3RhbmNlW0F0dHJpYnV0ZU1ldGFkYXRhXVtwcm9wZXJ0eU5hbWVdICYmICFpbnN0YW5jZS5pc01vZGVsSW5pdGlhbGl6YXRpb24oKSkge1xyXG4gICAgICAgIGluc3RhbmNlW0F0dHJpYnV0ZU1ldGFkYXRhXVtwcm9wZXJ0eU5hbWVdLm5ld1ZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgaW5zdGFuY2VbQXR0cmlidXRlTWV0YWRhdGFdW3Byb3BlcnR5TmFtZV0uaGFzRGlydHlBdHRyaWJ1dGVzID0gIV8uaXNFcXVhbChcclxuICAgICAgICAgIGluc3RhbmNlW0F0dHJpYnV0ZU1ldGFkYXRhXVtwcm9wZXJ0eU5hbWVdLm9sZFZhbHVlLFxyXG4gICAgICAgICAgbmV3VmFsdWVcclxuICAgICAgICApO1xyXG4gICAgICAgIGluc3RhbmNlW0F0dHJpYnV0ZU1ldGFkYXRhXVtwcm9wZXJ0eU5hbWVdLnNlcmlhbGlzYXRpb25WYWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gXy5jbG9uZURlZXAobmV3VmFsdWUpO1xyXG4gICAgICAgIGluc3RhbmNlW0F0dHJpYnV0ZU1ldGFkYXRhXVtwcm9wZXJ0eU5hbWVdID0ge1xyXG4gICAgICAgICAgbmV3VmFsdWUsXHJcbiAgICAgICAgICBvbGRWYWx1ZSxcclxuICAgICAgICAgIGNvbnZlcnRlcixcclxuICAgICAgICAgIG5lc3RlZDogdHJ1ZSxcclxuICAgICAgICAgIGhhc0RpcnR5QXR0cmlidXRlczogIV8uaXNFcXVhbChuZXdWYWx1ZSwgb2xkVmFsdWUpXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBnZXR0ZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXNbYF8ke3Byb3BlcnR5TmFtZX1gXTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc2V0dGVyID0gZnVuY3Rpb24obmV3VmFsOiBhbnkpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0VHlwZSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgdGFyZ2V0LCBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICB0aGlzW2BfJHtwcm9wZXJ0eU5hbWV9YF0gPSBjb252ZXJ0ZXIodGFyZ2V0VHlwZSwgbmV3VmFsKTtcclxuICAgICAgdXBkYXRlTWV0YWRhdGEodGhpcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChkZWxldGUgdGFyZ2V0W3Byb3BlcnR5TmFtZV0pIHtcclxuICAgICAgc2F2ZUFubm90YXRpb25zKCk7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5TmFtZSwge1xyXG4gICAgICAgIGdldDogZ2V0dGVyLFxyXG4gICAgICAgIHNldDogc2V0dGVyLFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdfQ==