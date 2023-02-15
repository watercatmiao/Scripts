function key() {
    var obj = JSON.parse($response.body);
    // 判断语句格式 if(条件) {执行内容}
    // 这里是判断传入key()里的第一个参数有没有包含 @ 有就继续执行内部语句
    console.log(arguments)
    if (arguments[0].includes("@")) {
        let ark = arguments[0].split("@");
//  声明变量有var、let、const，这里的let声明一个局部变量ark，它将无法被函数外部访问
//  split()方法将会对第一个参数作拆分，这里就以@拆分出来所有键，并且会作为数组赋值给ark

// 循环语句 for(初始化变量; 表达式条件; 符合表达式条件则循环){执行内容}
// ark.length可以判断ark里有多少个键，i++则递增，一开始是0，循环一次会增加 1
        for (i = 0; i < ark.length; i++) {
            obj[ark[i]] = arguments[1][i];
// 从ark[0]开始索引第一个键并来作为属性名索引对象obj内相应的属性值（也就是键值，js内称谓不一样而已），并重新以第二个参数的索引值来赋值
        }
    } else {
        // 否则的情况，就只有一个键一个值的情况
        obj[arguments[0]] = arguments[1];
    }
    $done({body:JSON.stringify(obj)});
}
// 最终只需用户在结尾按格式录入key("键1@键2……", [值1，值2……])
key("subscribed@subscriptionStatus@eligibleForFreeTrial", [true, "YEARLY_SUBSCRIBED", true])