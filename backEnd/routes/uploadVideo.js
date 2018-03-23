const express = require('express');
const router = express.Router();
const api = require('../api');
const checkToken = require('../middleWares/checkToken.js')
const formidable = require('formidable');
const util = require('util');
const baseName = "static/videos";
const fs = require('fs');
const path = require('path');
const url = require('url');

router.post('/uploadVideo', checkToken, function (req, res) {

    const form = new formidable.IncomingForm();
    const userName = req.user;
    var userDir = path.join(baseName, userName); //      static/videos/ag

    if (!fs.existsSync(userDir)) { //同步操作阻塞下面的操作,同步检查目录是否存在,不存在则创建目录
        fs.mkdirSync(userDir);
    }

    form.uploadDir = userDir;
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function (req, fields, files) { //解析formData

        if (files && files['video']) {

            let videoFile = files['video'];

            var videoName = videoFile.name; //xx.mp4
            var fileType = videoFile.type; //video/mp4
            var ext = fileType.split("/")[1]; //mp4
            var fileName = videoName.slice(0,
                videoName.length - ext.length - 1); //xx

            var moreDiskPath = path.join(userDir, videoName); //组装成完整的路径
            fs.exists(moreDiskPath, function (exists) {
                if (exists) {
                    //console.log('同名视频文件已存在,不可再上传');
                    return res.json({
                        code: -200,
                        message: '同名视频文件已存在,不可再上传',
                    })
                }
                fs.renameSync(videoFile.path, moreDiskPath); //videoFile即files['video'],

                api.getVideoCountByName({ //服务端查询是否存在同名文件
                    src: videoName,
                    user: userName
                }).then((result) => {
                    //console.log('getVideoCountByName::result:',result);
                    if (result.length) {
                        return res.json({
                            code: -200,
                            message: '数据库已保存同名文件路径'
                        })
                    }
                    api.createVideoByName({
                        src: videoName,
                        user: userName
                    }).then(() => {
                        return res.json({
                            code: 200,
                            message: '上传视频成功',
                        })
                    }).catch(err => {
                        //console.log('保存文件名到数据库时发生错误')
                        return res.json({
                            code: -200,
                            message: '上传视频失败',
                        })
                    });
                });

            });
        }
    });
})

module.exports = router;