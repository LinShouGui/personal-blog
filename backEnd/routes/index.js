module.exports = function (app) {
    app.use('/api', require('./reg'));
    app.use('/api', require('./login'));
    app.use('/api/article', require('./article'));
    app.use('/api/user', require('./user'));
    app.use('/api/pass', require('./pass'));
    app.use('/api/userAva', require('./userAva.js'))

    app.use('/api/message', require('./message'));
    app.use('/api/commit', require('./commit'));
    app.use('/api', require('./search'));
    app.use('/api', require('./home')); //未上传文件
    app.use('/api', require('./uploadVideo')); //上传文件
    app.use('/api', require('./videoList'));
    app.use('/api/video', require('./video'));



};