/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { parseISO } from 'date-fns';
export class DateConverter {
    /**
     * @param {?} value
     * @return {?}
     */
    mask(value) {
        if (typeof value === 'string') {
            return parseISO(value);
        }
        else {
            return value;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    unmask(value) {
        if (value === null) {
            return null;
        }
        return value.toISOString();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5jb252ZXJ0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsiY29udmVydGVycy9kYXRlL2RhdGUuY29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR3BDLE1BQU0sT0FBTyxhQUFhOzs7OztJQUN4QixJQUFJLENBQUMsS0FBVTtRQUNiLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsS0FBVTtRQUNmLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGFyc2VJU08gfSBmcm9tICdkYXRlLWZucyc7XHJcbmltcG9ydCB7IFByb3BlcnR5Q29udmVydGVyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9wcm9wZXJ0eS1jb252ZXJ0ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlQ29udmVydGVyIGltcGxlbWVudHMgUHJvcGVydHlDb252ZXJ0ZXIge1xyXG4gIG1hc2sodmFsdWU6IGFueSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHBhcnNlSVNPKHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVubWFzayh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcclxuICB9XHJcbn1cclxuIl19