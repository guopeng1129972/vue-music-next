import BScoll from "@better-scroll/core";
import ObserveDom from "@better-scroll/observe-dom";
import { onMounted, onUnmounted, ref } from "vue";
BScoll.use(ObserveDom);
export default function useScroll(wrapperRef, options) {
  const scroll = ref(null);
  onMounted(() => {
    scroll.value = new BScoll(wrapperRef.value, {
      observeDOM: true,
      ...options,
    });
  });
  onUnmounted(() => {
    scroll.value.destroy();
  });

  return {
    scroll,
  };
}
