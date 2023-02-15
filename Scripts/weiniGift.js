/*
学习圈x第一天之唯你反向刷礼物(意思就是主播给你送礼物)
[rewrite_local]
#唯你
^http[s]?:\/\/.+\.cycytea\.cn(:\d{2,5})?\/v1/.+$ url script-request-body weiniGift.js

[MITM]
hostname: hzapi.cycytea.cn

下载链接：
https://weinishare.mulancm.com/down.html?account_id=106907lili_1
*/
payne.log('修改请求参数:');
let obj = JSON.parse($response.body);
const payne = init();
let url = $request.url;
let reqBody = $request.body
const urlStr = `/v1/gift/consume`;

if (url.indexOf(urlStr) !== -1) {
    payne.log('请求body:' + reqBody);
}
let body=JSON.stringify(obj);
payne.done(body);

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