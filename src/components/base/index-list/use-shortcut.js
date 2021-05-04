import { computed, ref } from "vue";

export default function useShortcut(props, groupRef) {
  const ANCHOR_HEIGHT = 18;
  const scrollRef = ref(null);
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title;
    });
  });

  const touch = {};
  function onShortcutTouchStart(e) {
    const anchorIndex = parseInt(e.target.dataset.index);

    // console.log("anchorIndex", anchorIndex);
    touch.y1 = e.pageY || e.touches[0].pageY;
    touch.anchorIndex = anchorIndex; //简单的闭包技巧
    scrollTo(anchorIndex);
  }
  function onShortcutTouchMove(e) {
    touch.y2 = e.pageY || e.touches[0].pageY;
    const delat = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0;
    const anchorIndex = touch.anchorIndex + delat;
    // console.log("delat", delat, "anchorIndex", anchorIndex);
    scrollTo(anchorIndex);
  }
  function scrollTo(index) {
    if (Number.isNaN(index) === true || index == void 0) {
      return;
    }
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index));
    // console.log(index);
    const targetEl = groupRef.value.children[index];
    const scroll = scrollRef.value.scroll;
    scroll.scrollToElement(targetEl, 1100);
  }
  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove,
  };
}
