<<<<<<< HEAD
// 125. 验证回文串
function isPalindrome(s: string): boolean {
  s = s.replace(/[\W-]*/g, '')
  s = s.toLowerCase()

  let l = 0, r = s.length - 1 // [0...r]
  while (l < r) {
    if (s[l++] !== s[r--]) return false
  }
  return true
};
 

function reverseVowels(s: string): string {
  let vowelChats = new Set(['a', 'e', 'i', 'o', 'u'])
  let list = s.split('')
  let l = 0, r = list.length - 1
  debugger
  while (l < r) {
    if (!vowelChats.has(s[l].toLowerCase())) {
      l++
    } 
    else if (!vowelChats.has(s[r].toLowerCase())) {
      r--
    } else {
      let tmp = list[l]
      list[l] = list[r]
      list[r] = tmp
      l++
      r--
    }

    
  }

  return list.join('')
};


function maxArea(height: number[]): number {
  let result = 0, l = 0, r = height.length - 1
  while (l < r) {
    result = Math.max(result, (r - l) * Math.min(height[l], height[r]))
    if (height[l] < height[r]){
      l ++
    } else {
      r --
    }
  }
  return result
};

// 暴力解法
/*
function minSubArrayLen(s: number, nums: number[]): number {
  let result = nums.length + 1, sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum = 0
    for (let j = i; j < nums.length; j++) {
      sum += nums[j]
      if (sum >= s) {
      result = Math.min(j - i + 1, result)
      break
    }
  }
  }
  return result === nums.length + 1 ? 0 : result
};
*/

// 窗口滑动
function minSubArrayLen(s: number, nums: number[]): number {
  let result = nums.length + 1, sum = 0, l = 0, r = -1
  while (l < nums.length) {
    if (r + 1 < nums.length && sum < s) {
      sum += nums[r++]
    } else {
      sum -= nums[l++]
    }

    if (sum >= s) {
      result = Math.min(result, r - l + 1)
    }
  }
  return result === nums.length + 1 ? 0 : result
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]))
=======
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
console.log(evalRPN(["4","13","5","/","+"]))

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
>>>>>>> b10044936eb4af119c056fb9ffab40e360ad2c02
