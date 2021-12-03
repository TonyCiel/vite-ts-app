// import router from './index';
import { MenuItem } from '../type/index';
import { RouteRecordRaw} from 'vue-router';
const module = import.meta.glob('../views/*/index.vue');
const moduleChild = import.meta.glob('../views/*/*.vue');

/**
 *  动态渲染路由（目前没搞三级菜单渲染，等待优化吧）
 * @param routes 
 */
export const formatRoute = (routes: Array<MenuItem>) => {
    let childs: Array<RouteRecordRaw> = [];
    let router:Array<RouteRecordRaw> = [];
    for(let i = 0; i< routes.length; i++) {
        let item = routes[i];
        if(!item.children) {
            router.push({
                path: item.path,
                component: () => import(`../page/index.vue`),
                children: [{
                    name: item.name,
                    path: 'index',
                    component:  module[`../views${item.path}/index.vue`]
                }]
            })
        } else {
            let route:RouteRecordRaw = {
                path: item.path,
                component: () => import(`../page/index.vue`),
                children: []
            }
            let parentPath = item.path;
            for(let j = 0; j < item.children.length; j++) {
                let child = item.children[j];
                childs.push({
                    name: child.name,
                    path: `${child.path}`,
                    component: moduleChild[`../views${parentPath}${child.path}.vue`],
                })
            }
            route.children = childs;
            router.push(route);
        }
    }
    return router;
}