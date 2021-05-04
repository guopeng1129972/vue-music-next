<template>
  <div class="singer-detail"></div>
</template>

<script>
import { getSingerDetail } from "@/service/singer";
export default {
  name: "singer-detail",
  props: {
    singer: {
      typeof: Object,
    },
  },
  async created() {
    const result = await getSingerDetail(this.singer);
    console.log(result);
  },
};
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  background: $color-background;
}
</style>