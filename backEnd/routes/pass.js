const express = require('express');
const router = express.Router();
const api = require('../api');
const sha1 = require('sha1');
const checkToken = require('../middleWares/checkToken.js');

router.post('/updatePass', checkToken, function (req, res, next) {

    var name = req.body.account;
    var password = req.body.checkPass;
    password = sha1(password);
    var user = {
        name: name,
        password: password
    };

    if (name && user) {
        api.updateUserByName(name, user).then(({
            result: {
                ok,
                n
            }
        }) => {
            if (ok && n > 0) {
                return res.json({
                    code: 200,
                    message: '服务器改密成功'
                });
            }
            return res.json({
                code: -200,
                message: '无法修改密码',
            });
        }).catch(err => {
            if (err.message.match('E11000 dulplicate key')) {
                return res.json({
                    code: -200,
                    message: '用户名重复'
                });
            }
            return res.json({
                code: -200,
                message: err.toString()
            });
        });
    }
});
router.post('/checkPass', checkToken, function (req, res, next) {

    let {
        name,
        password
    } = req.body;

    password = sha1(password);

    if (name) {
        api.getPersonByName(name).then((user) => {
            if (user && password == user.password) {
                return res.json({
                    code: 200,
                });
            }
            return res.json({
                code: -200,
                message: '获取不到用户',
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