/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AttributeMetadata } from '../constants/symbols';
import { DateConverter } from '../converters/date/date.converter';
import * as _ from 'lodash';
/**
 * @param {?=} options
 * @return {?}
 */
export function Attribute(options) {
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
            else if (dataType === Date) {
                attrConverter = new DateConverter();
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
            var metadata = Reflect.getMetadata('Attribute', target) || {};
            metadata[propertyName] = {
                marked: true
            };
            Reflect.defineMetadata('Attribute', metadata, target);
            /** @type {?} */
            var mappingMetadata = Reflect.getMetadata('AttributeMapping', target) || {};
            /** @type {?} */
            var serializedPropertyName = options.serializedName !== undefined ? options.serializedName : propertyName;
            mappingMetadata[serializedPropertyName] = propertyName;
            Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
        });
        /** @type {?} */
        var setMetadata = (/**
         * @param {?} instance
         * @param {?} oldValue
         * @param {?} newValue
         * @return {?}
         */
        function (instance, oldValue, newValue) {
            /** @type {?} */
            var targetType = Reflect.getMetadata('design:type', target, propertyName);
            if (!instance[AttributeMetadata]) {
                instance[AttributeMetadata] = {};
            }
            instance[AttributeMetadata][propertyName] = {
                newValue: newValue,
                oldValue: oldValue,
                nested: false,
                serializedName: options.serializedName,
                hasDirtyAttributes: !_.isEqual(oldValue, newValue),
                serialisationValue: converter(targetType, newValue, true)
            };
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
            /** @type {?} */
            var convertedValue = converter(targetType, newVal);
            /** @type {?} */
            var oldValue = null;
            if (this.isModelInitialization() && this.id) {
                oldValue = converter(targetType, newVal);
            }
            else {
                if (this[AttributeMetadata] && this[AttributeMetadata][propertyName]) {
                    oldValue = this[AttributeMetadata][propertyName].oldValue;
                }
            }
            this["_" + propertyName] = convertedValue;
            setMetadata(this, oldValue, convertedValue);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb25hcGkvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL2F0dHJpYnV0ZS5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFFNUIsTUFBTSxVQUFVLFNBQVMsQ0FBQyxPQUF1QztJQUF2Qyx3QkFBQSxFQUFBLFlBQXVDO0lBQy9EOzs7OztJQUFPLFVBQUMsTUFBVyxFQUFFLFlBQW9COztZQUNqQyxTQUFTOzs7Ozs7UUFBRyxVQUFDLFFBQWEsRUFBRSxLQUFVLEVBQUUsZ0JBQXdCO1lBQXhCLGlDQUFBLEVBQUEsd0JBQXdCOztnQkFDaEUsYUFBYTtZQUVqQixJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7Z0JBQ3JCLGFBQWEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO2FBQ25DO2lCQUFNLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDNUIsYUFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7YUFDckM7aUJBQU07O29CQUNDLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRTtnQkFFL0IsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7b0JBQ3BDLGFBQWEsR0FBRyxRQUFRLENBQUM7aUJBQzFCO2FBQ0Y7WUFFRCxJQUFJLGFBQWEsRUFBRTtnQkFDakIsSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUNyQixPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2xDO2dCQUNELE9BQU8sYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQztZ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RUFBRSxNQUFNO2dCQUNYLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDLENBQUM7U0FDSjtJQUNILENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdHRyaWJ1dGVNZXRhZGF0YSB9IGZyb20gJy4uL2NvbnN0YW50cy9zeW1ib2xzJztcclxuaW1wb3J0IHsgQXR0cmlidXRlRGVjb3JhdG9yT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvYXR0cmlidXRlLWRlY29yYXRvci1vcHRpb25zLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERhdGVDb252ZXJ0ZXIgfSBmcm9tICcuLi9jb252ZXJ0ZXJzL2RhdGUvZGF0ZS5jb252ZXJ0ZXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQXR0cmlidXRlKG9wdGlvbnM6IEF0dHJpYnV0ZURlY29yYXRvck9wdGlvbnMgPSB7fSk6IFByb3BlcnR5RGVjb3JhdG9yIHtcclxuICByZXR1cm4gKHRhcmdldDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3QgY29udmVydGVyID0gKGRhdGFUeXBlOiBhbnksIHZhbHVlOiBhbnksIGZvclNlcmlhbGlzYXRpb24gPSBmYWxzZSk6IGFueSA9PiB7XHJcbiAgICAgIGxldCBhdHRyQ29udmVydGVyO1xyXG5cclxuICAgICAgaWYgKG9wdGlvbnMuY29udmVydGVyKSB7XHJcbiAgICAgICAgYXR0ckNvbnZlcnRlciA9IG9wdGlvbnMuY29udmVydGVyO1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGFUeXBlID09PSBEYXRlKSB7XHJcbiAgICAgICAgYXR0ckNvbnZlcnRlciA9IG5ldyBEYXRlQ29udmVydGVyKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZGF0YXR5cGUgPSBuZXcgZGF0YVR5cGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGF0eXBlLm1hc2sgJiYgZGF0YXR5cGUudW5tYXNrKSB7XHJcbiAgICAgICAgICBhdHRyQ29udmVydGVyID0gZGF0YXR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYXR0ckNvbnZlcnRlcikge1xyXG4gICAgICAgIGlmICghZm9yU2VyaWFsaXNhdGlvbikge1xyXG4gICAgICAgICAgcmV0dXJuIGF0dHJDb252ZXJ0ZXIubWFzayh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhdHRyQ29udmVydGVyLnVubWFzayh2YWx1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc2F2ZUFubm90YXRpb25zID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBtZXRhZGF0YSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0F0dHJpYnV0ZScsIHRhcmdldCkgfHwge307XHJcblxyXG4gICAgICBtZXRhZGF0YVtwcm9wZXJ0eU5hbWVdID0ge1xyXG4gICAgICAgIG1hcmtlZDogdHJ1ZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YSgnQXR0cmlidXRlJywgbWV0YWRhdGEsIHRhcmdldCk7XHJcblxyXG4gICAgICBjb25zdCBtYXBwaW5nTWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdBdHRyaWJ1dGVNYXBwaW5nJywgdGFyZ2V0KSB8fCB7fTtcclxuICAgICAgY29uc3Qgc2VyaWFsaXplZFByb3BlcnR5TmFtZSA9IG9wdGlvbnMuc2VyaWFsaXplZE5hbWUgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuc2VyaWFsaXplZE5hbWUgOiBwcm9wZXJ0eU5hbWU7XHJcbiAgICAgIG1hcHBpbmdNZXRhZGF0YVtzZXJpYWxpemVkUHJvcGVydHlOYW1lXSA9IHByb3BlcnR5TmFtZTtcclxuICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YSgnQXR0cmlidXRlTWFwcGluZycsIG1hcHBpbmdNZXRhZGF0YSwgdGFyZ2V0KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc2V0TWV0YWRhdGEgPSAoXHJcbiAgICAgIGluc3RhbmNlOiBhbnksXHJcbiAgICAgIG9sZFZhbHVlOiBhbnksXHJcbiAgICAgIG5ld1ZhbHVlOiBhbnlcclxuICAgICkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXRUeXBlID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnZGVzaWduOnR5cGUnLCB0YXJnZXQsIHByb3BlcnR5TmFtZSk7XHJcblxyXG4gICAgICBpZiAoIWluc3RhbmNlW0F0dHJpYnV0ZU1ldGFkYXRhXSkge1xyXG4gICAgICAgIGluc3RhbmNlW0F0dHJpYnV0ZU1ldGFkYXRhXSA9IHt9O1xyXG4gICAgICB9XHJcbiAgICAgIGluc3RhbmNlW0F0dHJpYnV0ZU1ldGFkYXRhXVtwcm9wZXJ0eU5hbWVdID0ge1xyXG4gICAgICAgIG5ld1ZhbHVlLFxyXG4gICAgICAgIG9sZFZhbHVlLFxyXG4gICAgICAgIG5lc3RlZDogZmFsc2UsXHJcbiAgICAgICAgc2VyaWFsaXplZE5hbWU6IG9wdGlvbnMuc2VyaWFsaXplZE5hbWUsXHJcbiAgICAgICAgaGFzRGlydHlBdHRyaWJ1dGVzOiAhXy5pc0VxdWFsKG9sZFZhbHVlLCBuZXdWYWx1ZSksXHJcbiAgICAgICAgc2VyaWFsaXNhdGlvblZhbHVlOiBjb252ZXJ0ZXIodGFyZ2V0VHlwZSwgbmV3VmFsdWUsIHRydWUpXHJcbiAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGdldHRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpc1tgXyR7cHJvcGVydHlOYW1lfWBdO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzZXR0ZXIgPSBmdW5jdGlvbihuZXdWYWw6IGFueSkge1xyXG4gICAgICBjb25zdCB0YXJnZXRUeXBlID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnZGVzaWduOnR5cGUnLCB0YXJnZXQsIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgIGNvbnN0IGNvbnZlcnRlZFZhbHVlID0gY29udmVydGVyKHRhcmdldFR5cGUsIG5ld1ZhbCk7XHJcbiAgICAgIGxldCBvbGRWYWx1ZSA9IG51bGw7XHJcbiAgICAgIGlmICh0aGlzLmlzTW9kZWxJbml0aWFsaXphdGlvbigpICYmIHRoaXMuaWQpIHtcclxuICAgICAgICBvbGRWYWx1ZSA9IGNvbnZlcnRlcih0YXJnZXRUeXBlLCBuZXdWYWwpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzW0F0dHJpYnV0ZU1ldGFkYXRhXSAmJiB0aGlzW0F0dHJpYnV0ZU1ldGFkYXRhXVtwcm9wZXJ0eU5hbWVdKSB7XHJcbiAgICAgICAgICBvbGRWYWx1ZSA9IHRoaXNbQXR0cmlidXRlTWV0YWRhdGFdW3Byb3BlcnR5TmFtZV0ub2xkVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzW2BfJHtwcm9wZXJ0eU5hbWV9YF0gPSBjb252ZXJ0ZWRWYWx1ZTtcclxuICAgICAgc2V0TWV0YWRhdGEodGhpcywgb2xkVmFsdWUsIGNvbnZlcnRlZFZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGRlbGV0ZSB0YXJnZXRbcHJvcGVydHlOYW1lXSkge1xyXG4gICAgICBzYXZlQW5ub3RhdGlvbnMoKTtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlOYW1lLCB7XHJcbiAgICAgICAgZ2V0OiBnZXR0ZXIsXHJcbiAgICAgICAgc2V0OiBzZXR0ZXIsXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXX0=