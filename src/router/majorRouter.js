// //route 访问路径，路由
// //router 路由管理者
// import { createRouter, createWebHistory } from 'vue-router';// 创建路由实例并传递 `routes` 配置const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
// //创建路由 route

// const majorRouter = [

//     {
//         path: '/major', name: 'major', component: () => import('../views/admin/major.vue') //懒加载 
//     },

// ]
// //创建路由管理 router
// const MajorRouter = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//     history: createWebHistory(),
//     majorRouter,
// })
// router.beforeEach((to, from, next) => {
//     next();
// })
// //导出路由
// export default MajorRouter  