import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json';

// instance.defaults.headers.post['withCredentials']=true;

//这里只运行一次,除非页面刷新
const instance = axios.create();

instance.defaults.headers.post['Content-Type'] = 'application/json';
if (localStorage.getItem('jwt')) {
  instance.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('jwt').replace(/(^\")|(\"$)/g, '');
}

var config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}
var cookieConfig = {
  withCredentials: true
}

// const serverAddress = "https://api.xx.com";
const bendi = "http://localhost:3009";

export default {
  axiosInstance: instance, //返回实例
  localReg(data) {
    return instance.post(bendi + '/api/reg', data);
  },
  localLogin(data) {
    return instance.post(bendi + '/api/login', data);
  },
  localSearch(data) {
    return instance.post(bendi + '/api/search', data);
  },
  createArticle(data) {
    return instance.post(bendi + '/api/article/create', data);
  },
  getArticleList1(data) { //有prev,next字段来判断是否显示加载更多按钮
    return instance.post(bendi + '/api/article/articleLists', data);
  },
  getArticleListByName(data) {
    return instance.post(bendi + '/api/article/articleList', data)
  },
  getArticleListByClassify(data) {
    return instance.post(bendi + '/api/article/showUserArticleList', data);
  },
  getOneArticle(data) {
    return instance.post(bendi + '/api/article/onePage', data);
  },
  updatePass(data) {
    return instance.post(bendi + '/api/pass/updatePass', data);
  },
  checkPass(data) {
    return instance.post(bendi + '/api/pass/checkPass', data);
  },
  updateArticle(data) {
    return instance.post(bendi + '/api/article/updateArticle', data);
  },
  deleteArticle(data) {
    return instance.post(bendi + '/api/article/deleteArticle', data);
  },

  updateUser(data) {
    return instance.post(bendi + '/api/user/updateUser', data)
  },
  getUserByName(data) {
    return instance.post(bendi + '/api/user/getOneUser', data);
  },

  updateUserAva(data) {
    return instance.post(bendi + '/api/userAva/updateUserAva', data)
  },
  getUserAvaByName(data) {
    return instance.post(bendi + '/api/userAva/getOneUserAva', data)
  },

  sendMessage(data) {
    return instance.post(bendi + '/api/message/sendMessage', data);
  },
  getMessage(data) {
    return instance.post(bendi + '/api/message/getMessage', data);
  },
  getMessageCount(data) {
    return instance.post(bendi + '/api/message/getMessageCount', data);
  },
  sendCommit(data) {
    return instance.post(bendi + '/api/commit/sendCommit', data);
  },
  getCommit(data) {
    return instance.post(bendi + '/api/commit/getCommit', data);
  },

  uploadVideo(data) {
    return instance.post(bendi + '/api/uploadVideo', data, config); //config可加可不加?
  },
  getVideoList() {
    return instance.get(bendi + '/api/videoList');
  },

}
