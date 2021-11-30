import { createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import { ElLoading} from 'element-plus';
import page from '../page/index.vue'
 
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
]

const route = createRouter({
    history: createWebHashHistory(),
    routes
})
route.beforeEach((to,form) => {
    let loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    setTimeout(() => {
        loading.close()
    },200)
    document.title = to.meta.title;
    // console.log(to,form);
})

export default route