###
[https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.3jogcvnoy](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.3jogcvnoy)
```javascript
var greeting = "hello",
    say = (function(str) {
        return {
            execute: function(msg) {
                console.log("greeting is: " + str + " and msg is: " + msg);
            }
        };
    })(greeting);
say.execute("world!");

---> greeting is: hello and msg is: world!
```
