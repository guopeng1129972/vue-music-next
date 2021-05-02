import { computed, ref } from "vue";

export default function useShortcut(props, groupRef) {
  const scrollRef = ref(null);
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title;
    });
  });

  function onShortcutTouchStart(e) {
    console.log(scrollRef.value);
    const anchorIndex = parseInt(e.target.dataset.index);
    const targetEl = groupRef.value.children[anchorIndex];
    const scroll = scrollRef.value.scroll;
    scroll.scrollToElement(targetEl, 0);
  }
  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
  };
}
