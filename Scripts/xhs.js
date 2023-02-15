/*
#小黄书
^http[s]?:\/\/.+\.((.*aussev.*))\.(com|tips|app|xyz|net|tv|org)(:\d{2,5})?\/v2/.+$ url script-request-body xhs.js
[MITM]
,*.aussev.*
下载链接：
https://cbazxc.cfuyong.com/download.html
* */

let obj = JSON.parse($response.body);
console.log(strToHexCharCode(obj));


function strToHexCharCode(str) {
    if(str === "")
        return "";
    var hexCharCode = [];
    hexCharCode.push("0x");
    for(var i = 0; i < str.length; i++) {
        hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
}

function hexCharCodeToStr(hexCharCodeStr) {
    var trimedStr = hexCharCodeStr.trim();
    var rawStr =
        trimedStr.substr(0,2).toLowerCase() === "0x"
            ?
            trimedStr.substr(2)
            :
            trimedStr;
    var len = rawStr.length;
    if(len % 2 !== 0) {
        alert("Illegal Format ASCII Code!");
        return "";
    }
    var curCharCode;
    var resultStr = [];
    for(var i = 0; i < len;i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}


