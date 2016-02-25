// Passing Variables by References

var grades = [15, 32];

function addGrade (gradesArr){
  gradesArr.push(35);
  debugger;
}

addGrade(grades);
console.log(grades);




console.log("=================================");




var person = {
  name: 'Kevin',
  age: 1
};

function addAge (obj){
  obj.age = 2;

  // obj = {
  //   name: 'Kevin Rasydan',
  //   age: 3
  // }
}

addAge(person);
console.log(person);
