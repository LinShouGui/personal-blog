// 验证token中间件
var jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
  //  console.log('checkToken process req.param:', req.query); //获取url中?token形式
  if (req.headers['authorization']) {
    console.log('-----111');
    console.log(process.env.JWT_SECRET);
    console.log('-----111');
    var token = req.headers['authorization'].split(' ')[1] //切割author自定义字段
    var decoded = jwt.decode(token, process.env.JWT_SECRET)
    // 如果过期了就重新登录

    if (token && decoded.exp <= Date.now() / 1000) {
      return res.send({
        code: 401,
        message: "授权1已经过期，请重新登录"
      })
    }
    req['user'] = decoded.name;
    next();
  } else if (req.cookies['token']) { //cookie中存token
    var token = req.cookies['token'];
    var decoded = jwt.decode(token, process.env.JWT_SECRET)
    if (token && decoded.exp <= Date.now() / 1000) {
      return res.send({
        code: 401,
        message: "cookie已经过期，请重新登录"
      })
    }
    req['user'] = decoded.name;
    next();
  } else {
    return res.json({
      code: 400,
      message: '授权失效,重新登录',
    })
  }

}