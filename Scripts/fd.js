/*
作者伟人q55749353

//非凡精读&樊登讲书🔓
http[s]?:\/\/.+dushu.+(v101/content|book/v100/info|/play/duration|/v100/index).*$ url request-body "token":"[^"]+ request-body "token":"20211113lyhhxMAI8cyXo5KdsjR
//付费课程🔓
http[s]?:\/\/.+dushu.+(v101/content|book/v100/info|/play/duration|/v100/index|v100/list|/program/v100/info|/v101/userInfo|/v100/vipInfo).*$ url script-response-body fd.js


QX MITM = *dushu*


    
*/

var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

    const p1 = '/v101/content';
    const p2 = '/v100/list';
    const p3 = '/program/v100/info';
    const p4 = '/v101/userInfo';
    const p5 = 'v100/vipInfo';


//非凡精读验证
  if (url.indexOf(p1) != -1) {
      obj.data.free = true;
    body = JSON.stringify(obj);
}

//付费课程页面
  if (url.indexOf(p2) != -1) {
    for (var i = 0; i < obj.data.length; i++) {
      obj.data[i].free = true;        
}
    body = JSON.stringify(obj);
}

//付费课程解锁🔓

  if (url.indexOf(p3) != -1) {
    for (var i = 0; i <                         obj.data.programList.length; i++) {
       obj.data.programList[i].free = true;        
       obj.data.programList[i].unlock = true;
}
      
       obj.data.free = true;
       obj.data.isBuyed = true;
       obj.data.trial = true;
       obj.data.unlock = true;
     body = JSON.stringify(obj);
}
//会员个人页面
   if (url.indexOf(p4) != -1) {
       obj.data.is_vip = true;
       obj.data.username = "伟人破解";
       obj.data.expire_time = 4092647115000;
       obj.data.avatarUrl = "https://cdn-upyun-images.dushu365.com/1634740120cf7b8f4e68d92f7c46696fc027c1681cp6ve9a";
       obj.data.free = true;
     body = JSON.stringify(obj);
}
//非凡精读页面会员时间
   if (url.indexOf(p5) != -1) {
       obj.data.endTime = 4092647115000;
     body = JSON.stringify(obj);
}
//2021年11月17更新


$done({body});
