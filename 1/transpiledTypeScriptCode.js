var userName = "Masum";
var hasLoggedIn = true;
userName += " Gökyüz";
console.log(hasLoggedIn);
// true Gökyüz
/*****************************************/
var myNumber = 10;
var myDecimal = 10.1;
/*****************************************/
var myRegex = /foo/;
/*****************************************/
var names = ["Masum", "Gökyüz"];
var names2 = ["Masum", "Gökyüz"];
/*****************************************/
var myNumbers = [1, 2, 3, 4, 5];
var myNumbers2 = [1, 2, 3, 4, 5];
var myPerson = {
  firstName: "Masum",
  lastName: "Gökyüz",
};
// "myPerson." yazdığımızda artık firstName ve lastName özelliklerini görebiliriz.
/*****************************************/
// Utility Type: "Record<typeX,typeY>"
var ids = {
  10: "a",
  20: "b",
};
ids[30] = "c";
// Record utility sayesinde aşağıdaki gibi bir if ifadesinde tip hatası almayız.
if (ids[30] === "D") {
  // ...
}
/*****************************************/
for (var i = 0; i < 10; i++) {
  console.log(i);
}
/*****************************************/
[1, 2, 3, 4, 5].forEach(function (n) {
  return console.log(n);
});
[6, 7, 8, 9, 10].map(function (n) {
  return console.log(n);
});
var out = [6, 7, 8, 9, 10].map(function (n) {
  return n * 10;
});
var out2 = [6, 7, 8, 9, 10].map(function (n) {
  return n * 10;
});
// template string kullandığımız için string array olur.
var outButAsString = [6, 7, 8, 9, 10].map(function (n) {
  return "".concat(n * 10);
});
var outButAsString2 = [6, 7, 8, 9, 10].map(function (n) {
  return "".concat(n * 10);
});
