export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

export function createLinkedList(nums: number[]): ListNode {
  if (nums.length === 0) return null
  let head = new ListNode(nums[0])
  let cur = head
  for (let index = 1; index < nums.length; index++) {
    let node = new ListNode(nums[index])
    cur.next = node
    cur = node
  }
  return head
}

export function printLinkedList(head: ListNode) {
  let arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }
  console.log(arr)
}


export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}



class TreeSetNode<Value> {
  value: Value
  left: TreeSetNode<Value> | null
  right: TreeSetNode<Value> | null

  constructor(value: Value) {
    this.value = value
    this.left = this.right = null
  }
}
export class TreeSet<Value> {
  private root: TreeSetNode<Value> | null = null
  private count: number = 0

  constructor(private compareFn: (a: Value, b: Value) => number) {
  }

  insert(value: Value) {
    this.root = this.__insert(this.root, value)
  }

  max(): Value | null {
    return this.__maximum(this.root).value
  }

  remove(value: Value) {
    this.root = this.__remove(this.root, value)
  }

  __insert(node: TreeSetNode<Value>, value: Value): TreeSetNode<Value> {

    if (node === null) {
      this.count++
      return new TreeSetNode<Value>(value)
    }
    let result = this.compareFn(value, node.value)

    if (result == 0) {
      node.value = value
    } else if (result < 0) {
      node.left = this.__insert(node.left, value)
    } else {
      node.right = this.__insert(node.right, value)
    }

    return node
  }

  __maximum(node: TreeSetNode<Value>): TreeSetNode<Value> {
    if (!node.right) {
      return node
    }

    return this.__maximum(node.right)
  }

  __minimum(node: TreeSetNode<Value>): TreeSetNode<Value> {
    if (!node.left) {
      return node
    }

    return this.__minimum(node.left)
  }

  __removeMin(node: TreeSetNode<Value>): TreeSetNode<Value> {
    if (!node.left) {
      this.count--
      return node.right
    }
    node.left = this.__removeMin(node.left)

    return node
  }

  __remove(node: TreeSetNode<Value>, value: Value): TreeSetNode<Value> {
    if (!node) {
      return null
    }
    let result = this.compareFn(value, node.value)
    if (result < 0) {
      node.left = this.__remove(node.left, value)
      return node
    }

    if (result > 0) {
      node.right = this.__remove(node.right, value)
      return node
    }

    // key === node.key
    if (!node.left) {
      this.count--
      return node.right
    }

    if (!node.right) {
      this.count--
      return node.left
    }

    // node.left != null && node.right != null
    // 新的子树的根
    let successor = this.__minimum(node.right)
    this.count++
    node.right = this.__removeMin(node.right)
    successor.left = node.left
    successor.right = node.right
    this.count--

    return successor
  }
}

