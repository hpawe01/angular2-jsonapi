/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { parseISO } from 'date-fns';
var DateConverter = /** @class */ (function () {
    function DateConverter() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    DateConverter.prototype.mask = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value === 'string') {
            return parseISO(value);
        }
        else {
            return value;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateConverter.prototype.unmask = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value === null) {
            return null;
        }
        return value.toISOString();
    };
    return DateConverter;
}());
export { DateConverter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5jb252ZXJ0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsiY29udmVydGVycy9kYXRlL2RhdGUuY29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR3BDO0lBQUE7SUFlQSxDQUFDOzs7OztJQWRDLDRCQUFJOzs7O0lBQUosVUFBSyxLQUFVO1FBQ2IsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDOzs7OztJQUVELDhCQUFNOzs7O0lBQU4sVUFBTyxLQUFVO1FBQ2YsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBhcnNlSVNPIH0gZnJvbSAnZGF0ZS1mbnMnO1xyXG5pbXBvcnQgeyBQcm9wZXJ0eUNvbnZlcnRlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvcHJvcGVydHktY29udmVydGVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0ZUNvbnZlcnRlciBpbXBsZW1lbnRzIFByb3BlcnR5Q29udmVydGVyIHtcclxuICBtYXNrKHZhbHVlOiBhbnkpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBwYXJzZUlTTyh2YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1bm1hc2sodmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==