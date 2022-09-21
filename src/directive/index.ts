import { DirectiveBinding } from 'vue';
const directivesList = {
  contextmenu: {
    mounted(el: Element, binding:DirectiveBinding) {
      console.log('监听tag',el,binding)
      // el.addEventListener("mounsedown", el.handler);
    }
  }
}
const directives = {
  install: function (app) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key]); // 注册
    });
  }
};

export default directives