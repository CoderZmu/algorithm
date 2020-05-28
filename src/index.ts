
import { generateRandomArray, testSort } from './sortTestHelper'

import { quickSort, quickSort3Ways } from './sort/quickSort'

let n = 1000000
let arr = generateRandomArray(n, 0, n)
let arr2 = [...arr]

testSort('quickSort', quickSort, arr, n)
testSort('quickSort3Ways', quickSort3Ways, arr, n)
