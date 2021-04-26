export function addClass(el, className) {
  //   contains()，js原生方法，用于判断DOM元素的包含关系；
  //  需要注意的是：它以HTMLElement为参数，且返回布尔值。
  if (!el.classList.contains(className)) {
    el.classList.add(className);
  }
}

export function removeClass(el, className) {
  el.classList.remove(className);
}
