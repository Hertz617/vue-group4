//route 访问路径，路由
//router 路由管理者
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';// 创建路由实例并传递 `routes` 配置const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//创建路由 route
import Index from '../views/static/index.vue'
import User from '../views/static/user.vue'
import Info from '@/views/static/info.vue'
import Footer from '@/layout/footer.vue'
import Header from '@/layout/header.vue'
import LayoutAdmin from '@/layout/admin/index.vue'
const routes = [
  {
    path: '/', name: 'home', components: {
      default: Index,
      Footer,//命名视图
      Header
    }
  },
  { path: '/index', redirect: '/' },
  {
    path: '/login', name: 'login', component: () => import('../views/static/login.vue') //懒加载 
  },
  {
    path: '/user', name: 'user', component: User,
    meta: {
      title: 'user页面',
      Auth: true
    },
    children: [
      {
        path: 'info',
        component: Info
      }
    ]
  },
  { path: '/user/:id(\\d+)+', name: 'userId', component: User, props: true, },
  {
    path: '/adCate', name: 'adCate', component: () => import('../views/static/adCate.vue') //懒加载 
  },
  {
    path: '/paper', name: 'paper', component: () => import('../views/admin/paper.vue') //懒加载 
  },
  {
    path: '/scienceLogin', name: 'scienceLogin', component: () => import('../views/science/scienceLogin.vue') //懒加载 
  },
  //用户管理路由
  {
    path: '/scienceClient', name: 'scienceClient', component: () => import('../views/science/scienceClient.vue'),
    meta: {
      title: '科研管理页面',
      Auth: true
    },
    children: [
      {
        path: '/cli-patent', name: 'cli-patent', component: () => import('../views/science/cli-patent.vue') //懒加载 
      },
      {
        path: '/cli-copyRight', name: 'cli-copyRight', component: () => import('../views/science/cli-copyRight.vue') //懒加载 
      },
      {
        path: '/cli-subject', name: 'cli-subject', component: () => import('../views/science/cli-subject.vue') //懒加载 
      },
      {
        path: '/cli-paper', name: 'cli-paper', component: () => import('../views/science/cli-paper.vue') //懒加载 
      },
      
    ]
  },
  //管理员路由
  {
    path: '/scienceAdmin', name: 'scienceAdmin', component: () => import('../views/science/scienceAdmin.vue'),
    meta: {
      title: '科研管理页面',
      Auth: true
    },
    children: [
      {
        path: '/ad-patent', name: 'ad-patent', component: () => import('../views/science/ad-patent.vue') //懒加载 
      },
      {
        path: '/ad-copyRight', name: 'ad-copyRight', component: () => import('../views/science/ad-copyRight.vue') //懒加载 
      },
      {
        path: '/ad-subject', name: 'ad-subject', component: () => import('../views/science/ad-subject.vue') //懒加载 
      },
      {
        path: '/ad-paper', name: 'ad-paper', component: () => import('../views/science/ad-paper.vue') //懒加载 
      },
      
    ]
  },
  {
    path: '/testTo', name: 'testTo', component: () => import('../views/science/testTo.vue') //懒加载 
  },
  {
    path: '/testGet', name: 'testGet', component: () => import('../views/science/testGet.vue') //懒加载 
  },
  {
    path: '/major', name: 'major', component: () => import('../views/admin/major.vue') //懒加载 
  },
  {
    path: '/copyRight', name: 'copyRight', component: () => import('../views/admin/copyRight.vue') //懒加载 
  },
  {
    path: '/subject', name: 'subject', component: () => import('../views/admin/subject.vue') //懒加载 
  },
  {
    path: '/smscoupon', name: 'smscoupon', component: () => import('../views/admin/sms-coupon.vue') //懒加载 
  },
  {
    path: '/object', name: 'object', component: () => import('../views/static/object.vue'),//懒加载
    children: [
      {
        path: '',
        name: 'objectinfo',//嵌套命名路由
        component: Info
      },
      {
        path: 'login',
        component: import('@//views/static/login.vue')
      },
    ]
  },
  {
    path: '/shops', name: 'shops', component: () => import('../views/static/shop.vue') //懒加载 
  },
  {
    path: '/cart', name: 'cart', component: () => import('../views/static/cart.vue') //懒加载 
  },

  {
    path: '/admin',
    name: 'admin',
    component: LayoutAdmin,
    children: [
      {
        path: '',
        name: 'admin-index',
        component: () => import('@/views/admin/index.vue')
      },
      {
        path: 'info',
        name: 'admin-info',
        component: () => import('@/views/admin/info.vue')
      },
      {
        path: 'logout',
        name: 'admin-logout',
        component: () => import('@/views/admin/logout.vue')
      },
      {
        path: 'changepassword',
        name: 'admin-changepassword',
        component: () => import('@/views/admin/changepassword.vue')
      },
      {
        path: 'forgetpassword',
        name: 'admin-forgetpassword',
        component: () => import('@/views/admin/forgetpassword.vue')
      },
    ]
  },

  {
    path: '/:pathMatch(.*)*', name: '404', component: () => import('../views/404.vue') //懒加载 
  }
]
//创建路由管理 router
const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  //前置路由
  // if(to.name!=='cart'){
  //   next({name:'cart'})
  // }else{
  //   next();
  // }
  next();
})
//导出路由
export default router  