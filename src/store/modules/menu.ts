import { MenuItem } from '../../type/index';
import { reqMenuRoute } from '../../api/system/index';
const memu = {
    state: {
        menuList: [],
    },
    actions: {
        GetMenuList({ commit }) {
            return new Promise(resolve => {
                reqMenuRoute().then(res => {
                    console.log('res',res.data.data);
                    commit('SET_MENULIST',res.data.data)
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