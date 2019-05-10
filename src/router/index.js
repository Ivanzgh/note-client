import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router);

const components = {
  layout: () => import('@/views/layout'),
  index: () => import('@/views/index/index'),
  register: () => import('@/views/register/index'),
  writeBlog: () => import('@/views/writeBlog/index'),
  articleDetail: () => import('@/views/article/articleDetail'),
  about: () => import('@/views/about/index'),
  messageBoard: () => import('@/views/messageBoard/index'),
  manage: () => import('@/views/manage/index'),
  userAdmin: () => import('@/views/admin/userAdmin'),
  articleAdmin: () => import('@/views/admin/articleAdmin'),
  categoryAdmin: () => import('@/views/admin/categoryAdmin'),
  commentAdmin: () => import('@/views/admin/commentAdmin'),
  messageAdmin: () => import('@/views/admin/messageAdmin'),
  updateUser: () => import('@/views/admin/updateUser'),
};

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: components.layout,
      redirect: '/index',
      children: [
        {
          path: '/index',
          meta: {
            title: '首页'
          },
          component: components.index
        },
        {
          path: '/register',
          meta: {
            title: '新用户注册'
          },
          component: components.register
        },
        {
          path: '/writeBlog',
          name: 'writeBlog',
          meta: {
            title: '发布博客'
          },
          component: components.writeBlog
        },
        {
          path: '/articleDetail',
          name: 'articleDetail',
          meta: {
            title: '博客详情'
          },
          component: components.articleDetail
        },
        {
          path: '/editArticle',
          name: 'editArticle',
          meta: {
            title: '编辑博客'
          },
          component: components.writeBlog
        },
        {
          path: '/about',
          name: 'about',
          meta: {
            title: '关于我'
          },
          component: components.about
        },
        {
          path: '/messageBoard',
          name: 'messageBoard',
          meta: {
            title: '留言板'
          },
          component: components.messageBoard
        },
        {
          path: '/manage',
          name: 'manage',
          meta: {
            title: '管理'
          },
          redirect: '/manage/userAdmin',
          component: components.manage,
          children: [
            {
              path: '/manage/userAdmin',
              name: 'userAdmin',
              meta: {
                title: '用户管理'
              },
              component: components.userAdmin
            },
            {
              path: '/manage/articleAdmin',
              name: 'articleAdmin',
              meta: {
                title: '文章管理'
              },
              component: components.articleAdmin
            },
            {
              path: '/manage/categoryAdmin',
              name: 'categoryAdmin',
              meta: {
                title: '分类管理'
              },
              component: components.categoryAdmin
            },
            {
              path: '/manage/commentAdmin',
              name: 'commentAdmin',
              meta: {
                title: '评论管理'
              },
              component: components.commentAdmin
            },
            {
              path: '/manage/messageAdmin',
              name: 'messageAdmin',
              meta: {
                title: '留言管理'
              },
              component: components.messageAdmin
            },
            {
              path: '/manage/adminAdmin/updateUser',
              name: 'updateUser',
              meta: {
                title: '用户编辑'
              },
              component: components.updateUser
            },
          ]
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  Nprogress.start();
  next()
});
router.afterEach((to, from) => {
  Nprogress.done()
});

export default router;
