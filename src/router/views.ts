// import router from './index';
import { MenuItem } from '../type/index';
import { RouteRecordRaw} from 'vue-router';
const module = import.meta.glob('../views/**/**/**.vue');

/**
 *  动态渲染路由
 * @param routes 
 */
const formatRoutes = (menuItem: MenuItem,isFirst:Boolean) => {
    let router:RouteRecordRaw = {
        path: menuItem.path,
        name: menuItem.name,
        component: () => import(`../page/index.vue`),
    } ;
    // console.log(menuItem.path,isFirst)
    let menuChilds = menuItem.children;
    if(menuChilds && menuChilds.length) {
        let children:Array<RouteRecordRaw> = [];
        for(let i = 0; i < menuChilds.length; i++) {
            let r = formatRoutes(menuChilds[i], false);
            let viewPath = r.path.substr(1);
            let childs = r.children || [];
            // 还有子项就用另一个引入路由的组件了
            r.component =  childs.length ? () => import(`../page/layout.vue`) :  module[`../views/${viewPath}.vue`]
            children.push(r)
        }
        router.children = children ;
    } else {
        let viepath = menuItem.path.substr(1) + '/index'
        router.children = isFirst ?  [{
            name: menuItem.name,
            path: 'index',
            component:  module[`../views/${viepath}.vue`]
        }] : []
    }
    
    return router;
}

export const getRoutes = (routes: Array<MenuItem>) => {
    let routers:Array<RouteRecordRaw> = [];
    for(let i = 0; i<routes.length; i++) {
        let router = formatRoutes(routes[i],true);
        routers.push(router)
    }
    return routers;
}