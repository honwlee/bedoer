# create configure file to manager some common variables for app or sets of modules

### configrue.json file: constructs for the variables

```javascript
{
    "baseUrl": "http://utilhub.com/api/v1",
    "urls": { // configure for api urls (option for api selection in editor setting page)
        "1": {
            "url": "/countries",
            "alias": "1",
            "info": "countries"
        },
        "2": {
            "url": "/gender",
            "alias": "2",
            "info": "gender"
        },
        "3": {
            "url": "/codeSelect",
            "alias": "3",
            "info": "codeSelect"
        }
    },

    "editSettingKeys": { // configure for  editor setting keys
    	"code": "code",
    	"isMCheck": "isMultipleCheck",
    	"dlgH": "dialogHeight",
    	"dlgW": "dialogWidth"
    } 
}

```

### configure.js file: parse configure json file and provides public methods

```javascript
define([
    "dojo/json",
    "dojo/text!customCodeSelect/config/configure.json"
], function(JSON, configureJson) {
    var configure = JSON.parse(configureJson);
    return {
    	getUrls: function(){
    		return configure.urls
    	},

    	getUrl: function(key) {
    		return configure.baseUrl + configure.urls[key].url;
    	},

    	getEditSettingKeys: function() {
    		return configure.editSettingKeys;
    	},

    	getEditSettingKey: function(key) {
    		return configure.editSettingKeys[key];
    	}
    };
});
```

### using configure module and call the public methods

```javascript 
define([
    "customCodeSelect/Configure",
], function(configure) {
    var url = configure.getUrl("1"); // return http://utilhub.com/api/v1/countries
});
```
