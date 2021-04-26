import { createApp } from "vue";
import Loading from "./loading";

const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading);
    const instance = app.mount(document.createElement("div"));
    el.instance = instance;
    if (binding.value) {
      append(el);
    }
  },
  updated(el, binding) {
    if (binding.value != binding.oldValue) {
      binding.value ? append(el) : remove(el);
    }
  },
};
function append(el) {
  // el.instance.$el el的instance实例对应的$eldom对象
  el.appendChild(el.instance.$el);
}
function remove(el) {
  el.removeChild(el.instance.$el);
}
export default loadingDirective;
