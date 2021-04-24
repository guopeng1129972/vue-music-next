import BScoll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
import { onMounted, onUnmounted, ref } from "vue";
BScoll.use(Slide);
export default function useSlider(wrapperRef) {
  const slider = ref(null);
  const currentPageIndex = ref(null);
  onMounted(() => {
    const sliderVal = (slider.value = new BScoll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    }));
    sliderVal.on("slideWillChange", (page) => {
      currentPageIndex.value = page.x;
    });
  });
  onUnmounted(() => {
    slider.value.destroy();
  });
  return {
    slider,
    currentPageIndex,
  };
}
