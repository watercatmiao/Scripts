/*
作者伟人q:55749353
下载地址:
「友色」高清流畅 上万小视频每日免费看，苍老师等你。
                                请小主猛戳下面，不怕疼喔，你懂的↓↓↓
https://cofuaqnb.cn/index/Jump/index?agent_code=&invite_code=3297113


[rewrite_local]

^http[s]?:\/\/.+((9aixuan)|(liuxiaoyan123)|(heyihongmu)|(901clo)).(com|cn|net)\/.+(User\/ucenter|/Get/notice|Get/appStartAdvert|/Get/videoInfo|/Picture/lists|Novel_story/novelChapter) url script-response-body yssp.js

[mitm]
hostname= api*com

*/
var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const p1 = '/User\/ucenter';
const p2 = '/Get/notice';
const p3 = 'Get/appStartAdvert';
const p4 = '/index/Picture/lists';
const p5 = '/Get/videoInfo';
const p6 = '/Novel_story/novelChapter';
//会员
if (url.indexOf(p1) != -1) {
    obj.data.id = 8888,
    obj.data.nickname = "伟人破解";
    obj.data.isVip = 1;
    obj.data.time = "2999-12-12";
    obj.data.day = "3761811";
    body = JSON.stringify(obj);
}
//公告弹窗
if (url.indexOf(p2) != -1) {
obj.code = 0,
    body = JSON.stringify(obj);
}
//开屏广告
if (url.indexOf(p3) != -1) {
obj.code = 0,
    body = JSON.stringify(obj);
}
//图片浏览
if (url.indexOf(p4) != -1) {
    for (var i = 0; i < obj.data.pictureList.length; i++) {
        obj.data.pictureList[i].is_see = 1;
        
    }
    body = JSON.stringify(obj);
}
//播放视频下方广告
if (url.indexOf(p5) != -1) {
obj.data.banners = [{}],
    body = JSON.stringify(obj);
}
//看小说
if (url.indexOf(p6) != -1) {
obj.data.data[0].is_see = 1;
    body = JSON.stringify(obj);
}

$done({body});
