import { MenuItem, menuState } from '../../type/index';
import { reqMenuRoute } from '../../api/system/index';
import { getStore, setStore } from '../../utils/store';
import {listToTree} from '../../utils/index';

const memu = {
    state: (): menuState => ({
        menuList: getStore('menu') || [],
        collapse: false, // 菜单是否展开
        allMenu: []
    }),
    actions: {
        GetMenuList({ commit }) {
            return new Promise(resolve => {
                reqMenuRoute().then(res => {
                    let routes = res.data.data || res.data || getStore('menu') || [];
                    let user:any = getStore('userInfo');
                    if (user) {
                        let roleMenus=  user.roleMenus || '';
                        let list = routes.filter(r => {
                            return roleMenus.indexOf(r.id ) > -1
                        });
                        routes = listToTree(list, -1);
                        console.log('新的',listToTree(list, -1))
                    }
                    // console.log('啊哈',res)
                    console.log('getStore', getStore('userInfo'))
                    // routes.shift()
                    setStore("menu", routes)
                    commit('SET_MENULIST', routes)
                    commit('SET_MENUALL', routes)
                    resolve(res)
                })
            })
        }
    },
    mutations: {
        SET_MENULIST(state, list: Array<MenuItem>) {
            state.menuList = list
        },
        // 把所有菜单提出来
        SET_MENUALL(state, list: Array<MenuItem>) {
            let menu = state.allMenu;
            list.forEach(ele => {
                if (ele.children && ele.children.length) {
                    ele.children.forEach(child => {
                        menu.push(child);
                    })
                } else {
                    menu.push(ele);
                }
            })
            state.allMenu = menu
        },
        SET_COLLAPSE(state, value: boolean) {
            state.collapse = value
        }
    }

}
export default memu;