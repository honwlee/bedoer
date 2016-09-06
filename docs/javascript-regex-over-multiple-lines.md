### replace multiple line content

```javascript
  "begin": "SCQM000E33_HandlerBegin",
  "handler": "SCQM000E33_Handler",
  "end": "SCQM000E33_HandlerEnd"
```
  
    Reg: "begin": "(([^\s]+)_Handler(\w)*)",(.|[\r\n])(\s)+"handler": "([^\s]+)",(.|[\r\n])(\s+)"end": "([^\s]+)"

```javascript
  "begin": {
    "name": "$2_HandlerBegin"
  },
  "handler": {
    "name": "$2_Handler"
  },
  "end": {
    "name": "$2_HandlerEnd"
  }
```

[how-to-use-javascript-regex-over-multiple-lines](http://stackoverflow.com/questions/1979884/how-to-use-javascript-regex-over-multiple-lines)
