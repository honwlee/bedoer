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


``` javascript
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['myModule', 'myOtherModule'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('myModule'), require('myOtherModule'));
    } else {
        // Browser globals (Note: root is window)
        root.returnExports = factory(root.myModule, root.myOtherModule);
    }
}(this, function(myModule, myOtherModule) {
    // Methods
    function notHelloOrGoodbye() {}; // A private method
    function hello() {}; // A public method because it's returned (see below)
    function goodbye() {}; // A public method because it's returned (see below)

    // Exposed public methods
    return {
        hello: hello,
        goodbye: goodbye
    }
}));
```
