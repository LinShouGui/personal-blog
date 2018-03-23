const express = require('express');
const router = express.Router();
const api = require('../api');
const checkToken = require('../middleWares/checkToken.js');

router.post('/sendMessage', checkToken, function (req, res, next) {

    if (req.body) {
        api.createMessage(req.body).then(() => {
            return res.send({
                code: 200,
                message: '发送私信成功'
            });
        }).catch((error) => {
            return res.json({
                code: 401,
                message: '发送私信失败' + error.toString()
            });
        });
    }
});
router.post('/getMessage', checkToken, function (req, res, next) {
    let {
        name
    } = req.body;
    if (name) {
        api.getMessageByName(name).then((result) => {
            let messages = result[0];
            let count = result[1];
            if (messages && messages.length != 0) {
                return res.json({
                    code: 200,
                    messages: messages,
                    count: count,
                });
            }
            return res.json({
                code: -200,
                message: '获取私信失败',
                count: 0,
            })
        }).catch((error) => {
            return res.json({
                code: 401,
                message: '请稍后再试' + error.toString()
            });
        });
    }
});
router.post('/getMessageCount', checkToken, function (req, res, next) {
    let {
        name
    } = req.body;
    if (name) {
        api.getMessageCountByName(name).then((result) => {
            if (result) {
                return res.json({
                    code: 200,
                    count: result,
                });
            }
            return res.json({
                code: -200,
                count: 0,
            })
        }).catch((error) => {
            return res.json({
                code: 401,
                message: '请稍后再试' + error.toString()
            });
        });
    }
});


module.exports = router;