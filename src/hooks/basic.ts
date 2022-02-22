import {useStore} from 'vuex';
import {useRoute,useRouter} from 'vue-router';
const basicHook = () => {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    return {
        store,
        router,
        route,
    }
}
export default basicHook