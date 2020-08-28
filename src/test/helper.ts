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