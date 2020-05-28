export function generateRandomArray(n: number, rangeL: number, rangeR: number) {
  let arr = []
  for (let index = 0; index < n; index++) {
      arr.push(Math.floor(Math.random() * (rangeR - rangeL + 1)) + rangeL)
  }
  return arr;
}


interface SortFunc {
  (arr: number[], n: number): void
}

export function testSort(sortName: string , sort: SortFunc, arr: number[], n: number) {

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


export function __swap(arr: number[], i: number, j: number) {
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

