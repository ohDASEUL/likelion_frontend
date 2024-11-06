//ts 에서 interface 는 다른 언어 처럼 class 에 어떤 멤버(변수, 함수)가 
//꼭 선언되어 있게 강제하기 위해서 사용
//+
//클래스와 관련없이.. 타입을 지정하는 용도로도 사용이 가능.. 
var d1 = { id: 10, name: 'kim' };
var d2 = { id: 10, name: 'kim', age: 10 };
function t1(argFun) { }
t1(function (no) { return 10; });
var MyClass = /** @class */ (function () {
    function MyClass() {
        this.data1 = 10;
        this.data2 = 20;
    }
    MyClass.prototype.some1 = function () {
        return true;
    };
    MyClass.prototype.some2 = function () {
        return true;
    };
    return MyClass;
}());
