export function shuffle(source) {
  // 复制备份
  const arr = source.slice();
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomNumber(i);
    swap(arr, i, j);
  }
  return arr;
}
function getRandomNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
