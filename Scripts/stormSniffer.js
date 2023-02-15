/*
 * 解锁StormSniffer
 * [rewrite_local]
 * #StormSniffer
 * ^http[s]?:\/\/api\.x-storm\.com(:\d{2,5})?\/app/((user-profile\/)|(auth-device\/list\/))$ url script-response-body stormSniffer.js
 * [MITM]
 * hostname = *.x-storm.com
 * */

let obj = JSON.parse($response.body);
const payne = init();
const urlStr = `http://localhost:88/api/post`;

post();

function post(){
    let reqUrl = $request.url;
    let param = {
        "type":"local",
        "platform":"stormSniffer",
        "data": obj.data,
    };
    if (reqUrl.indexOf("user-profile") !== -1 || reqUrl.indexOf("auth-device") !== -1) {
        let url = { url: urlStr, headers: {"Content-Type": "application/json"}};
        //其他平台请修改platform相应的值
        url.body = JSON.stringify(param);
        //payne.msg("请求解密:",platform,url.body);
        payne.post(url, (error, response, data) => {
            payne.msg("解密成功:",data);
            obj.data = JSON.parse(data);
            let body=JSON.stringify(obj);
            payne.done(body);
        })
    }

}


function init() {
    isSurge = () => {
        return undefined === this.$httpClient ? false : true
    }
    isQuanX = () => {
        return undefined === this.$task ? false : true
    }
    getdata = (key) => {
        if (isSurge()) return $persistentStore.read(key)
        if (isQuanX()) return $prefs.valueForKey(key)
    }
    setdata = (key, val) => {
        if (isSurge()) return $persistentStore.write(key, val)
        if (isQuanX()) return $prefs.setValueForKey(key, val)
    }
    msg = (title, subtitle, body) => {
        if (isSurge()) $notification.post(title, subtitle, body)
        if (isQuanX()) $notify(title, subtitle, body)
    }
    log = (message) => console.log(message)
    get = (url, cb) => {
        if (isSurge()) {
            $httpClient.get(url, cb)
        }
        if (isQuanX()) {
            url.method = 'GET'
            $task.fetch(url).then((resp) => cb(null, {}, resp.body))
        }
    }
    post = (url, cb) => {
        if (isSurge()) {
            $httpClient.post(url, cb)
        }
        if (isQuanX()) {
            url.method = 'POST'
            $task.fetch(url).then((resp) => cb(null, {}, resp.body))
        }
    }
    done = (value = {}) => {
        $done(value)
    }
    return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}