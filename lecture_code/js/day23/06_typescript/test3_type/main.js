//데이터 타입이 지정되면 그 타입에 맞는 데이터가 대입되어야 한다.
var data = 10;
// data = 'hello'//error...
//any 타입.. 모든 타입의 데이터 대입 가능.. 권장하지는 않는다..
var data1 = 10;
data1 = 'hello';
data1 = true;
data1 = {};
//타입 유추 기법도 제공된다.. 변수 선언시에 타입을 지정하지 않고.. 대입되는
//데이터로 타입이 유추...
//js 와 다르다.. js 처럼 사용하는 것은 any...
//개발자가 타입을 지정하지 않는 것 뿐이지 .. 초기 데이터에 의해 타입이 고정..
var data2 = 10;
data2 = 20;
// data2 = 'hello'//error... 
//void 도 타입임으로 변수 타입으로 지정이 가능하기는 하지만..
//undefined 만 대입이 가능함으로.. 변수 타입으로 사용하는 것은 의미가 없다..
var data3 = undefined;
// data3 = null//error 
// data3 = 10//error
//void 는 함수의 리턴 타입.. 
function f1() {
    //함수 내에서 리턴 타입의 데이터를 리턴시켜야.. 
    return 10;
}
function f2() {
    // return 10//error
}
//npx tsc main.ts 로 컴파일 시켜서 테스트.. 
//generic............................................
//타입을 지정해야 하는 곳에서.. 형식타입으로 선언하고.. 
//이후에 이용하는 곳에서 구체적인 타입을 지정해서 사용하는 기법.... 
//배열이 generic 으로 선언... 
var a1 = [10, 20];
var a2 = ['hello', 'world'];
//함수를 하나 선언한다고 가정하자..
function myFun1(arg1) { }
myFun1(10); //함수의 매개변수가 number 타입으로 고정.. 
//함수를 만드는 개발자 입장에서 타입을 고정하지 않고.. 이후에.. number 혹은 string 등
//다양한 타입으로 이용되게 하고자 한다면?
//타입이 없을 수는 없다.. 고정시킬 수도 없고.. 형식 타입으로 선언한다..
function myFun2(arg) { }
myFun2(10);
myFun2('hello');
//형식 타입은 여러개 선언 가능, T 등의 형식 타입은 임의 알파벳.. 
function myFun3(arg1, arg2) { }
myFun3('hello', 10);
//typealias.... type 이라는 예약어로 개발자 임의 이름의 타입을 선언.. 
var b1;
b1 = { id: 10, name: 'kim' };
var b2;
var b3 = { id: 10, name: 'kim' };
//optional.... 생략 가능한 데이터... 주로 함수의 매개변수, 객체의 멤버....
function some(arg1, arg2) { }
// some(10)//error.. 함수의 매개변수의 갯수 및 순서를 맞추어서 호출해야..
some(10, 20);
//함수의 매개변수를 선언하기는 하는데.. 데이터를 주지 않아도 되는 매개변수가 있다면..
function some1(arg1, arg2) { }
some1();
some1(10);
some1(10, 20);
//함수의 매개변수에 default(전달 안될때의 기본 값) 값을 지정하면 
//그 매개변수 값이 전달이 안되었다고 하더라도 값을 가지는 것임으로 optional 로 선언 못한다.
function some2(arg1, arg2) {
    if (arg1 === void 0) { arg1 = 0; }
    if (arg2 === void 0) { arg2 = 0; }
}
some2();
some2(10);
some2(10, 20);
//optional.. 함수 매개변수 뿐만 아니라.. object literal 멤버 선언에도 자주 이용..
var obj1;
obj1 = { id: 10, name: 'kim' };
var obj2 = { id: 10, name: 'kim', age: 10, address: 'seoul' };
