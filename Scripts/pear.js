/*

作者伟人 q 55749353

已解锁[所有av视频漫画图片等等，短视频和动漫暂时无解！！
//雪梨🍐视频🚗
^http[s]?:\/\/.+(movie\/WatchMovieNew|Account\/CheckVip|movie/DetailInfo|/account/IndexDetail|/cartoon/DownLoadCartoon|/cartoon/LookPhoto|/movie/DetailInfo|PictureSet/LookPhoto).*$ url script-response-body pear.js

QX MITM = *.pearkin.com

*/

var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const p1 = '/movie/WatchMovieNew';
const p2 = '/Account/CheckVip';
const p3 = '/movie/DetailInfo';
const p4 = '/account/IndexDetail';
const p5 = '/cartoon/DownLoadCartoon';
const p6 = '/cartoon/LookPhoto/';
const p7 = '/movie/DetailInfo/';
const p8 = 'PictureSet/LookPhoto';
//播放验证
if (url.indexOf(p1) != -1) {
    obj.hadWach = true;
    obj.canWath = true;
    body = JSON.stringify(obj);
}
//翻译
if (url.indexOf(p2) != -1) {
    obj.value = true;
    body = JSON.stringify(obj);
}
//会员视频
if (url.indexOf(p3) != -1) {
    obj.movie.movieType = 1;
    body = JSON.stringify(obj);
}
//个人数据
if (url.indexOf(p4) != -1) {
    obj.nickName = "伟人破解";
    obj.vipLevel = 3;
    obj.vipEndTime = "2999-09-09";
    obj.cartoonVip = true;
    obj.cartoonVipEndTime = "2999-09-09";
    obj.rewardBadge = true;
    obj.isTenRealCarUser = true;
    obj.closeAccountPay = true;
    obj.closeInvite = true;
    obj.hadTopicBadge = true;
    body = JSON.stringify(obj);
}
//漫画下载
if (url.indexOf(p5) != -1) {
    obj.value = true;
    body = JSON.stringify(obj);
}
//漫画在线看
if (url.indexOf(p6) != -1) {
    obj.value = true;
    body = JSON.stringify(obj);
}
//高级会员视频解锁
if (url.indexOf(p7) != -1) {
    obj.movie.cznVipLevel = 0;
    obj.movie.cznNotVipLevel = 0;
    body = JSON.stringify(obj);
}
//相册解锁$下载
if (url.indexOf(p8) != -1) {
    obj.value = true;
    body = JSON.stringify(obj);
}

$done({body});

