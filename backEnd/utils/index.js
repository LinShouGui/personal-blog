exports.parseRange = function (str, size) {
    if (str.indexOf(",") != -1) { //如果存在,逗号，则直接返回undefined;
        return;
    }
    if (str.indexOf("=") != -1) { //对str进行格式化,形如bytes start-end,取得start-end
        var str = str.substr(6, str.length) //这里是在解析我们自己上一次返回的Content-Range的格式,
    }
    var range = str.split("-");
    var start = parseInt(range[0], 10)
    var end = parseInt(range[1], 10) || size - 1 //如果没有设置end处,这默认取到文件的最后字节长度,形如(111- 形式)


    // Case: -100
    if (isNaN(start)) {
        start = size - end;
        end = size - 1;
        // Case: 100-
    } else if (isNaN(end)) {
        end = size - 1;
    }

    // Invalid
    if (isNaN(start) || isNaN(end) || start > end || end > size) {
        return;
    }

    return {
        start: start,
        end: end
    };
};