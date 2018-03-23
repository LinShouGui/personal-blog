import Vue from 'vue'
import api from '../api/api.js'
import router from '../router'
//调试时打开console
export default {
  UserReg({
    commit
  }, data) {
    api.localReg(data).then(({
      data
    }) => { //服务端返回的{code,token}
      if (data.code == 200) {
        commit('USER_SIGNUP', data.token);
        router.replace({
          path: '/login'
        });
      } else { //code=-200
        console.log('用户名已被占用')
      }
    }).catch((error) => {
      console.log('发生了错误');
      console.log(error.toString());
    });

  },
  UserLogin({
    commit
  }, data) {
    api.localLogin(data).then(({
      data
    }) => {
      if (data.code == 200) {
        commit('USER_SIGNIN', data.token);
        commit('SHOW_USER', data.name); //右上角显示用户名
        router.replace({
          path: '/'
        });
      } else {
        console.log('error1');
        console.log(data.message);
      }
    }).catch(error => {
      console.log('error2');
      console.log(error.toString());
    });
  },
  SEARCH_USER({
    commit
  }, data) {
    commit('SEARCH_USER', data);
  },
  ShowUser({
    commit
  }, dataMessage) {

    // commit('SHOW_USER', dataMessage);
  },
  TO_SIGNOUT({
    commit
  }) {
    commit('TO_SIGNOUT');
    router.push({
      path: '/login'
    });
  },

  toWritePW({
    commit
  }, data) {
    api.updatePass(data).then(({
      data: {
        code,
        message
      }
    }) => {
      if (code === 200) {
        commit('TO_SIGNOUT');
        console.log(`成功:${message}`);
        router.push({
          path: '/login'
        });
        // this.$router.push({path:'/login'});不可以直接this.$router,因为this已改变,无法获取到vue
      } else {
        console.log(`失败:${message}`);
      }
    }).catch(err => {
      console.log(err.toString());
    });
  },
  TO_OPEN({
    commit
  }, data) {
    commit('TO_OPEN', data);
  },
  TO_SONG({
    commit
  }, data) {
    commit('TO_SONG', data);
  },
  TO_SIMPLE({
    commit
  }, data) {
    commit('TO_SIMPLE', data);
  },
  DANG_QIAN({
    commit
  }, data) {
    commit('DANG_QIAN', data);
  },
  CURRENT_ARTICLE({
    commit
  }, data) {
    commit('CURRENT_ARTICLE', data);
  },
  CLASSIFY_ARTICLES({
    commit
  }, data) {
    commit('CLASSIFY_ARTICLES', data);
  },
  MessageHandle({
    commit
  }, data) {
    commit('MessageHandle', data);
  },
  FIND_NAME({
    commit
  }, data) {
    commit('FIND_NAME', data);
  },
}
