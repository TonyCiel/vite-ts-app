import { createStore } from 'vuex';
import menu from './modules/menu';
import tags from './modules/tags';
import getters from './getters';

const store = createStore({
    modules: {
        menu,
        tags
    },
    getters
});

export default store;