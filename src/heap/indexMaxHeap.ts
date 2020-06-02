import { __swap } from '../config/sortTestHelper'
// 非叶子节点 count / 2
// parent(i) = i / 2
// left(i) = i * 2 
// right(i) = i * 2 + 1

// reverse[i] 表示索引i在堆中的位置

// indexes[i] = j
// reverse[j] = i

// reverse[indexes[i]] = i
// indexes[reverse[i]] = i
class IndexMaxHeap<T> {
  private data: T[] = []
  private indexes: number[] = []
  private reverse: number[] = []
  private count = 0

  size() {
    return this.count
  }

  isEmpty() {
    return this.count === 0
  }

  insert(item: T) {
    this.count++
    this.data[this.count] = item
    this.indexes[this.count] = this.count
    this.reverse[this.count] = this.count
    this.shiftUp(this.count)
  }

  extratMax(): T {
    if (this.count <= 0) {
      throw new Error()
    }

    let e = this.data[this.indexes[1]]
    this.indexes[1] = this.indexes[this.count]
    this.reverse[this.count] = 1
    this.count--
    this.shiftDown(1)
    return e
  }

  // i于外部调用者是从0开始的
  getItem(i: number): T {
    return this.data[i + 1]
  }

  changeItem(i: number, newItem: T) {
    i++
    this.data[i] = newItem

    // 找到indexes[j] = i j表示data[i]在堆中的位置
    // for (let j = 1; j <= this.count; j++){
    //   if (this.insert[j] === i) {
    //     this.shiftDown(j)
    //     this.shiftUp(j)
    //     return
    //   }
    // }

    let j = this.reverse[i]
    this.shiftDown(j)
    this.shiftUp(j)
  }

  private shiftUp(k: number) {
    let e = this.indexes[k]
    let parentIndex = Math.floor(k / 2)
    while (k > 1 && this.data[e] > this.data[this.indexes[parentIndex]]) {
      this.indexes[k] = this.indexes[parentIndex]
      this.reverse[this.indexes[k]] = k
      k = parentIndex
      parentIndex = Math.floor(k / 2)
    }
    this.indexes[k] = e
    this.reverse[this.indexes[k]] = k
  }

  private shiftDown(k: number) {
    let e = this.indexes[k]
    while (k * 2 <= this.count) {
      let j = k * 2
      if (j + 1 <= this.count && this.data[this.indexes[j + 1]] > this.data[this.indexes[j]]) {
        j = j + 1
      }
      if (this.data[e] >= this.data[this.indexes[j]]) {
        break
      }

      this.indexes[k] = this.indexes[j]
      this.reverse[this.indexes[k]] = k
      k = j
    }

    this.indexes[k] = e
    this.reverse[this.indexes[k]] = k
  }
}

export function createIndexMaxHeapInstance<T>() {
  return new IndexMaxHeap<T>()
}
