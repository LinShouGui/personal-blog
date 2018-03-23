const express = require('express');
const router = express.Router();
const api = require('../api');
const sha1 = require('sha1');
const createToken = require('../middleWares/createToken.js');

router.post('/reg', function (req, res, next) {
    var name = req.body.account;
    var password = req.body.checkPass;
    password = sha1(password);
    var user = {
        name: name,
        password: password
    };

    if (user) {
        api.createPerson(user).then(() => {
            return res.send({
                code: 200,
                token: createToken(name)
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
            })
        })
    }
});
module.exports = router;