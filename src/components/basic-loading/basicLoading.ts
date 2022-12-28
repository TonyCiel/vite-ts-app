import BasicLoading from "./index.vue";
import { h, render } from "vue";

export default class BasicLoadingConstance {
  isShow: Boolean;
  content: HTMLDivElement;
  text?: string;
  constructor(text?: string) {
    this.content = document.createElement("div");
    this.isShow = false;
    this.text = text;
  }
  /**
   * 显示loading
   */
  show() {
    const loading = h(BasicLoading, {
        text: this.text
    });
    render(loading, this.content);
    document.body.insertBefore(this.content, document.body.firstChild);
    this.isShow = true;
  }
  /**
   * 隐藏loading
   */
  hide() {
    this.isShow = false;
    render(null, this.content);
    document.body.removeChild(this.content);
  }
}
