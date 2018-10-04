import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router);

const components = {
  layout : () => import('@/views/layout'),
  index : () => import('@/views/index/index'),
  register : () => import('@/views/register/index'),
  writeNote : () => import('@/views/writeNote/index'),
  article : () => import('@/views/article/index'),

};

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: components.layout,
      redirect : '/index',
      children : [
        {
          path : 'index',
          meta : {
            title : '首页'
          },
          component : components.index
        },
        {
          path : 'register',
          meta : {
            title : '新用户注册'
          },
          component : components.register
        },
        {
          path : 'writeNote',
          meta :{
            title : '写笔记页面'
          },
          component : components.writeNote
        },
        {
          path : 'article',
          meta : {
            title : '笔记详情页'
          },
          component : components.article
        }
      ]
    }
  ]
});

router.beforeEach((to,from,next) =>{
  Nprogress.start();
  next()
});
router.afterEach((to,from) => {
  Nprogress.done()
});

export default router;
