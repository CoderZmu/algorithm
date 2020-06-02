import { createMaxHeapInstance } from '../heap/maxHeap'
import { __swap } from '../config/sortTestHelper'

function heapSort(arr: number[], n: number) {
  let maxHeap = createMaxHeapInstance({ arr, n })
  for (let index = n - 1; index >= 0; index--) {
    arr[index] = maxHeap.extratMax()
  }
}

function heapSort2(arr: number[], n: number) {
  // heapify
  for (let index = Math.floor((n - 1) / 2); index >= 0; index--) {
    __shiftDown(arr, n, index)
  }

  for (let index = n - 1; index > 0; index--) {
    __swap(arr, 0, index)
    __shiftDown(arr, index, 0)
  }
}

function __shiftDown(arr: number[], n: number, k: number) {
  let e = arr[k]
  while (k * 2 + 1 < n) {
    let j = k * 2 + 1
    if (j + 1 < n && arr[j + 1] > arr[j]) {
      j = j + 1
    }
    if (e >= arr[j]) {
      break
    }

    arr[k] = arr[j]
    k = j
  }

  arr[k] = e
}

export {
  heapSort,
  heapSort2
}