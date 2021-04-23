<template>
  <m-header></m-header>
  <m-tab></m-tab>
  <router-view></router-view>
</template>

<script>
import Header from "@/components/header/header";
import Tab from "@/components/tab/tab";

export default {
  components: {
    mHeader: Header,
    mTab: Tab,
  },
};
</script>

<style>
</style>