// 移动零
function moveZeroes(nums: number[]): void {
  let k = 0 // [0, k)的元素为非0元素
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]) {
      if (i !== k) nums[k] = nums[i]
      k++
    }
  }

  for (let i = k; i < nums.length; i++) {
    nums[i] = 0
  }
};

// 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
function removeElement(nums: number[], val: number): number {
  let l = 0
  let k = nums.length - 1
  while (l <= k) {
    if (nums[k] === val) {
      k--
    }
    else if (nums[l] !== val) {
      l++
    }
    else {
      nums[l--] = nums[k--]
    }
  }
  return l
};

// 颜色分类
// 1.计数排序
/*
function sortColors(nums: number[]): void {
  let counter = [0, 0, 0]
  for (let i = 0; i < nums.length; i++) {
    counter[nums[i]] += 1
  }

  let index = 0
  for (let cIndex = 0; cIndex < counter.length; cIndex++) {
    const count = counter[cIndex];
    for (let i = 0; i < count; i++) {
      nums[index++] = cIndex
    }
  }
};
*/
// 2.3路快排序
function sortColors(nums: number[]): void {

  function __swap(i: number, j: number) {
    let tmp = nums[i]
    nums[i] = nums[j]
    nums[j] = tmp
  }

  let lt = -1 // nums[0...lt] == 0
  let gt = nums.length // nums[gt...r] == 1
  let i = 0 // nums[lt+1...i) == 2
  while (i < gt) {
    let e = nums[i]
    if (e === 0) {
      __swap(++lt, i++)
    }
    else if (e === 2) {
      __swap(--gt, i)
    } else {
      i++
    }
  }
};

// 88.合并两个有序数组
// 将nums1[0...m)和nums2[0...n)两部分进行归并
function merge(nums1: number[], m: number, nums2: number[], n: number): void {

  let len1 = m - 1
  let len2 = n - 1
  for (let k = m + n - 1; k >= 0; k--) {
    if (len1 < 0) {
      nums1[k] = nums2[len2--]
    }
    else if (len2 < 0) {
      break
    }
    else if (nums1[len1] > nums2[len2]) {
      nums1[k] = nums1[len1--]
    }
    else {
      nums1[k] = nums2[len2--]
    }
  }
};


// 215. 数组中的第K个最大元素
function findKthLargest(nums: number[], k: number): number {
  k--
  let l = 0, r = nums.length - 1
  while (l <= r) {
    let p = __partition(nums, l, r)
    if (p === k) return nums[p]
    if (p < k) {
      l = p + 1
    } else {
      r = p - 1
    }
  }

  return -1
};

function __partition(nums: number[], l: number, r: number): number {

  let randomIndex = Math.floor(Math.random() * (r - l + 1)) + l
  __swap(nums, l, randomIndex)

  let v = nums[l]
  // nums[l+1, j] > v nums[j+1, i) < v
  let j = l
  for (let i = l + 1; i <= r; i++) {
    if (nums[i] > v) {
      __swap(nums, ++j, i)
    }
  }
  __swap(nums, l, j)
  return j
}

function __swap(nums: number[], i: number, j: number) {
  let tmp = nums[i]
  nums[i] = nums[j]
  nums[j] = tmp
}

// 167. 两数之和 II - 输入有序数组
// 对撞指针
function twoSum(numbers: number[], target: number): number[] {
  let l = 0, r = numbers.length - 1
  while (l < r) {
    let tmp = numbers[l] + numbers[r]
    if (tmp === target) {
      return [l, r]
    }
    if (tmp < target) {
      l++
    }
    else if (tmp > target) {
      r--
    }
  }
  return []
};


function threeSum(nums: number[]): number[][] {
  nums.sort((e1, e2) => e1 - e2)
  let result: number[][] = []

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break
    if (i > 0 && nums[i] === nums[i-1]) continue

    let l = i + 1, r = nums.length - 1, sum = 0
    while (l < r) {
      sum = nums[i] + nums[l] + nums[r]
      if (sum < 0) {
        l++
      } else if (sum > 0) {
        r--
      } else {
        result.push([nums[i], nums[l], nums[r]])
        l++, r--
        while (l < r && nums[l] === nums[l-1]) l++
        while (l < r && nums[r] === nums[r+1]) r--
      }
    }

  }

  return result
};

// 125
// 344
// 345
// 11


// 125. 验证回文串
function isPalindrome(s: string): boolean {
  s = s.replace(/[\W-]*/g, '')
  s = s.toLowerCase()

  let l = 0, r = s.length - 1 // [0...r]
  while (l < r) {
    if (s[l++] !== s[r--]) return false
  }
  return true
};
 

function reverseVowels(s: string): string {
  let vowelChats = new Set(['a', 'e', 'i', 'o', 'u'])
  let list = s.split('')
  let l = 0, r = list.length - 1

  while (l < r) {
    if (!vowelChats.has(s[l].toLowerCase())) {
      l++
    } 
    else if (!vowelChats.has(s[r].toLowerCase())) {
      r--
    } else {
      let tmp = list[l]
      list[l] = list[r]
      list[r] = tmp
      l++
      r--
    }

    
  }

  return list.join('')
};


function maxArea(height: number[]): number {
  let result = 0, l = 0, r = height.length - 1
  while (l < r) {
    result = Math.max(result, (r - l) * Math.min(height[l], height[r]))
    if (height[l] < height[r]){
      l ++
    } else {
      r --
    }
  }
  return result
};

// 暴力解法
/*
function minSubArrayLen(s: number, nums: number[]): number {
  let result = nums.length + 1, sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum = 0
    for (let j = i; j < nums.length; j++) {
      sum += nums[j]
      if (sum >= s) {
      result = Math.min(j - i + 1, result)
      break
    }
  }
  }
  return result === nums.length + 1 ? 0 : result
};
*/

// 窗口滑动
function minSubArrayLen(s: number, nums: number[]): number {
  let l = 0, r = -1, result = nums.length + 1, sum = 0 // [l...r]为滑动窗口
  while (l < nums.length) {
    if (sum < s) {
      if (r + 1 >= nums.length) break
      sum += nums[++r]
    } else {
      // nums[l+1...r-1] < s
      sum -= nums[l++]
    }

    if (sum >= s) {
      result = Math.min(result, r - l + 1)
    }
  }
  if (result === nums.length + 1)
    return 0

  return result
};


function lengthOfLongestSubstring(s: string): number {
  let set = new Set(), l = 0, r = -1, result = 0
  while (r + 1 < s.length) {
    if (!set.has(s[r + 1])) {
      set.add(s[++r])
      result = Math.max(result, set.size)
    } else {
      set.delete(s[l++])
    }

  }
  return result
};

function findAnagrams(s: string, p: string): number[] {
  let pMap = new Map()
  let pArr = [...p]
  pArr.map(e => {
    let old = pMap.get(e) || 0
    pMap.set(e, old + 1)
  })
  let map = new Map(), l = 0, r = -1, result = []
  
  while (r + 1 < s.length) {
    let next = s[r + 1]
    if (!pMap.has(next)) {
      r++
      l = r + 1
      map.clear()
    } else {
      let count = map.get(next) || 0
      if (count < pMap.get(next)) {
        map.set(next, count + 1)
        r++

        if (r - l + 1 === p.length) {
          result.push(l)
          map.delete(s[l++])
        }
      } else {
        map.delete(s[l++])
      }
    }
  }
  return result
};
