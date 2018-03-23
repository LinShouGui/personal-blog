const express = require('express');
const router = express.Router();
const api = require('../api');

router.post('/search', function (req, res, next) {
    var name = req.body.search_input;
    if (name) {
        api.getDataByName(name).then((data) => {
            if (data) {
                return res.send({
                    code: 200,
                    message: data
                });
            }
            return res.json({
                code: -200,
                message: '此名字下暂无数据'
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