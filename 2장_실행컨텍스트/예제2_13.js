var a = 1;

var outer = function () {
  var inner = function () {
    console.log(a);
    var a = 3;
  };
  inner();
  console.log(a);
};

outer();
console.log(a);

// 위의 코드를 실행 순서대로 풀어서 쓴다면,,,?

var a; // 1번
var outer; // 2번

outer = function () {
  // 4번
  var inner; // 5번
  inner = function () {
    // 7번
    var a; // 8번
    console.log(a); // 9번  스코프체인에서 첫번째 인자 a에 접근하게 되기 때문에 undefined. 변수 은닉화
    a = 3; // 10번
  };
  inner(); // 6번
  console.log(a); // 11번
};

outer(); //3번
console.log(a); // 12번
