import BScoll from "@better-scroll/core";
import ObserveDom from "@better-scroll/observe-dom";
import { onMounted, onUnmounted, ref } from "vue";
BScoll.use(ObserveDom);
export default function useScroll(wrapperRef, options, emit) {
  const scroll = ref(null);

  onMounted(() => {
    const scrollVal = (scroll.value = new BScoll(wrapperRef.value, {
      observeDOM: true,
      ...options,
    }));
    if (options.probeType > 0) {
      scrollVal.on("scroll", (pos) => {
        emit("scroll", pos);
      });
    }
  });
  onUnmounted(() => {
    scroll.value.destroy();
  });

  return scroll;
}
