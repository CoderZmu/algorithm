/*
0 <= i <= n-1, 1 <= k <= K
n为天数， 大K为最多交易数
dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
今天我没有持有股票，有两种可能：
昨天没持有，今天rest
昨天持有，今天sell

dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
今天我持有股票，有两种可能：
昨天持有，今天rest
昨天没持有，今天buy

dp[-1][k][0] = dp[i][0][0] = 0
dp[-1][k][1] = dp[i][0][1] = -infinity
dp[0][k][0] = 0
dp[0][k][1] = -prices[0]
*/

/* 121 K = 1
dp[i][1][0] = max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])
dp[i][1][1] = max(dp[i-1][1][1], dp[i-1][0][0] - prices[i])
            = max(dp[i-1][1][1], - prices[i])

dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
dp[i][1] = max(dp[i-1][1], - prices[i])
*/
function maxProfit(prices: number[]): number {
  if (prices.length === 0) return 0
  let dp_i_0 = 0, dp_i_1 = -prices[0]
  for (let i = 1; i < prices.length; i++) {
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
    dp_i_1 = Math.max(dp_i_1, -prices[i])
  }
  return dp_i_0
};



/*
K = infinity
dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
            = max(dp[i-1][k][1], dp[i-1][k][0] - prices[i])

dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])
*/
function maxProfit_2(prices: number[]): number {
  if (prices.length === 0) return 0
  let dp_i_0 = 0, dp_i_1 = -prices[0]
  for (let i = 1; i < prices.length; i++) {
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
    dp_i_1 = Math.max(dp_i_1, dp_i_0 - prices[i])
  }
  return dp_i_0
};


/*
包含冷冻期
dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
dp[i][1] = max(dp[i-1][1], dp[i-2][0] - prices[i])
*/
function maxProfit_3(prices: number[]): number {

  if (prices.length === 0) return 0
  let dp_i_0 = 0, dp_i_1 = -prices[0], dp_pre_0 = 0
  for (let i = 1; i < prices.length; i++) {
    let tmp = dp_i_0
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
    dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i])
    dp_pre_0 = tmp
  }
  return dp_i_0
};


/*
包含手续费
dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i] - fee)
dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])
*/
function maxProfit_4(prices: number[], fee: number): number {
  if (prices.length === 0) return 0
  let dp_i_0 = 0, dp_i_1 = -prices[0]
  for (let i = 1; i < prices.length; i++) {
    let tmp = dp_i_0
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i] - fee)
    dp_i_1 = Math.max(dp_i_1, tmp - prices[i])
  }
  return dp_i_0
};

/*
K = 2
dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
*/
function maxProfit_5(prices: number[]): number {

  let k = 2
  let max_k = k
  if (max_k > prices.length / 2) {
    max_k = Math.floor(prices.length/2)
  }
  let dp_0: number[] = []
  let dp_1: number[] = []
  for (let i = 0; i <= max_k; i++) {
    dp_0[i] = 0
    if (i == 0) {
      dp_1[i] = 0
    } else {
      dp_1[i] = -prices[0]
    }
  }
  for (let i = 1; i < prices.length; i++) {
    let dp_1_new: number[] = [0]
    for (let j = 1; j <= max_k; j++) {
      dp_0[j] = Math.max(dp_0[j], dp_1[j] + prices[i])
      dp_1_new[j] = Math.max(dp_1[j], dp_0[j - 1] - prices[i])
    }
    dp_1 = dp_1_new
  }

  return dp_0[max_k]
};