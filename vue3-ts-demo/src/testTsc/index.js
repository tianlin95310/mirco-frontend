var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Humen = /** @class */ (function () {
    function Humen() {
    }
    return Humen;
}());
var Men = /** @class */ (function (_super) {
    __extends(Men, _super);
    function Men() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Men;
}(Humen));
// 将ts文件翻译成js文件以及.d.ts文件
// tsc index.ts --watch -d
