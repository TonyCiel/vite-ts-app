import { MenuItem } from '../../type/index';
import { reqMenuRoute } from '../../api/system/index';
import { getStore, setStore } from '../../utils/store';
/**
 * 用于格式化路由，增加全路径，不支持三级路由，后续支持
 * @param routes 
 * @returns 一个带有全路径的路由
 */
const addRouteFullPath = (routes: Array<MenuItem>) => {
    let fomatroutes: Array<MenuItem> = [];
    for(let i = 0; i < routes.length; i++) {
        let item = routes[i];
        item.fullPath = `${item.path}/index`
        if(item.children && item.children.length) {
            item.children.forEach(child => {
                child.fullPath = `${item.path}${child.path}`
            })
        }
        fomatroutes.push(item);
    } 
    return fomatroutes
}

const memu = {
    state: {
        menuList: getStore('menu') || [],
    },
    actions: {
        GetMenuList({ commit }) {
            return new Promise(resolve => {
                reqMenuRoute().then(res => {
                    let routes = addRouteFullPath(res.data.data);
                    setStore("menu",routes)
                    // console.log('res',getStore('menu'));
                    commit('SET_MENULIST',routes)
                    resolve(res)
                })
            })
        }
    },
    mutations: {
        SET_MENULIST(state, list: Array<MenuItem>) {
            let menu = state.menuList;
            list.forEach(ele => {
                if (!menu.find(item => item.name === ele.name && item.path === ele.path)) {
                    menu.push(ele);
                }
            })
            state.menuList = menu
        }
    }

}
export default memu;