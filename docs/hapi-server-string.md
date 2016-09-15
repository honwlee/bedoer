### should be careful when using string in hapi server file

```javascript
const postHandler = function(name) {
    return function(request, reply) {
        var newName = name;
        if (solution === "QC") newName = name + "__qc";
        // if (solution === "QC") name = name + "__qc"; // this is dangerous way
        Fs.readFile("./data/" + newName + ".json", "utf8", function(err, data) {
            if (err) {
                throw err;
                console.log("error in ----->" + newName);
            }
            reply(JSON.parse(data));
        });
    };
};
server.route([{
    method: 'POST',
    path: '/desktop',
    config: {
        handler: postHandler("desktop")
    }
}
```

when access with desktop multiple times using name += "__qc" when append many "__qc" to name string
