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
import storage from "good-storage";
import { SINGER_KEY } from "../assets/js/constant";
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
    computedSinger() {
      //计算歌手
      let ret = null;
      const singer = this.singer;
      if (singer) {
        //如果歌手存在，点击过来的
        ret = singer;
      } else {
        //props中没有传入singer，就比如不是点击进来的，读取session里的cacheSinger
        const cacheSinger = storage.session.get(SINGER_KEY);
        if (cacheSinger && cacheSinger.mid === this.$route.params.id) {
          // 如果cacheSinger存在并且mid就是当前页面的params.id;返回cacheSinger
          ret = cacheSinger;
        }
      }
      return ret;
    },
    pic() {
      const singer = this.computedSinger;
      return singer && singer.pic;
    },
    title() {
      const singer = this.computedSinger;
      return singer && singer.name;
    },
  },
  async created() {
    if (!this.computedSinger) {
      //容错处理，当computedSinger返回值有问题，跳转到上一级目录
      const path = this.$route.matched[0].path;
      this.$router.push({ path });
      return;
    }
    const result = await getSingerDetail(this.computedSinger);
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