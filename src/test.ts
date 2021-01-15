// 贪心

function findContentChildren(g: number[], s: number[]): number {
  g.sort((e1, e2) => e2 - e1)
  s.sort((e1, e2) => e2 - e1)

  let gi = 0
  let si = 0
  while (gi < g.length && si < s.length) {
    if (s[si] >= g[gi]) {
      gi++
      si++
    } else {
      gi++
    }
  }

  return si
};

// 392


// 每次选择结尾最前的，且和前一个区间不重复的区间
function eraseOverlapIntervals(intervals: number[][]): number {
  if (intervals.length == 0) return 0
  intervals.sort((e1, e2) => e1[1] - e2[1])

  let res = 1
  let pre = 0
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= intervals[pre][1]) {
      res++
      pre = i
    }
    
  }
  return intervals.length - res
};

// 贪心选择性质
// 反证法：贪心算法为A；最优解为O；发现A能完全替代O，切不影响求出最优解