// import Vue from 'vue'
// import VueRouter from 'vue-router' 这里Vue,Vuex,VueRouter是cdn引入的,无需再import进来

import store from '@/store/index.js' //在路由里使用vuex是需要导入的
import translateBody from '../assets/js/transUtil.js'

import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  resolve
} from 'path';
if (process.env.NODE_ENV === 'development') {
  Vue.use(VueRouter) //这里的VueRouter不可以随意取名
}

// Vue.use(Router);

const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: resolve => require(['@/components/home'], resolve)
    },
    {
      path: '/article/:id',
      name: 'article',
      component: resolve => require(['@/components/article'], resolve)

    },
    {
      path: '/wenjuan',
      name: 'Default',

      component: resolve => require(['@/components/Default'], resolve)
    },
    {
      path: '/reg',

      name: 'Reg',
      component: resolve => require(['@/components/Reg'], resolve),
      meta: {
        auth: false
      },
    },
    {
      path: '/login',
      name: 'Login',

      component: resolve => require(['@/components/Login'], resolve)
    },
    {
      path: '/show',
      name: 'showUser',

      component: resolve => require(['@/components/showUser'], resolve)
    },
    {
      path: '/changeFont',
      name: 'changeFont',

      component: resolve => require(['@/components/changeFont'], resolve)
    },
    {
      path: '/toWritePage',
      name: 'toWritePage',

      component: resolve => require(['@/components/toWritePage'], resolve)
    },
    {
      path: '/toWritePass',
      name: 'toWritePW',

      component: resolve => require(['@/components/toWritePW'], resolve)
    },
    {
      path: '/myPage',
      name: 'myPage',
      component: resolve => require(['@/components/myPage'], resolve)
    },
    // {同一组件不同路径切换默认不会触发created,mounted
    //   path:'/toAbout',
    //   component:resolve=>require(['@/components/about'],resolve)
    // },
    {
      path: '/toAbout',
      name: 'toAbout',
      component: resolve => require(['~/components/about'], resolve), //这里可以用~或@因为在webpack里设置了alias
      meta: {
        auth: false
      }
    },
    {
      path: '/myArticles',
      name: 'myArticles',
      component: resolve => require(['~/components/myArticles'], resolve)
    },
    {
      path: '/toRewritePage',
      name: 'rewritePage',
      component: resolve => require(['~/components/toRewritePage'], resolve)
    },
    {
      path: '/myInbox',
      name: 'myInbox',
      component: resolve => require(['~/components/MyInbox'], resolve)
    },
    {
      path: '/videoPage',
      name: 'videoPage',
      component: resolve => require(['~/components/videoPage'], resolve)
    },
    {
      path: '/uploadPage',
      name: 'uploadPage',
      component: resolve => require(['~/components/uploadPage'], resolve)
    },
    {
      path: '/chartPage',
      name: 'chartPage',
      component: resolve => require(['~/components/chartPage.vue'], resolve)
    },
    {
      path: '/games',
      name: 'games',
      component: resolve => require(['~/components/games.vue'], resolve),
    },
    {
      path: '/games/yellowMan',
      name: "yellowMan",
      component: resolve => require(['~/components/yellowMan.vue'], resolve)
    },
    {
      path: '/games/jump',
      name: 'jump',
      component: resolve => require(['~/components/jump.vue'], resolve)
    },
    {
      path: '/selfPage',
      name: 'selfPage',
      component: resolve => require(['~/components/selfPage.vue'], resolve)
    },
    {
      path: '*',
      name: 'NotFound',
      component: resolve => require(['@/components/NotFound'], resolve)
    }
  ]
});
router.beforeEach(({
  meta,
  path
}, from, next) => {
  let {
    auth = true
  } = meta; //需要权限
  let isLogin = Boolean(store.state.token);
  let article = Boolean(store.state.current_article)

  var canvas = document.querySelector('canvas');

  if (auth && !isLogin && path !== '/login') {

    return next({
      path: '/login'
    });
  } else if (!article && path == '/toRewritePage') {
    return next({
      path: '/'
    });
  } else if (canvas && path !== '/games/jump') {

    document.body.removeChild(canvas);
  }
  if (canvas && path == '/games/jump') {
    canvas.style.display = 'block';
  }

  var temp = localStorage.getItem('isSimple') === 'true' ? true : temp === 'false' ? false : false;

  translateBody(null, temp);


  next();
});

export default router;
