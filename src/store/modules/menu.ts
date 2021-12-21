import { MenuItem, menuState } from '../../type/index';
import { reqMenuRoute } from '../../api/system/index';
import { getStore, setStore } from '../../utils/store';

const memu = {
    state: ():menuState => ({
        menuList: getStore('menu') || [],
        collapse: false, // 菜单是否展开
        allMenu: []
    }),
    actions: {
        GetMenuList({ commit }) {
            return new Promise(resolve => {
                reqMenuRoute().then(res => {
                    let routes = res.data.data || res.data || getStore('menu') || [];
                    // console.log('啊哈',res)
                    setStore("menu",routes)
                    commit('SET_MENULIST',routes)
                    commit('SET_MENUALL',routes)
                    resolve(res)
                })
            })
        }
    },
    mutations: {
        SET_MENULIST(state, list: Array<MenuItem>) {
            let menu: Array<MenuItem> = state.menuList || [];
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