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

### src/service/base.js

### src/service/recommend.js

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

## src/service/search.js

这 4 个文件我是根据同理推出来的获取的接口内容

# 2-9 歌单列表实现&滚动组件的封装

```html
<!-- 定义如何计算一个元素的总宽度和总高度 -->
<!-- border-box 将border计算在内，content-box 将内容计算在内 -->
box-sizing: border-box;
<!-- align-items属性将所有直接子节点上的align-self值设置为一个组。 -->
<!-- align-self属性设置项目在其包含块中在交叉轴方向上的对齐方式。 -->
<!-- align-items: center; 所有子元素居中显示  -->
align-items: center; flex: 0 0 60px;
```

## src/components/base/scroll

创建滚动组件

# 2-10 图片懒加载的实现

## src/views/recommend.vue

就是引入库（全局引入） 使用的话 v-lazy 选择需要懒加载的图片

```html
<img v-lazy="item.pic" width="60" height="60" />
```

loading 参数 传入默认替代的图片

```js
  .use(lazyPlugin, {
    loading: require("@/assets/images/default.png"),
  })
```

# 2-11 v-loading 自定义指令的开发

## src/components/base/loading

创建自定义组件 loading

## src/main.js

注册到全局

```js
  .directive("loading", loadingDirective)
```

## src/views/recommend.vue

在组件中使用

```html
<div class="recommend" v-loading="loading"></div>
```

```js
  computed: {
    loading() {
      return !this.sliders.length && !this.albums.length;
    },
  },
```

# 2-12 v-loading 自定义指令的优化

## src/assets/js/dom.js

将操作 dom 的方法提出来写

## src/components/base/loading/directive.js

添加自定义文字的

## src/views/recommend.vue

# 3-1 歌手列表数据获取

主要就是 按照预定的接口 获取歌手信息

## src/views/singer.vue

注意异步获取的生命周期的时间点 created

## src/views/singer.vue

配置前端接口

# 3-2 IndexList 组件基础滚动功能实现

## src/views/singer.vue

引入 IndexList 组件

## src/components/base/loading/loading.vue

修改默认值，因为很多地方会用到

## src/components/base/index-list/index-list.vue

构建基础组件 列表组件

# 3-3 歌手列表固定标题实现（上）

## src/components/base/index-list/index-list.vue

1.创建 fixedTitle 实例 .fixed 样式 2.引入 useFixed 组件 传入 ref="groupRef"
3.setup 阶段 引入 groupRef, onScroll 4.重写 scroll 组件 添加 :probe-type="3" @scroll="onScroll" 属性 方法

## src/components/base/index-list/use-fixed.js

1. hight += list[i].clientHeight;获取元素高度
2. 自定义组件中的 watch 使用，监听 props.data 的变换

```js
watch(
  () => props.data,
  async () => {
    await nextTick();
    calculate();
  }
);
```

3. nextTick
   将回调推迟到下一个 DOM 更新周期之后执行。在更改了一些数据以等待 DOM 更新后立即使用它。
4. scrollY 返回的值向下为负值
   scrollY.value = -pos.y;

## src/components/base/scroll/scroll.vue

```js
  props: {
    //1.base-scroll 组件的probeType属性 大于0 会添加scroll事件
    probeType: {
      type: Number,
      default: 0,
    },
  },
  //2.vue3中emits事件 按照这样的方式
  emits: ["scroll"],
  setup(props, { emit }) {
    const rootRef = ref(null);
    useScroll(rootRef, props, emit);
    return {
      rootRef,
    };
  },
```

## src/components/base/scroll/use-scroll.js

1. useScroll 传值添加 emit
2. 当 probeType>0 监听 scroll 事件，提交当前 pos 对象

```js
if (options.probeType > 0) {
  scrollVal.on("scroll", (pos) => {
    emit("scroll", pos);
  });
}
```

# 3-4 【讨论题】歌手列表固定标题实现

## 题目描述：

Vue 3 的 Composition API 与 Options API 有何区别，在什么场景下使用。
提示： 需要了解 Composition API 的设计背景，可以去 GitHub 对应的 RFC 中去查找，
并且思考它们之间在使用中的一些差别。

### 1.逻辑组织

碎片化的 Options api 在组件复用的过程中，从根组件来看，当需要修改一个功能时，需要跳来跳去改
Composition API 在逻辑组织方面的优势，以后修改一个属性功能的时候，只需要跳到控制该属性的方法中即可

### 2.逻辑复用

主要体现在 mixin
当我们一个组件混入大量不同的 mixins 的时候
会存在两个非常明显的问题：
命名冲突
数据来源不清晰
使用 Composition api 引入就会很清晰，因为标明了来源

## 小结

1. 在逻辑组织和逻辑复用方面，Composition API 是优于 Options API
2. 因为 Composition API 几乎是函数，会有更好的类型推断。
3. Composition API 对 tree-shaking 友好，代码也更容易压缩
4. Composition API 中见不到 this 的使用，减少了 this 指向不明的情况
5. 如果是小型组件，可以继续使用 Options API，也是十分友好的
   https://www.cnblogs.com/houxianzhou/p/14368919.html

# 3-5 歌手列表固定标题实现（中）

## src/components/base/index-list/index-list.vue

1. 添加 fixedTitle 并且 当 fixedTitle<0 的时候不显示
2. 修改 groupRef 的错误绑定

## src/components/base/index-list/use-fixed.js

1. 添加对 fixedTitle 的计算属性 computed
2. 添加 对 scrollY 的 watch 属性
3. watch 的 props.data 属性在构建组件之前都是 undefined，在 await nextTick 之后才能监听到

```js
watch(() => props.data);
// 赋值操作
const currentGroup = props.data[currentIndex.value];
```

# 3-6 歌手列表固定标题实现（下）

# 3-7 歌手列表快速导航入口实现（01）

## src/components/base/index-list/use-shortcut.js

1. 添加 useShortcut
2. 添加 shortcut 模板与 css 样式

## src/components/base/index-list/use-fixed.js

1. 分析之后，需求需要显示 currentIndex，在 use-fixed 中已经计算过 抛出

# 3-8 歌手列表快速导航入口实现（02）

## src/components/base/scroll/scroll.vue

1. 导出在 useScroll 定义的 scroll 的 ref

## src/components/base/scroll/use-scroll.js

1. 导出定义的 scroll 的 ref

## src/components/base/index-list/use-shortcut.js

1. 引入 scroll 组件的 ref
2. 写 onShortcutTouchStart 方法
3. bast-scroll 组件方法，跳转到滑动的那一块

```js
scroll.scrollToElement(targetEl, 0);
```

## src/components/base/index-list/index-list.vue

1. 阻止 touchstart touchmove touchend 的默认事件事件 重写为 onShortcutTouchStart

```html
@touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent
@touchend.stop.prevent @mousedown.stop.prevent="onShortcutTouchStart"
@mousemove.stop.prevent @mouseup.stop.prevent
```

2. 使用使用 h5 的 dataset 绑定 index :data-index="index"
3. 将 groupRef 传入 useShortcut 记录 :data-index="index" 用于绑定
4. 导出 onShortcutTouchStart 方法,scrollRef dom 结构
5. 绑定 ref="scrollRef"
