
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function createLinkedList(nums: number[]): ListNode {
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

function printLinkedList(head: ListNode) {
  let arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }
  console.log(arr)
}

function reverseList(head: ListNode | null): ListNode | null {
  /*
  let cur = head
  let pre = null
  while (cur) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
  */
  if (!head || !head.next) return head
  let p = reverseList(head.next)
  head.next.next = head
  head.next = null
  return p
};

// 92
// 输入: 1->2->3->4->5->NULL, m = 2, n = 4
// 输出: 1->4->3->2->5->NUL
function reverseBetween(head: ListNode | null, m: number, n: number): ListNode | null {
  if (m > 1) {
    head.next = reverseBetween(head.next, m - 1, n - 1)
    return head
  }

  let l = 2, pre = head, cur = head.next

  while (l <= n) {
    let next = cur.next
    cur.next = pre

    if (l === n)
      head.next = next

    pre = cur
    cur = next
    l++
  }

  return pre
};






function deleteDuplicates(head: ListNode | null): ListNode | null {
  /*
  if (!head) return head
  let cur = head
  while (cur.next) {
    let next = cur.next
    if (next.val === cur.val) {
      cur.next = next.next
    } else {
      cur = next
    }
  }
  return head
  */
  if (!head || !head.next) return head
  head.next = deleteDuplicates(head.next)
  if (head.val === head.next.val) {
    head = deleteDuplicates(head.next)
  } else {
    head.next = deleteDuplicates(head.next)
  }
  return head
};


// 328 2 445


function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {

  let head = new ListNode(-1)
  let cur = head
  let extra = 0

  while (l1 || l2) {
    let num = 0
    if (l1) {
      num += l1.val
      l1 = l1.next
    }
    if (l2) {
      num += l2.val
      l2 = l2.next
    }
    num += extra
    extra = num > 9 ? 1 : 0
    cur.next = new ListNode(num % 10)
    cur = cur.next

  }

  return head.next
};


// let arr1 = [2,4,3], arr2 =  [5,6,4]
// let arr1 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], arr2 = [5, 6, 4]
// let l1 = createLinkedList(arr1)
// let l2 = createLinkedList(arr2)
// printLinkedList(addTwoNumbers(l1, l2))


// 输入: head = 1->4->3->2->5->2, x = 3
// 输出: 1->2->2->4->3->5
function partition(head: ListNode | null, x: number): ListNode | null {
  let newHead = new ListNode(x - 1)
  newHead.next = head

  let lastNode: ListNode | null = null
  let pre: ListNode | null = null
  let cur = newHead

  while (cur && !lastNode) {
    if (cur.val >= x) {
      lastNode = pre
    }
    pre = cur
    cur = cur.next
  }

  while (cur) {
    if (cur.val < x) { // 移动
      pre.next = cur.next
      cur.next = lastNode.next
      lastNode.next = cur
      lastNode = cur
      cur = pre
    }
    pre = cur
    cur = cur.next
  }

  return newHead.next
};

// let arr1 = [2, 1]
// let l1 = createLinkedList(arr1)
// printLinkedList(partition(l1, 2))



// 设立聊表的虚拟头结点 用于通过前一个节点来新增或移除当前节点
function removeElements(head: ListNode | null, val: number): ListNode | null {
  let dummyHead = new ListNode(-1)
  dummyHead.next = head

  let cur = dummyHead
  while (cur.next) {
    if (cur.next.val === val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return dummyHead.next
};

// 21
// 输入: 1->2->3->3->4->4->5
// 输出: 1->2->5
function deleteDuplicates02(head: ListNode | null): ListNode | null {
  let dummyHead = new ListNode(-1)
  dummyHead.next = head

  let cur = dummyHead

  while (cur.next) {
    let left = cur.next
    let right = left

    while (right.next && right.next.val == right.val) {
      right = right.next
    }
    if (left !== right) {
      cur.next = right.next
    } else {
      cur = cur.next
    }


  }

  return dummyHead.next
};


// let arr1 = [1,1,1,2,3]
// let l1 = createLinkedList(arr1)
// printLinkedList(deleteDuplicates02(l1))

// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let dummyHead = new ListNode(-1)
  let cur = dummyHead
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1
      l1 = l1.next
    }
    else {
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
  }
  if (!l1) {
    cur.next = l2
  } else if (!l2) {
    cur.next = l1
  }

  return dummyHead.next
};


// let arr1 = [1,2,4], arr2 = [1,3,4]
// let l1 = createLinkedList(arr1)
// let l2 = createLinkedList(arr2)
// printLinkedList(mergeTwoLists(l1, l2))


// 给定 1->2->3->4, 你应该返回 2->1->4->3.
function swapPairs(head: ListNode | null): ListNode | null {
  // 递归写法
  if (!head || !head.next) return head
  let next = head.next
  head.next = swapPairs(next.next)
  next.next = head
  return next

  /*
  let dummyHead = new ListNode(-1)
  dummyHead.next = head
  let cur = dummyHead
  while (cur.next && cur.next.next) {
    let node1 = cur.next
    let node2 = cur.next.next
    let next = node2.next
    node1.next = next
    node2.next = node1
    cur.next = node2
    cur = node1
  }

  return dummyHead.next
  */
};

// 25 147 148



function deleteNode(node: ListNode | null) {
  if (!node || !node.next) return
  let next = node.next
  node.val = next.val
  node.next = next.next
};


// 链表与双指针
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let dummyHead = new ListNode(-1)
  dummyHead.next = head

  let p = dummyHead, q = dummyHead
  for (let i = 0; i < n + 1; i++) {
    q = q.next
  }

  while (q) {
    q = q.next
    p = p.next
  }

  let delNode = p.next
  p.next = delNode.next

  return dummyHead.next
};

// 61  143  234

// 1->2->3->4->5
// [1, 2]
// [5, 4, 3]

function reorderList(head: ListNode | null): void {

  if (!head || !head.next) return

  function findMidPre(head: ListNode | null): ListNode | null {

    let slow = head, fast = head
    while (fast.next && fast.next.next) {
      fast = fast.next.next
      slow = slow.next
    }
    return slow
  }

  function reverseList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head
    let p = reverseList(head.next)
    head.next.next = head
    head.next = null
    return p
  }


  let midPreNode = findMidPre(head)
  let reverseL = reverseList(midPreNode.next)
  midPreNode.next = null

  let cur = head

  debugger
  while (cur && reverseL) {

    let nextNode1 = cur.next
    let nextNode2 = reverseL.next

    reverseL.next = cur.next
    cur.next = reverseL

    cur = nextNode1
    reverseL = nextNode2
  }

};

// 1->2->3->4

// let arr1 = [1, 2, 3, 4]
// let l1 = createLinkedList(arr1)
// reorderList(l1)
// printLinkedList(l1)

/*
输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL
*/
// 本质上是将尾部向前数第K个元素作为头，原来的头接到原来的尾上
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head ||!head.next || !k) return head

  let cur = head, length = 1
  while (cur.next) {
    length ++
    cur = cur.next
  }

  if (k % length == 0) return head

  let loop = length - (k % length) - 1
  let tail = cur
  tail.next = head

  cur = head
  for (let i = 0; i < loop; i++) {
    cur = cur.next
  }
  
  
  let newHead = cur.next
  cur.next = null

  return newHead
  



  /*
  if (!head ||!head.next || !k) return head
  // 找到倒数第k+1个元素
  let p = head, q = head
  let i = 0
  for (i = 0; i < k + 1 && q; i++) {
    q = q.next
  }


  let pre: ListNode
  if (i === k + 1) {
    while (q) {
      q = q.next
      p = p.next
    }
    pre = p
    
  } else {

    // 链表长度为i
    let length = i
    let idx = k % length

    
    if (idx === 0) return head

    idx = length - idx - 1
    let cur = head
    while (idx) {
      cur = cur.next
      idx--
    }

    pre = cur
  }


  let newHead = pre.next
  pre.next = null
  let cur = newHead
  while (cur.next) {
    cur = cur.next
  }
  cur.next = head

  return newHead
*/


};



let arr1 = [1,2,3,4,5]
let l1 = createLinkedList(arr1)
printLinkedList(rotateRight(l1, 2))
