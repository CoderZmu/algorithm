// 树形问题
// 深度优先遍历
interface DependData {
  [key: string]: string;
}
const letterMap: DependData = {
  '0': ' ',
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz'
}
// 回溯法
// O(2^n)
function letterCombinations(digits: string): string[] {

  let result: string[] = []
  if (!digits) return result

  findCombination(digits, 0, '')
  return result
  // s保存了此时从digits[0...index-1]翻译得到的一个字母字符串
  // 寻找和digits[index]匹配的字母，获得digits[0...index]翻译得到的解
  function findCombination(digits: string, index: number, s: string) {

    if (digits.length === index) {
      result.push(s)
      return
    }

    let letters = letterMap[digits[index]]
    for (const c of letters) {
      findCombination(digits, index + 1, s + c)
    }
  }
};


// 131

function restoreIpAddresses(s: string): string[] {

  let result: string[] = []
  if (!s) return result

  findCombination(s, [])
  return result

  function findCombination(s: string, cur: string[]) {

    if (cur.length === 4 && !s) {
      result.push(cur.join('.'))
      return
    }
    if (cur.length === 4 || !s) {
      return
    }

    let restCount = 4 - cur.length
    if (s.length < restCount || s.length > restCount * 3) return

    let c = Math.min(3, s.length)
    for (let i = 1; i < c + 1; i++) {
      let str = s.substr(0, i)
      let num = parseInt(str)
      if (num == 0 || num <= 255) {
        cur.push(str)
        findCombination(s.substring(i), cur)
        cur.pop()
        if (num == 0) break
      }
    }
  }
};

// 全排列
function permute(nums: number[]): number[][] {

  let result: number[][] = []
  let used: boolean[] = []
  if (!nums.length) return result

  generatePermutation([])
  return result
  // p中保存了有index个元素的排列
  // 向这个排列的末尾添加第index+1个元素，获得一个有index+1个元素的排列
  function generatePermutation(p: number[]) {
    if (p.length === nums.length) {
      result.push(p.concat())
      return
    }

    for (let i = 0; i < nums.length; i++) {
      if (!used[i]) {
        used[i] = true
        p.push(nums[i])
        generatePermutation(p)
        used[i] = false
        p.pop()
      }

    }
  }
};

// 47
/*
输入: [1,1,1,2]
输出:
[
  [1,1,1,2],
  [1,1,2,1],
  [1,2,1,1],
  [2,1,1,1]
]
*/
// [1, 1, 1, 2] 选择1 =》 [1,1,2] => 选择1 =》[1,2]
function permuteUnique(nums: number[]): number[][] {
  let result: number[][] = []
  if (!nums.length) return result

  let map: Map<number, number> = new Map()
  for (const e of nums) {
    map.set(e, (map.get(e) || 0) + 1)
  }

  generatePermutation([])
  return result

  // p中保存了有index个元素的排列
  // 向这个排列的末尾添加第index+1个元素，获得一个有index+1个元素的排列
  function generatePermutation(p: number[]) {
    if (p.length === nums.length) {
      result.push(p.concat())
      return
    }

    let tmp = map.entries()
    for (const [num, c] of tmp) {
      if (c) {
        p.push(num)
        map.set(num, c - 1)
        generatePermutation(p)
        map.set(num, c)
        p.pop()
      }
    }
  }
};

// 组合问题

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

// 40 216  78 90

function readBinaryWatch(num: number): string[] {
  if (num == 0) {
    return ['0:00']
  }
  let result: string[] = []
  let nums = [8, 4, 2, 1, 32, 16, 8, 4, 2, 1]
  generateCombinations(0, 0, 0, 0)
  return result


  function generateCombinations(select: number, start: number, hour: number, min: number) {

    if (hour > 11 || min > 59) return
    if (select == num) {
      let minStr = min <= 9 ? `0${min}` : `${min}`
      result.push(`${hour}:${minStr}`)
      return
    }


    for (let i = start; i < nums.length - (num - select) + 1; i++) {
      let tmpHour = hour
      let tmpMin = min
      if (i <= 3) {
        tmpHour += nums[i]
      } else {
        tmpMin += nums[i]
      }
      generateCombinations(select + 1, i + 1, tmpHour, tmpMin)
    }
  }
};


function combinationSum(candidates: number[], target: number): number[][] {
  let result: number[][] = []
  if (!candidates.length || target <= 0) return result

  candidates.sort((e1, e2) => e1 - e2)
  generateCombinations(0, 0, [])
  return result

  function generateCombinations(start: number, cur: number, p: number[]) {
    if (cur > target) {
      return
    }
    if (cur === target) {
      result.push(p.concat())
      return
    }

    for (let i = start; i < candidates.length; i++) {
      if (cur + candidates[i] > target) break
      p.push(candidates[i])
      generateCombinations(i, cur + candidates[i], p)
      p.pop()
    }
  }
};


// 二维平面的回溯法
function exist(board: string[][], word: string): boolean {

  if (!board.length || !board[0].length || !word) return false

  let d = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  let m = board.length, n = board[0].length
  let visited: boolean[][] = []
  for (let i = 0; i < m; i++) {
    visited[i] = []
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (searchWord(0, i, j)) {
        return true
      }

    }
  }
  return false

  function inArea(x: number, y: number) {
    return x >= 0 && x < m && y >= 0 && y < n
  }
  //  从board[x][y]开始，寻找word[index...word.length-1]
  function searchWord(index: number, x: number, y: number): boolean {
    if (index == word.length - 1) {
      return board[x][y] === word[index]
    }


    if (board[x][y] === word[index]) {

      visited[x][y] = true
      for (let i = 0; i < 4; i++) {
        let nextX = x + d[i][0]
        let nextY = y + d[i][1]
        if (inArea(nextX, nextY) && !visited[nextX][nextY]) {
          if (searchWord(index + 1, nextX, nextY)) {
            return true
          }
        }
      }
      visited[x][y] = false
    }
    return false
  }
};

// console.log(exist([["A", "B", "C", "D", "E"], ["T", "S", "R", "Q", "F"], ["M", "N", "O", "P", "G"], ["L", "K", "J", "I", "H"]],
//   "ABCDEFGHIJKLMNOPQRST"))


// floodfill算法

function numIslands(grid: string[][]): number {

  if (!grid.length || !grid[0].length) return 0

  let m = grid.length, n = grid[0].length
  let d = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  let visited: boolean[][] = []
  for (let i = 0; i < m; i++) {
    visited.push([])
  }


  let result = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1' && !visited[i][j]) {
        dfs(i, j)
        result++
      }
    }

  }

  return result


  function inArea(x: number, y: number) {
    return x >= 0 && x < m && y >= 0 && y < n
  }

  function dfs(x: number, y: number) {
    visited[x][y] = true
    for (let i = 0; i < 4; i++) {
      let nextX = x + d[i][0]
      let nextY = y + d[i][1]

      if (inArea(nextX, nextY) && grid[nextX][nextY] === '1' && !visited[nextX][nextY]) {
        dfs(nextX, nextY)
      }
    }
  }
};

// 130 417



// 37
function solveNQueens(n: number): string[][] {

  let result: string[][] = []
  if (n <= 0) return result

  let col: boolean[] = []
  let dia1: boolean[] = []
  let dia2: boolean[] = []
  putQueen(0, [])
  return result

  // 尝试在一个n皇后问题中，摆放第index行的皇后位置
  function putQueen(index: number, row: number[]) {
    if (row.length === n) {
      result.push(generateBoard(row.concat()))
      return
    }

    for (let i = 0; i < n; i++) {
      // 尝试将index行的皇后摆在第i列
      if (!col[i] && !dia1[i + index] && !dia2[index - i + n - 1]) {
        row.push(i)
        col[i] = true
        dia1[i + index] = true
        dia2[index - i + n - 1] = true
        putQueen(index + 1, row)
        row.pop()
        col[i] = false
        dia1[i + index] = false
        dia2[index - i + n - 1] = false
      }
    }

  }

  function generateBoard(row: number[]) {
    let board: string[] = []
    for (let i = 0; i < n; i++) {
      let arr = new Array(n).fill('.')
      arr[row[i]] = 'Q'
      board.push(arr.join(''))
    }

    return board
  }
};



function solveSudoku(board: string[][]): void {
  let N = 9
  let n = 3

  let rowRecords: boolean[][] = []
  let colRecords: boolean[][] = []
  let areaRecords: boolean[][] = []

  analyze()
  putNumber(0)

  function analyze() {
    for (let row = 0; row < N; row++) {
      rowRecords.push([])
      colRecords.push([])
      areaRecords.push([])
      for (let col = 0; col < N; col++) {
        let area = Math.floor(row / n) * n + Math.floor(col / n)
        let e = board[row][col]
        if (e !== '.') {
          let num = parseInt(e)
          rowRecords[row][num] = true
          colRecords[col][num] = true
          areaRecords[area][num] = true
        }
      }
    }
  }


  function putNumber(index: number): boolean {
    if (index === N * N) return true
    let row = Math.floor(index / N)
    let col = index % N
    if (board[row][col] !== '.') {
      return putNumber(index + 1)
    }

    for (let i = 1; i <= N; i++) {
      let row = Math.floor(index / N)
      let col = index % N
      let area = Math.floor(row / n) * n + Math.floor(col / n)
      if (!rowRecords[row][i] && !colRecords[col][i] && !areaRecords[area][i]) {
        board[row][col] = i + ''
        rowRecords[row][i] = true
        colRecords[col][i] = true
        areaRecords[area][i] = true
        if (putNumber(index + 1)) {
          return true
        }

        board[row][col] = '.'
        rowRecords[row][i] = false
        colRecords[col][i] = false
        areaRecords[area][i] = false
      }
    }

    return false
  }
};

