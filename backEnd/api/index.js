const User = require('../lib/mongo').User;
const Person = require('../lib/mongo').Person;
const Article = require('../lib/mongo').Article;
const Message = require('../lib/mongo').Message;
const Commit = require('../lib/mongo').Commit;
const Video = require('../lib/mongo').Video;
module.exports = {
    create: function (user) {
        return User.create(user).exec();
    },
    createPerson: function (person) {
        return Person.create(person).exec();
    },
    getPersonByName: function (name) {
        console.log('name11:', name);
        return Person.findOne({
            name: name
        }).addCreatedAt().exec();
    },
    getDataByName: function getDataByName(name) {
        return User.findOne({
                name: name
            })
            .addCreatedAt()
            .exec();
    },
    updateUserByName: function updateUserByName(name, data) {
        return Person.update({
            name: name
        }, {
            $set: data
        }).exec();
    },
    createArticle: function (article) {
        return Article.create(article).exec();
    },
    getAllArticles: function (page, limit) {
        if (page && limit) {
            var skip = (page - 1) * limit;
            return Promise.all([
                Article.find().addCreatedAt().sort({
                    _id: -1
                }).skip(skip)
                .limit(limit).exec(),
                Article.count().exec()
            ]);
        } else {
            return Article.find().addCreatedAt().sort({
                _id: -1
            }).exec();
        }
    },
    getAllArticlesByName: function (page, limit, name) {
        if (page && limit) {
            var skip = (page - 1) * limit;
            return Promise.all([
                Article.find({
                    name: name
                }).addCreatedAt().sort({
                    _id: -1
                }).skip(skip)
                .limit(limit).exec(),
                Article.count({
                    name: name
                }).exec()
            ]);
        } else {
            return Article.find({
                name: name
            }).addCreatedAt().sort({
                _id: -1
            }).exec();
        }
    },
    getArticleByClassify: function (classify) {
        return Article.find({
                classify: classify
            }).addCreatedAt()
            .sort({
                id: -1
            }).exec();
    },
    getOneArticle: function (postId) {
        console.log('postId:' + postId);
        return Article.findOne({
                _id: postId
            }).addCreatedAt()
            .exec();
    },
    updateArticleById: function (articleId, data) {
        return Article.update({
            _id: articleId
        }, {
            $set: data
        }).exec();
    },
    deleteArticleById: function (articleId) {
        return Article.remove({
            _id: articleId
        }).exec();
    },

    createMessage: function (message) {
        return Message.create(message).exec();
    },
    getMessageByName: function (name) {
        return Promise.all([
            Message.find({
                receiveName: name
            }).sort({
                _id: -1
            }).exec(),
            Message.count({
                receiveName: name
            }).exec()
        ]);
    },
    getMessageCountByName: function (name) {
        return Message.count({
            receiveName: name
        }).exec();
    },
    createCommit: function (commit) {
        return Commit.create(commit).exec();
    },
    getCommitById: function (articleId) {
        return Commit.find({
            relatedArticle: articleId
        }).sort({
            _id: -1
        }).exec();
    },
    getCommitCountById: function (articleId) {
        return Commit.count({
            relatedArticle: articleId
        }).exec()
    },

    getVideoListByName: function (name) { //根据用户名取得所有video
        return Video.find({
            user: name
        }).sort({
            _id: -1
        }).exec();
    },
    getVideoCountByName: function (name) { //根据video名与用户名取得特定video的数量
        return Video.count({
            src: name['src'],
            user: name['user']
        }).sort({
            _id: 1
        }).exec();
    },
    createVideoByName: function (file) { //创建一条video记录
        return Video.create(file).exec();
    }

};