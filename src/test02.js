
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
}

class LinkedMapNode {
  constructor() {}
}

class LinkedMap {

  constructor () {
    this.dic = new Map()
    this.totalCount = 0
  }

  insertNodeAtHead(node) {
    this.dic.set(node.key, node)
    this.totalCount++
    if (this.head) {
      this.head.prev = node
      node.next = this.head
      this.head = node
    } else {
      this.head = this.tail = node
    }
  }

  bringNodeToHead(node) {
    if (node === this.head) return
    if (this.tail === node) {
      this.tail = this.tail.prev
      this.tail.next = null
    } else {
      node.next.prev = node.prev
      node.prev.next = node.next
    }

    node.next = this.head
    node.prev = null
    this.head.prev = node
    this.head = node
  }

  removeNode(node) {
    this.dic.delete(node.key)
    this.totalCount--
    if (node.next) node.next.prev = node.prev
    if (node.prev) node.prev.next = node.next
    if (this.head === node) this.head = node.next
    if (this.tail === node) this.tail = node.prev
  }

  removeTailNode() {
    if (!this.tail) return null
    let tail = this.tail
    this.dic.delete(tail.key)
    this.totalCount--
    if (this.head === this.tail) {
      this.head = this.tail = null
    } else {
      this.tail = this.tail.prev
      this.tail.next = null
    }
    return tail
  }
}

class LRUCache {
  
  constructor(capacity) {
    this.linkedMap = new LinkedMap()
    this.capacity = capacity
  }

  get(key) {
    let node = this.linkedMap.dic.get(key)
    if (node) {
      this.linkedMap.bringNodeToHead(node)
      return node.value
    }
    return -1
  }

  put(key, value) {
    let node = this.linkedMap.dic.get(key)
    if (node) {
      node.value = value
      this.linkedMap.bringNodeToHead(node)
    } else {
      node = new LinkedMapNode()
      node.key = key
      node.value = value
      this.linkedMap.insertNodeAtHead(node)
      if (this.linkedMap.totalCount > this.capacity) {
        this.linkedMap.removeTailNode()
      }
    }
  }
}

let cache = new LRUCache(2)

cache.put(1, 1)
cache.put(2, 2)
console.log(cache.get(1)) // 返回  1
cache.put(3, 3) // 该操作会使得关键字 2 作废
cache.get(2) // 返回 -1 (未找到)
cache.put(4, 4) // 该操作会使得关键字 1 作废
cache.get(1) // 返回 -1 (未找到)
cache.get(3) // 返回  3
cache.get(4) // 返回  4



let promise1 = null,
  promise2 = null,
  promise3 = null

function step1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(1)
    }, 2000)
  })
}

