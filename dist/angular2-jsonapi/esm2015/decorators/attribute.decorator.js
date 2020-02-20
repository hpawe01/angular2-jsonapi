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
export function Attribute(options = {}) {
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
            else if (dataType === Date) {
                attrConverter = new DateConverter();
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
            const metadata = Reflect.getMetadata('Attribute', target) || {};
            metadata[propertyName] = {
                marked: true
            };
            Reflect.defineMetadata('Attribute', metadata, target);
            /** @type {?} */
            const mappingMetadata = Reflect.getMetadata('AttributeMapping', target) || {};
            /** @type {?} */
            const serializedPropertyName = options.serializedName !== undefined ? options.serializedName : propertyName;
            mappingMetadata[serializedPropertyName] = propertyName;
            Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
        });
        /** @type {?} */
        const setMetadata = (/**
         * @param {?} instance
         * @param {?} oldValue
         * @param {?} newValue
         * @return {?}
         */
        (instance, oldValue, newValue) => {
            /** @type {?} */
            const targetType = Reflect.getMetadata('design:type', target, propertyName);
            if (!instance[AttributeMetadata]) {
                instance[AttributeMetadata] = {};
            }
            instance[AttributeMetadata][propertyName] = {
                newValue,
                oldValue,
                nested: false,
                serializedName: options.serializedName,
                hasDirtyAttributes: !_.isEqual(oldValue, newValue),
                serialisationValue: converter(targetType, newValue, true)
            };
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
            /** @type {?} */
            const convertedValue = converter(targetType, newVal);
            /** @type {?} */
            let oldValue = null;
            if (this.isModelInitialization() && this.id) {
                oldValue = converter(targetType, newVal);
            }
            else {
                if (this[AttributeMetadata] && this[AttributeMetadata][propertyName]) {
                    oldValue = this[AttributeMetadata][propertyName].oldValue;
                }
            }
            this[`_${propertyName}`] = convertedValue;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWpzb25hcGkvIiwic291cmNlcyI6WyJkZWNvcmF0b3JzL2F0dHJpYnV0ZS5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFFNUIsTUFBTSxVQUFVLFNBQVMsQ0FBQyxVQUFxQyxFQUFFO0lBQy9EOzs7OztJQUFPLENBQUMsTUFBVyxFQUFFLFlBQW9CLEVBQUUsRUFBRTs7Y0FDckMsU0FBUzs7Ozs7O1FBQUcsQ0FBQyxRQUFhLEVBQUUsS0FBVSxFQUFFLGdCQUFnQixHQUFHLEtBQUssRUFBTyxFQUFFOztnQkFDekUsYUFBYTtZQUVqQixJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7Z0JBQ3JCLGFBQWEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO2FBQ25DO2lCQUFNLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDNUIsYUFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7YUFDckM7aUJBQU07O3NCQUNDLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRTtnQkFFL0IsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7b0JBQ3BDLGFBQWEsR0FBRyxRQUFRLENBQUM7aUJBQzFCO2FBQ0Y7WUFFRCxJQUFJLGFBQWEsRUFBRTtnQkFDakIsSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUNyQixPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2xDO2dCQUNELE9BQU8sYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQztZQUVELE9BQU8sS0FB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Q1gsR0FBRyxFQUFFLE1BQU07Z0JBQ1gsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFlBQVksRUFBRSxJQUFJO2FBQ25CLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF0dHJpYnV0ZU1ldGFkYXRhIH0gZnJvbSAnLi4vY29uc3RhbnRzL3N5bWJvbHMnO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVEZWNvcmF0b3JPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hdHRyaWJ1dGUtZGVjb3JhdG9yLW9wdGlvbnMuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRGF0ZUNvbnZlcnRlciB9IGZyb20gJy4uL2NvbnZlcnRlcnMvZGF0ZS9kYXRlLmNvbnZlcnRlcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBBdHRyaWJ1dGUob3B0aW9uczogQXR0cmlidXRlRGVjb3JhdG9yT3B0aW9ucyA9IHt9KTogUHJvcGVydHlEZWNvcmF0b3Ige1xyXG4gIHJldHVybiAodGFyZ2V0OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCBjb252ZXJ0ZXIgPSAoZGF0YVR5cGU6IGFueSwgdmFsdWU6IGFueSwgZm9yU2VyaWFsaXNhdGlvbiA9IGZhbHNlKTogYW55ID0+IHtcclxuICAgICAgbGV0IGF0dHJDb252ZXJ0ZXI7XHJcblxyXG4gICAgICBpZiAob3B0aW9ucy5jb252ZXJ0ZXIpIHtcclxuICAgICAgICBhdHRyQ29udmVydGVyID0gb3B0aW9ucy5jb252ZXJ0ZXI7XHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0YVR5cGUgPT09IERhdGUpIHtcclxuICAgICAgICBhdHRyQ29udmVydGVyID0gbmV3IERhdGVDb252ZXJ0ZXIoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBkYXRhdHlwZSA9IG5ldyBkYXRhVHlwZSgpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YXR5cGUubWFzayAmJiBkYXRhdHlwZS51bm1hc2spIHtcclxuICAgICAgICAgIGF0dHJDb252ZXJ0ZXIgPSBkYXRhdHlwZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhdHRyQ29udmVydGVyKSB7XHJcbiAgICAgICAgaWYgKCFmb3JTZXJpYWxpc2F0aW9uKSB7XHJcbiAgICAgICAgICByZXR1cm4gYXR0ckNvbnZlcnRlci5tYXNrKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF0dHJDb252ZXJ0ZXIudW5tYXNrKHZhbHVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzYXZlQW5ub3RhdGlvbnMgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnQXR0cmlidXRlJywgdGFyZ2V0KSB8fCB7fTtcclxuXHJcbiAgICAgIG1ldGFkYXRhW3Byb3BlcnR5TmFtZV0gPSB7XHJcbiAgICAgICAgbWFya2VkOiB0cnVlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKCdBdHRyaWJ1dGUnLCBtZXRhZGF0YSwgdGFyZ2V0KTtcclxuXHJcbiAgICAgIGNvbnN0IG1hcHBpbmdNZXRhZGF0YSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ0F0dHJpYnV0ZU1hcHBpbmcnLCB0YXJnZXQpIHx8IHt9O1xyXG4gICAgICBjb25zdCBzZXJpYWxpemVkUHJvcGVydHlOYW1lID0gb3B0aW9ucy5zZXJpYWxpemVkTmFtZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5zZXJpYWxpemVkTmFtZSA6IHByb3BlcnR5TmFtZTtcclxuICAgICAgbWFwcGluZ01ldGFkYXRhW3NlcmlhbGl6ZWRQcm9wZXJ0eU5hbWVdID0gcHJvcGVydHlOYW1lO1xyXG4gICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKCdBdHRyaWJ1dGVNYXBwaW5nJywgbWFwcGluZ01ldGFkYXRhLCB0YXJnZXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzZXRNZXRhZGF0YSA9IChcclxuICAgICAgaW5zdGFuY2U6IGFueSxcclxuICAgICAgb2xkVmFsdWU6IGFueSxcclxuICAgICAgbmV3VmFsdWU6IGFueVxyXG4gICAgKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldFR5cGUgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdkZXNpZ246dHlwZScsIHRhcmdldCwgcHJvcGVydHlOYW1lKTtcclxuXHJcbiAgICAgIGlmICghaW5zdGFuY2VbQXR0cmlidXRlTWV0YWRhdGFdKSB7XHJcbiAgICAgICAgaW5zdGFuY2VbQXR0cmlidXRlTWV0YWRhdGFdID0ge307XHJcbiAgICAgIH1cclxuICAgICAgaW5zdGFuY2VbQXR0cmlidXRlTWV0YWRhdGFdW3Byb3BlcnR5TmFtZV0gPSB7XHJcbiAgICAgICAgbmV3VmFsdWUsXHJcbiAgICAgICAgb2xkVmFsdWUsXHJcbiAgICAgICAgbmVzdGVkOiBmYWxzZSxcclxuICAgICAgICBzZXJpYWxpemVkTmFtZTogb3B0aW9ucy5zZXJpYWxpemVkTmFtZSxcclxuICAgICAgICBoYXNEaXJ0eUF0dHJpYnV0ZXM6ICFfLmlzRXF1YWwob2xkVmFsdWUsIG5ld1ZhbHVlKSxcclxuICAgICAgICBzZXJpYWxpc2F0aW9uVmFsdWU6IGNvbnZlcnRlcih0YXJnZXRUeXBlLCBuZXdWYWx1ZSwgdHJ1ZSlcclxuICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZ2V0dGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzW2BfJHtwcm9wZXJ0eU5hbWV9YF07XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNldHRlciA9IGZ1bmN0aW9uKG5ld1ZhbDogYW55KSB7XHJcbiAgICAgIGNvbnN0IHRhcmdldFR5cGUgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdkZXNpZ246dHlwZScsIHRhcmdldCwgcHJvcGVydHlOYW1lKTtcclxuICAgICAgY29uc3QgY29udmVydGVkVmFsdWUgPSBjb252ZXJ0ZXIodGFyZ2V0VHlwZSwgbmV3VmFsKTtcclxuICAgICAgbGV0IG9sZFZhbHVlID0gbnVsbDtcclxuICAgICAgaWYgKHRoaXMuaXNNb2RlbEluaXRpYWxpemF0aW9uKCkgJiYgdGhpcy5pZCkge1xyXG4gICAgICAgIG9sZFZhbHVlID0gY29udmVydGVyKHRhcmdldFR5cGUsIG5ld1ZhbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXNbQXR0cmlidXRlTWV0YWRhdGFdICYmIHRoaXNbQXR0cmlidXRlTWV0YWRhdGFdW3Byb3BlcnR5TmFtZV0pIHtcclxuICAgICAgICAgIG9sZFZhbHVlID0gdGhpc1tBdHRyaWJ1dGVNZXRhZGF0YV1bcHJvcGVydHlOYW1lXS5vbGRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXNbYF8ke3Byb3BlcnR5TmFtZX1gXSA9IGNvbnZlcnRlZFZhbHVlO1xyXG4gICAgICBzZXRNZXRhZGF0YSh0aGlzLCBvbGRWYWx1ZSwgY29udmVydGVkVmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZGVsZXRlIHRhcmdldFtwcm9wZXJ0eU5hbWVdKSB7XHJcbiAgICAgIHNhdmVBbm5vdGF0aW9ucygpO1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIHtcclxuICAgICAgICBnZXQ6IGdldHRlcixcclxuICAgICAgICBzZXQ6IHNldHRlcixcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdfQ==