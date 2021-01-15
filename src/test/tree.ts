import { TreeNode } from './helper'

function minDepth(root: TreeNode | null): number {
  if (!root) return 0
  if (!root.left && root.right) return 1 + minDepth(root.right)
  if (!root.right && root.left) return 1 + minDepth(root.left)

  return Math.min(minDepth(root.left), minDepth(root.right)) + 1
};


function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null

  invertTree(root.left)
  invertTree(root.right)
  let tmp = root.left
  root.left = root.right
  root.right = tmp
  return root
};

// 222

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true
  if (!p && q || (p && !q)) return false

  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};

// [1,2,2,3,4,4,3]
/*
   1
   / \
  2   2
 / \ / \
3  4 4  3
*/
function isSymmetric(root: TreeNode | null): boolean {
  return isMirror(root, root)
};

/*
判断两个指针当前节点值是否相等
判断 A 的右子树与 B 的左子树是否对称
判断 A 的左子树与 B 的右子树是否对称
*/
function isMirror(root1: TreeNode | null, root2: TreeNode | null): boolean {
  if (!root1 && !root2) return true
  if (!root1 || !root2) return false

  return root1.val === root2.val && isMirror(root1.left, root2.right) && isMirror(root1.right, root2.left)
}


function isBalanced(root: TreeNode | null): boolean {
  return height(root) !== -1
}

// 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1
function height(root: TreeNode | null): number {
  if (!root) return 0

  let leftHeight = height(root.left)
  if (leftHeight === -1) return -1
  let rightHeight = height(root.right)
  if (rightHeight === -1) return -1

  if (Math.abs(leftHeight - rightHeight) > 1) return -1
  return Math.max(leftHeight, rightHeight) + 1
}


function hasPathSum(root: TreeNode | null, sum: number): boolean {
  if (!root) return false
  if (!root.left && !root.right) return sum == root.val

  return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val)
};

// 404



function binaryTreePaths(root: TreeNode | null): string[] {
  if (!root) return []
  if (!root.left && !root.right) return [root.val + '']

  let leftPaths = binaryTreePaths(root.left)
  let rightPaths = binaryTreePaths(root.right)
  return [...leftPaths, ...rightPaths].map((e) => root.val + '->' + e)
};


function pathSum(root: TreeNode | null, sum: number): number[][] {
  let result: number[][] = []
  if (!root) return result
  if (!root.left && !root.right) {
    if (sum === root.val) {
      result = [[root.val]]
    }
    return result
  }

  let leftPaths = pathSum(root.left, sum - root.val)
  let rightPaths = pathSum(root.right, sum - root.val)
  result = [...leftPaths, ...rightPaths]
  result.map(e => e.unshift(root.val))
  return result
};


function sumNumbers(root: TreeNode | null): number {
  return dfs(root, 0)

  function dfs(root: TreeNode | null, sum: number): number {
    if (!root) return 0
    let tmp = sum * 10 + root.val
    if (!root.left && !root.right) return tmp
    return dfs(root.left, tmp) + dfs(root.right, tmp)
  }
};



function pathSum2(root: TreeNode | null, sum: number): number {
  if (!root) return 0

  let result = findPaths(root, sum)
  result += pathSum2(root.left, sum)
  result += pathSum2(root.right, sum)
  return result


};
// 在以node为根的二叉树中，寻找包含node的路径，和为sum
// 返回这样的路径总和
function findPaths(node: TreeNode | null, sum: number): number {
  if (!node) return 0

  let res = 0
  if (node.val === sum) {
    res += 1
  }
  res += findPaths(node.left, sum - node.val)
  res += findPaths(node.right, sum - node.val)
  return res
}


// 二分搜索树

function lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode): TreeNode | null {
    if (!root) return null
    if (p.val < root.val && q.val < root.val) {
      return lowestCommonAncestor(root.left, p, q)
    }
    if (p.val > root.val && q.val > root.val) {
      return lowestCommonAncestor(root.right, p, q)
    }
    return root
}; 
// 98 450 108 230 236