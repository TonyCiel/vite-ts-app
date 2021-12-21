import { createStore } from 'vuex';
import menu from './modules/menu';
import tags from './modules/tags';
import user from './modules/user';
import getters from './getters';

const store = createStore({
    modules: {
        menu,
        tags,
        user
    },
    getters
});

export default store;