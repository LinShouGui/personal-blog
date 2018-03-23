import {
  USER_SIGNIN,
  USER_SIGNUP,
  USER_SIGNOUT,
  SHOW_USER,
  HEAD_LINE,
  TO_OPEN,
  TO_SONG,
  TO_SIMPLE,
  DANG_QIAN,
  TO_SIGNOUT,
  TO_WritePW,
  CURRENT_ARTICLE,
  SEARCH_USER,
  CLASSIFY_ARTICLES,
  MessageHandle,
  FIND_NAME
} from './types'
import api from '../api/api.js'
//import Vue from 'vue'
// import elementUI from 'element-ui'

//从外部文件访问elementui,不必再import


import * as cookieUtil from '../assets/js/cookieUtil.js'
import translateBody from '../assets/js/transUtil.js'
export default {
  [USER_SIGNUP](state, token) {
    localStorage.setItem('jwt', token);
    state.token = token;
  },
  [USER_SIGNIN](state, token) { //每次登录返回一个全新的token
    localStorage.setItem('jwt', token);
    state.token = token;
    cookieUtil.setCookie("token", token);
    api.axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + token;
  },
  [USER_SIGNOUT](state, token) {
    localStorage.removeItem('jwt');
    state.token = null;
  },
  [SHOW_USER](state, name) {
    localStorage.setItem('username', name);
    api.getMessageCount({
      name: name
    }).then(({
      data: {
        count
      }
    }) => {
      if (count) {
        //cdn引入的elementui,使用它导出的对象ELEMENT
        var messageHandle = ELEMENT.Notification.info({
          title: '提醒',
          message: `你的收件箱有${count}条消息`,
          duration: 0,
          position: 'bottom-right',
        });
        state.messageHandle = messageHandle;

      }

      state.mesCount = count;
      localStorage.setItem('mesCount', count);

    }).catch(err => {
      console.log('getMessageCount happen a error: ', err.toString());
    })
    state.message = name;
  },
  [SEARCH_USER](state, name) {
    state.search_user = name;
  },
  [TO_OPEN](state, data) {
    state.kai = data;
  },
  [TO_SONG](state, data) {
    state.song = data;
  },
  [TO_SIMPLE](state, data) {
    state.jian = data;
    localStorage.setItem("isSimple", data);
    translateBody(null, data);
  },
  [DANG_QIAN](state, data) {
    state.dangqian = data;
  },
  [TO_SIGNOUT](state) {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('mesCount');

    if (state.messageHandle) {
      state.messageHandle.close();
    }
    state.token = null;
  },
  [CURRENT_ARTICLE](state, data) {
    state.current_article = data;
  },
  [CLASSIFY_ARTICLES](state, data) {
    state.classify_articles = data;
  },
  [FIND_NAME](state, data) {
    localStorage.setItem('findName', data);
  },
}
