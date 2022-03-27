# this

자바스크립트의 예약어로 **자기 참조 변수**를 뜻한다.

<br>

## 상황에 따라 달라지는 this

this는 함수를 호출할 때 결정된다.

### 전역 공간

전역 공간에서 this는 전역 객체(JS: window / Node.js: global)를 참조한다.  
전역변수를 선언하면 자바스크립트 엔진은 이를 **전역객체의 프로퍼티**로 할당한다.  
전역변수를 삭제하는 것이 안되는 이유는 추가적으로 해당 프로퍼티의 configurable을 false로 정의하기 때문이다.

### 함수 VS 메서드

메서드로 호출한 경우, 간단하게 호출 주체 this는 함수명 앞(마지막 점 앞에 명시된 객체)의 객체이다.  
함수로서 호출한 경우, this는 전역객체를 참조한다.

```javascript
var obj1 = {
  outer: function () {
    console.log(this); // obj1

    var innerFunc = function () {
      console.log(this); // window(전역객체) / obj2
    };
    innerFunc();

    var obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod();
  },
};
obj1.outer();
```

- this를 바인딩하지 않는 법  
  ES6에서의 화살표 함수는 this가 전역객체를 바라보는 문제를 해결하기 위해 등장하였다.  
  this를 바인딩하는 과정이 제외되었고 스코프체인상 가장 가까운 this에 접근한다.

### 콜백함수

해당 콜백 함수의 제어권을 넘겨받은 함수가 정의한 바에 따른다. 정의하지 않은 경우 전역객체를 참조한다.

### 생성자

> 생성자(클래스)란, 인간의 공통 특성 몇가지의 집합을 정의한 것이고 인간은 저마다 개성이 있으므로 인간 개개인은 클래스에 속하는 인스턴스이다.

생성자에서의 this는 생성될 인스턴스를 참조한다.

<br>

## 명시적으로 this를 바인딩하는 방법

### call

```javascript
var func = function (a, b, c) {
  console.log(this, a, b, c);
};
func(1, 2, 3); // window 1 2 3
func.call({ x: 1 }, 4, 5, 6); // { x: 1 } 4 5 6
```

첫 번째 인자를 this로 바인딩한다. 임의의 객체를 this로 지정할 수 있다.

### apply

```javascript
var func = function (a, b, c) {
  console.log(this, a, b, c); // {x: 1} 4 5 6
};
func.apply({ x: 1 }, [4, 5, 6]); // 배열로 넘겨주어야 한다
```

call 메서드와 유사하지만 두번째 인자를 **배열**로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정한다는 차이가 있다.

### 💡 call/apply를 활용하는 방법, from

```javascript
var obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};
var arr = Array.from(obj);
console.log(arr); // ['a', 'b', 'c']
```

순회 가능한 모든 종류의 데이터 타입을 배열로 전환할 수 있다.

### bind

ES5에서 추가된 기능이다. this 및 함수에 넘길 인수를 일부 지정해서 새로운 함수를 만든다.

> 목적

- 함수에 this를 미리 적용하는 것
- 부분 적용 함수 구현

```javascript
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
func(1, 2, 3, 4); // window 1 2 3 4

var bindFunc1 = func.bind({ x: 1 }); // this 미리 지정
bindFunc1(5, 6, 7, 8); // { x: 1 } 5 6 7 8

var bindFunc2 = func.bind({ x: 1 }, 4, 5); // 부분 적용 함수
bindFunc2(6, 7); // { x: 1 } 4 5 6 7
bindFunc2(8, 9); // { x: 1 } 4 5 8 9
```
