require('dotenv').load(); //解析.env里的值到process.env.
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const config = require('config-lite')(__dirname); //解析config文件夹里的default.js

const cookieParser = require('cookie-parser');

const routes = require('./routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser()); //解析cookie到req.cookies

app.all('*', function (req, res, next) {
    // res.header('Access-Control-Allow-Credentials','true');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

routes(app);


app.set('port', process.env.PORT || config.port);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});