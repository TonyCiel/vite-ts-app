import router from './router/index';
import { getStore } from './utils/store';
import { configure, start, done } from 'nprogress'
import store from './store/index';
import {_RouteLocationBase} from "vue-router";
configure({ showSpinner: false })
router.beforeEach((to:_RouteLocationBase, form: _RouteLocationBase,next:Function) => {
  start()
  const isHasUser = getStore("userInfo") ? true : false;
  const isLogin = getStore("token","session") ? isHasUser ? true:  false : false;
  // // 保存路由tag
  if(to.path !== '/login' && to.path !== '/' && to.path !== '/404') {
      let tagValue:any = Object.assign({},to);
      delete tagValue.matched
      store.commit("ADD_TAG",tagValue);
  }
  // // console.log('isLogin',isLogin)
  if(!isLogin && to.path !== '/login' && to.path !== '/') {
      next({path: '/login'});
  }
  if(isLogin && to.path == "/") {
      next({path: '/wel/index'});
  }
  let name:any = to.meta.title || to.name || "";
  document.title = `${name ? `Vue3.0管理平台-${name}` : 'Vue3.0管理平台'}`;
  // console.log(to,form);
  next()
})

router.afterEach(() => {
  setTimeout(() => {
      done()
  }, 200)
})