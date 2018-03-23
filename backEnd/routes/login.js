const express = require('express');
const router = express.Router();
const api = require('../api');
const createToken = require('../middleWares/createToken');
const sha1 = require('sha1');

router.post('/login', function (req, res, next) {
    var name = req.body.account;
    var password = sha1(req.body.checkPass);
    if (name) {
        api.getPersonByName(name).then((user) => {
            if (user && (password == user.password)) {
                var returnToken = createToken(name);
                return res.json({
                    code: 200,
                    token: returnToken,
                    name: name
                });
            }
            return res.json({
                code: -200,
                message: '用户名或密码错误'
            });
        }).catch(err => {
            return res.json({
                code: -200,
                message: err.toString()
            });
        });
    }
});
module.exports = router;