import { __swap } from '../config/sortTestHelper'
// 非叶子节点 count / 2
// parent(i) = i / 2
// left(i) = i * 2 
// right(i) = i * 2 + 1
interface MaxHeapContructorParams {
  arr: number[],
  n: number
}

class MaxHeap {
  private data: number[] = []
  private count = 0

  constructor (params?: MaxHeapContructorParams) {
    if (params) {
      this.initWithArr(params.arr, params.n)
    }
  }

  initWithArr(arr: number[], n: number) {
    this.data = [0, ...arr.slice(0, n)]
    this.count = n

    for (let index =  Math.floor(this.count / 2); index >= 1; index--) {
      this.shiftDown(index)
    }

  }

  size() {
    return this.count
  }

  isEmpty() {
    return this.count === 0
  }

  insert(item: number) {
    this.data[++this.count] = item
    this.shiftUp(this.count)
  }

  extratMax(): number {
    if (this.count <= 0) {
      throw new Error()
    }

    let e = this.data[1]
    this.data[1] = this.data[this.count]
    this.count --
    this.shiftDown(1)
    return e
  }

  private shiftUp(k: number) {
    let e = this.data[k]
    let parentIndex = Math.floor(k / 2)
    while (k > 1 && e > this.data[parentIndex]) {
      this.data[k] = this.data[parentIndex]
      k = parentIndex
      parentIndex = Math.floor(k / 2)
    }
    this.data[k] = e
  }

  private shiftDown(k: number) {
    let e = this.data[k]
    while (k * 2 <= this.count) {
      let j = k * 2
      if (j + 1 <= this.count && this.data[j + 1] > this.data[j]) {
        j = j + 1
      }
      if (e >= this.data[j]) {
        break
      }

      this.data[k] = this.data[j]
      k = j
    }

    this.data[k] = e
  }
}

export function createMaxHeapInstance(params?: MaxHeapContructorParams) {
  return new MaxHeap(params)
}
