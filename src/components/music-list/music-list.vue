<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      class="list"
      :style="scrollStyle"
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "../base/scroll/scroll.vue";
import songList from "../base/song-list/song-list.vue";
import { mapActions } from "vuex";
const RESERVED_HEIGHT = 40;
export default {
  components: { scroll, songList },
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: String,
    pic: String,
    loading: Boolean,
    //设置noResultText的props
    noResultText: {
      type: String,
      default: "抱歉，没有找到可播放的歌曲",
    },
  },
  data() {
    return {
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0,
    };
  },

  computed: {
    // 设置当loading结束，并且返回没值的这种情况
    noResult() {
      return !this.loading && !this.songs.length;
    },
    bgImageStyle() {
      const scrollY = this.scrollY;
      let zIndex = 0;
      let paddingTop = "70%";
      let height = 0;
      let translateZ = 0; //处理ios兼容问题
      //  console.log(scrollY,this.maxTranslateY);
      if (scrollY > this.maxTranslateY) {
        zIndex = 10;
        paddingTop = 0;
        height = `${RESERVED_HEIGHT}px`;
        translateZ = 1; //处理ios兼容问题
      }

      let scale = 1;
      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight);
      }
      return {
        zIndex,
        paddingTop,
        height,
        backgroundImage: `url(${this.pic})`,
        transform: `scale(${scale}) translateZ(${translateZ}px)`, //处理ios兼容问题
      };
    },
    scrollStyle() {
      return {
        top: `${this.imageHeight}px`,
      };
    },
    filterStyle() {
      let blur = 0;
      let scrollY = this.scrollY;
      let imageHeight = this.imageHeight;
      if (scrollY >= 0) {
        blur =
          Math.min(this.maxTranslateY / imageHeight, scrollY / imageHeight) *
          20;
      }
      return {
        backdropFilter: `blur(${blur}px)`,
      };
    },
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT;
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    onScroll(pos) {
      this.scrollY = -pos.y;
    },
    selectItem({ /* song */ index }) {
      this.selectPlay({ list: this.songs, index });
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    // overflow: hidden; //控制滚动是否隐藏掉不隐藏就在原地滚，隐藏就会到顶隐藏
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
