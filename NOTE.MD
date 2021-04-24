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

# 2-6 【讨论题】获取轮播图接口数据

题目描述： 为什么要用代理请求的方式获取轮播图数据，前端还有哪些解决跨域问题的方式？
提示： 需要去全面了解浏览器的同源策略，然后结合课程的场景思考，可以从书籍或者是网上查找相关资料。
答：
课程上这么做主要还是前后端分离吧，
这样在服务器端先获取好一些数据，前端就没必要这么做了，
从用户角度出发，去获取数据只在一个服务器上，
在客户端，这样也会比较快，因为少了服务器的数量，数据展示就会快点
前端还有哪些解决跨域问题？
前端解决不了跨越问题吧，跨域不跨域应该是服务器支持不支持数据让不让别的域的机器请求数据，
不是前端能解决的，
前端可以在本域名的网站下，去请求别的域的资源，
JSONP：利用 script 标签可跨域的特点，在跨域脚本中可以直接回调当前脚本的函数。
创建 script 标签，以 json 格式发送请求到服务返回 cb,然后 dom 写入 script 执行 cb
CORS：服务器设置 HTTP 响应头中 Access-Control-Allow-Origin 值，解除跨域限制。
Access-Control-Allow-Origin 指定可以跨域的白名单，服务器可以返回不通过

# 2-7 轮播图组件的开发

```js
// 指定用户可以如何操作 只能向y轴滑动
touch-action: pan-y;
// 启用GPU加速
transform: translate3d(0,0,0);
// 设置两面翻转 背面是否可见
backface-visibility: hidden;
// translate()函数是css3的新特性.在不知道自身宽高的情况下，可以利用它来进行水平垂直居中.。
// 当使用：top: 50%;left: 50%;， 是以左上角为原点，故不处于中心位置
// transform:translate(-50%,-50%) 作用是，往上（x轴）,左（y轴）移动自身长宽的 50%，以使其居于中心位置。

transform: translateX(-50%);
```

## src/components/base/slider/slider.vue

创建滑动组件 vue3 使用 ref
获取

```html
<div class="slider" ref="rootRef"></div>
```

使用

```js
const rootRef = ref(null);
// useSlider 传值 rootRef 而不是rootRef.value 是因为这里需要使用rootRef的双向绑定的特性
useSlider(rootRef);
```

## src/components/base/slider/use-slider.js

```js
// 获取 slider currentPageIndex 节点 相当于document.getelement
  const slider = ref(null);
  const currentPageIndex = ref(0);
export useSlider
```

在滑动组件中使用 BScoll 库挂载

# 2-8 轮播图组件的使用

## src/views/recommend.vue

获取数据和展示

## src/server/search.js

这 4 个文件我是根据同理推出来的获取的接口内容
