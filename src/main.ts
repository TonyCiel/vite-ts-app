import { createApp } from 'vue'
import router from './router/index'
import store from './store/index'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'
import 'element-plus/theme-chalk/display.css'
 
import './styles/common.scss'
 
const app = createApp(App);
app.use(ElementPlus); // 引入第三方插件
app.use(router);
app.use(store);
app.mount('#app');