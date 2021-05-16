<template>
  <div class="singer-detail"></div>
</template>

<script>
import { getSingerDetail } from "@/service/singer";
import { getSongsUrl } from "@/service/song";
export default {
  name: "singer-detail",
  props: {
    singer: {
      typeof: Object,
    },
  },
  async created() {
    const result = await getSingerDetail(this.singer);
    const songs = await getSongsUrl(result.songs);
    console.log("result", result);
    console.log("songs", songs);
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