import { ListNode, createLinkedList, TreeNode } from './test/helper'
function longestPalindrome(s: string): string {
  let arr = [...s]
  let left = 0, right = 0, max = 1

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + max; j < arr.length; j++) {
      if (isPalindrome(i, j)) {
        left = i
        right = j
        max = right - left + 1
      }
    }
  }


  return s.substring(left, right)

  // 判断arr[l...r]范围内是否回文
  function isPalindrome(l: number, r: number): boolean {
    while (l < r) {
      if (arr[l] != arr[r]) {
        return false
      }
      l++
      r--
    }
    return true
  }
}

// dp[i][j] = (s[i] == s[j]) and dp[i + 1][j - 1]
function longestPalindrome_2(s: string): string {
  if (s.length < 2) return s
  let dp: boolean[][] = []
  let arr = [...s]
  for (let i = 0; i < arr.length; i++) {
    dp.push([])
    dp[i][i] = true
  }
  let left = 0
  let max = 1

  for (let j = 1; j < arr.length; j++) {
    for (let i = 0; i < j; i++) {
      if (arr[i] != arr[j]) {
        dp[i][j] = false
      } else {
        if (j - i < 3) {
          dp[i][j] = true
        } else {
          dp[i][j] = dp[i + 1][j - 1]
        }
      }

      if (dp[i][j] && j - i + 1 > max) {
        left = i
        max = j - i + 1
      }
    }
  }

  return s.substr(left, max)
}

function longestPalindrome_3(s: string): string {
  if (s.length < 2) return s
  let dp: boolean[] = []
  let arr = [...s]
  let left = 0
  let max = 1

  for (let j = 1; j < arr.length; j++) {
    for (let i = 0; i < j; i++) {
      if (arr[i] != arr[j]) {
        dp[i] = false
      } else {
        if (j - i < 3) {
          dp[i] = true
        } else {
          dp[i] = dp[i + 1]
        }
      }

      if (dp[i] && j - i + 1 > max) {
        left = i
        max = j - i + 1
      }
    }
  }

  return s.substr(left, max)
}

function maxProfit2(prices: number[]): number {
  let res = 0
  for (let i = 1; i < prices.length; i++) {
    let diff = prices[i] - prices[i - 1]
    if (diff > 0) {
      res += diff
    }
  }
  return res
};

function maxProfit3(prices: number[]): number {
  /*
  第i天的三种状态
  0. 持有 f[i][0] = max(f[i-1][0], f[i-1][2])
  1. 冷冻 f[i][1] = f[i-1][0] + prices[i]
  2. 不持有不冷冻 f[i][2] = max(f[i-1][1], f[i-1][2])
  */

  if (prices.length < 2) return 0
  let a = -prices[0], b = 0, c = 0
  for (let i = 1; i < prices.length; i++) {
    let a2 = Math.max(a, c - prices[i]), b2 = a + prices[i], c2 = Math.max(b, c)
    a = a2, b = b2, c = c2
  }
  return Math.max(b, c)
};

function plusOne(digits: number[]): number[] {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] != 9) {
      digits[i]++
      return digits
    } else {
      digits[i] = 0
    }
  }

  digits.unshift(1)
  return digits
};


function longestCommonPrefix(strs: string[]): string {
  if (!strs.length) return ''
  let first = strs[0]
  for (let i = 0; i < first.length; i++) {
    let char = first[i]

    for (let j = 1; j < strs.length; j++) {
      let e = strs[j]
      if (i >= e.length || e[i] != char) return first.substr(0, i)
    }
  }
  return first
};


function removeDuplicates(nums: number[]): number {
  if (!nums.length) return 0
  let k = 0 // [0...k]为非重复元素
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] != nums[k]) {
      nums[++k] = nums[i]
    }
  }
  return k + 1
};


function strStr(haystack: string, needle: string): number {
  if (!needle.length) return 0

  let i = 0, j = 0
  while (i < haystack.length && j < needle.length) {
    if (haystack[i] == needle[j]) {
      i++
      j++
    } else {
      i = i - j + 1
      j = 0
    }
  }
  if (j === needle.length) {
    return i - j
  }
  return -1
};

// console.log(strStr("hello","ll"))

function searchInsert(nums: number[], target: number): number {
  let n = nums.length
  let l = 0, r = n - 1
  while (l <= r) {
    let mid = Math.floor(l + (r - l) / 2)
    if (nums[mid] == target) {
      return mid
    }
    if (nums[mid] < target) {
      l = mid + 1
    } else {
      r = mid - 1
    }
  }

  return l
};

function mySqrt(x: number): number {
  if (x <= 1) return x
  let l = 1, r = x - 1
  while (l <= r) {
    let mid = Math.floor(l + (r - l) / 2)
    let sqrt = Math.floor(x / mid)
    if (sqrt === mid) {
      return mid
    }
    if (sqrt > mid) {
      l = mid + 1
    } else {
      r = mid - 1
    }
  }

  return r
};

function maxSubArray(nums: number[]): number {
  if (nums.length == 0) return 0
  let sum = nums[0], cur = sum
  for (let i = 1; i < nums.length; i++) {
    cur = cur > 0 ? nums[i] + cur : nums[i]
    sum = Math.max(cur, sum)
  }
  return sum
};

function addBinary(a: string, b: string): string {
  let result = '', i = 0, add = 0
  while (i < a.length || i < b.length || add) {
    let num = add
    if (i < a.length) {
      num += parseInt(a[a.length - i - 1])
    }
    if (i < b.length) {
      num += parseInt(b[b.length - i - 1])
    }
    add = Math.floor(num / 2)
    result = '' + num % 2 + result
    i++
  }

  return result
};


function generate(numRows: number): number[][] {
  let result: number[][] = []
  if (numRows > 0) {
    result.push([1])
  }
  for (let i = 2; i <= numRows; i++) {
    let pre = result[i - 2]
    let L = [1]
    for (let j = 0; j < i - 2; j++) {
      L.push(pre[j] + pre[j + 1])
    }
    L.push(1)
    result.push(L)
  }
  return result
};

function singleNumber(nums: number[]): number {
  let result = 0
  for (const e of nums) {
    result ^= e
  }
  return result
};



/*
function combine(n: number, k: number): number[][] {
  let result: number[][] = []
  if (n <= 0 || k <= 0 || k > n) {
    return result
  }

  generateCombinations(1, [])
  return result

  // 求解C(n,k) 当前已经找到的组合存储在p中，需要从start开始搜索新的元素
  function generateCombinations(start: number, p: number[]) {
    if (p.length === k) {
      result.push(p.concat())
      return
    }

    // 剪枝优化
    // 还有k-p.length个空位，所以[i...n]中至少要有k-p.length个元素
    // i最多为n-(k-p.length)+1
    for (let i = start; i <= n - (k - p.length) + 1; i++) {
      p.push(i)
      generateCombinations(i + 1, p)
      p.pop()
    }
  }
};
*/

function combinationSum2(candidates: number[], target: number): number[][] {
  let result: number[][] = []
  if (!candidates.length || target <= 0) return result

  candidates.sort((e1, e2) => e1 - e2)


  generateCombinations(0, 0, [])
  return result

  function generateCombinations(start: number, cur: number, p: number[]) {
    if (cur === target) {
      result.push(p.concat())
      return
    }

    for (let i = start; i <= candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue
      if (cur + candidates[i] > target) break
      p.push(candidates[i])
      generateCombinations(i + 1, cur + candidates[i], p)
      p.pop()
    }
  }
};

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))



class MyStack {
  private queue1: number[] = []
  private queue2: number[] = []
  constructor() {

  }

  push(x: number): void {
    if (this.queue1.length)
      this.queue2.push(this.queue1.shift())
    this.queue1.push(x)
  }

  pop(): number {
    let e = this.queue1.shift()

    let tmp = this.queue1
    this.queue1 = this.queue2
    this.queue2 = tmp

    while (this.queue1.length > 1) {
      this.queue2.push(this.queue1.shift())
    }

    return e
  }

  top(): number {
    return this.queue1[0]
  }

  empty(): boolean {
    return !this.queue1.length
  }
}




function maxProduct(nums: number[]): number {
  let min = nums[0], max = nums[0], result = nums[0]
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < 0) {
      let tmp = max
      max = min
      min = tmp
    }
    max = Math.max(max * nums[i], nums[i])
    min = Math.min(min * nums[i], nums[i])
    result = Math.max(result, max)
  }
  return result
};


class MinStack {
  private stack: number[] = []
  private mins: number[] = []
  constructor() {

  }

  push(x: number): void {
    this.stack.push(x)
    let min = x
    if (this.mins.length) {
      min = Math.min(this.mins[this.mins.length - 1], min)
    }
    this.mins.push(min)
  }

  pop(): void {
    this.stack.pop()
    this.mins.pop()
  }

  top(): number {
    return this.stack[this.stack.length - 1]
  }

  getMin(): number {
    return this.mins[this.mins.length - 1]
  }
}

function compareVersion(version1: string, version2: string): number {

  let arr1 = version1.split('.').map(e => parseInt(e))
  let arr2 = version2.split('.').map(e => parseInt(e))

  let diff = Math.abs(arr1.length - arr2.length)
  let tmp = arr1.length > arr2.length ? arr2 : arr1
  for (let index = 0; index < diff; index++) {
    tmp.push(0)

  }

  for (let i = 0; i < arr1.length; i++) {
    let diff = arr1[i] - arr2[i]
    if (diff > 0) return 1
    if (diff < 0) return -1

  }

  return 0
};



function reverseString(s: string[]): void {
  if (s.length < 2) return
  let l = 0, r = s.length - 1
  while (l < r) {
    let tmp = s[r]
    s[r] = s[l]
    s[l] = tmp
    l++
    r--
  }
};



function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head || !head.next || !head.next.next) return head
  let cur = head.next.next, i = 3
  let odd = head, even = head.next, evenHead = even
  while (cur) {
    if (i % 2 === 1) { // 奇数
      odd.next = cur
      odd = cur
    } else {
      even.next = cur
      even = cur
    }
    cur = cur.next
    i++
  }

  even.next = null
  odd.next = evenHead
  return head
};

console.log(oddEvenList(createLinkedList([1, 2, 3, 4, 5])))


function getMinimumDifference(root: TreeNode | null): number {
  let pre = -1, result = Number.MAX_SAFE_INTEGER
  function dfs(node: TreeNode | null) {
    if (!node) return
    dfs(node.left)
    if (pre !== -1) {
      let diff = node.val - pre
      result = Math.min(result, diff)
    }
    pre = node.val
    dfs(node.right)
  }
  dfs(root)
  return result
};

function lengthOfLastWord(s: string): number {
  let end = s.length, start = 0
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] !== ' ') {
      if (end === s.length) end = i
    } else if (end !== s.length) {
      start = i + 1
      break
    }

  }
  return end === s.length ? 0 : end - start + 1
};



function subsets(nums: number[]): number[][] {

  let result: number[][] = []
  result.push([])
  if (nums.length > 0)
    backtrack(0, [])
  return result

  function backtrack(start: number, p: number[]) {

    for (let i = start; i < nums.length; i++) {
      p.push(nums[i])
      result.push(p.concat())
      backtrack(i + 1, p)
      p.pop()
    }
  }
};


function partition(s: string): string[][] {





  let result: string[][] = []
  if (s.length === 0) return result


  let dp: boolean[][] = []
  let arr = [...s]
  for (let i = 0; i < arr.length; i++) {
    let tmp: boolean[] = []
    tmp[i] = true
    dp.push(tmp)
  }

  for (let j = 1; j < arr.length; j++) {
    for (let i = j - 1; i >= 0; i--) {
      if (arr[i] != arr[j]) {
        dp[i][j] = false
      } else {
        if (j - i < 3) {
          dp[i][j] = true
        } else {
          dp[i][j] = dp[i + 1][j - 1]
        }
      }
    }
  }

  backtrack(0, [])
  return result

  function backtrack(start: number, p: string[]) {
    if (start === s.length) {
      result.push(p.concat())
      return
    }

    for (let i = 1; i <= s.length - start; i++) {
      let subS = s.substr(start, i)
      if (dp[start][start + i - 1]) {
        p.push(subS)
        backtrack(start + i, p)
        p.pop()
      }
    }
  }

  // function isPalindrome(s: string): boolean {
  //   let l = 0, r = s.length - 1 // [0...r]
  //   while (l < r) {
  //     if (s[l++] !== s[r--]) return false
  //   }
  //   return true
  // };

};


function rotate(nums: number[], k: number): void {
  if (nums.length === 0 || k === 0) return
  k = k % nums.length
  for (let i = 0; i < k; i++) {
    nums.unshift(nums.pop())
  }
};


function commonChars(A: string[]): string[] {
  let record = new Map<string, number>()

  let s = A[0]
  for (let i = 0; i < s.length; i++) {
    record.set(s[i], (record.get(s[i]) || 0) + 1)
  }

  for (let i = 1; i < A.length; i++) {

    let s = A[i]
    let record2 = new Map<string, number>()
    for (let i = 0; i < s.length; i++) {
      record2.set(s[i], (record2.get(s[i]) || 0) + 1)
    }


    let keyvalues = record.entries()
    for (const [key, val] of keyvalues) {
      let val2 = record2.get(key)
      if (val2) {
        record.set(key, Math.min(val2, val))
      } else {
        record.delete(key)
      }

    }
  }

  let result: string[] = []
  for (const [key, val] of record.entries()) {
    if (val > 0)
      result = result.concat(new Array(val).fill(key))
  }
  return result
};

console.log(commonChars(["bella", "label", "roller"]))


function isValidBST(root: TreeNode | null): boolean {

  if (!root) return true
  return helper(root, -Number.MAX_VALUE, Number.MAX_VALUE)

  function helper(node: TreeNode, min: number, max: number): boolean {
    let result = true
    if (node.left) {
      result = node.left.val < node.val && node.left.val > min && helper(node.left, min, node.val)
    }
    if (result && node.right) {
      result = node.right.val > node.val && node.right.val < max && helper(node.right, node.val, max)
    }
    return result
  }
};



function diameterOfBinaryTree(root: TreeNode | null): number {
  if (!root) return 0
  let max = 0
  function maxLength(node: TreeNode | null): number {
    if (!node) return 0
    let left = maxLength(node.left)
    let right = maxLength(node.right)
    max = Math.max(max, left + right + 1)
    return Math.max(left, right)
  }
  maxLength(root)
  return max - 1
};



function sortedArrayToBST(nums: number[]): TreeNode | null {

  // 将有序数组l...r]的范围转换为二叉搜索树
  function helper(left: number, right: number): TreeNode | null {
    if (left > right) return null
    let mid = Math.floor((right - left) / 2) + left
    let node = new TreeNode(nums[mid])
    node.left = helper(left, mid - 1)
    node.right = helper(mid + 1, right)
    return node
  }

  return helper(0, nums.length - 1)

};


function mergeTrees(t1: TreeNode | null, t2: TreeNode | null): TreeNode | null {
  if (!t1 || !t2) return t1 || t2

  t1.val += t2.val
  t1.left = mergeTrees(t1.left, t2.left)
  t1.right = mergeTrees(t1.right, t2.right)
  return t1
};


// 637
/*
https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/er-cha-shu-de-ceng-xu-bian-li-by-leetcode-solution/
*/
function averageOfLevels(root: TreeNode | null): number[] {
  let result: number[] = []
  if (!root) return result

  let q: TreeNode[] = []
  q.push(root!)
  while (q.length) {
    let size = q.length
    let size2 = size, sum = 0
    while (size--) {
      let note = q.shift()!
      if (note.left)
        q.push(note.left!)
      if (note.right)
        q.push(note.right!)
      sum += note.val
    }
    result.push(sum / size2)
  }
  return result
};


function flatten(root: TreeNode | null): void {


  let successorNode: TreeNode | null = null

  helper(root)

  function helper(node: TreeNode | null): void {
    if (node) {
      helper(node.right)
      helper(node.left)
      node.right = successorNode
      successorNode = node
      node.left = null
    }
  }
};

function kthSmallest(root: TreeNode | null, k: number): number {

  let i = 1
  let result: number = -1
  function dfs(node: TreeNode | null) {
    if (node && i <= k) {
      dfs(node.left)
      if (i++ == k) {
        result = node.val
        return
      }
      dfs(node.right)
    }
  }

  dfs(root)

  return result
};


/*
给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。
找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充
*/
function solve(board: string[][]): void {

  let d = [[0, -1], [1, 0], [0, 1], [-1, 0]]
  let m = board.length, n = board[0].length
  function inArea(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < m && y < n
  }
  function inEdge(x: number, y: number) {
    return x == 0 || x == m - 1 || y == 0 || y == n - 1
  }


  function enumBoard(callback: ((x: number, y: number) => void)) {
    for (let x = 0; x < m; x++) {
      for (let y = 0; y < n; y++) {
        callback(x, y)
      }
    }
  }

  function dfs(x: number, y: number) {
    board[x][y] = '#'
    for (const [a, b] of d) {
      let nextX = a + x
      let nextY = b + y
      if (inArea(nextX, nextY) && board[nextX][nextY] == 'O') {
        dfs(nextX, nextY)
      }
    }
  }

  enumBoard((x, y) => {
    if (inEdge(x, y) && board[x][y] == 'O') {
      dfs(x, y)
    }
  })

  enumBoard((x, y) => {
    if (board[x][y] == 'O') {
      board[x][y] = 'X'
    }
  })


  enumBoard((x, y) => {
    if (board[x][y] == '#') {
      board[x][y] = 'O'
    }
  })

};

let b = [["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "X", "O", "X"], ["X", "O", "X", "X"]]
solve(b)



function isPalindrome(head: ListNode | null): boolean {

  function getMidNode(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head

    let fast = head.next, slow = head.next
    while (fast.next && fast.next.next) {
      fast = fast.next.next
      slow = slow.next
    }

    return slow
  }

  function reverseList(node: ListNode | null): ListNode | null {
    if (!node || !node.next) return node

    let newHead = reverseList(node.next)
    node.next.next = node
    node.next = null
    return newHead
  }

  if (!head || !head.next) return true

  let foo = reverseList(getMidNode(head))

  while (foo) {
    if (foo.val != head.val) return false
    foo = foo.next
    head = head.next
  }
  return true

};

isPalindrome(createLinkedList([1, 2]))

// [4,5,2,6,3,1]
function nextPermutation(nums: number[]): void {

  // 1. 从后向前查找第一个顺序对(i, i+1), 满足nums[i]<nums[i+1], 这样较小数为nums[i], [i+1..<n]为下降序列 
  let i = -1, n = nums.length - 1
  for (let index = n; index > 0; index--) {
    if (nums[index - 1] < nums[index]) {
      i = index - 1
      break
    }
  }

  // 2. 如果找到顺序对，[i+1..<n]从后往前查找满足nums[i]<nums[j],这样a[j]就是较大数
  if (i !== -1) {
    for (let index = n; index > 0; index--) {
      if (nums[index] > nums[i]) {
        let tmp = nums[i]
        nums[i] = nums[index]
        nums[index] = tmp
        break
      }
    }
  }

  // 3. 交换nums[i]和nums[j],[i+1..<n]也必为降序
  i += 1

  while (i < n) {
    let tmp = nums[i]
    nums[i] = nums[n]
    nums[n] = tmp
    i++
    n--
  }
};


// 备忘录 
function trap(height: number[]): number {
  // l_max[i] 表示位置 i 左边最高的柱子高度，r_max[i] 表示位置 i 右边最高的柱子高度
  let n = height.length, l_max: number[] = [], r_max: number[] = []
  l_max[0] = height[0]
  r_max[n-1] = height[n-1]
  for (let i = 1; i < height.length - 1; i++) {
    l_max[i] = Math.max(height[i], l_max[i-1])
  }
  for (let i = height.length - 2; i > 0; i--) {
    r_max[i] = Math.max(height[i], r_max[i+1])
  }

  let ans = 0
  for (let i = 1; i < height.length - 1; i++) {
    ans += Math.min(l_max[i], r_max[i]) - height[i]
  }
  return ans
};

// 双指针
function trap_02(height: number[]): number {

  if (height.length == 0) return 0

  // l_max 是 height[0..left] 中最高柱子的高度，r_max 是 height[right..end] 的最高柱子的高度
  let n = height.length, 
  left = 1, right = n - 2,
  l_max = height[0], r_max = height[n-1]
  
  let ans = 0
  while (left <= right) {
    l_max = Math.max(height[left], l_max)
    r_max = Math.max(height[right], r_max)

    if (l_max < r_max) {
      ans += l_max - height[left]
      left++
    } else {
      ans += r_max - height[right]
      right--
    }
  }
  return ans
};


function largeGroupPositions(s: string): number[][] {
  let result: number[][] = []
  if (!s.length) return result

  let arr = [...s], num = 1, n = arr.length
  for (let i = 0; i < n; i++) {
    if (i == n - 1 || arr[i] != arr[i+1]) {
      if (num >= 3) {
        result.push([i - num + 1, i])
      }
      num = 1
    } else {
      num++
    }
  }

  return result
};


// 打开转盘锁
function openLock(deadends: string[], target: string): number {

  function findAdj (s: string): string[] {
    let res: string[] = [], nums1 = [...s].map(e => parseInt(e))
    let nums2 = nums1.concat()
    
    for (let i = 0; i < nums1.length; i++) {
      let c = nums1[i]
      let add = c == 9 ? 0 : c + 1
      let sub = c == 0 ? 9 : c - 1
      
      nums2[i] = add
      res.push(nums2.join(''))

      nums2[i] = sub
      res.push(nums2.join(''))

      nums2[i] = c
    }
    return res
  }
  
  let deads = new Set<String>()
  deadends.forEach(e => deads.add(e))

  let from = '0000'
  if (deads.has(from)) {
    return -1
  }
  if (from === target) {
    return 0
  }

  let step = 0, stack: string[] = [], visited = new Set<string>()
  stack.push(from)
  visited.add(from)

  while (stack.length) {
    let sz = stack.length

    while (sz--) {
      let cur = stack.shift()
      let adj = findAdj(cur).filter(e => !deads.has(e) && !visited.has(e))
      
      for (const e of adj) {
        if (e == target) {
          return step + 1
        }
        stack.push(e)
        visited.add(e)
      }
    }
    step++
  }
  return -1
};

// openLock(["0201","0101","0102","1212","2002"], "0202")

// 双向BFS
function openLock_02(deadends: string[], target: string): number {
  function findAdj (s: string): string[] {
    let res: string[] = [], nums1 = [...s].map(e => parseInt(e))
    let nums2 = nums1.concat()
    
    for (let i = 0; i < nums1.length; i++) {
      let c = nums1[i]
      let add = c == 9 ? 0 : c + 1
      let sub = c == 0 ? 9 : c - 1
      
      nums2[i] = add
      res.push(nums2.join(''))

      nums2[i] = sub
      res.push(nums2.join(''))

      nums2[i] = c
    }
    return res
  }
  
  let deads = new Set<string>()
  deadends.forEach(e => deads.add(e))

  let q1 = new Set<string>()
  let q2 = new Set<string>()
  let visited = new Set<string>(), step = 0
  q1.add('0000')
  q2.add(target)

  while (q1.size && q2.size) {
    let tmp = new Set<string>()

    for (const cur of q1) {
      if (deads.has(cur)) {
        continue
      }
      if (q2.has(cur)) {
        return step
      }
      visited.add(cur)


      let adj = findAdj(cur).filter(e => !visited.has(e))
      for (const next of adj) {
        tmp.add(next)
      }
    }

    step++
    q1 = q2
    q2 = tmp


  }
  return -1
}

// 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 5 -> 6
// 13555  6565
// 12345  2345
function hasCycle(head: ListNode | null): boolean {
    let fast = head, slow = head
    while (fast && fast.next) {
      fast = fast.next.next
      slow = slow.next
      if (fast == slow) {
        return true
      }
    }
    return false
};

function middleNode(head: ListNode | null): ListNode | null {
  if (!head) {
    return head
  }

  let slow = head, fast = head
  while (fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
};


function detectCycle(head: ListNode | null): ListNode | null {
    let slow = head, fast = head
    while (fast && fast.next) {
      slow = slow.next
      fast = fast.next.next

      if (slow == fast) {
        break
      }
    }

    if (!fast || !fast.next) {
      return null
    }

    slow = head
    while (slow != fast) {
      slow = slow.next
      fast = fast.next
    }


    return slow
};


class RandomizedSet {
  private map = new Map<number, number>()
  private arr: number[] = []
  constructor() {

  }

  insert(val: number): boolean {
    if (this.map.has(val)) {
      return false
    }
    this.arr.push(val)
    this.map.set(val, this.arr.length - 1)
    return true
  }

  remove(val: number): boolean {
    let idx = this.map.get(val)
    if (typeof idx == 'undefined') {
      return false
    }

    let N = this.arr.length
    this.arr[idx] = this.arr[N - 1]
    this.map.set(this.arr[idx], idx)
    this.map.delete(val)
    this.arr.pop()
    return true
  }

  getRandom(): number {
    let N = this.arr.length
    return this.arr[Math.floor(Math.random() * N)]
  }
}

// 黑名单映射
class Solution {
  private sz: number
  private map = new Map<number, number>()

  constructor(N: number, blacklist: number[]) {
    this.sz = N - blacklist.length

    for (const e of blacklist) {
      this.map.set(e, N)
    }

    let last = N - 1
    for (const e of blacklist) {
      if (e >= this.sz) {
        continue
      }

      while (this.map.has(last)) {
        last--
      }

      this.map.set(e, last--)
    }
    
  }

  pick(): number {
    let idx = Math.floor(Math.random() * this.sz)
    let idx2 = this.map.get(idx)
    if (typeof idx2 != 'undefined') {
      return idx2
    }
    return idx
  }
}

let s = new Solution(3, [0])
s.pick()