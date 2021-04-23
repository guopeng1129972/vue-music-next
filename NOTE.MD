# vue3 实战课完成的 vue-music

# 2.创建

```bash
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router, Vuex, CSS Pre-processors, Linter, Unit
? Choose a version of Vue.js that you want to start the project with 3.x (Preview)
? Use history mode for router? (Requires proper server setup for index fallback in production) No
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with node-sass)
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Jest
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? Yes
? Save preset as: vue-music
```

## 2-3 项目基础代码编写

禁止用户页面缩放

```html
<meta
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
  name="viewport"
/>
```

## 2-4 Tab 组件实现

### src/router/index.js

默认重定向

```js
  redirect: "/recommend",
```

## 2-5 获取轮播图接口数据

问题
rt
backend/router.js
这个文件中的接口 以及接口信息
backend/sign.js
这个签名文件是第三方网站（qq 音乐）提供的，
是在哪找的，如果我想用别的第三方接口，我应该在哪找，
我只找见个 QMplayer 的那个 player.js，但是这个好像直接就是一个控件

### src/server/base.js

### src/server/recommend.js

```js
axios
  .get("url", { params })
  .then((res) => {
    // 处理逻辑
  })
  .catch((e) => {
    console.log(e);
  });
```

### vue.config.js

```js
  devServer: {
    before(app) {
      registerRouter(app);
    },
  },
```
