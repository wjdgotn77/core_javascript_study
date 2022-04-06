# This

다른 대부분의 객체지향 언어에서 `this`는 클래스로 생성한 인스턴스 객체를 의미.  
클래스에서만 사용할 수 있기 때문에 혼란의 여지가 적다.

자바스크립트에서의 `this` 는 상황에 따라 `this`가 바라보는 대상이 달라짐.

## 상황에 따라 달라지는 this.

자바스크립트 `this`는 실행컨텍스트가 생성될 때 함께 결정.  
실행컨텍스트는 함수를 호출할 때 생성되기때문에 this는 함수를 호출할 때 결정된다.  
자바스크립트에서의 모든 함수(arrow function 제외)의 내부에서는 별도의 선언없이 `this`라는 키워드를 사용할 수 있다.

### 💡 함수를 어떤 방식으로 호출하느냐. 에 따라 this가 바라보는 것이 달라진다.

자바스크립트의 this 키워드는 함수 내부에서 사용되기 때문에 this 값은 this 를 포함하고 있는 함수가 "어떻게 실행되느냐"에 따라 결정된다.  
함수 선언 시점에 결정되는 값이 아니라, **함수 실행 시점에 결정되는 값**입니다.
this 값을 판별하기 위해서는 반드시 함수의 실행문을 찾아야 한다.  
함수의 실행문을 찾고, 그 함수가 어떻게 실행되었는지만 판별한다면 `this` 값은 쉽게 판별할 수 있다.

### 함수 호출 방식

1. Regular Function Call (일반 함수 호출) | `func();`
2. Dot Notation | `count.age();`
3. `Call`, `Apply`, `Bind`
4. New Keyword (생성자 함수)

## Regular Function Call

일반 함수 실행 방식일 경우, 해당 함수의 this 값은 Global Object.  
브라우저 = `window` || Node = `global`

### 💡 예외 Strict Mode.

[Strict Mode](https://docs.microsoft.com/ko-kr/scripting/javascript/advanced/strict-mode-javascript)에서 함수가 일반 함수 실행 방식으로 실행되었을 경우, `this` 값은 Global Object가 아닌 `undefined`.

```js
'use strict';

var name = 'haesoo';

function foo() {
  console.log(this.name);
}

foo(); // undefined
```

> **Summary**  
> 일반 함수 실행 방식일 경우,
>
> - Non Strict Mode: `Global Object`
> - Strict Mode: `undefined`

## Dot Notation

Dot Notation을 이용하여 함수를 실행할 경우, 해당 함수 내부의 `this` 는 **Dot 앞에 있는 객체** 를 가리키게 된다.

```js
function makePerson(name, age) {
  return {
    name,
    age,
    verifyAge: () => {
      return this.age > 21;
    },
  };
}

const haesoo = makePerson('haesoo', 29);

if (haesoo.verifyAge()) {
  console.log('술 고 !');
} else {
  console.log('돌아가');
}

// "돌아가" 출력
// this.age 가 화살표함수로 작성되었고 가장 가까운 객체의 this를 따르는데 없기때문에 undefined.
```

## 명시적 this Binding (Call, Apply, Bind)

### Function.prototype.call

```js
function age() {
  console.log(this.age);
}

const person = {
  age: 20,
};

// call 메소드를 이용한 함수 실행
age.call(person);
```

예제에서 `age.call(person)` 구문은 두 가지 기능을 한다.

1. `age` 함수의 `this`를 첫 번째 인자로 받은 `person`으로 설정.
2. `age` 함수를 실행. (함수 내부 구문들이 실행.)

**✅ `.call` 메소드는 첫 번째 인자로 받은 값을 `this`로 설정하여 함수를 실행.**

### Function.prototype.apply

```js
function foo(a, b, c) {
  console.log(this.age);
  console.log(a + b + c);
}

const ken = {
  age: 35,
};

foo.apply(ken, [1, 2, 3]);
```

예제에서 `.call` 메소드와 유사하다는 것을 알 수 있다. 단지 차이점은 인자의 갯수.  
`.apply` 메소드는 두 개의 인자만을 받고, 첫 번째 인자는 `this` 값으로 사용되며, 두 번째 인자는 반드시 배열이여야만 하고 해당 배열의 요소들이 함수의 인자로 전달.

**✅ `.apply` 메소드는 2개의 인자 만을 받고, 첫 번째 인자는 `this` 값으로 사용되며, 두 번째 인자는 반드시 배열이여야만 하고 해당 배열의 요소들이 함수의 인자로 전달된다. 메소드가 사용된 함수를 실행한다는 사실은 변함이 없다.**

### `.call`과 `.apply` 요약

**공통점**

- 함수를 실행하는 함수.
- 첫 번째 인자를 `this` 값으로 설정한다.
- **[중요]** 메소드가 사용된 함수를 실행시킨다.

**차이점**

- `call` 메소드: 첫 번째 인자를 제외한 나머지를 모두 `.call` 이 사용된 함수의 인자로 전달한다.
- `apply` 메소드: 두 번째 인자로 배열을 받을 수 있으며, 해당 배열의 모든 요소들을 함수의 인자로 전달한다.

즉, `.call` 메소드는 받는 인자의 갯수 제한이 없는 반면에 `.apply` 메소드는 단 2개의 인자 만을 받을 수 있고 두 번째 인자는 반드시 배열.

### Function.prototype.bind

bind 메소드는 "새로운 함수"를 반환.  
반환된 이 함수를 실행해야 원본 함수가 실행.
`bind` 메소드는 받을 수 있는 인자 갯수에 대한 제한이 없다.  
`bind`가 반환한 함수 또한 마찬가지.

**✅ `bind` 메소드는 "새로운 함수"를 반환. 반환된 이 함수를 실행해야 원본 함수가 실행.**
