<template>推荐页面</template>

<script>
import { getRecommend } from "../server/recommend";
export default {
  name: "recommend",
  async created() {
    const result = await getRecommend();
    console.log(result);
  },
};
</script>
<style lang="scss" scoped>
</style>
