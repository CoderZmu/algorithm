// 队列
function levelOrder(root: TreeNode | null): number[][] {
  let result: number[][] = []
  if (!root) return result

  let q: TreeNode[] = []
  let ord: number[] = []

  q.push(root)
  ord.push(0)

  while (q.length) {
    let node = q.shift()
    let level = ord.shift()

    if (result.length === level) {
      let tmp: number[] = []
      result.push(tmp)
    }

    result[level].push(node.val)

    if (node.left) {
      q.push(node.left)
      ord.push(level + 1)
    }

    if (node.right) {
      q.push(node.right)
      ord.push(level + 1)
    }
  }

  return result
};


function levelOrderBottom(root: TreeNode | null): number[][] {
  let result:number[][] = []
  if (!root) return result

  let q: TreeNode[] = []
  q.push(root)

  while (q.length) {
    let curCount = q.length

    let arr: number[] = []
    while (curCount) {
      let node = q.shift()!
      arr.push(node.val)

      if (node.left) {
        q.push(node.left)
      }
      if (node.right) {
        q.push(node.right)
      }
      curCount--
    }

    result.unshift(arr)
    
  }

  return result
};


function zigzagLevelOrder(root: TreeNode | null): number[][] {
  let result:number[][] = []
  if (!root) return result

  let shouldReverse = false
  let q: TreeNode[] = []
  q.push(root)

  while (q.length) {
    let curCount = q.length

    let arr: number[] = []
    while (curCount) {
      let node = q.shift()!
      shouldReverse ? arr.unshift(node.val) : arr.push(node.val)

      if (node.left) {
        q.push(node.left)
      }
      if (node.right) {
        q.push(node.right)
      }
      curCount--
    }

    result.push(arr)
    shouldReverse = !shouldReverse
    
  }

  return result
};

function rightSideView(root: TreeNode | null): number[] {
  let result:number[] = []
  if (!root) return result

  let q: TreeNode[] = []
  q.push(root)

  while (q.length) {
    let curCount = q.length

    result.push(q[curCount - 1].val)
    while (curCount--) {
      let node = q.shift()!
      if (node.left) {
        q.push(node.left)
      }
      if (node.right) {
        q.push(node.right)
      }
    }
    
  }

  return result
};