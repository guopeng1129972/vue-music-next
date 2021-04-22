module.exports = {
  css: {
    loaderOptions: {
      sass: {
        //  全局引入mixin
        // additionalData
        prependData: `
      @import "@/assets/scss/variable.scss";
      @import "@/assets/scss/mixin.scss";`,
      },
    },
  },
};
