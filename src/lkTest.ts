import { ListNode, createLinkedList, TreeNode } from './test/helper'
// 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 5 -> 6
// 13555  6565
// 12345  2345
function hasCycle(head: ListNode | null): boolean {
  let fast = head, slow = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast == slow) {
      return true
    }
  }
  return false
};

function middleNode(head: ListNode | null): ListNode | null {
if (!head) {
  return head
}

let slow = head, fast = head
while (fast.next) {
  fast = fast.next.next
  slow = slow.next
}
return slow
};


function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next

    if (slow == fast) {
      break
    }
  }

  if (!fast || !fast.next) {
    return null
  }

  slow = head
  while (slow != fast) {
    slow = slow.next
    fast = fast.next
  }


  return slow
};




function isPalindrome(head: ListNode | null): boolean {

  function getMidNode(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head

    let fast = head.next, slow = head.next
    while (fast.next && fast.next.next) {
      fast = fast.next.next
      slow = slow.next
    }

    return slow
  }

  function reverseList(node: ListNode | null): ListNode | null {
    if (!node || !node.next) return node

    let newHead = reverseList(node.next)
    node.next.next = node
    node.next = null
    return newHead
  }

  if (!head || !head.next) return true

  let foo = reverseList(getMidNode(head))

  while (foo) {
    if (foo.val != head.val) return false
    foo = foo.next
    head = head.next
  }
  return true

};

isPalindrome(createLinkedList([1, 2]))
