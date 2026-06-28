import mongoose from "mongoose";
import dotenv from "dotenv";
import Problem from "./src/Models/problem.js";

dotenv.config();

const problems = [
  // === ARRAYS (10 Problems) ===
  {
    problemId: "two-sum",
    problemNumber: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Google", "Amazon", "Apple", "Adobe"],
    xpReward: 20,
    estimatedTime: 25,
    statement: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    inputFormat: "The first line contains integers separated by spaces representing `nums`.\nThe second line contains a single integer representing `target`.",
    outputFormat: "Two space-separated integers representing the indices.",
    constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
    examples: [
      { input: "2 7 11 15\n9", output: "0 1", explanation: "Because nums[0] + nums[1] == 9, we return 0 1." },
      { input: "3 2 4\n6", output: "1 2", explanation: "Because nums[1] + nums[2] == 6, we return 1 2." },
      { input: "3 3\n6", output: "0 1", explanation: "Because nums[0] + nums[1] == 6, we return 0 1." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    twoSum(nums, target) {\n        // Write code here\n    }\n}",
      go: "func twoSum(nums []int, target int) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "2 7 11 15\n9", expectedOutput: "0 1", isPublic: true },
      { input: "3 2 4\n6", expectedOutput: "1 2", isPublic: true },
      { input: "3 3\n6", expectedOutput: "0 1", isPublic: true }
    ]
  },
  {
    problemId: "best-time-to-buy-and-sell-stock",
    problemNumber: 2,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Amazon", "Microsoft", "Facebook", "Goldman Sachs"],
    xpReward: 20,
    estimatedTime: 25,
    statement: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    inputFormat: "A single line containing prices separated by spaces.",
    outputFormat: "A single integer representing the maximum profit.",
    constraints: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
    examples: [
      { input: "7 1 5 3 6 4", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5." },
      { input: "7 6 4 3 1", output: "0", explanation: "In this case, no transactions are done and the max profit = 0." },
      { input: "2 4 1", output: "2", explanation: "Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4 - 2 = 2." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int maxProfit(int[] prices) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    maxProfit(prices) {\n        // Write code here\n    }\n}",
      go: "func maxProfit(prices []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "7 1 5 3 6 4", expectedOutput: "5", isPublic: true },
      { input: "7 6 4 3 1", expectedOutput: "0", isPublic: true },
      { input: "2 4 1\n", expectedOutput: "2", isPublic: true }
    ]
  },
  {
    problemId: "contains-duplicate",
    problemNumber: 3,
    title: "Contains Duplicate",
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
    inputFormat: "A single line containing integers separated by spaces.",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
    examples: [
      { input: "1 2 3 1", output: "true", explanation: "The element 1 occurs twice." },
      { input: "1 2 3 4", output: "false", explanation: "All elements are unique." },
      { input: "1 1 1 3 3 4 3 2 4 2", output: "true", explanation: "The element 1 occurs multiple times." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    containsDuplicate(nums) {\n        // Write code here\n    }\n}",
      go: "func containsDuplicate(nums []int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 1", expectedOutput: "true", isPublic: true },
      { input: "1 2 3 4", expectedOutput: "false", isPublic: true },
      { input: "1 1 1 3 3 4 3 2 4 2", expectedOutput: "true", isPublic: true }
    ]
  },
  {
    problemId: "product-of-array-except-self",
    problemNumber: 4,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    topic: "Arrays",
    companies: ["Facebook", "Amazon", "Microsoft", "Netflix"],
    xpReward: 30,
    estimatedTime: 35,
    statement: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must write an algorithm that runs in `O(N)` time and without using the division operation.",
    inputFormat: "A single line containing elements of array `nums` separated by spaces.",
    outputFormat: "Space-separated products representing output array.",
    constraints: "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
    examples: [
      { input: "1 2 3 4", output: "24 12 8 6", explanation: "The product array except self for [1,2,3,4] is [2*3*4, 1*3*4, 1*2*4, 1*2*3] = [24,12,8,6]." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    productExceptSelf(nums) {\n        // Write code here\n    }\n}",
      go: "func productExceptSelf(nums []int) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 4", expectedOutput: "24 12 8 6", isPublic: true },
      { input: "-1 1 0 -3 3", expectedOutput: "0 0 9 0 0", isPublic: true }
    ]
  },
  {
    problemId: "maximum-subarray",
    problemNumber: 5,
    title: "Maximum Subarray (Kadane's)",
    difficulty: "Medium",
    topic: "Arrays",
    companies: ["Amazon", "Microsoft", "LinkedIn", "Google"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    inputFormat: "A single line of space-separated integers.",
    outputFormat: "A single integer representing the maximum subarray sum.",
    constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
    examples: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum = 6." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int maxSubArray(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    maxSubArray(nums) {\n        // Write code here\n    }\n}",
      go: "func maxSubArray(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6", isPublic: true },
      { input: "1", expectedOutput: "1", isPublic: true },
      { input: "5 4 -1 7 8", expectedOutput: "23", isPublic: true }
    ]
  },
  {
    problemId: "maximum-product-subarray",
    problemNumber: 6,
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    topic: "Arrays",
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    xpReward: 30,
    estimatedTime: 35,
    statement: "Given an integer array `nums`, find a subarray that has the largest product, and return the product.",
    inputFormat: "A single line containing integers separated by spaces.",
    outputFormat: "A single integer representing the largest product.",
    constraints: "1 <= nums.length <= 2 * 10^4\n-10 <= nums[i] <= 10",
    examples: [
      { input: "2 3 -2 4", output: "6", explanation: "[2,3] has the largest product = 6." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int maxProduct(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int maxProduct(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def maxProduct(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    maxProduct(nums) {\n        // Write code here\n    }\n}",
      go: "func maxProduct(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "2 3 -2 4", expectedOutput: "6", isPublic: true },
      { input: "-2 0 -1", expectedOutput: "0", isPublic: true },
      { input: "-2 3 -4", expectedOutput: "24", isPublic: true }
    ]
  },
  {
    problemId: "find-minimum-in-rotated-sorted-array",
    problemNumber: 7,
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    topic: "Arrays",
    companies: ["Facebook", "Goldman Sachs", "Amazon", "Microsoft"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times.\n\nGiven the sorted rotated array `nums` of unique elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in `O(log n)` time.",
    inputFormat: "A single line containing space-separated rotated elements.",
    outputFormat: "A single integer.",
    constraints: "n == nums.length\n1 <= n <= 5000\n-5000 <= nums[i] <= 5000\nAll elements are unique.",
    examples: [
      { input: "3 4 5 1 2", output: "1" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int findMin(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def findMin(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    findMin(nums) {\n        // Write code here\n    }\n}",
      go: "func findMin(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 4 5 1 2", expectedOutput: "1", isPublic: true },
      { input: "4 5 6 7 0 1 2", expectedOutput: "0", isPublic: true },
      { input: "11 13 15 17", expectedOutput: "11", isPublic: true }
    ]
  },
  {
    problemId: "search-in-rotated-sorted-array",
    problemNumber: 8,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    topic: "Arrays",
    companies: ["Google", "Facebook", "Amazon", "Directi"],
    xpReward: 35,
    estimatedTime: 40,
    statement: "There is an integer array `nums` sorted in ascending order (with distinct values).\n\nPrior to being passed to your function, `nums` is possibly rotated at an unknown pivot index.\n\nGiven the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.",
    inputFormat: "First line contains rotated integers. Second line contains `target`.",
    outputFormat: "A single integer representing target index or -1.",
    constraints: "1 <= nums.length <= 5000\n-10^4 <= nums[i] <= 10^4\nAll elements of nums are unique.\n-10^4 <= target <= 10^4",
    examples: [
      { input: "4 5 6 7 0 1 2\n0", output: "4" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int search(int[] nums, int target) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    search(nums, target) {\n        // Write code here\n    }\n}",
      go: "func search(nums []int, target int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "4 5 6 7 0 1 2\n0", expectedOutput: "4", isPublic: true },
      { input: "4 5 6 7 0 1 2\n3", expectedOutput: "-1", isPublic: true },
      { input: "1\n0", expectedOutput: "-1", isPublic: true }
    ]
  },
  {
    problemId: "three-sum",
    problemNumber: 9,
    title: "3Sum",
    difficulty: "Medium",
    topic: "Arrays",
    companies: ["Amazon", "Facebook", "Microsoft", "Bloomberg"],
    xpReward: 35,
    estimatedTime: 40,
    statement: "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
    inputFormat: "A single line containing integers separated by spaces.",
    outputFormat: "Triplets grouped as space separated values on separate lines (sorted).",
    constraints: "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
    examples: [
      { input: "-1 0 1 2 -1 -4", output: "-1 -1 2\n-1 0 1", explanation: "The unique triplets summing to 0 are [-1, -1, 2] and [-1, 0, 1]." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        # Write code here",
      javascript: "class Solution {\n    threeSum(nums) {\n        // Write code here\n    }\n}",
      go: "func threeSum(nums []int) [][]int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "-1 0 1 2 -1 -4", expectedOutput: "-1 -1 2\n-1 0 1", isPublic: true },
      { input: "0 1 1", expectedOutput: "", isPublic: true },
      { input: "0 0 0", expectedOutput: "0 0 0", isPublic: true }
    ]
  },
  {
    problemId: "container-with-most-water",
    problemNumber: 10,
    title: "Container With Most Water",
    difficulty: "Medium",
    topic: "Arrays",
    companies: ["Google", "Amazon", "Apple", "Uber"],
    xpReward: 30,
    estimatedTime: 35,
    statement: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
    inputFormat: "A single line containing integers separated by spaces.",
    outputFormat: "A single integer.",
    constraints: "n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4",
    examples: [
      { input: "1 8 6 2 5 4 8 3 7", output: "49", explanation: "The max water is between heights 8 and 7, distance = 7, capacity = min(8,7) * 7 = 49." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int maxArea(int[] height) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    maxArea(height) {\n        // Write code here\n    }\n}",
      go: "func maxArea(height []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 8 6 2 5 4 8 3 7", expectedOutput: "49", isPublic: true },
      { input: "1 1", expectedOutput: "1", isPublic: true }
    ]
  },

  // === STRINGS (8 Problems) ===
  {
    problemId: "valid-anagram",
    problemNumber: 11,
    title: "Valid Anagram",
    difficulty: "Easy",
    topic: "Strings",
    companies: ["Amazon", "Uber", "Yandex", "Google"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
    inputFormat: "First line contains string `s`. Second line contains string `t`.",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters.",
    examples: [
      { input: "anagram\nnagaram", output: "true" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isAnagram(String s, String t) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isAnagram(s, t) {\n        // Write code here\n    }\n}",
      go: "func isAnagram(s string, t string) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "anagram\nnagaram", expectedOutput: "true", isPublic: true },
      { input: "rat\ncar", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "valid-parentheses",
    problemNumber: 12,
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Strings",
    companies: ["Microsoft", "Amazon", "Facebook", "Goldman Sachs"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n- Open brackets must be closed by the same type of brackets.\n- Open brackets must be closed in the correct order.\n- Every close bracket has a corresponding open bracket of the same type.",
    inputFormat: "A single line containing the parenthesis string.",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= s.length <= 10^4\ns consists of parentheses only.",
    examples: [
      { input: "()[]{}", output: "true" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isValid(string s) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isValid(String s) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isValid(s) {\n        // Write code here\n    }\n}",
      go: "func isValid(s string) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "()[]{}", expectedOutput: "true", isPublic: true },
      { input: "(]", expectedOutput: "false", isPublic: true },
      { input: "({[]})", expectedOutput: "true", isPublic: true }
    ]
  },
  {
    problemId: "longest-substring-without-repeating-characters",
    problemNumber: 13,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Strings",
    companies: ["Amazon", "Adobe", "Bloomberg", "Google"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "Given a string `s`, find the length of the longest substring without repeating characters.",
    inputFormat: "A single line containing the input string.",
    outputFormat: "A single integer.",
    constraints: "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
    examples: [
      { input: "abcabcbb", output: "3", explanation: "The answer is 'abc', with the length of 3." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Write code here",
      javascript: "class Solution {\n    lengthOfLongestSubstring(s) {\n        // Write code here\n    }\n}",
      go: "func lengthOfLongestSubstring(s string) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "abcabcbb", expectedOutput: "3", isPublic: true },
      { input: "bbbbb", expectedOutput: "1", isPublic: true },
      { input: "pwwkew", expectedOutput: "3", isPublic: true }
    ]
  },
  {
    problemId: "longest-repeating-character-replacement",
    problemNumber: 14,
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    topic: "Strings",
    companies: ["Uber", "Google", "Amazon"],
    xpReward: 35,
    estimatedTime: 35,
    statement: "You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.\n\nReturn the length of the longest substring containing the same letter you can get after performing the above operations.",
    inputFormat: "First line contains string `s`. Second line contains integer `k`.",
    outputFormat: "A single integer.",
    constraints: "1 <= s.length <= 10^5\ns consists of uppercase English letters only.\n0 <= k <= s.length",
    examples: [
      { input: "ABAB\n2", output: "4", explanation: "Replace the two 'A's with two 'B's or vice versa to get 'BBBB' or 'AAAA'." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int characterReplacement(string s, int k) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int characterReplacement(String s, int k) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    characterReplacement(s, k) {\n        // Write code here\n    }\n}",
      go: "func characterReplacement(s string, k int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "ABAB\n2", expectedOutput: "4", isPublic: true },
      { input: "AABABBA\n1", expectedOutput: "4", isPublic: true }
    ]
  },
  {
    problemId: "minimum-window-substring",
    problemNumber: 15,
    title: "Minimum Window Substring",
    difficulty: "Hard",
    topic: "Strings",
    companies: ["Google", "Facebook", "LinkedIn", "Uber"],
    xpReward: 50,
    estimatedTime: 50,
    statement: "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `\"\"`.",
    inputFormat: "First line: `s`. Second line: `t`.",
    outputFormat: "A single string containing the window, or empty string.",
    constraints: "1 <= s.length, t.length <= 10^5\ns and t consist of uppercase and lowercase English letters.",
    examples: [
      { input: "ADOBECODEBANC\nABC", output: "BANC", explanation: "The minimum window substring 'BANC' includes 'A', 'B', and 'C'." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    string minWindow(string s, string t) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public String minWindow(String s, String t) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        # Write code here",
      javascript: "class Solution {\n    minWindow(s, t) {\n        // Write code here\n    }\n}",
      go: "func minWindow(s string, t string) string {\n    // Write code here\n}"
    },
    testCases: [
      { input: "ADOBECODEBANC\nABC", expectedOutput: "BANC", isPublic: true },
      { input: "a\na", expectedOutput: "a", isPublic: true },
      { input: "a\naa", expectedOutput: "", isPublic: true }
    ]
  },
  {
    problemId: "group-anagrams",
    problemNumber: 16,
    title: "Group Anagrams",
    difficulty: "Medium",
    topic: "Strings",
    companies: ["Amazon", "Affirm", "Google", "Yelp"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
    inputFormat: "A single line containing words separated by spaces.",
    outputFormat: "Each grouped anagram on a separate line sorted alphabetically.",
    constraints: "1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100\nstrs[i] consists of lowercase English letters.",
    examples: [
      { input: "eat tea tan ate nat bat", output: "ate eat tea\nbat\nnat tan" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:\n        # Write code here",
      javascript: "class Solution {\n    groupAnagrams(strs) {\n        // Write code here\n    }\n}",
      go: "func groupAnagrams(strs []string) [][]string {\n    // Write code here\n}"
    },
    testCases: [
      { input: "eat tea tan ate nat bat", expectedOutput: "ate eat tea\nbat\nnat tan", isPublic: true },
      { input: "", expectedOutput: "", isPublic: true }
    ]
  },
  {
    problemId: "valid-palindrome",
    problemNumber: 17,
    title: "Valid Palindrome",
    difficulty: "Easy",
    topic: "Strings",
    companies: ["Facebook", "Microsoft", "Apple"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
    inputFormat: "A single line containing the string `s`.",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
    examples: [
      { input: "A man, a plan, a canal: Panama", output: "true" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isPalindrome(String s) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isPalindrome(s) {\n        // Write code here\n    }\n}",
      go: "func isPalindrome(s string) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "A man, a plan, a canal: Panama", expectedOutput: "true", isPublic: true },
      { input: "race a car", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "longest-palindromic-substring",
    problemNumber: 18,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topic: "Strings",
    companies: ["Amazon", "Microsoft", "Adobe", "Google"],
    xpReward: 30,
    estimatedTime: 35,
    statement: "Given a string `s`, return the longest palindromic substring in `s`.",
    inputFormat: "A single line containing `s`.",
    outputFormat: "The longest palindromic substring.",
    constraints: "1 <= s.length <= 1000\ns consists of English letters and digits.",
    examples: [
      { input: "babad", output: "bab", explanation: "Note: 'aba' is also a valid answer." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    string longestPalindrome(string s) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public String longestPalindrome(String s) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        # Write code here",
      javascript: "class Solution {\n    longestPalindrome(s) {\n        // Write code here\n    }\n}",
      go: "func longestPalindrome(s string) string {\n    // Write code here\n}"
    },
    testCases: [
      { input: "babad", expectedOutput: "bab", isPublic: true },
      { input: "cbbd", expectedOutput: "bb", isPublic: true }
    ]
  },

  // === LINKED LIST (8 Problems) ===
  {
    problemId: "reverse-linked-list",
    problemNumber: 19,
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    companies: ["Amazon", "Apple", "Microsoft", "Adobe"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    inputFormat: "A single line containing node values separated by spaces.",
    outputFormat: "Space separated values of the reversed linked list.",
    constraints: "The number of nodes in the list is in the range [0, 5000].\n-5000 <= Node.val <= 5000",
    examples: [
      { input: "1 2 3 4 5", output: "5 4 3 2 1" }
    ],
    starterCode: {
      cpp: "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Write code here\n    }\n};",
      java: "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write code here\n    }\n}",
      python: "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Write code here",
      javascript: "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\nclass Solution {\n    reverseList(head) {\n        // Write code here\n    }\n}",
      go: "/**\n * Definition for singly-linked list.\n * type ListNode struct {\n *     Val int\n *     Next *ListNode\n * }\n */\nfunc reverseList(head *ListNode) *ListNode {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 4 5", expectedOutput: "5 4 3 2 1", isPublic: true },
      { input: "1 2", expectedOutput: "2 1", isPublic: true },
      { input: "", expectedOutput: "", isPublic: true }
    ]
  },
  {
    problemId: "linked-list-cycle",
    problemNumber: 20,
    title: "Linked List Cycle",
    difficulty: "Easy",
    topic: "Linked List",
    companies: ["Microsoft", "Amazon", "Google", "Yahoo"],
    xpReward: 20,
    estimatedTime: 20,
    statement: "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nReturn `true` if there is a cycle in the linked list. Otherwise, return `false`.",
    inputFormat: "The first line contains nodes separated by spaces.\nThe second line contains the pos index (-1 if no cycle).",
    outputFormat: "`true` or `false`.",
    constraints: "The number of nodes in the list is in the range [0, 10^4].\n-10^5 <= Node.val <= 10^5\npos is -1 or a valid index in the linked-list.",
    examples: [
      { input: "3 2 0 -4\n1", output: "true", explanation: "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed)." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        // Write code here\n    }\n};",
      java: "public class Solution {\n    public boolean hasCycle(ListNode head) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    hasCycle(head) {\n        // Write code here\n    }\n}",
      go: "func hasCycle(head *ListNode) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 2 0 -4\n1", expectedOutput: "true", isPublic: true },
      { input: "1\n-1", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "merge-two-sorted-lists",
    problemNumber: 21,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    topic: "Linked List",
    companies: ["Amazon", "Microsoft", "Apple", "Tencent"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
    inputFormat: "First line: space-separated elements of list1. Second line: space-separated elements of list2.",
    outputFormat: "Space-separated elements of the merged list.",
    constraints: "The number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100\nBoth list1 and list2 are sorted in non-decreasing order.",
    examples: [
      { input: "1 2 4\n1 3 4", output: "1 1 2 3 4 4" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        # Write code here",
      javascript: "class Solution {\n    mergeTwoLists(list1, list2) {\n        // Write code here\n    }\n}",
      go: "func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 4\n1 3 4", expectedOutput: "1 1 2 3 4 4", isPublic: true },
      { input: "\n", expectedOutput: "", isPublic: true }
    ]
  },
  {
    problemId: "remove-nth-node-from-end-of-list",
    problemNumber: 22,
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    topic: "Linked List",
    companies: ["Google", "Facebook", "Amazon", "Microsoft"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Given the `head` of a linked list, remove the `n-th` node from the end of the list and return its head.",
    inputFormat: "First line: space-separated node elements.\nSecond line: value of `n`.",
    outputFormat: "Space-separated elements of list post removal.",
    constraints: "The number of nodes in the list is sz.\n1 <= sz <= 30\n0 <= Node.val <= 100\n1 <= n <= sz",
    examples: [
      { input: "1 2 3 4 5\n2", output: "1 2 3 5" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        # Write code here",
      javascript: "class Solution {\n    removeNthFromEnd(head, n) {\n        // Write code here\n    }\n}",
      go: "func removeNthFromEnd(head *ListNode, n int) *ListNode {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 4 5\n2", expectedOutput: "1 2 3 5", isPublic: true },
      { input: "1\n1", expectedOutput: "", isPublic: true }
    ]
  },
  {
    problemId: "reorder-list",
    problemNumber: 23,
    title: "Reorder List",
    difficulty: "Medium",
    topic: "Linked List",
    companies: ["Amazon", "Microsoft", "Qualcomm", "Google"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "You are given the head of a singly linked list. The list can be represented as:\n`L0 -> L1 -> ... -> Ln - 1 -> Ln`\n\nReorder the list to be on the following form:\n`L0 -> Ln -> L1 -> Ln - 1 -> L2 -> Ln - 2 -> ...`\n\nYou may not modify the values in the list's nodes. Only nodes themselves may be changed.",
    inputFormat: "A single line containing space-separated integers.",
    outputFormat: "Space-separated list integers representing reordered output.",
    constraints: "The number of nodes in the list is in the range [1, 5 * 10^4].\n1 <= Node.val <= 1000",
    examples: [
      { input: "1 2 3 4", output: "1 4 2 3" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    void reorderList(ListNode* head) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public void reorderList(ListNode head) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def reorderList(self, head: Optional[ListNode]) -> None:\n        # Write code here",
      javascript: "class Solution {\n    reorderList(head) {\n        // Write code here\n    }\n}",
      go: "func reorderList(head *ListNode)  {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 4", expectedOutput: "1 4 2 3", isPublic: true },
      { input: "1 2 3 4 5", expectedOutput: "1 5 2 4 3", isPublic: true }
    ]
  },
  {
    problemId: "merge-k-sorted-lists",
    problemNumber: 24,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    topic: "Linked List",
    companies: ["Google", "Facebook", "Amazon", "Microsoft", "Apple"],
    xpReward: 50,
    estimatedTime: 50,
    statement: "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.",
    inputFormat: "The first line contains integer `k`.\nEach of the next `k` lines contains space-separated elements of a sorted linked list.",
    outputFormat: "Space-separated elements of the final sorted merged linked list.",
    constraints: "k == lists.length\n0 <= k <= 10^4\n0 <= lists[i].length <= 500\n-10^4 <= lists[i][j] <= 10^4",
    examples: [
      { input: "3\n1 4 5\n1 3 4\n2 6", output: "1 1 2 3 4 4 5 6" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n        # Write code here",
      javascript: "class Solution {\n    mergeKLists(lists) {\n        // Write code here\n    }\n}",
      go: "func mergeKLists(lists []*ListNode) *ListNode {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3\n1 4 5\n1 3 4\n2 6", expectedOutput: "1 1 2 3 4 4 5 6", isPublic: true },
      { input: "0\n", expectedOutput: "", isPublic: true }
    ]
  },
  {
    problemId: "intersection-of-two-linked-lists",
    problemNumber: 25,
    title: "Intersection of Two Linked Lists",
    difficulty: "Easy",
    topic: "Linked List",
    companies: ["Amazon", "Microsoft", "Goldman Sachs", "Visa"],
    xpReward: 20,
    estimatedTime: 20,
    statement: "Given the heads of two singly linked-lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return `null`.",
    inputFormat: "First line: intersectionVal, listA, listB, skipA, skipB (standard LeetCode setup format).",
    outputFormat: "A single integer node value (or Null/No Intersection text).",
    constraints: "The number of nodes in listA is m, listB is n.\n1 <= m, n <= 3 * 10^4\n-10^6 <= Node.val <= 10^6",
    examples: [
      { input: "8\n4 1 8 4 5\n5 6 1 8 4 5\n2\n3", output: "Intersected at '8'" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {\n        // Write code here\n    }\n};",
      java: "public class Solution {\n    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:\n        # Write code here",
      javascript: "class Solution {\n    getIntersectionNode(headA, headB) {\n        // Write code here\n    }\n}",
      go: "func getIntersectionNode(headA *ListNode, headB *ListNode) *ListNode {\n    // Write code here\n}"
    },
    testCases: [
      { input: "8\n4 1 8 4 5\n5 6 1 8 4 5\n2\n3", expectedOutput: "Intersected at '8'", isPublic: true }
    ]
  },
  {
    problemId: "remove-linked-list-elements",
    problemNumber: 26,
    title: "Remove Linked List Elements",
    difficulty: "Easy",
    topic: "Linked List",
    companies: ["Facebook", "Amazon", "Microsoft"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given the `head` of a linked list and an integer `val`, remove all the nodes of the linked list that has `Node.val == val`, and return the new head.",
    inputFormat: "First line: space-separated elements of the list.\nSecond line: value to remove.",
    outputFormat: "Space-separated values of the modified linked list.",
    constraints: "The number of nodes in the list is in the range [0, 10^4].\n1 <= Node.val <= 50\n0 <= val <= 50",
    examples: [
      { input: "1 2 6 3 4 5 6\n6", output: "1 2 3 4 5" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    ListNode* removeElements(ListNode* head, int val) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public ListNode removeElements(ListNode head, int val) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def removeElements(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:\n        # Write code here",
      javascript: "class Solution {\n    removeElements(head, val) {\n        // Write code here\n    }\n}",
      go: "func removeElements(head *ListNode, val int) *ListNode {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 6 3 4 5 6\n6", expectedOutput: "1 2 3 4 5", isPublic: true },
      { input: "\n1", expectedOutput: "", isPublic: true }
    ]
  },

  // === TREES (8 Problems) ===
  {
    problemId: "maximum-depth-of-binary-tree",
    problemNumber: 27,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Google", "Amazon", "Microsoft", "Spotify"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given the `root` of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    inputFormat: "A single line containing the binary tree in level order format (space-separated, `null` representing empty nodes).",
    outputFormat: "A single integer representing the maximum depth.",
    constraints: "The number of nodes in the tree is in the range [0, 10^4].\n-100 <= Node.val <= 100",
    examples: [
      { input: "3 9 20 null null 15 7", output: "3" }
    ],
    starterCode: {
      cpp: "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int maxDepth(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    maxDepth(root) {\n        // Write code here\n    }\n}",
      go: "func maxDepth(root *TreeNode) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 9 20 null null 15 7", expectedOutput: "3", isPublic: true },
      { input: "1 null 2", expectedOutput: "2", isPublic: true }
    ]
  },
  {
    problemId: "same-tree",
    problemNumber: 28,
    title: "Same Tree",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Microsoft", "Google"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.\n\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
    inputFormat: "First line: Level-order traversal values for tree p. Second line: Level-order traversal values for tree q.",
    outputFormat: "`true` or `false`.",
    constraints: "The number of nodes in both trees is in the range [0, 100].\n-10^4 <= Node.val <= 10^4",
    examples: [
      { input: "1 2 3\n1 2 3", output: "true" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isSameTree(TreeNode* p, TreeNode* q) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isSameTree(p, q) {\n        // Write code here\n    }\n}",
      go: "func isSameTree(p *TreeNode, q *TreeNode) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3\n1 2 3", expectedOutput: "true", isPublic: true },
      { input: "1 2\n1 null 2", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "invert-binary-tree",
    problemNumber: 29,
    title: "Invert Binary Tree",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Google", "Apple", "Twitter", "Amazon"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given the `root` of a binary tree, invert the tree, and return its root.",
    inputFormat: "Level order values separated by spaces.",
    outputFormat: "Level order values of the inverted tree.",
    constraints: "The number of nodes in the tree is in the range [0, 100].\n-100 <= Node.val <= 100",
    examples: [
      { input: "4 2 7 1 3 6 9", output: "4 7 2 9 6 3 1" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        # Write code here",
      javascript: "class Solution {\n    invertTree(root) {\n        // Write code here\n    }\n}",
      go: "func invertTree(root *TreeNode) *TreeNode {\n    // Write code here\n}"
    },
    testCases: [
      { input: "4 2 7 1 3 6 9", expectedOutput: "4 7 2 9 6 3 1", isPublic: true },
      { input: "2 1 3", expectedOutput: "2 3 1", isPublic: true }
    ]
  },
  {
    problemId: "binary-tree-level-order-traversal",
    problemNumber: 30,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Amazon", "Microsoft", "LinkedIn", "Facebook"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    inputFormat: "Level order nodes separated by spaces.",
    outputFormat: "Each level's numbers on a new line (space-separated).",
    constraints: "The number of nodes in the tree is in the range [0, 2000].\n-1000 <= Node.val <= 1000",
    examples: [
      { input: "3 9 20 null null 15 7", output: "3\n9 20\n15 7" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        # Write code here",
      javascript: "class Solution {\n    levelOrder(root) {\n        // Write code here\n    }\n}",
      go: "func levelOrder(root *TreeNode) [][]int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 9 20 null null 15 7", expectedOutput: "3\n9 20\n15 7", isPublic: true },
      { input: "1", expectedOutput: "1", isPublic: true }
    ]
  },
  {
    problemId: "subtree-of-another-tree",
    problemNumber: 31,
    title: "Subtree of Another Tree",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Microsoft", "Facebook"],
    xpReward: 20,
    estimatedTime: 25,
    statement: "Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot`, and `false` otherwise.",
    inputFormat: "First line: Level order values of `root`. Second line: Level order values of `subRoot`.",
    outputFormat: "`true` or `false`.",
    constraints: "The number of nodes in the root tree is in the range [1, 2000].\nThe number of nodes in the subRoot tree is in the range [1, 1000].\n-10^4 <= root.val, subRoot.val <= 10^4",
    examples: [
      { input: "3 4 5 1 2\n4 1 2", output: "true" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isSubtree(TreeNode* root, TreeNode* subRoot) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isSubtree(root, subRoot) {\n        // Write code here\n    }\n}",
      go: "func isSubtree(root *TreeNode, subRoot *TreeNode) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 4 5 1 2\n4 1 2", expectedOutput: "true", isPublic: true }
    ]
  },
  {
    problemId: "lowest-common-ancestor-of-a-binary-search-tree",
    problemNumber: 32,
    title: "Lowest Common Ancestor of a BST",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Facebook", "Microsoft", "Twitter"],
    xpReward: 20,
    estimatedTime: 25,
    statement: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\nLCA is defined as: The lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).",
    inputFormat: "First line: BST level order integers.\nSecond line: value of node p and node q.",
    outputFormat: "Value of LCA node.",
    constraints: "The number of nodes in the tree is in the range [2, 10^5].\n-10^9 <= Node.val <= 10^9\nAll Node.val are unique.\np and q will exist in the BST and p != q.",
    examples: [
      { input: "6 2 8 0 4 7 9 null null 3 5\n2 8", output: "6" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n        # Write code here",
      javascript: "class Solution {\n    lowestCommonAncestor(root, p, q) {\n        // Write code here\n    }\n}",
      go: "func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {\n    // Write code here\n}"
    },
    testCases: [
      { input: "6 2 8 0 4 7 9 null null 3 5\n2 8", expectedOutput: "6", isPublic: true },
      { input: "6 2 8 0 4 7 9 null null 3 5\n2 4", expectedOutput: "2", isPublic: true }
    ]
  },
  {
    problemId: "validate-binary-search-tree",
    problemNumber: 33,
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Google", "Amazon", "Microsoft", "Bloomberg"],
    xpReward: 30,
    estimatedTime: 35,
    statement: "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.",
    inputFormat: "Level order node values separated by spaces.",
    outputFormat: "`true` or `false`.",
    constraints: "The number of nodes in the tree is in the range [1, 10^4].\n-2^31 <= Node.val <= 2^31 - 1",
    examples: [
      { input: "2 1 3", output: "true" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isValidBST(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isValidBST(self, root: Optional[TreeNode]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isValidBST(root) {\n        // Write code here\n    }\n}",
      go: "func isValidBST(root *TreeNode) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "2 1 3", expectedOutput: "true", isPublic: true },
      { input: "5 1 4 null null 3 6", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "construct-binary-tree-from-preorder-and-inorder-traversal",
    problemNumber: 34,
    title: "Construct Binary Tree from Preorder & Inorder",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Google", "Amazon", "Facebook", "ByteDance"],
    xpReward: 40,
    estimatedTime: 40,
    statement: "Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.",
    inputFormat: "First line: preorder traversal array.\nSecond line: inorder traversal array.",
    outputFormat: "Level order values of the constructed tree.",
    constraints: "1 <= preorder.length <= 3000\ninorder.length == preorder.length\n-3000 <= preorder[i], inorder[i] <= 3000\npreorder and inorder consist of unique values.",
    examples: [
      { input: "3 9 20 15 7\n9 3 15 20 7", output: "3 9 20 null null 15 7" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public TreeNode buildTree(int[] preorder, int[] inorder) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:\n        # Write code here",
      javascript: "class Solution {\n    buildTree(preorder, inorder) {\n        // Write code here\n    }\n}",
      go: "func buildTree(preorder []int, inorder []int) *TreeNode {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 9 20 15 7\n9 3 15 20 7", expectedOutput: "3 9 20 null null 15 7", isPublic: true },
      { input: "-1\n-1", expectedOutput: "-1", isPublic: true }
    ]
  },

  // === GRAPHS (8 Problems) ===
  {
    problemId: "clone-graph",
    problemNumber: 35,
    title: "Clone Graph",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Facebook", "Amazon", "Uber"],
    xpReward: 35,
    estimatedTime: 35,
    statement: "Given a reference of a node in a connected undirected graph.\n\nReturn a deep copy (clone) of the graph. Each node in the graph contains a value (`int`) and a list of its neighbors (`List[Node]`).",
    inputFormat: "Adjacency list format, e.g. [[2,4],[1,3],[2,4],[1,3]]",
    outputFormat: "Adjacency list representation of cloned graph.",
    constraints: "The number of nodes in the graph is between 0 and 100.\n1 <= Node.val <= 100\nNode.val is unique for each node.",
    examples: [
      { input: "[[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" }
    ],
    starterCode: {
      cpp: "/*\n// Definition for a Node.\nclass Node {\npublic:\n    int val;\n    vector<Node*> neighbors;\n};\n*/\nclass Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public Node cloneGraph(Node node) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:\n        # Write code here",
      javascript: "class Solution {\n    cloneGraph(node) {\n        // Write code here\n    }\n}",
      go: "func cloneGraph(node *Node) *Node {\n    // Write code here\n}"
    },
    testCases: [
      { input: "[[2,4],[1,3],[2,4],[1,3]]", expectedOutput: "[[2,4],[1,3],[2,4],[1,3]]", isPublic: true }
    ]
  },
  {
    problemId: "course-schedule",
    problemNumber: 36,
    title: "Course Schedule",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Amazon", "Microsoft", "Robinhood"],
    xpReward: 40,
    estimatedTime: 40,
    statement: "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.",
    inputFormat: "First line: numCourses.\nSecond line: prerequisites pair list (space separated).",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000\nprerequisites[i].length == 2",
    examples: [
      { input: "2\n1 0", output: "true", explanation: "To take course 1 you should have finished course 0. So it is possible." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    canFinish(numCourses, prerequisites) {\n        // Write code here\n    }\n}",
      go: "func canFinish(numCourses int, prerequisites [][]int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "2\n1 0", expectedOutput: "true", isPublic: true },
      { input: "2\n1 0 0 1", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "number-of-islands",
    problemNumber: 37,
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Amazon", "Google", "Facebook", "Microsoft"],
    xpReward: 30,
    estimatedTime: 35,
    statement: "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    inputFormat: "First line: m and n.\nSubsequent m lines: n space separated integers (0 or 1).",
    outputFormat: "A single integer.",
    constraints: "m == grid.length\nn == grid[i].length\n1 <= m, n <= 300\ngrid[i][j] is '0' or '1'.",
    examples: [
      { input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", output: "1" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int numIslands(char[][] grid) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    numIslands(grid) {\n        // Write code here\n    }\n}",
      go: "func numIslands(grid [][]byte) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", expectedOutput: "1", isPublic: true },
      { input: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", expectedOutput: "3", isPublic: true }
    ]
  },
  {
    problemId: "pacific-atlantic-water-flow",
    problemNumber: 38,
    title: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Facebook", "Amazon"],
    xpReward: 35,
    estimatedTime: 40,
    statement: "There is an `m x n` rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The rain water can flow to neighboring cells in 4 directions if the neighboring cell's height is less than or equal to the current cell's height.\n\nReturn a list of grid coordinates `[r, c]` where rain water can flow to both oceans.",
    inputFormat: "First line: m and n.\nSubsequent m lines: n space separated heights.",
    outputFormat: "Coordinates formatted as space separated integers on separate lines.",
    constraints: "m == heights.length\nn == heights[r].length\n1 <= m, n <= 200\n0 <= heights[r][c] <= 10^5",
    examples: [
      { input: "1 2\n2 2", output: "0 0\n0 1" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<List<Integer>> pacificAtlantic(int[][] heights) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:\n        # Write code here",
      javascript: "class Solution {\n    pacificAtlantic(heights) {\n        // Write code here\n    }\n}",
      go: "func pacificAtlantic(heights [][]int) [][]int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2\n2 2", expectedOutput: "0 0\n0 1", isPublic: true }
    ]
  },
  {
    problemId: "number-of-connected-components-in-an-undirected-graph",
    problemNumber: 39,
    title: "Number of Connected Components",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Amazon", "Twitter"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "You have a graph of `n` nodes. You are given an integer `n` and an array `edges` where `edges[i] = [ai, bi]` indicates that there is an edge between `ai` and `bi` in the graph.\n\nReturn the number of connected components in the graph.",
    inputFormat: "First line: n.\nSecond line: number of edges.\nSubsequent lines: space separated vertex endpoints.",
    outputFormat: "A single integer component count.",
    constraints: "1 <= n <= 2000\n0 <= edges.length <= 5000",
    examples: [
      { input: "5\n4\n0 1\n1 2\n3 4", output: "2" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int countComponents(int n, vector<vector<int>>& edges) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int countComponents(int n, int[][] edges) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def countComponents(self, n: int, edges: List[List[int]]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    countComponents(n, edges) {\n        // Write code here\n    }\n}",
      go: "func countComponents(n int, edges [][]int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "5\n4\n0 1\n1 2\n3 4", expectedOutput: "2", isPublic: true }
    ]
  },
  {
    problemId: "graph-valid-tree",
    problemNumber: 40,
    title: "Graph Valid Tree",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Facebook", "Amazon"],
    xpReward: 30,
    estimatedTime: 35,
    statement: "Given `n` nodes labeled from `0` to `n-1` and a list of undirected edges, write a function to check whether these edges make up a valid tree.",
    inputFormat: "First line: n.\nSecond line: edge count.\nSubsequent lines: edge node endpoints.",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= n <= 2000\n0 <= edges.length <= 5000",
    examples: [
      { input: "5\n4\n0 1\n0 2\n0 3\n1 4", output: "true" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool validTree(int n, vector<vector<int>>& edges) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean validTree(int n, int[][] edges) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def validTree(self, n: int, edges: List[List[int]]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    validTree(n, edges) {\n        // Write code here\n    }\n}",
      go: "func validTree(n int, edges [][]int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "5\n4\n0 1\n0 2\n0 3\n1 4", expectedOutput: "true", isPublic: true },
      { input: "5\n4\n0 1\n1 2\n2 3\n1 3", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "longest-consecutive-sequence",
    problemNumber: 41,
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Google", "Spotify", "Amazon", "Microsoft"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in `O(N)` time.",
    inputFormat: "A single line containing integers separated by spaces.",
    outputFormat: "A single integer representing the longest sequence length.",
    constraints: "0 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
    examples: [
      { input: "100 4 200 1 3 2", output: "4", explanation: "The consecutive elements sequence is [1, 2, 3, 4]. Its length is 4." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int longestConsecutive(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def longestConsecutive(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    longestConsecutive(nums) {\n        // Write code here\n    }\n}",
      go: "func longestConsecutive(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "100 4 200 1 3 2", expectedOutput: "4", isPublic: true },
      { input: "0 3 7 2 5 8 4 6 0 1", expectedOutput: "9", isPublic: true }
    ]
  },
  {
    problemId: "shortest-path-in-binary-matrix",
    problemNumber: 42,
    title: "Shortest Path in Binary Matrix",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Facebook", "Google", "Amazon"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "Given an `n x n` binary matrix `grid`, return the length of the shortest clear path in the matrix. If there is no clear path, return `-1`.\n\nA clear path is a path from the top-left cell to the bottom-right cell such that all visited cells are 0 and all adjacent cells (including diagonally) are visited.",
    inputFormat: "First line: n.\nSubsequent n lines: n space separated integers (0 or 1).",
    outputFormat: "A single path integer.",
    constraints: "n == grid.length\n1 <= n <= 100",
    examples: [
      { input: "2\n0 1\n1 0", output: "2" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int shortestPathBinaryMatrix(int[][] grid) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    shortestPathBinaryMatrix(grid) {\n        // Write code here\n    }\n}",
      go: "func shortestPathBinaryMatrix(grid [][]int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "2\n0 1\n1 0", expectedOutput: "2", isPublic: true },
      { input: "3\n0 0 0\n1 1 0\n1 1 0", expectedOutput: "4", isPublic: true }
    ]
  },

  // === DYNAMIC PROGRAMMING (8 Problems) ===
  {
    problemId: "climbing-stairs",
    problemNumber: 43,
    title: "Climbing Stairs",
    difficulty: "Easy",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Apple", "Microsoft", "Goldman Sachs"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
    inputFormat: "A single integer representing the number of stairs `n`.",
    outputFormat: "A single integer representing distinct ways.",
    constraints: "1 <= n <= 45",
    examples: [
      { input: "2", output: "2", explanation: "There are two ways: 1 step + 1 step, or 2 steps." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int climbStairs(int n) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int climbStairs(int n) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def climbStairs(self, n: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    climbStairs(n) {\n        // Write code here\n    }\n}",
      go: "func climbStairs(n int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "2", expectedOutput: "2", isPublic: true },
      { input: "3", expectedOutput: "3", isPublic: true },
      { input: "5", expectedOutput: "8", isPublic: true }
    ]
  },
  {
    problemId: "coin-change",
    problemNumber: 44,
    title: "Coin Change",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Microsoft", "Google", "Facebook"],
    xpReward: 30,
    estimatedTime: 35,
    statement: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.",
    inputFormat: "First line: coin denominations separated by spaces.\nSecond line: integer target amount.",
    outputFormat: "Fewest number of coins needed.",
    constraints: "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
    examples: [
      { input: "1 2 5\n11", output: "3", explanation: "11 = 5 + 5 + 1 (3 coins)." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    coinChange(coins, amount) {\n        // Write code here\n    }\n}",
      go: "func coinChange(coins []int, amount int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 5\n11", expectedOutput: "3", isPublic: true },
      { input: "2\n3", expectedOutput: "-1", isPublic: true }
    ]
  },
  {
    problemId: "longest-increasing-subsequence",
    problemNumber: 45,
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Microsoft", "Amazon", "Facebook"],
    xpReward: 35,
    estimatedTime: 35,
    statement: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
    inputFormat: "A single line containing integers separated by spaces.",
    outputFormat: "Length of the longest increasing subsequence.",
    constraints: "1 <= nums.length <= 2500\n-10^4 <= nums[i] <= 10^4",
    examples: [
      { input: "10 9 2 5 3 7 101 18", output: "4", explanation: "The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int lengthOfLIS(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    lengthOfLIS(nums) {\n        // Write code here\n    }\n}",
      go: "func lengthOfLIS(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "10 9 2 5 3 7 101 18", expectedOutput: "4", isPublic: true },
      { input: "0 1 0 3 2 3", expectedOutput: "4", isPublic: true }
    ]
  },
  {
    problemId: "longest-common-subsequence",
    problemNumber: 46,
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 30,
    estimatedTime: 35,
    statement: "Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
    inputFormat: "First line: text1. Second line: text2.",
    outputFormat: "A single integer length.",
    constraints: "1 <= text1.length, text2.length <= 1000\nStrings consist of lowercase English characters only.",
    examples: [
      { input: "abcde\nace", output: "3", explanation: "The common subsequence is 'ace'." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        # Write code here",
      javascript: "class Solution {\n    longestCommonSubsequence(text1, text2) {\n        // Write code here\n    }\n}",
      go: "func longestCommonSubsequence(text1 string, text2 string) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "abcde\nace", expectedOutput: "3", isPublic: true },
      { input: "abc\nabc", expectedOutput: "3", isPublic: true },
      { input: "abc\ndef", expectedOutput: "0", isPublic: true }
    ]
  },
  {
    problemId: "word-break",
    problemNumber: 47,
    title: "Word Break",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Facebook", "Google", "Amazon", "Microsoft"],
    xpReward: 35,
    estimatedTime: 35,
    statement: "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.",
    inputFormat: "First line: s.\nSecond line: dictionary words separated by spaces.",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= s.length <= 300\n1 <= wordDict.length <= 1000\n1 <= wordDict[i].length <= 20\ns and wordDict[i] consist of lowercase English letters.",
    examples: [
      { input: "leetcode\nleet code", output: "true" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    wordBreak(s, wordDict) {\n        // Write code here\n    }\n}",
      go: "func wordBreak(s string, wordDict []string) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "leetcode\nleet code", expectedOutput: "true", isPublic: true },
      { input: "applepenapple\napple pen", expectedOutput: "true", isPublic: true },
      { input: "catsandog\ncats dog sand and cat", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "house-robber",
    problemNumber: 48,
    title: "House Robber",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["LinkedIn", "Microsoft", "Airbnb", "Amazon"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    inputFormat: "A single line containing house values separated by spaces.",
    outputFormat: "Maximum rob money.",
    constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 400",
    examples: [
      { input: "1 2 3 1", output: "4", explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 1 + 3 = 4." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int rob(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def rob(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    rob(nums) {\n        // Write code here\n    }\n}",
      go: "func rob(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 1", expectedOutput: "4", isPublic: true },
      { input: "2 7 9 3 1", expectedOutput: "12", isPublic: true }
    ]
  },
  {
    problemId: "house-robber-ii",
    problemNumber: 49,
    title: "House Robber II",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Microsoft", "Facebook"],
    xpReward: 35,
    estimatedTime: 35,
    statement: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    inputFormat: "A single line containing house values separated by spaces.",
    outputFormat: "Maximum rob money.",
    constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 1000",
    examples: [
      { input: "2 3 2", output: "3", explanation: "You cannot rob house 1 (money = 2) and rob house 3 (money = 2), because they are adjacent houses." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int rob(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def rob(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    rob(nums) {\n        // Write code here\n    }\n}",
      go: "func rob(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "2 3 2", expectedOutput: "3", isPublic: true },
      { input: "1 2 3 1", expectedOutput: "4", isPublic: true }
    ]
  },
  {
    problemId: "unique-paths",
    problemNumber: 50,
    title: "Unique Paths",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "There is a robot on an `m x n` grid. The robot is initially located at the top-left corner (i.e., `grid[0][0]`). The robot tries to move to the bottom-right corner (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.\n\nGiven the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.",
    inputFormat: "A single line containing two space separated integers `m` and `n`.",
    outputFormat: "A single path integer count.",
    constraints: "1 <= m, n <= 100",
    examples: [
      { input: "3 7", output: "28" }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int uniquePaths(int m, int n) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    uniquePaths(m, n) {\n        // Write code here\n    }\n}",
      go: "func uniquePaths(m int, n int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 7", expectedOutput: "28", isPublic: true },
      { input: "3 2", expectedOutput: "3", isPublic: true }
    ]
  }
];

const seedDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);

    // Clear existing
    await Problem.deleteMany({});
    console.log("Cleared existing Problem catalog.");

    // Insert 50
    const createdProblems = await Problem.insertMany(problems);
    console.log(`Successfully seeded ${createdProblems.length} DSA Problems!`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedDB();
