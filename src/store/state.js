import { PLAY_MODE } from "@/assets/js/constant";
const state = {
  sequenceList: [], //歌曲列表
  playlist: [], //播放列表
  playing: false, //正在播放
  playMode: PLAY_MODE.sequence, //播放的模式
  currentIndex: 0, //播放那一首歌
  fullScreen: false, //是否全屏
};

export default state;
