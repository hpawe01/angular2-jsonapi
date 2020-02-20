/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} config
 * @return {?}
 */
export function HasMany(config = {}) {
    return (/**
     * @param {?} target
     * @param {?} propertyName
     * @return {?}
     */
    (target, propertyName) => {
        /** @type {?} */
        const annotations = Reflect.getMetadata('HasMany', target) || [];
        annotations.push({
            propertyName,
            relationship: config.key || propertyName
        });
        Reflect.defineMetadata('HasMany', annotations, target);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLW1hbnkuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbmFwaS8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvaGFzLW1hbnkuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTSxVQUFVLE9BQU8sQ0FBQyxTQUFjLEVBQUU7SUFDdEM7Ozs7O0lBQU8sQ0FBQyxNQUFXLEVBQUUsWUFBNkIsRUFBRSxFQUFFOztjQUM5QyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRTtRQUVoRSxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ2YsWUFBWTtZQUNaLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFJLFlBQVk7U0FDekMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gSGFzTWFueShjb25maWc6IGFueSA9IHt9KSB7XHJcbiAgcmV0dXJuICh0YXJnZXQ6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcgfCBzeW1ib2wpID0+IHtcclxuICAgIGNvbnN0IGFubm90YXRpb25zID0gUmVmbGVjdC5nZXRNZXRhZGF0YSgnSGFzTWFueScsIHRhcmdldCkgfHwgW107XHJcblxyXG4gICAgYW5ub3RhdGlvbnMucHVzaCh7XHJcbiAgICAgIHByb3BlcnR5TmFtZSxcclxuICAgICAgcmVsYXRpb25zaGlwOiBjb25maWcua2V5IHx8IHByb3BlcnR5TmFtZVxyXG4gICAgfSk7XHJcblxyXG4gICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YSgnSGFzTWFueScsIGFubm90YXRpb25zLCB0YXJnZXQpO1xyXG4gIH07XHJcbn1cclxuIl19