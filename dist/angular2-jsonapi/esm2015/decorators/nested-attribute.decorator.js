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
export function NestedAttribute(options = {}) {
    return (/**
     * @param {?} target
     * @param {?} propertyName
     * @return {?}
     */
    (target, propertyName) => {
        /** @type {?} */
        const converter = (/**
         * @param {?} dataType
         * @param {?} value
         * @param {?=} forSerialisation
         * @return {?}
         */
        (dataType, value, forSerialisation = false) => {
            /** @type {?} */
            let attrConverter;
            if (options.converter) {
                attrConverter = options.converter;
            }
            else {
                /** @type {?} */
                const datatype = new dataType();
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
        const saveAnnotations = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const metadata = Reflect.getMetadata('NestedAttribute', target) || {};
            metadata[propertyName] = {
                marked: true
            };
            Reflect.defineMetadata('NestedAttribute', metadata, target);
            /** @type {?} */
            const mappingMetadata = Reflect.getMetadata('AttributeMapping', target) || {};
            /** @type {?} */
            const serializedPropertyName = options.serializedName !== undefined ? options.serializedName : propertyName;
            mappingMetadata[serializedPropertyName] = propertyName;
            Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
        });
        /** @type {?} */
        const updateMetadata = (/**
         * @param {?} instance
         * @return {?}
         */
        (instance) => {
            /** @type {?} */
            const newValue = instance[`_${propertyName}`];
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
                const oldValue = _.cloneDeep(newValue);
                instance[AttributeMetadata][propertyName] = {
                    newValue,
                    oldValue,
                    converter,
                    nested: true,
                    hasDirtyAttributes: !_.isEqual(newValue, oldValue)
                };
            }
        });
        /** @type {?} */
        const getter = (/**
         * @return {?}
         */
        function () {
            return this[`_${propertyName}`];
        });
        /** @type {?} */
        const setter = (/**
         * @param {?} newVal
         * @return {?}
         */
        function (newVal) {
            /** @type {?} */
            const targetType = Reflect.getMetadata('design:type', target, propertyName);
            this[`_${propertyName}`] = converter(targetType, newVal);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLWF0dHJpYnV0ZS5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9uZXN0ZWQtYXR0cmlidXRlLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFekQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7O0FBRTVCLE1BQU0sVUFBVSxlQUFlLENBQUMsVUFBcUMsRUFBRTtJQUNyRTs7Ozs7SUFBTyxDQUFDLE1BQVcsRUFBRSxZQUFvQixFQUFFLEVBQUU7O2NBQ3JDLFNBQVM7Ozs7OztRQUFHLENBQUMsUUFBYSxFQUFFLEtBQVUsRUFBRSxnQkFBZ0IsR0FBRyxLQUFLLEVBQU8sRUFBRTs7Z0JBQ3pFLGFBQWE7WUFFakIsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUNyQixhQUFhLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQzthQUNuQztpQkFBTTs7c0JBQ0MsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFO2dCQUUvQixJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtvQkFDcEMsYUFBYSxHQUFHLFFBQVEsQ0FBQztpQkFDMUI7YUFDRjtZQUVELElBQUksYUFBYSxFQUFFO2dCQUNqQixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3JCLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEM7Z0JBQ0QsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BDO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUE7O2NBRUssZUFBZTs7O1FBQUcsR0FBRyxFQUFFOztrQkFDckIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsTUFB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OlsiaW1wb3J0IHsgQXR0cmlidXRlTWV0YWRhdGEgfSBmcm9tICcuLi9jb25zdGFudHMvc3ltYm9scyc7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZURlY29yYXRvck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2F0dHJpYnV0ZS1kZWNvcmF0b3Itb3B0aW9ucy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTmVzdGVkQXR0cmlidXRlKG9wdGlvbnM6IEF0dHJpYnV0ZURlY29yYXRvck9wdGlvbnMgPSB7fSk6IFByb3BlcnR5RGVjb3JhdG9yIHtcclxuICByZXR1cm4gKHRhcmdldDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3QgY29udmVydGVyID0gKGRhdGFUeXBlOiBhbnksIHZhbHVlOiBhbnksIGZvclNlcmlhbGlzYXRpb24gPSBmYWxzZSk6IGFueSA9PiB7XHJcbiAgICAgIGxldCBhdHRyQ29udmVydGVyO1xyXG5cclxuICAgICAgaWYgKG9wdGlvbnMuY29udmVydGVyKSB7XHJcbiAgICAgICAgYXR0ckNvbnZlcnRlciA9IG9wdGlvbnMuY29udmVydGVyO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGRhdGF0eXBlID0gbmV3IGRhdGFUeXBlKCk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhdHlwZS5tYXNrICYmIGRhdGF0eXBlLnVubWFzaykge1xyXG4gICAgICAgICAgYXR0ckNvbnZlcnRlciA9IGRhdGF0eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGF0dHJDb252ZXJ0ZXIpIHtcclxuICAgICAgICBpZiAoIWZvclNlcmlhbGlzYXRpb24pIHtcclxuICAgICAgICAgIHJldHVybiBhdHRyQ29udmVydGVyLm1hc2sodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXR0ckNvbnZlcnRlci51bm1hc2sodmFsdWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNhdmVBbm5vdGF0aW9ucyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgbWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdOZXN0ZWRBdHRyaWJ1dGUnLCB0YXJnZXQpIHx8IHt9O1xyXG5cclxuICAgICAgbWV0YWRhdGFbcHJvcGVydHlOYW1lXSA9IHtcclxuICAgICAgICBtYXJrZWQ6IHRydWVcclxuICAgICAgfTtcclxuXHJcbiAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoJ05lc3RlZEF0dHJpYnV0ZScsIG1ldGFkYXRhLCB0YXJnZXQpO1xyXG5cclxuICAgICAgY29uc3QgbWFwcGluZ01ldGFkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnQXR0cmlidXRlTWFwcGluZycsIHRhcmdldCkgfHwge307XHJcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRQcm9wZXJ0eU5hbWUgPSBvcHRpb25zLnNlcmlhbGl6ZWROYW1lICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnNlcmlhbGl6ZWROYW1lIDogcHJvcGVydHlOYW1lO1xyXG4gICAgICBtYXBwaW5nTWV0YWRhdGFbc2VyaWFsaXplZFByb3BlcnR5TmFtZV0gPSBwcm9wZXJ0eU5hbWU7XHJcbiAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoJ0F0dHJpYnV0ZU1hcHBpbmcnLCBtYXBwaW5nTWV0YWRhdGEsIHRhcmdldCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZU1ldGFkYXRhID0gKGluc3RhbmNlOiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgbmV3VmFsdWUgPSBpbnN0YW5jZVtgXyR7cHJvcGVydHlOYW1lfWBdO1xyXG5cclxuICAgICAgaWYgKCFpbnN0YW5jZVtBdHRyaWJ1dGVNZXRhZGF0YV0pIHtcclxuICAgICAgICBpbnN0YW5jZVtBdHRyaWJ1dGVNZXRhZGF0YV0gPSB7fTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaW5zdGFuY2VbQXR0cmlidXRlTWV0YWRhdGFdW3Byb3BlcnR5TmFtZV0gJiYgIWluc3RhbmNlLmlzTW9kZWxJbml0aWFsaXphdGlvbigpKSB7XHJcbiAgICAgICAgaW5zdGFuY2VbQXR0cmlidXRlTWV0YWRhdGFdW3Byb3BlcnR5TmFtZV0ubmV3VmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICBpbnN0YW5jZVtBdHRyaWJ1dGVNZXRhZGF0YV1bcHJvcGVydHlOYW1lXS5oYXNEaXJ0eUF0dHJpYnV0ZXMgPSAhXy5pc0VxdWFsKFxyXG4gICAgICAgICAgaW5zdGFuY2VbQXR0cmlidXRlTWV0YWRhdGFdW3Byb3BlcnR5TmFtZV0ub2xkVmFsdWUsXHJcbiAgICAgICAgICBuZXdWYWx1ZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaW5zdGFuY2VbQXR0cmlidXRlTWV0YWRhdGFdW3Byb3BlcnR5TmFtZV0uc2VyaWFsaXNhdGlvblZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBfLmNsb25lRGVlcChuZXdWYWx1ZSk7XHJcbiAgICAgICAgaW5zdGFuY2VbQXR0cmlidXRlTWV0YWRhdGFdW3Byb3BlcnR5TmFtZV0gPSB7XHJcbiAgICAgICAgICBuZXdWYWx1ZSxcclxuICAgICAgICAgIG9sZFZhbHVlLFxyXG4gICAgICAgICAgY29udmVydGVyLFxyXG4gICAgICAgICAgbmVzdGVkOiB0cnVlLFxyXG4gICAgICAgICAgaGFzRGlydHlBdHRyaWJ1dGVzOiAhXy5pc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSlcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGdldHRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpc1tgXyR7cHJvcGVydHlOYW1lfWBdO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzZXR0ZXIgPSBmdW5jdGlvbihuZXdWYWw6IGFueSkge1xyXG4gICAgICBjb25zdCB0YXJnZXRUeXBlID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnZGVzaWduOnR5cGUnLCB0YXJnZXQsIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgIHRoaXNbYF8ke3Byb3BlcnR5TmFtZX1gXSA9IGNvbnZlcnRlcih0YXJnZXRUeXBlLCBuZXdWYWwpO1xyXG4gICAgICB1cGRhdGVNZXRhZGF0YSh0aGlzKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGRlbGV0ZSB0YXJnZXRbcHJvcGVydHlOYW1lXSkge1xyXG4gICAgICBzYXZlQW5ub3RhdGlvbnMoKTtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlOYW1lLCB7XHJcbiAgICAgICAgZ2V0OiBnZXR0ZXIsXHJcbiAgICAgICAgc2V0OiBzZXR0ZXIsXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl19