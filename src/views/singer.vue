<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers" @select="selectSinger"></IndexList>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedSinger"></component>
      </transition>
    </router-view>
  </div>
</template>
<script>
import { getSingerList } from "@/service/singer";
import IndexList from "@/components/base/index-list/index-list";
import storage from "good-storage";
import { SINGER_KEY } from "../assets/js/constant";
export default {
  name: "singer",
  components: { IndexList },
  data() {
    return {
      singers: [],
      selectedSinger: null,
    };
  },
  async created() {
    const result = await getSingerList();
    this.singers = result.singers;
    // console.log(result);
  },
  methods: {
    selectSinger(singer) {
      // console.log(2)
      this.selectedSinger = singer;
      this.cacheSinger(singer); //调用cacheSinger，缓存singer
      this.$router.push({
        path: `/singer/${singer.mid}`,
      });
    },
    cacheSinger(singer) {
      //定义cacheSinger，用于缓存singer
      storage.session.set(SINGER_KEY, singer);
    },
  },
};
</script>
<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 80px;
  bottom: 0;
}
</style>
