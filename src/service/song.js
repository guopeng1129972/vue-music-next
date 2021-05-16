import { get } from "./base";

export function getSongsUrl(songs) {
  // 如果歌手请求不到歌曲，返回歌手
  if (!songs.length) {
    return Promise.resolve(songs);
  }
  return get("/api/getSongsUrl", {
    mid: songs.map((song) => {
      return song.mid;
    }),
  }).then((result) => {
    const map = result.map;
    return songs
      .map((song) => {
        song.url = map[song.mid];
        return song;
      })
      .filter((song) => {
        return song.url.indexOf("vkey") > -1;
      });
  });
}
