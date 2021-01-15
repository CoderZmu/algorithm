import { TreeNode } from '../test/helper'
// 动态规划

// 记忆化搜索
// 因为有很多重复的计算过程，使用一个数组将重复计算过程记录下来
function fib(N: number): number {
  let memo: number[] = new Array(N + 1).fill(-1)

  return __fib(N)
  function __fib(N: number): number {
    if (N <= 1) return N

    if (memo[N] == -1) {
      memo[N] = __fib(N - 1) + __fib(N - 2)
    }
    return memo[N]
  }
};

// 动态规划
// 自底向上
function fib2(N: number): number {
  let memo: number[] = []
  memo[0] = 0
  memo[1] = 1
  for (let i = 2; i <= N; i++) {
    memo[i] = memo[i - 1] + memo[i - 2]
  }
  return memo[N]
};


function climbStairs(n: number): number {
  let memo: number[] = []
  memo[1] = 1
  memo[2] = 2
  for (let i = 3; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2]
  }
  return memo[n]
};

// 64
// 递归 计算大量重复子问题 超时
function minimumTotal(triangle: number[][]): number {


  return __minimumTotal(0, 0)

  function __minimumTotal(index: number, level: number): number {
    if (level === triangle.length - 1) {
      return triangle[level][index]
    }

    return triangle[level][index] + Math.min(__minimumTotal(index, level + 1), __minimumTotal(index + 1, level + 1))
  }
};

// 自底向上动态规划
function minimumTotal2(triangle: number[][]): number {

  let memo = triangle[triangle.length - 1].concat()

  for (let row = triangle.length - 2; row >= 0; row--) {
    let rowArr = triangle[row]
    for (let i = 0; i < rowArr.length; i++) {
      memo[i] = rowArr[i] + Math.min(memo[i], memo[i + 1])
    }

  }
  return memo[0]

};


function minPathSum(grid: number[][]): number {
  let m = grid.length
  let n = grid[0].length

  // grid[i][j] 的值代表直到走到(i,j) 的最小路径和
  for (let i = 1; i < m; i++) {
    grid[i][0] = grid[i - 1][0] + grid[i][0]
  }
  for (let i = 1; i < n; i++) {
    grid[0][i] = grid[0][i - 1] + grid[0][i]
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      grid[i][j] = grid[i][j] + Math.min(grid[i - 1][j], grid[i][j - 1])
    }

  }

  return grid[m - 1][n - 1]
};

// 最优子结构，通过求子问题的最优解，可以获得原问题的最优解
// 当递归问题存在重复子问题，最优子结构 可以尝试使用动态规划（自底向上解决问题）或者记忆化搜索（自顶向下解决问题）解决问题
function integerBreak(n: number): number {
  /*
  let memo: number[] = []
  __integerBreak(n)
  return memo[n]
  // 将n进行分割（至少分割两部分），可以获得的最大乘积
  function __integerBreak(n: number): number {
    if (n === 1) return 1
    if (memo[n]) return memo[n]
    let res = -1
    for (let i = 1; i < n; i++) {
        //  i + n-1
        res = Math.max(res, i * (n-i), i * __integerBreak(n-i))
    }
    memo[n] = res
    return res
  }
  */


  let memo: number[] = []
  memo[1] = 1
  for (let i = 2; i <= n; i++) {
    let res = -1
    for (let j = 1; j < i; j++) {
      res = Math.max(res, j * (i - j), j * memo[i - j])
    }
    memo[i] = res
  }
  return memo[n]
};

// 91 62 63
function numSquares(n: number): number {
  let memo: number[] = []
  memo[0] = 0
  memo[1] = 1
  for (let i = 2; i <= n; i++) {
    let res = i
    for (let j = 1; j * j <= i; j++) {
      res = Math.min(res, 1 + memo[i - j * j])
    }
    memo[i] = res
  }
  return memo[n]
}


/*
明确状态的定义
考虑偷取[x...n-1]范围的房子（函数的定义）
根据状态的定义，决定状态的转移
f(0) = max{v(0)+f(2), v(1)+f(3), v(2)+f(4), v(n-3)+f(n-1), v(n-2), v(n-1)}
*/

function rob(nums: number[]): number {
  // memo[index]表示考虑偷取[index...nums.length)范围的房子所能获得的最大利益
  let memo: number[] = []
  tryRob(0)
  return memo[0]

  // 考虑偷取[index...nums.length)范围的房子
  function tryRob(index: number) {
    if (index >= nums.length) return 0

    if (memo[index]) return memo[index]

    let res = 0
    for (let i = index; i < nums.length; i++) {
      res = Math.max(res, nums[i] + tryRob(i + 2))
    }
    memo[index] = res
    return res
  }
};


function rob_2(nums: number[]): number {
  let n = nums.length
  if (n === 0) return 0
  // memo[index]表示考虑偷取[index...nums.length)范围的房子所能获得的最大利益
  let memo: number[] = []
  memo[n - 1] = nums[n - 1]
  for (let i = n - 2; i >= 0; i--) {
    let res = 0
    for (let j = i; j < n; j++) {

      res = Math.max(res, nums[j] + j + 2 < n ? memo[j + 2] : 0)
    }
    memo[i] = res
  }

  return memo[0]
};

function rob_3(nums: number[]): number {
  let a = 0
  let b = 0
  // 考虑偷取[0...x]范围的房子（函数的定义）
  // 状态转移方程 f(x) = max{v(x) + f(x-2), f(x-1)}
  for (let i = 0; i < nums.length; i++) {
    let tmp = b
    b = Math.max(nums[i] + a, b)
    a = tmp
  }
  return b
};

// 112 309

function rob2(nums: number[]): number {
  if (!nums.length) return 0
  if (nums.length == 1) return nums[0]
  let res1 = rob_3(nums.slice(0, nums.length - 1))
  let res2 = rob_3(nums.slice(1))
  return Math.max(res1, res2)

  function rob_3(nums: number[]): number {
    let a = 0
    let b = 0
    for (let i = 0; i < nums.length; i++) {
      let tmp = b
      b = Math.max(nums[i] + a, b)
      a = tmp
    }
    return b
  };
};



function rob3(root: TreeNode | null): number {
  let res = tryRob(root)
  return Math.max(res[0], res[1])
  /*
  0表示不偷，1偷
  当前节点选择不偷：当前节点能偷到的最大钱数 = 左孩子能偷到的钱 + 右孩子能偷到的钱
  当前节点选择偷：当前节点能偷到的最大钱数 = 左孩子选择自己不偷时能得到的钱 + 右孩子选择不偷时能得到的钱 + 当前节点的钱数

root[0] = Math.max(rob(root.left)[0], rob(root.left)[1]) + Math.max(rob(root.right)[0], rob(root.right)[1])
root[1] = rob(root.left)[0] + rob(root.right)[0] + root.val;
*/
  function tryRob(node: TreeNode | null): number[] {
    if (!node) return [0, 0]
    let left = tryRob(node.left)
    let right = tryRob(node.right)
    return [Math.max(left[0], left[1]) + Math.max(right[0], right[1]), node.val + left[0] + right[0]]
  }
};


// 动态规划 前i天的最大收益 = max{前i-1天的最大收益，第i天的价格-前i-1天中的最小价格}
function maxProfit(prices: number[]): number {
  if (prices.length === 0) return 0
  let a = 0, b = prices[0]
  for (let i = 1; i < prices.length; i++) {
    a = Math.max(a, prices[i] - b)
    b = Math.min(b, prices[i])
  }
  return a
};

// 背包问题01
function knapsack01(w: number[], v: number[], C: number): number {


  let memo: number[][] = []
  for (let i = 0; i < w.length; i++) {
    memo.push([])
  }
  let res = bestValue(w.length - 1, C)
  return res
  // 用[0...index]的物品，填充容积为c的背包的最大价值
  // f(i, c) = max(f(i-1,c), v(i) + f(i-1,c-w(i)))
  function bestValue(index: number, c: number): number {
    if (index < 0 || c <= 0) return 0
    if (memo[index][c]) {
      return memo[index][c]
    }

    let res = bestValue(index - 1, c)
    if (c >= w[index]) {
      res = Math.max(res, v[index] + bestValue(index - 1, c - w[index]))
    }
    memo[index][c] = res
    return res
  }

  /*
  
    let n = w.length
    if (n === 0) return 0
    let memo: number[] = []
    for (let j = 0; j <= C; j++) {
      memo[j] = j >= w[0] ? v[0] : 0
    }
    for (let i = 1; i < w.length; i++) {
      for (let j = C; j >= w[i]; j--) {
        let res = memo[j]
        if (j >= w[i]) {
          res = Math.max(res, v[i] + memo[j - w[i]])
          memo[j] = res
        }
      }
    }
    return memo[n - 1][C]
    */
}



function canPartition(nums: number[]): boolean {
  // 使用nums[0...i] 是否可以填充容量为sum的背包
  // f(i, sum) = f(i-1,sum) || f(i-1,sum-nums[i])
  let sum = 0
  for (const e of nums) {
    sum += e
  }
  if (sum == 0 || sum % 2 !== 0) return false

  let C = sum / 2
  let memo: boolean[] = []
  for (let i = 0; i <= C; i++) {
    memo[i] = nums[0] === i
  }
  for (let i = 1; i < nums.length; i++) {
    for (let j = C; j >= nums[i]; j--) {
      memo[j] = memo[j] || memo[j - nums[i]]
    }
  }

  return memo[C]
};

// 322 377 474 139 494

function coinChange(coins: number[], amount: number): number {

  // dp(i, amount) = min(dp[i-1][amount-k*coins[i]]+k*|0≤k&k*coins[i]≤amount)
  let memo: number[] = new Array(amount + 1).fill(-1)
  memo[0] = 0

  for (let i = 0; i < coins.length; i++) {
    for (let j = amount; j >= coins[i]; j--) {
      let res = amount + 1
      for (let k = 0; k * coins[i] <= j; k++) {
        let c = j - k * coins[i]
        let tmp = memo[c]
        if (tmp !== -1) {
          res = Math.min(res, tmp + k)
        }
      }
      memo[j] = res
    }
  }
  if (memo[amount] === amount + 1) return -1
  return memo[amount]
};

function coinChange_2(coins: number[], amount: number): number {
  let dp: number[] = new Array(amount + 1).fill(amount + 1)
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    let res = amount + 1
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= i)
        dp[i] = Math.min(dp[i], 1 + dp[i - coins[j]])
    }

  }
  if (dp[amount] === amount + 1) return -1
  return dp[amount]
}

function coinChange_3(coins: number[], amount: number): number {
  let q: number[] = [], visited: boolean[] = [], step = 0
  q.push(amount)


  while (q.length) {
    let size = q.length

    while (size--) {
      let num = q.shift()
      for (const c of coins) {
        let a = num - c
        if (a === 0) return step + 1
        if (a < 0) continue
        if (!visited[a]) {
          visited[a] = true
          q.push(a)
        }
      }
    }

    step++
  }
  
  return -1
}

console.log(coinChange_3([1,2,5], 11))


// 最长上升子序列
function lengthOfLIS(nums: number[]): number {
  if (nums.length === 0) return 0
  // memo[i]表示以nums[i]结尾的最长上升子序列的长度
  let memo: number[] = new Array(nums.length).fill(1)
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        memo[i] = Math.max(memo[i], memo[j] + 1)
      }
      
    }
  }
  let res = 0
  for (const e of memo) {
    res = Math.max(res, e)
  }
  return res
};

// 376

// 最长公共子序列
/*
text1[m] == text2[n]
LCS(m, n) = 1 + LSC(m-1, n-1)
text1[m] != text2[n]
LCS(m, n) = max(LSC(m, n-1), LSC(m-1, n))
*/
function longestCommonSubsequence(text1: string, text2: string): number {
  return 0
};