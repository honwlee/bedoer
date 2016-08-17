# some questions of dojo aspect

* aspect recive params from the relative function
* use return to pass parmas for relative function

```javascript
var A = fuction() {
  constructor: function() {},
  say: function(msg) {console.log(msg)}
};

a = new A();
aspect.after(a, "say", function(info) {
  // info is equal with msg
  // if say function need msg
  // you should return this params, here is info
  // so the say function can use this parmas
  return info;
});
```
