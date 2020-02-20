/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DateConverter } from '../converters/date/date.converter';
/**
 * @param {?=} options
 * @return {?}
 */
export function JsonAttribute(options = {}) {
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
            const metadata = Reflect.getMetadata('JsonAttribute', target) || {};
            metadata[propertyName] = {
                marked: true
            };
            Reflect.defineMetadata('JsonAttribute', metadata, target);
            /** @type {?} */
            const mappingMetadata = Reflect.getMetadata('AttributeMapping', target) || {};
            /** @type {?} */
            const serializedPropertyName = options.serializedName !== undefined ? options.serializedName : propertyName;
            mappingMetadata[serializedPropertyName] = propertyName;
            Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
        });
        /** @type {?} */
        const getter = (/**
         * @return {?}
         */
        function () {
            if (this.nestedDataSerialization) {
                return converter(Reflect.getMetadata('design:type', target, propertyName), this[`_${propertyName}`], true);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1hdHRyaWJ1dGUuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbmFwaS8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvanNvbi1hdHRyaWJ1dGUuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7O0FBRWxFLE1BQU0sVUFBVSxhQUFhLENBQUMsVUFBcUMsRUFBRTtJQUNuRTs7Ozs7SUFBTyxDQUFDLE1BQVcsRUFBRSxZQUFvQixFQUFFLEVBQUU7O2NBQ3JDLFNBQVM7Ozs7OztRQUFHLENBQUMsUUFBYSxFQUFFLEtBQVUsRUFBRSxnQkFBZ0IsR0FBRyxLQUFLLEVBQU8sRUFBRTs7Z0JBQ3pFLGFBQWE7WUFFakIsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUNyQixhQUFhLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQzthQUNuQztpQkFBTSxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7Z0JBQzVCLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO2FBQ3JDO2lCQUFNOztzQkFDQyxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUU7Z0JBRS9CLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO29CQUNwQyxhQUFhLEdBQUcsUUFBUSxDQUFDO2lCQUMxQjthQUNGO1lBRUQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDckIsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQztnQkFDRCxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEM7WUFFRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQTs7Y0FFSyxlQUFlOzs7UUFBRyxHQUFHLEVBQUU7O2tCQUNyQixRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRTtZQUVuRSxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUc7Z0JBQ3ZCLE1BQU0sRUFBRSxJQUFJO2FBQ2IsQ0FBQztZQUVGLE9BQU8sQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzs7a0JBRXBELGVBQWUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7O2tCQUN2RSxzQkFBc0IsR0FBRyxPQUFPLENBQUMsY0FBYyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWTtZQUMzRyxlQUFlLENBQUMsc0JBQXNCLENBQUMsR0FBRyxZQUFZLENBQUM7WUFDdkQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFBOztjQUVLLE1BQU07OztRQUFHO1lBQ2IsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7Z0JBQ2hDLE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVHO1lBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQTs7Y0FFSyxNQUFNOzs7O1FBQUcsVUFBUyxNQUFXOztrQkFDM0IsVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUM7WUFDM0UsSUFBSSxDQUFDLElBQUksWUFBWSxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQTtRQUVELElBQUksT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDL0IsZUFBZSxFQUFFLENBQUM7WUFDbEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFO2dCQUMxQyxHQUFHLEVBQUUsTUFBTTtnQkFDWCxHQUFHLEVBQUUsTUFBTTtnQkFDWCxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsWUFBWSxFQUFFLElBQUk7YUFDbkIsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDLEVBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXR0cmlidXRlRGVjb3JhdG9yT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvYXR0cmlidXRlLWRlY29yYXRvci1vcHRpb25zLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERhdGVDb252ZXJ0ZXIgfSBmcm9tICcuLi9jb252ZXJ0ZXJzL2RhdGUvZGF0ZS5jb252ZXJ0ZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEpzb25BdHRyaWJ1dGUob3B0aW9uczogQXR0cmlidXRlRGVjb3JhdG9yT3B0aW9ucyA9IHt9KTogUHJvcGVydHlEZWNvcmF0b3Ige1xyXG4gIHJldHVybiAodGFyZ2V0OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCBjb252ZXJ0ZXIgPSAoZGF0YVR5cGU6IGFueSwgdmFsdWU6IGFueSwgZm9yU2VyaWFsaXNhdGlvbiA9IGZhbHNlKTogYW55ID0+IHtcclxuICAgICAgbGV0IGF0dHJDb252ZXJ0ZXI7XHJcblxyXG4gICAgICBpZiAob3B0aW9ucy5jb252ZXJ0ZXIpIHtcclxuICAgICAgICBhdHRyQ29udmVydGVyID0gb3B0aW9ucy5jb252ZXJ0ZXI7XHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0YVR5cGUgPT09IERhdGUpIHtcclxuICAgICAgICBhdHRyQ29udmVydGVyID0gbmV3IERhdGVDb252ZXJ0ZXIoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBkYXRhdHlwZSA9IG5ldyBkYXRhVHlwZSgpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YXR5cGUubWFzayAmJiBkYXRhdHlwZS51bm1hc2spIHtcclxuICAgICAgICAgIGF0dHJDb252ZXJ0ZXIgPSBkYXRhdHlwZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhdHRyQ29udmVydGVyKSB7XHJcbiAgICAgICAgaWYgKCFmb3JTZXJpYWxpc2F0aW9uKSB7XHJcbiAgICAgICAgICByZXR1cm4gYXR0ckNvbnZlcnRlci5tYXNrKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF0dHJDb252ZXJ0ZXIudW5tYXNrKHZhbHVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzYXZlQW5ub3RhdGlvbnMgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSnNvbkF0dHJpYnV0ZScsIHRhcmdldCkgfHwge307XHJcblxyXG4gICAgICBtZXRhZGF0YVtwcm9wZXJ0eU5hbWVdID0ge1xyXG4gICAgICAgIG1hcmtlZDogdHJ1ZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YSgnSnNvbkF0dHJpYnV0ZScsIG1ldGFkYXRhLCB0YXJnZXQpO1xyXG5cclxuICAgICAgY29uc3QgbWFwcGluZ01ldGFkYXRhID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnQXR0cmlidXRlTWFwcGluZycsIHRhcmdldCkgfHwge307XHJcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRQcm9wZXJ0eU5hbWUgPSBvcHRpb25zLnNlcmlhbGl6ZWROYW1lICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnNlcmlhbGl6ZWROYW1lIDogcHJvcGVydHlOYW1lO1xyXG4gICAgICBtYXBwaW5nTWV0YWRhdGFbc2VyaWFsaXplZFByb3BlcnR5TmFtZV0gPSBwcm9wZXJ0eU5hbWU7XHJcbiAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoJ0F0dHJpYnV0ZU1hcHBpbmcnLCBtYXBwaW5nTWV0YWRhdGEsIHRhcmdldCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGdldHRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAodGhpcy5uZXN0ZWREYXRhU2VyaWFsaXphdGlvbikge1xyXG4gICAgICAgIHJldHVybiBjb252ZXJ0ZXIoUmVmbGVjdC5nZXRNZXRhZGF0YSgnZGVzaWduOnR5cGUnLCB0YXJnZXQsIHByb3BlcnR5TmFtZSksIHRoaXNbYF8ke3Byb3BlcnR5TmFtZX1gXSwgdHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXNbYF8ke3Byb3BlcnR5TmFtZX1gXTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc2V0dGVyID0gZnVuY3Rpb24obmV3VmFsOiBhbnkpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0VHlwZSA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgdGFyZ2V0LCBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICB0aGlzW2BfJHtwcm9wZXJ0eU5hbWV9YF0gPSBjb252ZXJ0ZXIodGFyZ2V0VHlwZSwgbmV3VmFsKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGRlbGV0ZSB0YXJnZXRbcHJvcGVydHlOYW1lXSkge1xyXG4gICAgICBzYXZlQW5ub3RhdGlvbnMoKTtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlOYW1lLCB7XHJcbiAgICAgICAgZ2V0OiBnZXR0ZXIsXHJcbiAgICAgICAgc2V0OiBzZXR0ZXIsXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXX0=