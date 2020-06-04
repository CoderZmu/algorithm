class BSTNode<Key, Value> {
  key: Key
  value: Value
  left: BSTNode<Key, Value> | null
  right: BSTNode<Key, Value> | null

  constructor(key: Key, value: Value) {
    this.key = key
    this.value = value
    this.left = this.right = null
  }
}

interface EnumerateFunc<Key, Value> {
  (node: BSTNode<Key, Value>): void
}

export class BST<Key, Value> {
  root: BSTNode<Key, Value> | null = null
  count: number = 0

  constructor() {
  }

  insert(key: Key, value: Value) {
    this.root = this.__insert(this.root, key, value)
  }

  serach(key: Key): Value {
    return this.__search(this.root, key)
  }

  // 中序遍历
  inOrder(enumerateFn: EnumerateFunc<Key, Value>) {
    this.__inOrder(this.root, enumerateFn)
  }

  // 后续遍历
  postOrder(enumerateFn: EnumerateFunc<Key, Value>) {
    this.__postOrder(this.root, enumerateFn)
  }

  // 寻找最小的键值
  minimum(): Key {
    if (this.count === 0)
      throw new Error()

    return this.__minimum(this.root).key
  }

  // 寻找最大的键值
  maximum(): Key {
    if (this.count === 0)
      throw new Error()

    let node = this.root
    while (node.right)
      node = node.right

    return node.key
  }

  // 从二叉树中删除最小值的结点
  removeMin() {
    if (this.root)
      this.root = this.__removeMin(this.root)
  }

  // 从二叉树中删除最大值的结点
  removeMax() {
    if (this.root)
      this.root = this.__removeMax(this.root)
  }

  remove(key: Key) {
    this.root = this.__remove(this.root, key)
  }

  // 向以node为根的二叉搜索树中，插入节点（key, value）
  // 返回插入新节点后二叉搜索树的根
  __insert(node: BSTNode<Key, Value>, key: Key, value: Value): BSTNode<Key, Value> {

    if (node === null) {
      this.count++
      return new BSTNode<Key, Value>(key, value)
    }

    if (node.key === key) {
      node.value = value
    } else if (key < node.key) {
      node.left = this.__insert(node.left, key, value)
    } else {
      node.right = this.__insert(node.right, key, value)
    }

    return node
  }

  // 查找以node为根的二叉搜索树中 是否包含键值为key的结点 
  __contain(node: BSTNode<Key, Value>, key: Key): boolean {

    if (node === null) {
      return false
    }

    let ret: boolean
    if (node.key === key) {
      ret = true
    } else if (key < node.key) {
      ret = this.__contain(node.left, key)
    } else {
      ret = this.__contain(node.right, key)
    }

    return ret
  }

   // 查找以node为根的二叉搜索树中 key对应的value
   __search(node: BSTNode<Key, Value>, key: Key): Value {

    if (node === null) {
      return null
    }

    let ret: Value
    if (node.key === key) {
      ret = node.value
    } else if (key < node.key) {
      ret = this.__search(node.left, key)
    } else {
      ret = this.__search(node.right, key)
    }

    return ret
  }


  // 以node为根的二叉搜索树进行中序遍历
  __inOrder(node: BSTNode<Key, Value>, enumerateFn: EnumerateFunc<Key, Value>) {
    if (node) {
      this.__postOrder(node.left, enumerateFn)
      enumerateFn(node)
      this.__postOrder(node.right, enumerateFn)
    }
  }

  // 以node为根的二叉搜索树进行后序遍历
  __postOrder(node: BSTNode<Key, Value>, enumerateFn: EnumerateFunc<Key, Value>) {
    if (node) {
      this.__postOrder(node.left, enumerateFn)
      this.__postOrder(node.right, enumerateFn)
      enumerateFn(node)
    }
  }

  // 返回node为根的二叉搜索树的最小值
  __minimum(node: BSTNode<Key, Value>): BSTNode<Key, Value> {
    if (!node.left) {
      return node
    }

    return this.__minimum(node.left)
  }

  // 删除掉以node为根的二分搜索树的最小节点
  // 返回删除结点后新的二分搜索树的根
  __removeMin(node: BSTNode<Key, Value>): BSTNode<Key, Value> {
    if (!node.left) {
      this.count--
      return node.right
    }
    node.left = this.__removeMin(node.left)

    return node
  }


  // 删除掉以node为根的二分搜索树的最大节点
  // 返回删除结点后新的二分搜索树的根
  __removeMax(node: BSTNode<Key, Value>): BSTNode<Key, Value> {
    if (!node.right) {
      this.count--
      return node.left
    }
    node.right = this.__removeMax(node.right)

    return node
  }

  // 删除掉以node为根的二分搜索树中键值为key的结点
  // 返回删除结点后新的二分搜索树的根
  __remove(node: BSTNode<Key, Value>, key: Key): BSTNode<Key, Value> {
    if (!node) {
      return null
    }
    if (key < node.key) {
      node.left = this.__remove(node.left, key)
      return node
    }

    if (key > node.key) {
      node.right = this.__remove(node.right, key)
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
    this.__removeMin(node.right)
    successor.left = node.left
    successor.right = node.right
    this.count--

    return successor
  }
}