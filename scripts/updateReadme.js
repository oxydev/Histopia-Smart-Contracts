const fs = require('fs');

console.log("updateReadme.ts");
fs.readFile( "deploymentScripts/address.json",  (err    , content) => {
    let json = {};
    try {
        json = JSON.parse(content);
    }
    catch (e) {
        console.log("Error:", e);
        return
    }
    fs.readFile("Readme.md",  (err, content) => {
        let s = content.toString();
        console.log(s);
    })
})
