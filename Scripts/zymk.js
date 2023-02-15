const appName = '知音漫客'
const openIdKey = 'openIdKey'
const payne = init()
let openid = payne.getdata(openIdKey);
payne.msg(`🔔 ${appName}`, `获取openid:` + openid, `准备签到`);

const url = `https://user-api.zymk.cn/app_api/v5/sign_signaction/`;
const method = `POST`;
const headers = {
    'm-request-did' : `kvuvm9QDyLtPnqN+3MPZsN4CRehzt+f1zV8LkZ+7IqCvKLjY/mRti1iUq+LjfzPZ`,
    'Accept-Encoding' : `gzip, deflate, br`,
    'client-type' : `iphone`,
    'loglevel' : `2`,
    'Connection' : `keep-alive`,
    'Content-Type' : `application/x-www-form-urlencoded`,
    'client-version' : `3.9.3`,
    'm-request-id' : `a9e85cbbbace6d76c9e3a01cc9dc7ea0`,
    'User-Agent' : `MKWeekly/3.9.3 (iPhone; iOS 14.4; Scale/2.00)`,
    'Host' : `user-api.zymk.cn`,
    'Accept-Language' : `zh-Hans-CN;q=1, en-CN;q=0.9`,
    'Accept' : `*/*`
};
const body = ``+openid+``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    // console.log(response.statusCode + "\n\n" + response.body);
    payne.msg(`🔔 ${appName}`, `执行完成：`, response.body);
    $done();
}, reason => {
    // console.log(reason.error);
    payne.msg(`🔔 ${appName}`, `执行失败:`, response.body);
    $done();
});

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
