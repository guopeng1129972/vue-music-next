import { get } from "./base";

export function getSearch() {
  return get("/api/getSingerList");
}
