import {setStore,getStore} from '../../utils/store';
import {homePage} from '../../../env.js';
const tags = {
    state: {
        tagList: getStore('tagList') || []
    },
    mutations: {
        // 添加标签导航
        ADD_TAG(state,tag) {
            let list = state.tagList;
            let routes = list.filter(item => {
                return item.fullPath == tag.fullPath;
            })
            if(tag.fullPath !== homePage && !routes.length) {
                list = [...list,tag];
            }
            state.tagList = list;
            setStore("tagList",state.tagList)
        },
        // 移除标签
        REMOVE_TAG(state,fullPath:string) {
            let list = state.tagList;
            let routes = list.filter(item => {
                return item.fullPath != fullPath;
            });
            state.tagList = routes;
            setStore("tagList",state.tagList)
        },
        SET_TAGS_NULL(state,list) {
            state.tagList = list;
            setStore("tagList",state.tagList)
        }
    }
}
export default tags;