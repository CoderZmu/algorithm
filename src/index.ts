
import { generateRandomArray, testSort } from './config/sortTestHelper'
import { insertionSort } from './sort/baseSort'
import { mergeSort } from './sort/mergeSort'
import { quickSort, quickSort3Ways, findElement } from './sort/quickSort'
import { heapSort, heapSort2 } from './sort/heapSort'
import { createIndexMaxHeapInstance } from './heap/indexMaxHeap'

let n = 100000
let arr = generateRandomArray(n, 0, n)
let arr2 = [...arr]
let arr3 = [...arr]
let arr4 = [...arr]
let arr5 = [...arr]
let arr6 = [...arr]
// testSort('insertionSort', insertionSort, arr, n)
// testSort('mergeSort', mergeSort, arr2, n)
// testSort('quickSort', quickSort, arr3, n)
// testSort('quickSort3Ways', quickSort3Ways, arr4, n)
// testSort('heapSort', heapSort, arr5, n)
// testSort('heapSort2', heapSort2, arr6, n)

let maxHeap = createIndexMaxHeapInstance<number>()
for (let index = 0; index < 15; index++) {
  maxHeap.insert(Math.floor(Math.random() * 100))
}
console.log(maxHeap)
// let sortedArr = []
// while (!maxHeap.isEmpty()) {
//   sortedArr.unshift(maxHeap.extratMax())
// }

// console.log(sortedArr)