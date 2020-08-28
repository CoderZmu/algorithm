import { TreeNode } from './helper'

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


function simplifyPath(path: string): string {
  let componnets = path.split('/')
  let stack: string[] = []
  for (const e of componnets) {
    switch (e) {
      case '.':
        case '': break
        case '..': {
          if (stack.length) stack.pop(); break
        }
        default: stack.push(e)
    }
  }

  return '/' + stack.join('/')
};

// 栈和递归紧密联系
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
