import { ListNode, createLinkedList, printLinkedList } from './test/linkedList'
function isValid(s: string): boolean {
  // 栈顶元素反映了在嵌套的层级关系中，最近需要匹配的元素
  let leftBraces = ['(', '{', '[']
  let rightBraces = [')', '}', ']']

  let stack = []

  for (const char of s) {
    if (leftBraces.indexOf(char) >= 0) {
      stack.push(char)
    } else {
      let rightIdx = rightBraces.indexOf(char)
      if (rightIdx < 0 || !stack.length) return false

      if (leftBraces.indexOf(stack.pop()) !== rightIdx) return false
    }
  }

  if (stack.length) return false
  return true
};


// 150  71
function evalRPN(tokens: string[]): number {
  let operations = new Set(['+', '-', '*', '/'])
  let stack: number[] = [], result = 0
  for (const c of tokens) {
    if (operations.has(c)) {
      let num2 = stack.pop()
      let num1 = stack.pop()
      let result = 0
      switch (c) {
        case '+':
          result = num1 + num2; break
        case '-':
          result = num1 - num2; break
        case '*':
          result = num1 * num2; break
        default:
          result = parseInt(num1 / num2 + ''); break
      }
      stack.push(result)
    } else {
      stack.push(parseInt(c))
    }
  }

  return stack.pop()
};
// console.log(evalRPN(["4","13","5","/","+"]))

// 栈和递归紧密联系
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

class Command {
  constructor(public s: string, public node: TreeNode) { }
}

// 模拟系统栈
function preorderTraversal(root: TreeNode | null): number[] {
  let result: number[] = []
  if (!root) return result

  let stack: Command[] = []

  stack.push(new Command('s', root))
  while (stack.length) {
    let command = stack.pop()
    if (command.s === 'print') {
      result.push(command.node.val)
    } else {
      if (command.node.right) {
        stack.push(new Command('go', command.node.right))
      }
      if (command.node.left) {
        stack.push(new Command('go', command.node.left))
      }
      stack.push(new Command('print', command.node))
    }
  }

  return result
};


// 341

// 图论BFS
/*
从n到0，每个数字表示一个节点
如果两个数字x到y相差一个完全平方数，则连接一条边
*/
function numSquares(n: number): number {
  let q: number[] = [], step = 0, visited: boolean[] = []
  q.push(n)
  while (q.length) {

    let curSize = q.length

    while (curSize--) {
      let num = q.shift()!

      for (let i = 1; ; i++) {
        let a = num - i * i
        if (a == 0) return step + 1
        if (a < 0) break
        if (!visited[a]) {
          visited[a] = true
          q.push(a)
        }

      }
    }
    step++
  }

  return -1
};


// 抽象成求图的两点最短路径，每个单词是一个点，只有相差一个字符的点之间才有路径，路径权值全部为1.
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {

  function canConnect(s1: string, s2: string): boolean {
    if (s1 == s2 || s1.length != s2.length) return false
    let diff = 0
    for (let i = 0; i < s1.length, diff <= 1; i++) {
      if (s1[i] != s2[i]) diff++
    }
    return diff === 1
  }

  let q: string[] = [], step = 1
  q.push(beginWord)
  while (q.length) {
    let curSize = q.length

    while (curSize--) {
      let s1 = q.shift()!
      if (s1 === endWord) return step
      let i = 0
      while (i < wordList.length) {
        let s2 = wordList[i]
        if (canConnect(s1, s2)) {
          wordList.splice(i, 1)
          q.push(s2)
        } else {
          i++
        }
      }


    }
    step++
  }

  return 0
};

// 126



class MinHeap2 {
  private data: any[] = []
  private compareFn: (a: any, b: any) => number
  private count = 0

  constructor(compareFn?: (a: any, b: any) => number) {
    this.compareFn = compareFn || ((a: any, b: any) => {
      return a - b
    })
  }

  size() {
    return this.count
  }

  isEmpty() {
    return this.size() === 0
  }

  insert(item: any) {
    this.data[++this.count] = item
    this.shiftUp(this.count)
  }

  extractMax() {
    let e = this.data[1]
    this.data[1] = this.data[this.count]
    this.count--
    this.shiftDown(1)
    return e
  }

  top() {
    return this.data[1]
  }


  private shiftUp(k: number) {
    let e = this.data[k]
    let parentIndex = Math.floor(k / 2)

    while (k > 1 && this.compareFn(this.data[parentIndex], e) > 0) {
      this.data[k] = this.data[parentIndex]
      k = parentIndex
      parentIndex = Math.floor(k / 2)
    }
    this.data[k] = e
  }

  private shiftDown(k: number) {
    let e = this.data[k]
    
    while (k * 2 <= this.count) {
      let j = k * 2
      if (j + 1 <= this.count && this.compareFn(this.data[j + 1], this.data[j]) < 0) {
        j += 1
      }

      if (this.compareFn(e, this.data[j]) < 0) break
      this.data[k] = this.data[j]
      k = j
    }

    this.data[k] = e
  }
}


// 优先队列
function topKFrequent(nums: number[], k: number): number[] {
  let map = new Map()
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1)
  }

  let heap = new MinHeap2((a, b) => {
    return a[0] - b[0]
  })

  for (const [key, value] of map.entries()) {
    if (heap.size() === k) {
      if (value > heap.top()[0]) {
        heap.extractMax()
        heap.insert([value, key])
      }
    } else {
      heap.insert([value, key])
    }
  }

  let result: number[] = []
  while (heap.size()) {
    result.unshift(heap.extractMax()[1])
  }
  return result;
};

// console.log(topKFrequent([4, 1, -1, 2, -1, 2, 3], 2))

// 23

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {


  let dummyHead = new ListNode(-1)

  let heap = new MinHeap2((a, b) => {
    return a.val - b.val
  })
  for (const node of lists) {
    node && heap.insert(node)
  }

  let cur = dummyHead
  while (heap.size()) {
    let node = heap.extractMax()
    cur.next = node
    cur = node
    if (node.next) {
      heap.insert(node.next)
    }
  }
  return dummyHead.next
};

let arr = [[1,4,5],[1,3,4],[2,6]]
let lists: ListNode[] = []
for (const e of arr) {
  lists.push(createLinkedList(e))
}
// printLinkedList(mergeKLists(lists))