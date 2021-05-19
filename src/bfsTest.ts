
import { ListNode, createLinkedList, TreeNode, TreeSet } from './test/helper'
// 打开转盘锁
function openLock(deadends: string[], target: string): number {

  function findAdj(s: string): string[] {
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
  function findAdj(s: string): string[] {
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


function slidingPuzzle(board: number[][]): number {
  let target = '123450'
  let directions: number[][] = [[1, 3], [0, 2, 4], [1, 5], [0, 4], [3, 1, 5], [2, 4]]
  function findAdj(s: string) {
    let result: string[] = []
    let arr = [...s]
    let idx = 0
    for (; arr[idx] != '0'; idx++);

    for (const e of directions[idx]) {
      arr[idx] = arr[e]
      arr[e] = '0'
      result.push(arr.join(''))
      arr[e] = arr[idx]
    }
    return result
  }


  let start = ''
   board.forEach(nums => start += nums.join(''))
  let step = 0, q: string[] = [], visited = new Set<string>()
  q.push(start)
  visited.add(start)

  while (q.length) {
    let size = q.length
    while (size--) {
      let cur = q.shift()
      if (cur == target) {
        return step
      }
      let adjs = findAdj(cur)
      for (const e of adjs) {
        if (!visited.has(e)) {
          q.push(e)
          visited.add(e)
        }
      }

    }
    step++
  }

  return -1
};



function isCousins(root: TreeNode | null, x: number, y: number): boolean {
  if (!root) {
    return false
  }
  let q = new Array<TreeNode>()
  q.push(root)
  while (q.length) {
    let c = q.length, hasX = false, hasY = false
    let newQ = new Array<TreeNode>()
    while (c--) {
      let node = q.shift()
      if (node.left && node.right &&
        ((node.left.val == x && node.right.val == y) || (node.right.val == x && node.left.val == y))) {
        return false
      }

      if (node.left) {
        newQ.push(node.left)
        hasX = hasX || node.left.val === x
        hasY = hasY || node.left.val === y
      }
      if (node.right) {
        newQ.push(node.right)
        hasX = hasX || node.right.val === x
        hasY = hasY || node.right.val === y
      }
    }

    if (hasX && hasY) {
      return true
    }
    q = newQ
  }
  return false
};
