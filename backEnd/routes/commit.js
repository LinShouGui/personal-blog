const express = require('express');
const router = express.Router();
const api = require('../api');
const checkToken = require('../middleWares/checkToken.js');

router.post('/sendCommit', checkToken, function (req, res, next) {

    if (req.body) {
        api.createCommit(req.body).then(() => {
            return res.send({
                code: 200,
                message: '发送评论成功'
            });
        }).catch((error) => {
            return res.json({
                code: 401,
                message: '发送评论失败' + error.toString()
            });
        });
    }
});
router.post('/getCommit', checkToken, function (req, res, next) {
    let {
        articleId
    } = req.body;
    if (articleId) {

        api.getCommitById(articleId).then((commits) => {

            if (commits && commits.length != 0) {
                return res.json({
                    code: 200,
                    message: commits,
                });
            }
            return res.json({
                code: -200,
                message: '未获取到评论..',
            })
        }).catch((error) => {
            return res.json({
                code: 401,
                //message:'操作数据库时发生错误'+error.toString()
                message: '请稍后再试' + error.toString()
            });
        });
    }
});
router.post('/getCommitsCount', checkToken, function (req, res, next) {

    let {
        articleId
    } = req.body;
    if (articleId) {

        api.getCommitCountById(articleId).then((count) => {
            if (count) {
                return res.json({
                    code: 200,
                    count: count,
                });
            }
            return res.json({
                code: -200,
                count: 0,
            })
        }).catch((error) => {
            return res.json({
                code: 401,
                //message:'操作数据库时发生错误'+error.toString()
                message: '请稍后再试' + error.toString()
            });
        });
    }
});


module.exports = router;