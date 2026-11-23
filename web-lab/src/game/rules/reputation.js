// 口碑規則：打烊時星等怎麼變
// 對應規則書：「來客數與口碑星等」
// 驗收：npm run check 的「口碑規則」

import { MIN_STARS, MAX_STARS } from '../config.js';

// 輸入：
//   stars        今天開店時的星等
//   satisfied    滿意的客人數
//   neutral      普通的客人數
//   unsatisfied  不滿的客人數
// 回傳：打烊後的新星等
export function updateStars({ stars, satisfied, neutral, unsatisfied }) {
  const total = satisfied + neutral + unsatisfied;
  if (total === 0) return stars;

  // 用「人數 × 100 比 總人數 × 門檻」比較，避免小數誤差
  const s = satisfied * 100;
  const u = unsatisfied * 100;
  let delta = 0;
  if (s >= total * 75) delta = 1;
  else if (s >= total * 60) delta = 0.5;
  else if (s < total * 15 || u >= total * 40) delta = -1;
  else if (s < total * 30 || u >= total * 25) delta = -0.5;

  return Math.min(MAX_STARS, Math.max(MIN_STARS, stars + delta));
}
