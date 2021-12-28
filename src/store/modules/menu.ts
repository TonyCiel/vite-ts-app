import { MenuItem, menuState } from '../../type/index';
import { reqMenuRoute } from '../../api/system/index';
import { getStore, setStore } from '../../utils/store';
import {listToTree,getParentNameList} from '../../utils/index';

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
                        let list = routes.filter(r => { // 过滤掉有权限的
                            return roleMenus.indexOf(r.id ) > -1
                        });
                        routes = listToTree(list, -1);
                        list.forEach(item => {
                            item.parentNames = getParentNameList(routes,item.id)
                        })
                        commit('SET_MENUALL', list)
                        console.log('新的',routes)
                        setStore("menu", routes)
                        commit('SET_MENULIST', routes)
                        resolve(res)
                    }
                    
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
            console.log('allllist',list)
            state.allMenu = list
            // .filter(item => {
            //     return item.parentId != String(-1)
            // });
        },
        SET_COLLAPSE(state, value: boolean) {
            state.collapse = value
        }
    }

}
export default memu;