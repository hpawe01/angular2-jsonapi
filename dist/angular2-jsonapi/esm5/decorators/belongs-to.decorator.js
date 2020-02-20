/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} config
 * @return {?}
 */
export function BelongsTo(config) {
    if (config === void 0) { config = {}; }
    return (/**
     * @param {?} target
     * @param {?} propertyName
     * @return {?}
     */
    function (target, propertyName) {
        /** @type {?} */
        var annotations = Reflect.getMetadata('BelongsTo', target) || [];
        annotations.push({
            propertyName: propertyName,
            relationship: config.key || propertyName
        });
        Reflect.defineMetadata('BelongsTo', annotations, target);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVsb25ncy10by5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1qc29uYXBpLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9iZWxvbmdzLXRvLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQU0sVUFBVSxTQUFTLENBQUMsTUFBZ0I7SUFBaEIsdUJBQUEsRUFBQSxXQUFnQjtJQUN4Qzs7Ozs7SUFBTyxVQUFDLE1BQVcsRUFBRSxZQUE2Qjs7WUFDMUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFFbEUsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNmLFlBQVksY0FBQTtZQUNaLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFJLFlBQVk7U0FDekMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNELENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gQmVsb25nc1RvKGNvbmZpZzogYW55ID0ge30pIHtcclxuICByZXR1cm4gKHRhcmdldDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyB8IHN5bWJvbCkgPT4ge1xyXG4gICAgY29uc3QgYW5ub3RhdGlvbnMgPSBSZWZsZWN0LmdldE1ldGFkYXRhKCdCZWxvbmdzVG8nLCB0YXJnZXQpIHx8IFtdO1xyXG5cclxuICAgIGFubm90YXRpb25zLnB1c2goe1xyXG4gICAgICBwcm9wZXJ0eU5hbWUsXHJcbiAgICAgIHJlbGF0aW9uc2hpcDogY29uZmlnLmtleSB8fCBwcm9wZXJ0eU5hbWVcclxuICAgIH0pO1xyXG5cclxuICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoJ0JlbG9uZ3NUbycsIGFubm90YXRpb25zLCB0YXJnZXQpO1xyXG4gIH07XHJcbn1cclxuIl19