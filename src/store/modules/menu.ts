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
                child.parentName =  item.name;
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
        allMenu: [],
        collapse: false, // 菜单是否展开
    },
    actions: {
        GetMenuList({ commit }) {
            return new Promise(resolve => {
                reqMenuRoute().then(res => {
                    let routes = addRouteFullPath(res.data.data);
                    setStore("menu",routes)
                    // console.log('res',getStore('menu'));
                    commit('SET_MENULIST',routes)
                    commit('SET_MENUALL',routes)
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
        },
        // 把所有菜单提出来
        SET_MENUALL(state, list: Array<MenuItem>) {
            let menu = state.allMenu;
            list.forEach(ele => {
                if(ele.children && ele.children.length) {
                    ele.children.forEach(child => {
                        menu.push(child);
                    })
                } else {
                    menu.push(ele);
                }
            })
            state.allMenu = menu
        },
        SET_COLLAPSE(state,value:boolean) {
            state.collapse = value
        }
    }

}
export default memu;