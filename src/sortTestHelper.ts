function generateRandomArray(n: number, rangeL: number, rangeR: number) {
  let arr = []
  for (let index = 0; index < n; index++) {
      arr.push(Math.floor(Math.random() * (rangeR - rangeL + 1)) + rangeL)
  }
  return arr;
}

function generateNearlyOrderedArray (n: number, swapTime: number): number[] {
  let arr: number[] = []
  for (let index = 0; index < n; index++) {
    arr[index] = index
  }

  for (let index = 0; index < swapTime; index++) {
    let posx = Math.floor(Math.random() * n)
    let posy = Math.floor(Math.random() * n);
    [arr[posx], arr[posy]] = [arr[posy], arr[posx]]
  }
  return arr
}

interface SortFunc {
  (arr: number[], n: number): void
}

function testSort(sortName: string , sort: SortFunc, arr: number[], n: number) {

  let startTime = Date.now();
  sort(arr, n);
  let endTime = Date.now();

  console.log(`${sortName} : ${endTime - startTime} ms`)

  console.log(arr)
  if (!isSorted(arr, n)) {
    throw new Error()
  }

  return;
}

function __swap(arr: number[], i: number, j: number) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

function isSorted(arr: number[], n: number): boolean {

  for (let i = 0; i < n - 1; i++)
      if (arr[i] > arr[i + 1])
          return false;

  return true;
}

export {
  generateRandomArray,
  generateNearlyOrderedArray,
  testSort,
  __swap
}