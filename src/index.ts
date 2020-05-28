
import { generateRandomArray, testSort } from './sortTestHelper'
import { insertionSort } from './sort/baseSort'
import { mergeSort } from './sort/mergeSort'
import { quickSort, quickSort3Ways } from './sort/quickSort'

let n = 100000
let arr = generateRandomArray(n, 0, n)
let arr2 = [...arr]
let arr3 = [...arr]
let arr4 = [...arr]
testSort('insertionSort', insertionSort, arr, n)
testSort('mergeSort', mergeSort, arr2, n)
testSort('quickSort', quickSort, arr3, n)
testSort('quickSort3Ways', quickSort3Ways, arr4, n)
