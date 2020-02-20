/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { JsonApiNestedModel } from '../../models/json-nested.model';
/** @type {?} */
export const DEFAULT_OPTIONS = {
    nullValue: false,
    hasMany: false
};
/**
 * @template T
 */
export class JsonModelConverter {
    /**
     * @param {?} model
     * @param {?=} options
     */
    constructor(model, options = {}) {
        this.modelType = model; // <ModelType<T>>model
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    mask(value) {
        if (!value && !this.options.nullValue) {
            if (this.options.hasMany) {
                return [];
            }
            return new this.modelType();
        }
        /** @type {?} */
        let result = null;
        if (this.options.hasMany) {
            if (!Array.isArray(value)) {
                throw new Error(`ERROR: JsonModelConverter: Expected array but got ${typeof value}.`);
            }
            result = [];
            for (const item of value) {
                if (item === null) {
                    continue;
                }
                /** @type {?} */
                let temp;
                if (typeof item === 'object') {
                    temp = new this.modelType();
                    temp.fill(item);
                }
                else {
                    temp = item;
                }
                result.push(temp);
            }
        }
        else {
            if (!(value instanceof this.modelType)) {
                result = new this.modelType();
                result.fill(value);
            }
            else {
                result = value;
            }
        }
        return result;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    unmask(value) {
        if (!value) {
            return value;
        }
        /** @type {?} */
        let result = null;
        if (Array.isArray(value)) {
            result = [];
            for (const item of value) {
                if (!item) {
                    continue;
                }
                if (item instanceof JsonApiNestedModel) {
                    item.nestedDataSerialization = true;
                    result.push(item.serialize());
                    item.nestedDataSerialization = false;
                }
                else {
                    result.push(item);
                }
            }
        }
        else {
            if (value instanceof JsonApiNestedModel) {
                value.nestedDataSerialization = true;
                result = value.serialize();
                value.nestedDataSerialization = false;
            }
            else {
                result = value;
            }
        }
        return result;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    JsonModelConverter.prototype.modelType;
    /**
     * @type {?}
     * @private
     */
    JsonModelConverter.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1tb2RlbC5jb252ZXJ0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsiY29udmVydGVycy9qc29uLW1vZGVsL2pzb24tbW9kZWwuY29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFFcEUsTUFBTSxPQUFPLGVBQWUsR0FBNkI7SUFDdkQsU0FBUyxFQUFFLEtBQUs7SUFDaEIsT0FBTyxFQUFFLEtBQUs7Q0FDZjs7OztBQUVELE1BQU0sT0FBTyxrQkFBa0I7Ozs7O0lBSTdCLFlBQVksS0FBUSxFQUFFLFVBQW9DLEVBQUU7UUFDMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxzQkFBc0I7UUFDOUMsSUFBSSxDQUFDLE9BQU8scUJBQU8sZUFBZSxFQUFLLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7O0lBRUQsSUFBSSxDQUFDLEtBQVU7UUFDYixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDckMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDeEIsT0FBTyxFQUFFLENBQUM7YUFDWDtZQUNELE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDN0I7O1lBRUcsTUFBTSxHQUFHLElBQUk7UUFDakIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBcUQsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZGO1lBQ0QsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNaLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO2dCQUN4QixJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7b0JBQ2pCLFNBQVM7aUJBQ1Y7O29CQUNHLElBQUk7Z0JBQ1IsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQzVCLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDakI7cUJBQU07b0JBQ0wsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDYjtnQkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25CO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3RDLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQjtpQkFBTTtnQkFDTCxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ2hCO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxLQUFVO1FBQ2YsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7O1lBQ0csTUFBTSxHQUFHLElBQUk7UUFDakIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDWixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtnQkFDeEIsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVCxTQUFTO2lCQUNWO2dCQUNELElBQUksSUFBSSxZQUFZLGtCQUFrQixFQUFFO29CQUN0QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO29CQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO29CQUM5QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDO2lCQUN0QztxQkFBTTtvQkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNuQjthQUNGO1NBQ0Y7YUFBTTtZQUNMLElBQUksS0FBSyxZQUFZLGtCQUFrQixFQUFFO2dCQUN2QyxLQUFLLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO2dCQUNyQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUMzQixLQUFLLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDO2FBQ3ZDO2lCQUFNO2dCQUNMLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDaEI7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjs7Ozs7O0lBN0VDLHVDQUF1Qjs7Ozs7SUFDdkIscUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk1vZGVsQ29udmVydGVyQ29uZmlnIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9qc29uLW1vZGVsLWNvbnZlcnRlci1jb25maWcuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUHJvcGVydHlDb252ZXJ0ZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3Byb3BlcnR5LWNvbnZlcnRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBKc29uQXBpTmVzdGVkTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvanNvbi1uZXN0ZWQubW9kZWwnO1xyXG5cclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfT1BUSU9OUzogSnNvbk1vZGVsQ29udmVydGVyQ29uZmlnID0ge1xyXG4gIG51bGxWYWx1ZTogZmFsc2UsXHJcbiAgaGFzTWFueTogZmFsc2VcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uTW9kZWxDb252ZXJ0ZXI8VD4gaW1wbGVtZW50cyBQcm9wZXJ0eUNvbnZlcnRlciB7XHJcbiAgcHJpdmF0ZSBtb2RlbFR5cGU6IGFueTsgLy8gTW9kZWxUeXBlPFQ+XHJcbiAgcHJpdmF0ZSBvcHRpb25zOiBKc29uTW9kZWxDb252ZXJ0ZXJDb25maWc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG1vZGVsOiBULCBvcHRpb25zOiBKc29uTW9kZWxDb252ZXJ0ZXJDb25maWcgPSB7fSkge1xyXG4gICAgdGhpcy5tb2RlbFR5cGUgPSBtb2RlbDsgLy8gPE1vZGVsVHlwZTxUPj5tb2RlbFxyXG4gICAgdGhpcy5vcHRpb25zID0gey4uLkRFRkFVTFRfT1BUSU9OUywgLi4ub3B0aW9uc307XHJcbiAgfVxyXG5cclxuICBtYXNrKHZhbHVlOiBhbnkpOiBUIHwgQXJyYXk8VD4ge1xyXG4gICAgaWYgKCF2YWx1ZSAmJiAhdGhpcy5vcHRpb25zLm51bGxWYWx1ZSkge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmhhc01hbnkpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5ldyB0aGlzLm1vZGVsVHlwZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5oYXNNYW55KSB7XHJcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVSUk9SOiBKc29uTW9kZWxDb252ZXJ0ZXI6IEV4cGVjdGVkIGFycmF5IGJ1dCBnb3QgJHt0eXBlb2YgdmFsdWV9LmApO1xyXG4gICAgICB9XHJcbiAgICAgIHJlc3VsdCA9IFtdO1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcclxuICAgICAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0ZW1wO1xyXG4gICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIHRlbXAgPSBuZXcgdGhpcy5tb2RlbFR5cGUoKTtcclxuICAgICAgICAgIHRlbXAuZmlsbChpdGVtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGVtcCA9IGl0ZW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bHQucHVzaCh0ZW1wKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiB0aGlzLm1vZGVsVHlwZSkpIHtcclxuICAgICAgICByZXN1bHQgPSBuZXcgdGhpcy5tb2RlbFR5cGUoKTtcclxuICAgICAgICByZXN1bHQuZmlsbCh2YWx1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0ID0gdmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICB1bm1hc2sodmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgIHJlc3VsdCA9IFtdO1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcclxuICAgICAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIEpzb25BcGlOZXN0ZWRNb2RlbCkge1xyXG4gICAgICAgICAgaXRlbS5uZXN0ZWREYXRhU2VyaWFsaXphdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICByZXN1bHQucHVzaChpdGVtLnNlcmlhbGl6ZSgpKTtcclxuICAgICAgICAgIGl0ZW0ubmVzdGVkRGF0YVNlcmlhbGl6YXRpb24gPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBKc29uQXBpTmVzdGVkTW9kZWwpIHtcclxuICAgICAgICB2YWx1ZS5uZXN0ZWREYXRhU2VyaWFsaXphdGlvbiA9IHRydWU7XHJcbiAgICAgICAgcmVzdWx0ID0gdmFsdWUuc2VyaWFsaXplKCk7XHJcbiAgICAgICAgdmFsdWUubmVzdGVkRGF0YVNlcmlhbGl6YXRpb24gPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQgPSB2YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuIl19