import { createApp } from "vue";
import Loading from "./loading";
import { addClass, removeClass } from "@/assets/js/dom";
const relationCls = "g-relative";
const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading);
    const instance = app.mount(document.createElement("div"));
    el.instance = instance;
    const title = binding.arg;
    if (typeof title !== "undefined") {
      instance.setTitle(title);
    }
    if (binding.value) {
      append(el);
    }
  },
  updated(el, binding) {
    const title = binding.arg;
    if (typeof title !== "undefined") {
      el.instance.setTitle(title);
    }
    if (binding.value != binding.oldValue) {
      binding.value ? append(el) : remove(el);
    }
  },
};
function append(el) {
  // el.instance.$el el的instance实例对应的$eldom对象
  const style = getComputedStyle(el);
  // debugger;
  if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
    addClass(el, relationCls);
  }
  el.appendChild(el.instance.$el);
}
function remove(el) {
  removeClass(el, relationCls);
  el.removeChild(el.instance.$el);
}
export default loadingDirective;
