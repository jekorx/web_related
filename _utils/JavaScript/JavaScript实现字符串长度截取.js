function cutstr(str, len) {
    var temp;
    var icount = 0;
    var patrn = /[^\x00-\xff]/;
    var strre = "";
    for (var i = 0; i < str.length; i++) {
        if (icount < len - 1) {
            temp = str.substr(i, 1);
            if (patrn.exec(temp) == null) {
                icount = icount + 1
            } else {
                icount = icount + 2
            }
            strre += temp
        } else {
            break
        }
    }
    return strre + "..."
}

/************   console    *****************/
cutstr('12313213213213132',10)
"123132132..."
cutstr('你好好好恢复快哈空间粉红丝带机卡分离宽松的',10)
"你好好好恢..."