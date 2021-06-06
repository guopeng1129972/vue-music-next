<template>
  <div class="singer-detail">
    <musicList
      :songs="songs"
      :pic="pic"
      :title="title"
      :loading="loading"
    ></musicList>
  </div>
</template>

<script>
import { getSingerDetail } from "@/service/singer";
import { processSongs } from "@/service/song";
import musicList from "@/components/music-list/music-list.vue";
export default {
  name: "singer-detail",
  components: { musicList },
  props: {
    singer: {
      typeof: Object,
    },
  },
  data() {
    return {
      songs: [],
      loading: true,
    };
  },
  computed: {
    pic() {
      return this.singer && this.singer.pic;
    },
    title() {
      return this.singer && this.singer.name;
    },
  },
  async created() {
    const result = await getSingerDetail(this.singer);
    // console.log(this.singer);
    this.songs = await processSongs(result.songs);
    this.loading = false;
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