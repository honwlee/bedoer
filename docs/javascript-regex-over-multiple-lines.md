### replace multiple line content

### 1
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

### 2
```
  所属部署コード	OrganizationCode
  所属部署名(組織名)	OrganizationName
  役職	Position
  メールアドレス	MailAddress
  ユーザIDリスト	UserIdList
  ユーザ名リスト	UserNameList
  組織名リスト	OrganizationNameList
  役職リスト	PositionList
  メールアドレスリスト	MailAddressList
```

    Reg: ([^\s]+)\s+(\w+)
  
```javascript
"$2": {
    "desc": "$1",
    "propertyName": "$2"
},

```
