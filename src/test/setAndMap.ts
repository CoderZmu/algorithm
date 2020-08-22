import { BST } from '../binarySearchTree/bst'


// 系统库set和map使用
function intersection(nums1: number[], nums2: number[]): number[] {
  let record = new Set(nums1), resultSet = new Set<number>()
  for (const e of nums2) {
    if (record.has(e)) resultSet.add(e)
  }

  return [...resultSet]
};


/*
function intersect(nums1: number[], nums2: number[]): number[] {
  let recordMap = new Map(), result = []
  for (const e of nums1) {
    recordMap.set(e, (recordMap.get(e) || 0) + 1)
  }

  for (const e of nums2) {
    let c = recordMap.get(e)
    if (c > 0) {
      result.push(e)
      recordMap.set(e, c - 1)
    }
  }

  return result
};
*/

// 先排序
function intersect(nums1: number[], nums2: number[]): number[] {
  nums1.sort((e1, e2) => e1 - e2)
  nums2.sort((e1, e2) => e1 - e2)

  let l = 0, r = 0, result = []
  while (l < nums1.length && r < nums2.length) {
    if (nums1[l] < nums2[r]) {
      l++
    }
    else if (nums1[l] > nums2[r]) {
      r++
    }
    else {
      result.push(nums1[l])
      l++
      r++
    }
  }
  return result
};

// 242  202  290  205  451


// 查找表
// 将所有元素放入查找表，之后对于每一个元素a, 查找target - a是否存在
function twoSum_01(nums: number[], target: number): number[] {

  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i]
    let l = map.get(diff)
    if (typeof l !== 'undefined') return [l, i]
    map.set(nums[i], i)
  }
  return []
};

// 15 18 16

function threeSum_m2(nums: number[]): number[][] {
  nums.sort((e1, e2) => e1 - e2)
  let result: number[][] = []

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break
    if (i > 0 && nums[i] === nums[i - 1]) continue

    let set = new Set()
    for (let j = i + 1; j < nums.length; j++) {
      let diff = -nums[j] - nums[i]
      if (set.has(diff)) {
        result.push([nums[i], diff, nums[j]])
        while (j + 1 < nums.length && nums[j + 1] === nums[j]) j++
      } else {
        set.add(nums[j])
      }

    }
  }
  return result
};



function fourSumCount(A: number[], B: number[], C: number[], D: number[]): number {
  let map = new Map()
  for (const e1 of A) {
    for (const e2 of B) {
      map.set(e1 + e2, (map.get(e1 + e2) || 0) + 1)
    }
  }

  let result = 0
  for (const e1 of C) {
    for (const e2 of D) {
      let c = map.get(-e1 - e2)
      if (typeof c !== 'undefined') {
        result += c
      }
    }

  }

  return result
};

// 49
function groupAnagrams(strs: string[]): string[][] {
  let map = new Map(), result: string[][] = []

  for (const str of strs) {
    let orderStr = [...str].sort().join('')
    let idx = map.get(orderStr)
    if (typeof idx !== 'undefined') {
      result[idx].push(str)
    } else {
      result.push([str])
      map.set(orderStr, result.length - 1)
    }
  }

  return result

};

function numberOfBoomerangs(points: number[][]): number {

  function dis(p1: number[], p2: number[]): number {
    return Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2)
  }

  let result = 0
  for (let i = 0; i < points.length; i++) {
    // 存储points[i] 到其他点的距离
    let map = new Map()
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        let disValue = dis(points[i], points[j])
        map.set(disValue, (map.get(disValue) || 0) + 1)
      }
    }

    for (const d of map.values()) {
      result += d * (d - 1)
    }
  }
  return result
};


function maxPoints(points: number[][]): number {

  function gcd(a: number, b: number) {
    if (a % b === 0) {
      return b;
    }
    return arguments.callee(b, a % b);
  }
  function angle(p1: number[], p2: number[]) {
    let x = p2[0] - p1[0]
    let y = p2[1] - p1[1]
    if (x === 0) return '90'
    if (y === 0) return '0'

    let gcdValue = gcd(x, y)
    return `${x / gcdValue}-${y / gcdValue}`
  }

  if (!points.length) return 0

  let result = 0
  for (let i = 0; i < points.length; i++) {
    
    let map = new Map()
    let sameCount = 0
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        if (points[i][0] === points[j][0] && points[i][1] === points[j][1]) {
          sameCount++ 
        } else {
          let angleValue = angle(points[i], points[j])
          map.set(angleValue, (map.get(angleValue) || 0) + 1)
        }
        
      }
    }
    let curCount = map.size ? Math.max(...map.values()) : 0
    curCount += sameCount
    result = Math.max(result, curCount)
    
  }
  return result + 1
};

// 窗口滑动 + set
function containsNearbyDuplicate(nums: number[], k: number): boolean {
  // 维护k+1长度窗口大小，向右滑动
  let set = new Set()
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      return true
    }
    set.add(nums[i])
    if (set.size > k) {
      set.delete(nums[i-k])
    }
  }

  return false
};
// 217


function containsDuplicate(nums: number[]): boolean {
  let set = new Set()
  for (const e of nums) {
    if (set.has(e)) {
      return true
    } 
    set.add(e)
  }
  return false
};


function containsNearbyAlmostDuplicate(nums: number[], k: number, t: number): boolean {
  let set = new BST<number, null>()
  for (let i = 0; i < nums.length; i++) {
    let floorVal = set.floor(nums[i] + t)
    if (floorVal && floorVal.key >= nums[i] - t) {
      return true
    }
    set.insert(nums[i], null)
    if (set.count > k) {
      set.remove(nums[i-k])
    }
  }

  return false
};


