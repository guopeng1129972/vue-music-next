import { nextTick, ref, watch } from "vue";

export default function useFixed(props) {
  // fixedTitle
  const groupRef = ref(null);
  let listHights = ref([]);
  let scrollY = ref(0);
  watch(
    () => props.data,
    async () => {
      await nextTick();
      calculate();
    }
  );
  function calculate() {
    const list = groupRef.value.children;
    const listHightVal = listHights.value;
    let hight = 0;
    listHightVal.length = 0;
    listHightVal.push(hight);
    for (let i = 0; i < list.length; i++) {
      hight += list[i].clientHeight;
      listHightVal.push(hight);
    }
  }
  function onScroll(pos) {
    scrollY.value = -pos.y;
  }
  return {
    groupRef,
    onScroll,
  };
}
