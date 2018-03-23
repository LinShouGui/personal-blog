const express = require('express');
const router = express.Router();
const api = require('../api');
const checkToken = require('../middleWares/checkToken.js');



router.get("/videoList", checkToken, function (req, res, next) {

    var userName = req.user;
    if (userName) {

        api.getPersonByName(userName).then((user) => {
            if (user) {
                api.getVideoListByName(user.name).then((videoLists) => {
                    if (videoLists) {
                        for (let i = 0; i < videoLists.length; i++) {
                            delete videoLists[i]['user'];
                            delete videoLists[i]['_id'];
                            videoLists[i]['state'] = true;
                            videoLists[i]['videoClass'] = `video${i}`;
                            videoLists[i]['isDrag'] = false;
                            videoLists[i]['x'] = videoLists[i]['y'] = 0;
                            videoLists[i]['key'] = i;
                        }
                        return res.json({
                            code: 200,
                            message: videoLists,
                        })
                    }
                    return res.json({
                        code: -200,
                        message: '未找到该用户的视频',
                    })
                })
            }
            return res.json({
                code: -200,
                message: '未找到用户,请检查用户名',
            })

        })
    }
});
module.exports = router;