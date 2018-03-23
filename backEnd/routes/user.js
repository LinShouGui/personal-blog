const express = require('express');
const router = express.Router();
const api = require('../api');
const checkToken = require('../middleWares/checkToken.js');

router.post('/updateUser', checkToken, function (req, res, next) {
    let name = req.body.name,
        sex = req.body.sex,
        email = req.body.email,
        date = req.body.date,
        address = req.body.address,
        bio = req.body.bio;
    var user = {
        sex: sex,
        email: email,
        date: date,
        address: address,
        bio: bio,
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
                    message: '更改用户信息成功'
                });
            }
            return res.json({
                code: -200,
                message: '更改用户信息失败'
            })
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
router.post('/getOneUser', checkToken, function (req, res, next) {
    let name = req.body.name;

    if (name) {
        api.getPersonByName(name).then((user) => {
            if (user) {
                return res.send({
                    code: 200,
                    user: user,
                })
            }
            return res.json({
                code: -200,
                message: '未找到用户',
            })
        }).catch(err => {
            return res.send({
                code: -200,
                message: '数据库查询发生错误2' + err.toString()
            })
        })
    }
});
module.exports = router;