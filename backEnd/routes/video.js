const express = require("express");
const router = express.Router();
const api = require("../api");
const checkToken = require("../middleWares/checkToken.js");
const url = require('url');
const path = require("path");
const fs = require("fs");
const qs = require('qs');

const mime = require("../utils/types.js");
const util = require("../utils/index.js");
const baseName = "static/videos";

router.get("/:userName/:videoName", checkToken, function (req, res) {

    if (!req.user) { //未带名字请求该路径,pass
        return;
    }

    var pathname = url.parse(decodeURIComponent(req.url)).pathname;
    var tempName = pathname.replace(/\.\./g, ""); //..替换为空
    tempName = tempName.replace(/\s/g, "");
    var userName = tempName.split("/")[1];
    var fileName = tempName.split("/")[2];

    if (userName != req.user) {
        return res.send({
            code: 400,
            message: "你没有权限访问该文件"
        })
    }

    var realPath = path.join(baseName, userName, fileName);
    var ext = path.extname(realPath); //.mp4||""
    ext = ext ? ext.slice(1) : "unknown";
    var contentType = mime[ext] || "text/plain";
    fs.exists(realPath, function (exists) {
        if (!exists) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            })
            res.write("This request URL " + pathname + "was not found on this server");
            res.end();
        } else {
            res.setHeader("Content-Type", contentType);
            var stats = fs.statSync(realPath); //得到文件的信息对象,包括文件的大小
            if (req.headers["range"]) { //有range请求头,解析range请求头,得到字节起始处和字节终止处
                var range = util.parseRange(req.headers["range"], stats.size);
                if (range) { //range格式符合要求,成功解析
                    res.setHeader("Content-Range", "bytes " + range.start + "-" + range.end + "/" + stats.size);
                    res.setHeader("Content-Length", (range.end - range.start + 1)); //如(1,2),则2-1+1为2字节长度
                    var stream = fs.createReadStream(realPath, { //返回一部分的字节流
                        "start": range.start,
                        "end": range.end
                    });
                    res.writeHead("206", "Partial Content"); //返回206字节码来表示返回的是一部分的文件
                    stream.pipe(res);
                } else { //未成功解析Range请求头,Range请求头不满足条件
                    res.removeHeader("Content-Length")
                    res.writeHead(416, "Request Range Not Satisfiable");
                    res.end();
                }
            } else { //header未带range信息
                var stream = fs.createReadStream(realPath)
                res.writeHead("200", "OK");
                stream.pipe(res);
            }
        }
    })
});


module.exports = router;