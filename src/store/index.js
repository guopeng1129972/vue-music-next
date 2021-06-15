import { createLogger, createStore } from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import mutations from "./mutations";
import state from "./state";

const debug = process.env.NODE_ENV !== "production"; //是不是debug版本

export default createStore({
  state,
  getters,
  mutations,
  actions,
  // 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，
  // 将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  // 只能通过mutation来改变状态（不支持异步）否则会报错
  strict: debug, //严格模式
  //在线上开发使用createLogger创建一个插件，如果不是就不用
  plugins: debug ? [createLogger()] : [],
});
