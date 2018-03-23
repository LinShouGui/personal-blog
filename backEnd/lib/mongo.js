var Mongolass = require('mongolass');
var config = require('config-lite')(__dirname);
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

//模型
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm:ss');
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id))
                .format('YYYY-MM-DD HH:mm:ss');
        }
        return result;
    }
});
// mongolass.plugin('addCreatedAt',{
//   // 只要查询所有条件，那么一定会有最终结果
//   afterFind:function (results){
//     results.forEach(function (item){
//       item.created_at =item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm:ss');
//     })
//     return results
//   },
//   // 单个查询有可能是null，所以要加if
//   afterFindOne:function (result){
//     if(result){
//       result.created_at =result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm:ss');
//     }
//     return result
//   }
// })


exports.Person = mongolass.model('Person', {
    name: {
        type: 'string'
    },
    password: {
        type: 'string'
    },
    avatar: {
        type: 'string'
    },
    sex: {
        type: 'string'
    },
    email: {
        type: 'string'
    },
    date: {
        type: 'string'
    },
    address: {
        type: 'string'
    },
    bio: {
        type: 'string'
    },
});
exports.Person.index({
    name: 1
}, {
    unique: true
}).exec();

exports.Video = mongolass.model('Video', {
    src: {
        type: 'string'
    },
    user: {
        type: 'string'
    },
});
exports.Video.index({
    user: 1
}).exec();

exports.User = mongolass.model('User', {
    name: {
        type: 'string'
    },
    sex: {
        type: 'string'
    },
    age: {
        type: 'string'
    },
    job: {
        type: 'string'
    },
    timeInterval: {
        type: 'string'
    },
    purchase: {
        type: 'string'
    },
    money: {
        type: 'string'
    },
    convenient: {
        type: 'string'
    },
    know: {
        type: 'string'
    }
});
exports.User.index({
    name: 1
}, {
    unique: true
}).exec();

exports.Article = mongolass.model('Article', {
    name: {
        type: 'string'
    },
    contentToMark: {
        type: 'string'
    },
    content: {
        type: 'string'
    },
    classify: {
        type: 'string'
    },
    title: {
        type: 'string'
    }
});
exports.Article.index({
    _id: 1,
    classify: -1
}).exec();

exports.Message = mongolass.model('Message', {
    sendName: {
        type: 'string'
    },
    receiveName: {
        type: 'string'
    },
    sendTime: {
        type: 'string'
    },
    title: {
        type: 'string'
    },
    content: {
        type: 'string'
    },
});
exports.Message.index({
    _id: 1
}).exec();

exports.Commit = mongolass.model('Commit', {
    commitName: {
        type: 'string'
    },
    content: {
        type: 'string'
    },
    commitTime: {
        type: 'string'
    },
    relatedArticle: {
        type: 'string'
    },
});
exports.Commit.index({
    _id: 1
}).exec();