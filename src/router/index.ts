import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import page from '../page/index.vue';
import store from '../store/index';
import { getRoutes } from './views'
import { getStore } from '../utils/store';
import { configure, start, done } from 'nprogress'
configure({ showSpinner: false })

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
const router = createRouter({
    history: createWebHashHistory('/admin-plat/'),
    routes: [...routes,...getRoutes(store.getters.menuList)],
});
router.beforeEach((to:any, form: any,next) => {
    start()
    const isHasUser = getStore("userInfo") ? true : false;
    const isLogin = getStore("token","session") ? isHasUser ? true:  false : false;
    // // 保存路由tag
    if(to.path !== '/login' && to.path !== '/' && to.path !== '/404') {
        let tagValue = Object.assign({},to);
        delete tagValue.matched
        store.commit("ADD_TAG",tagValue);
    }
    // // console.log('isLogin',isLogin)
    if(!isLogin && to.path !== '/login' && to.path !== '/') {
        next({path: '/login'});
    }
    if(isLogin && to.path == "/") {
        next({path: '/wel/index'});
    }
    let name:string = to.meta.title || to.name || "";
    document.title = name;
    // console.log(to,form);
    next()
})
router.afterEach(() => {
    setTimeout(() => {
        done()
    }, 200)
})

export default router