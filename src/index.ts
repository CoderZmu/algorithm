
import { generateRandomArray, testSort } from './sortTestHelper'

import { quickSort, quickSort3Ways } from './sort/quickSort'

let n = 1000
let arr = generateRandomArray(n, 0, 10)
testSort('quickSort3Ways', quickSort3Ways, arr, n)
