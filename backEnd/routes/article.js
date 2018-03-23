const express = require('express');
const router = express.Router();
const api = require('../api');
const checkToken = require('../middleWares/checkToken.js');


router.post('/create', checkToken, function (req, res, next) {
    if (req.body) {

        api.createArticle(req.body).then((article) => {
            if (article) {
                return res.json({
                    code: 200,
                    message: '创建文章成功'
                });
            }
            return res.json({
                code: -200,
                message: '创建文章失败'
            })
        }).catch((error) => {
            return res.json({
                code: 401,
                //message:'操作数据库时发生错误'+error.toString()
                message: '请登录再试' + error.toString()
            });
        });
    }
});
router.post('/articleLists', checkToken, function (req, res, next) {
    let {
        page,
        limit
    } = req.body;

    if (page && limit) {
        api.getAllArticles(page, limit).then((result) => {
            let articleLists = result[0],
                total = result[1],
                totalPage = Math.ceil(total / limit),
                hasNext = totalPage > page ? 1 : 0,
                hasPrev = page > 1;

            return res.send({
                code: 200,
                articleLists,
                hasNext,
                hasPrev
            });
        }).catch(err => {
            res.send({
                code: -200,
                message: err.toString()
            });
        });
    }

});
router.post('/articleList', checkToken, function (req, res, next) {
    let {
        page,
        limit,
        name
    } = req.body;
    if (page && limit && name) {
        api.getAllArticlesByName(page, limit, name).then((result) => {
            let articleLists = result[0],
                total = result[1],
                totalPage = Math.ceil(total / limit),
                hasNext = totalPage > page ? 1 : 0,
                hasPrev = page > 1;
            return res.send({
                code: 200,
                articleLists,
                hasNext,
                hasPrev
            });
        }).catch(err => {
            res.send({
                code: -200,
                message: err.toString()
            });
        });
    }

});
router.post('/showUserArticleList', checkToken, function (req, res, next) {

    let {
        classifyName
    } = req.body;

    if (classifyName) {
        api.getArticleByClassify(classifyName).then((result) => {

            let articleLists = result;

            if (articleLists && articleLists.length > 0) {
                return res.send({
                    code: 200,
                    articleLists,
                });
            }
            return res.send({
                code: -200,
                articleLists: undefined
            })
        }).catch(err => {
            return res.send({
                code: -200,
                message: err.toString()
            });
        });
    }
});
router.post('/onePage', checkToken, function (req, res, next) {
    let {
        id
    } = req.body;

    if (id) {
        api.getOneArticle(id).then((result) => {

            if (result) {
                return res.send({
                    code: 200,

                    oneArticle: result
                });
            }
            return res.send({
                code: -200,
                message: '没找到该文章',
            })
        }).catch(err => {
            return res.send({
                code: -200,
                message: '数据库查询发生错误1' + err.toString()
            });
        });
    }

});
router.post('/updateArticle', checkToken, function (req, res, next) {

    let {
        id,
        name,
        contentToMark,
        classify,
        content,
        title
    } = req.body;

    let newArticle = {
        name: name,
        contentToMark: contentToMark,
        classify: classify,
        content: content,
        title: title
    };
    if (id && newArticle) {
        api.updateArticleById(id, newArticle).then(({
            result: {
                ok,
                n
            }
        }) => {
            if (ok && n > 0) {

                return res.json({
                    code: 200,
                    message: '服务器文章重新保存成功'
                })
            }
            return res.json({
                code: -200,
                messsage: '无法重新保存文章'
            })
        }).catch(err => {
            return res.json({
                code: -200,
                message: err.toString()
            });
        });
    }

});
router.post('/deleteArticle', checkToken, function (req, res, body) {
    let {
        id
    } = req.body;
    if (id) {
        api.deleteArticleById(id).then(() => {

            return res.json({
                code: 200,
                message: '服务器已删除指定文章'
            })
        }).catch(err => {
            return res.json({
                code: -200,
                message: err.toString()
            });
        });
    }
});
module.exports = router;