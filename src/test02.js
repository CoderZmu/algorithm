function levelOrder(root) {
  let result = []
  if (!root) return result

  let q = []
  let ord = []

  q.push(root)
  ord.push(0)

  while (q.length) {
    let node = q.shift()
    let level = ord.shift()

    if (result.length === level) {
      result.push([])
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