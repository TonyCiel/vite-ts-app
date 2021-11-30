import { createStore } from 'vuex';
import menu from './modules/menu';
import getters from './getters';

const store = createStore({
    modules: {
        menu
    },
    getters
});

export default store;