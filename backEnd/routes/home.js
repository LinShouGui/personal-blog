const express = require('express');
const router = express.Router();
const api = require('../api');

router.post('/upload', function (req, res, next) {
    let name = req.body.name,
        sex = req.body.sex,
        age = req.body.age,
        job = req.body.job,
        timeInterval = req.body.timeInterval,
        purchase = req.body.purchase,
        money = req.body.money,
        convenient = req.body.convenient,
        know = req.body.know;
    // console.log(`${name}:${sex}:${age}:${job}:${timeInterval}:${purchase}:${money}:${convenient}:${know}`);

    if (name && sex && age && job && timeInterval && purchase && money && convenient && know) {
        api.create(req.body).then(() => {
            return res.json({
                code: 200,
                message: '提交表单成功'
            })
        }).catch(err => {
            // 操作数据库的时候发生错误
            if (err.message.match('E11000 duplicate key')) {
                return res.json({
                    code: -200,
                    message: '用户名重复'
                })
            }
        });
    } else {
        res.send('提交失败,请填写所有必选问题');
    }
});
module.exports = router;