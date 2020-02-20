/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DateConverter } from '../converters/date/date.converter';
/**
 * @param {?=} options
 * @return {?}
 */
export function JsonAttribute(options) {
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
            var metadata = Reflect.getMetadata('JsonAttribute', target) || {};
            metadata[propertyName] = {
                marked: true
            };
            Reflect.defineMetadata('JsonAttribute', metadata, target);
            /** @type {?} */
            var mappingMetadata = Reflect.getMetadata('AttributeMapping', target) || {};
            /** @type {?} */
            var serializedPropertyName = options.serializedName !== undefined ? options.serializedName : propertyName;
            mappingMetadata[serializedPropertyName] = propertyName;
            Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
        });
        /** @type {?} */
        var getter = (/**
         * @return {?}
         */
        function () {
            if (this.nestedDataSerialization) {
                return converter(Reflect.getMetadata('design:type', target, propertyName), this["_" + propertyName], true);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1hdHRyaWJ1dGUuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbmFwaS8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvanNvbi1hdHRyaWJ1dGUuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7O0FBRWxFLE1BQU0sVUFBVSxhQUFhLENBQUMsT0FBdUM7SUFBdkMsd0JBQUEsRUFBQSxZQUF1QztJQUNuRTs7Ozs7SUFBTyxVQUFDLE1BQVcsRUFBRSxZQUFvQjs7WUFDakMsU0FBUzs7Ozs7O1FBQUcsVUFBQyxRQUFhLEVBQUUsS0FBVSxFQUFFLGdCQUF3QjtZQUF4QixpQ0FBQSxFQUFBLHdCQUF3Qjs7Z0JBQ2hFLGFBQWE7WUFFakIsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUNyQixhQUFhLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQzthQUNuQztpQkFBTSxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7Z0JBQzVCLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO2FBQ3JDO2lCQUFNOztvQkFDQyxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUU7Z0JBRS9CLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO29CQUNwQyxhQUFhLEdBQUcsUUFBUSxDQUFDO2lCQUMxQjthQUNGO1lBRUQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDckIsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQztnQkFDRCxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEM7WUFFRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQTs7WUFFSyxlQUFlOzs7UUFBRzs7Z0JBQ2hCLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBRW5FLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRztnQkFDdkIsTUFBTSxFQUFFLElBQUk7YUFDYixDQUFDO1lBRUYsT0FBTyxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztnQkFFcEQsZUFBZSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRTs7Z0JBQ3ZFLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyxjQUFjLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFZO1lBQzNHLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUN2RCxPQUFPLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUE7O1lBRUssTUFBTTs7O1FBQUc7WUFDYixJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtnQkFDaEMsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFJLFlBQWMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVHO1lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBSSxZQUFjLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUE7O1lBRUssTUFBTTs7OztRQUFHLFVBQVMsTUFBVzs7Z0JBQzNCLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDO1lBQzNFLElBQUksQ0FBQyxNQUFJLFlBQWMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFBO1FBRUQsSUFBSSxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMvQixlQUFlLEVBQUUsQ0FBQztZQUNsQixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUU7Z0JBQzFDLEdBQUcsRUFBRSxNQUFNO2dCQUNYLEdBQUcsRUFBRSxNQUFNO2dCQUNYLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDLENBQUM7U0FDSjtJQUNILENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdHRyaWJ1dGVEZWNvcmF0b3JPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hdHRyaWJ1dGUtZGVjb3JhdG9yLW9wdGlvbnMuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRGF0ZUNvbnZlcnRlciB9IGZyb20gJy4uL2NvbnZlcnRlcnMvZGF0ZS9kYXRlLmNvbnZlcnRlcic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSnNvbkF0dHJpYnV0ZShvcHRpb25zOiBBdHRyaWJ1dGVEZWNvcmF0b3JPcHRpb25zID0ge30pOiBQcm9wZXJ0eURlY29yYXRvciB7XHJcbiAgcmV0dXJuICh0YXJnZXQ6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IGNvbnZlcnRlciA9IChkYXRhVHlwZTogYW55LCB2YWx1ZTogYW55LCBmb3JTZXJpYWxpc2F0aW9uID0gZmFsc2UpOiBhbnkgPT4ge1xyXG4gICAgICBsZXQgYXR0ckNvbnZlcnRlcjtcclxuXHJcbiAgICAgIGlmIChvcHRpb25zLmNvbnZlcnRlcikge1xyXG4gICAgICAgIGF0dHJDb252ZXJ0ZXIgPSBvcHRpb25zLmNvbnZlcnRlcjtcclxuICAgICAgfSBlbHNlIGlmIChkYXRhVHlwZSA9PT0gRGF0ZSkge1xyXG4gICAgICAgIGF0dHJDb252ZXJ0ZXIgPSBuZXcgRGF0ZUNvbnZlcnRlcigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGRhdGF0eXBlID0gbmV3IGRhdGFUeXBlKCk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhdHlwZS5tYXNrICYmIGRhdGF0eXBlLnVubWFzaykge1xyXG4gICAgICAgICAgYXR0ckNvbnZlcnRlciA9IGRhdGF0eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGF0dHJDb252ZXJ0ZXIpIHtcclxuICAgICAgICBpZiAoIWZvclNlcmlhbGlzYXRpb24pIHtcclxuICAgICAgICAgIHJldHVybiBhdHRyQ29udmVydGVyLm1hc2sodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXR0ckNvbnZlcnRlci51bm1hc2sodmFsdWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNhdmVBbm5vdGF0aW9ucyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgbWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdKc29uQXR0cmlidXRlJywgdGFyZ2V0KSB8fCB7fTtcclxuXHJcbiAgICAgIG1ldGFkYXRhW3Byb3BlcnR5TmFtZV0gPSB7XHJcbiAgICAgICAgbWFya2VkOiB0cnVlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKCdKc29uQXR0cmlidXRlJywgbWV0YWRhdGEsIHRhcmdldCk7XHJcblxyXG4gICAgICBjb25zdCBtYXBwaW5nTWV0YWRhdGEgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdBdHRyaWJ1dGVNYXBwaW5nJywgdGFyZ2V0KSB8fCB7fTtcclxuICAgICAgY29uc3Qgc2VyaWFsaXplZFByb3BlcnR5TmFtZSA9IG9wdGlvbnMuc2VyaWFsaXplZE5hbWUgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuc2VyaWFsaXplZE5hbWUgOiBwcm9wZXJ0eU5hbWU7XHJcbiAgICAgIG1hcHBpbmdNZXRhZGF0YVtzZXJpYWxpemVkUHJvcGVydHlOYW1lXSA9IHByb3BlcnR5TmFtZTtcclxuICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YSgnQXR0cmlidXRlTWFwcGluZycsIG1hcHBpbmdNZXRhZGF0YSwgdGFyZ2V0KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZ2V0dGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICh0aGlzLm5lc3RlZERhdGFTZXJpYWxpemF0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnZlcnRlcihSZWZsZWN0LmdldE1ldGFkYXRhKCdkZXNpZ246dHlwZScsIHRhcmdldCwgcHJvcGVydHlOYW1lKSwgdGhpc1tgXyR7cHJvcGVydHlOYW1lfWBdLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpc1tgXyR7cHJvcGVydHlOYW1lfWBdO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzZXR0ZXIgPSBmdW5jdGlvbihuZXdWYWw6IGFueSkge1xyXG4gICAgICBjb25zdCB0YXJnZXRUeXBlID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnZGVzaWduOnR5cGUnLCB0YXJnZXQsIHByb3BlcnR5TmFtZSk7XHJcbiAgICAgIHRoaXNbYF8ke3Byb3BlcnR5TmFtZX1gXSA9IGNvbnZlcnRlcih0YXJnZXRUeXBlLCBuZXdWYWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZGVsZXRlIHRhcmdldFtwcm9wZXJ0eU5hbWVdKSB7XHJcbiAgICAgIHNhdmVBbm5vdGF0aW9ucygpO1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIHtcclxuICAgICAgICBnZXQ6IGdldHRlcixcclxuICAgICAgICBzZXQ6IHNldHRlcixcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdfQ==