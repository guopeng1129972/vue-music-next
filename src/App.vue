<template>
  <m-header></m-header>
  <m-tab></m-tab>
  <router-view></router-view>
  <m-player></m-player>
</template>

<script>
import Header from "@/components/header/header";
import Tab from "@/components/tab/tab";
import Player from "@/components/player/player";

export default {
  components: {
    mHeader: Header,
    mTab: Tab,
    mPlayer: Player,
  },
};
</script>

<style></style>
