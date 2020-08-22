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
  debugger
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
  let result = nums.length + 1, sum = 0, l = 0, r = -1
  while (l < nums.length) {
    if (r + 1 < nums.length && sum < s) {
      sum += nums[r++]
    } else {
      sum -= nums[l++]
    }

    if (sum >= s) {
      result = Math.min(result, r - l + 1)
    }
  }
  return result === nums.length + 1 ? 0 : result
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]))