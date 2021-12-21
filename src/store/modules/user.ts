import {setStore,getStore} from '../../utils/store';
import { UserInfo,UserState } from '../../type/index';
const user = {
    state: ():UserState => ({
        userInfo: getStore('userInfo') || {}
    }),
    mutations: {
        UPDATE_USERINFO(state:UserState,user: UserInfo) {
            setStore('userInfo',user);
            state.userInfo = user
        } 
    }
}
export default user;