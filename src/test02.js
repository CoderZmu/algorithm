function isValid(s) {
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
}

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

function Command(s, node) {
  this.s = s
  this.node = node
}

function preorderTraversal(root) {
  let result = []
  if (!root) return result

  let stack = []

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
}
function evalRPN(tokens) {
  let operations = new Set(['+', '-', '*', '/'])
  let stack = []
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