import { ref, watch, computed, nextTick } from "vue";

export default function useFixed(props) {
  // fixedTitle
  const groupRef = ref(null);
  let listHeights = ref([]);
  let scrollY = ref(0);
  let currentIndex = ref(0);
 
  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return;
    }
    // console.log(currentIndex)
    const currentGroup = props.data[currentIndex.value];
    // console.log("currentGroup", currentGroup);
    return currentGroup ? currentGroup.title : "";
  });
  watch(
    () => props.data,
    async () => {
      await nextTick();
      calculate();
    }
  );

  watch(scrollY, (newY) => {
    // console.log("newY", newY);
    const listHeightsVal = listHeights.value;
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const heightTop = listHeightsVal[i];
      const heightBottom = listHeightsVal[i + 1];
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i;
      }
    }
  });
  function calculate() {
    const list = groupRef.value.children;
    const listHeightsVal = listHeights.value;
    let height = 0;
    listHeightsVal.length = 0;
    listHeightsVal.push(height);
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight;
      listHeightsVal.push(height);
    }
  }
  function onScroll(pos) {
    scrollY.value = -pos.y;
    // console.log("scrollY", scrollY.value);
  }
  return {
    groupRef,
    onScroll,
    fixedTitle,
  };
}
