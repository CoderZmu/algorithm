class BSTNode<Key, Value> {
  key: Key
  value: Value
  left: Node | null
  right: Node | null
  
  constructor(key: Key, value: Value) {
    this.key = key
    this.value = value
    this.left = this.right = null
  }
}

class BST<Key,Value> {
  root: BSTNode<Key,Value> | null
  count: number = 0

  // 向以node为根的二叉搜索树中，插入节点（key, value）
  // 返回插入新节点后二叉搜索树的根
  __insert(node: BSTNode<Key,Value>, key: Key, value: Value): BSTNode<Key,Value> {
    

    return node
  }
}