<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers" @select="selectSinger"></IndexList>
    <router-view :singer="selectedSinger"></router-view>
  </div>
</template>
<script>
import { getSingerList } from "@/service/singer";
import IndexList from "@/components/base/index-list/index-list";
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
      this.$router.push({
        path: `/singer/${singer.mid}`,
      });
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
