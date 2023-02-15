/*
app下载地址：商店搜索：知音漫客
^http[s]?:\/\/.+\.zymk\.(com|cn|xyz|net|org)(:\d{2,5})?\/((app_api)|(v5)|(v1))\/.+$ url script-response-body zymkOpenId.js
MITM = *.zymk.cn
公众号：木木IOS分享 原十三座州府
群1077223830
*/
const appName = '知音漫客'
const openIdKey = 'openIdKey'
const url = $request.url
const payne = init()
if (url.indexOf('v1/getuserinfo/') !== -1) {
    let obj = $request.body;
    payne.msg(obj)
    payne.setdata(obj,openIdKey);
    payne.msg(`🔔 ${appName}`, ``, `获取openid:` + obj);

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
