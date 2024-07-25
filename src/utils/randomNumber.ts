
/**
 * @desc 生成随机整数
 * @param min 起始值
 * @param max 终止值
 * @returns 
 */
export function randomNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}