import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ElLoading } from 'element-plus';
import page from '../page/index.vue';
import store from '../store/index';
import { formatRoute } from './views'
import { getStore } from '../utils/store';

// 静态路由
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import("/@/views/login.vue"),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/wel',
        component: page,
        children: [{
            path: 'index',
            component: () => import("/@/views/wel/index.vue"),
            meta: {
                title: '首页'
            }
        }]
    },
    {
        path: '/login',
        component: () => import("/@/views/login.vue"),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/404',
        component: () => import("../page/404.vue"),
        meta: {
            title: '404'
        }
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }

]
// 加载动态路由
store.dispatch('GetMenuList')
// console.log(store.state.menu.allMenu)
const asyncRoute = formatRoute(store.getters.menuList);
console.log(asyncRoute)
const route = createRouter({
    history: createWebHashHistory('/admin-plat/'),
    routes: [...routes,...asyncRoute],
})
route.beforeEach((to:any, form: any,next) => {
    const isLogin = getStore("token","session") ? true : false;
    console.log('isLogin',isLogin)
    if(!isLogin && to.path !== '/login' && to.path !== '/') {
        next({path: '/login'});
    }
    if(isLogin && to.path == "/") {
        next({path: '/wel/index'});
    }
    console.log(next)
    let loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    setTimeout(() => {
        loading.close()
    }, 200)
    let name:string = to.meta.title || to.name || "";
    document.title = name;
    console.log(to,form);
    next()
})

export default route