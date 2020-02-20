/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} config
 * @return {?}
 */
export function HasMany(config) {
    if (config === void 0) { config = {}; }
    return (/**
     * @param {?} target
     * @param {?} propertyName
     * @return {?}
     */
    function (target, propertyName) {
        /** @type {?} */
        var annotations = Reflect.getMetadata('HasMany', target) || [];
        annotations.push({
            propertyName: propertyName,
            relationship: config.key || propertyName
        });
        Reflect.defineMetadata('HasMany', annotations, target);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLW1hbnkuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItanNvbmFwaS8iLCJzb3VyY2VzIjpbImRlY29yYXRvcnMvaGFzLW1hbnkuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTSxVQUFVLE9BQU8sQ0FBQyxNQUFnQjtJQUFoQix1QkFBQSxFQUFBLFdBQWdCO0lBQ3RDOzs7OztJQUFPLFVBQUMsTUFBVyxFQUFFLFlBQTZCOztZQUMxQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRTtRQUVoRSxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ2YsWUFBWSxjQUFBO1lBQ1osWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUksWUFBWTtTQUN6QyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekQsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBIYXNNYW55KGNvbmZpZzogYW55ID0ge30pIHtcclxuICByZXR1cm4gKHRhcmdldDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyB8IHN5bWJvbCkgPT4ge1xyXG4gICAgY29uc3QgYW5ub3RhdGlvbnMgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdIYXNNYW55JywgdGFyZ2V0KSB8fCBbXTtcclxuXHJcbiAgICBhbm5vdGF0aW9ucy5wdXNoKHtcclxuICAgICAgcHJvcGVydHlOYW1lLFxyXG4gICAgICByZWxhdGlvbnNoaXA6IGNvbmZpZy5rZXkgfHwgcHJvcGVydHlOYW1lXHJcbiAgICB9KTtcclxuXHJcbiAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKCdIYXNNYW55JywgYW5ub3RhdGlvbnMsIHRhcmdldCk7XHJcbiAgfTtcclxufVxyXG4iXX0=