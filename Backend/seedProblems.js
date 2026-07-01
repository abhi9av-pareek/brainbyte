import mongoose from "mongoose";
import dotenv from "dotenv";
import Problem from "./src/Models/problem.js";

dotenv.config();

const problems = [

  // =====================================================================
  // === MATHEMATICS / BASICS (10 Problems) ===
  // =====================================================================
  {
    problemId: "add-two-integers",
    problemNumber: 1,
    title: "Add Two Integers",
    difficulty: "Easy",
    topic: "Mathematics",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 10,
    estimatedTime: 5,
    statement: "Given two integers `num1` and `num2`, return the sum of the two integers.",
    inputFormat: "A single line containing two space-separated integers `num1` and `num2`.",
    outputFormat: "A single integer representing the sum.",
    constraints: "-100 <= num1, num2 <= 100",
    examples: [
      { input: "12 5", output: "17", explanation: "12 + 5 = 17." },
      { input: "-10 4", output: "-6", explanation: "-10 + 4 = -6." },
      { input: "0 0", output: "0", explanation: "0 + 0 = 0." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int sum(int num1, int num2) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int sum(int num1, int num2) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def sum(self, num1: int, num2: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    sum(num1, num2) {\n        // Write code here\n    }\n}",
      go: "func sum(num1 int, num2 int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "12 5", expectedOutput: "17", isPublic: true },
      { input: "-10 4", expectedOutput: "-6", isPublic: true },
      { input: "0 0", expectedOutput: "0", isPublic: false }
    ]
  },
  {
    problemId: "watermelon",
    problemNumber: 2,
    title: "Watermelon",
    difficulty: "Easy",
    topic: "Mathematics",
    companies: ["Codeforces"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Pete and his friend Billy decided to buy a watermelon. They agreed to split it equally. The watermelon weighs `w` kilos.\n\nThey want to divide the watermelon into two parts such that each weighs an **even** number of kilos. Both parts must be **non-zero**.\n\nDetermine if they can do this.",
    inputFormat: "A single integer `w` — the weight of the watermelon.",
    outputFormat: "Print `YES` if the division is possible, and `NO` otherwise.",
    constraints: "1 <= w <= 100",
    examples: [
      { input: "8", output: "YES", explanation: "2+6=8 or 4+4=8 are both valid even splits." },
      { input: "3", output: "NO", explanation: "No way to split 3 into two positive even numbers." },
      { input: "2", output: "NO", explanation: "2 can only be split as 1+1 (odd) or 0+2 (zero part not allowed)." }
    ],
    starterCode: {
      cpp: "#include <iostream>\nusing namespace std;\nint main() {\n    int w;\n    cin >> w;\n    // Write code here\n    return 0;\n}",
      java: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int w = sc.nextInt();\n        // Write code here\n    }\n}",
      python: "w = int(input())\n# Write code here",
      javascript: "const w = parseInt(require(\'fs\').readFileSync(\'/dev/stdin\',\'utf8\').trim());\n// Write code here",
      go: "package main\nimport \"fmt\"\nfunc main() {\n    var w int\n    fmt.Scan(&w)\n    // Write code here\n}"
    },
    testCases: [
      { input: "8", expectedOutput: "YES", isPublic: true },
      { input: "3", expectedOutput: "NO", isPublic: true },
      { input: "2", expectedOutput: "NO", isPublic: false },
      { input: "10", expectedOutput: "YES", isPublic: false }
    ]
  },
  {
    problemId: "plus-or-minus",
    problemNumber: 3,
    title: "Plus or Minus",
    difficulty: "Easy",
    topic: "Mathematics",
    companies: ["Codeforces"],
    xpReward: 10,
    estimatedTime: 5,
    statement: "Given two integers `a` and `b`, determine whether `a + b` is positive, negative, or zero.\n\nPrint `+` if the sum is positive, `-` if negative, and `0` if zero.",
    inputFormat: "A single line containing two space-separated integers `a` and `b`.",
    outputFormat: "Print `+`, `-`, or `0` based on the sum.",
    constraints: "-1000 <= a, b <= 1000",
    examples: [
      { input: "3 4", output: "+", explanation: "3 + 4 = 7, which is positive." },
      { input: "-5 3", output: "-", explanation: "-5 + 3 = -2, which is negative." },
      { input: "-3 3", output: "0", explanation: "-3 + 3 = 0." }
    ],
    starterCode: {
      cpp: "#include <iostream>\nusing namespace std;\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Write code here\n    return 0;\n}",
      java: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt(), b = sc.nextInt();\n        // Write code here\n    }\n}",
      python: "a, b = map(int, input().split())\n# Write code here",
      javascript: "const [a, b] = require(\'fs\').readFileSync(\'/dev/stdin\',\'utf8\').trim().split(\' \').map(Number);\n// Write code here",
      go: "package main\nimport \"fmt\"\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 4", expectedOutput: "+", isPublic: true },
      { input: "-5 3", expectedOutput: "-", isPublic: true },
      { input: "-3 3", expectedOutput: "0", isPublic: false },
      { input: "0 0", expectedOutput: "0", isPublic: false }
    ]
  },
  {
    problemId: "subtract-product-and-sum",
    problemNumber: 4,
    title: "Subtract the Product and Sum of Digits of an Integer",
    difficulty: "Easy",
    topic: "Mathematics",
    companies: ["Amazon", "Microsoft"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given an integer number `n`, return the difference between the product of its digits and the sum of its digits.",
    inputFormat: "A single integer `n`.",
    outputFormat: "A single integer representing product minus sum.",
    constraints: "1 <= n <= 10^5",
    examples: [
      { input: "234", output: "15", explanation: "Product = 2*3*4 = 24. Sum = 2+3+4 = 9. Result = 24-9 = 15." },
      { input: "4421", output: "21", explanation: "Product = 4*4*2*1 = 32. Sum = 4+4+2+1 = 11. Result = 32-11 = 21." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int subtractProductAndSum(int n) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int subtractProductAndSum(int n) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def subtractProductAndSum(self, n: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    subtractProductAndSum(n) {\n        // Write code here\n    }\n}",
      go: "func subtractProductAndSum(n int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "234", expectedOutput: "15", isPublic: true },
      { input: "4421", expectedOutput: "21", isPublic: true },
      { input: "1", expectedOutput: "0", isPublic: false }
    ]
  },
  {
    problemId: "count-digits-divide-number",
    problemNumber: 5,
    title: "Count the Digits That Divide a Number",
    difficulty: "Easy",
    topic: "Mathematics",
    companies: ["Amazon", "Google"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given an integer `num`, return the number of digits in `num` that divide `num` evenly (i.e., `num % digit == 0`). Each occurrence of a digit is counted separately.",
    inputFormat: "A single integer `num`.",
    outputFormat: "A single integer count of valid digits.",
    constraints: "1 <= num <= 10^9",
    examples: [
      { input: "7", output: "1", explanation: "7 divides 7 evenly." },
      { input: "121", output: "2", explanation: "1 divides 121, 2 does not, second 1 divides 121. Count = 2." },
      { input: "1248", output: "4", explanation: "1, 2, 4, 8 all divide 1248." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int countDigits(int num) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int countDigits(int num) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def countDigits(self, num: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    countDigits(num) {\n        // Write code here\n    }\n}",
      go: "func countDigits(num int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "7", expectedOutput: "1", isPublic: true },
      { input: "121", expectedOutput: "2", isPublic: true },
      { input: "1248", expectedOutput: "4", isPublic: false }
    ]
  },
  {
    problemId: "palindrome-number",
    problemNumber: 6,
    title: "Palindrome Number",
    difficulty: "Easy",
    topic: "Mathematics",
    companies: ["Amazon", "Google", "Microsoft", "Adobe"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.\n\nAn integer is a palindrome when it reads the same forward and backward.",
    inputFormat: "A single integer `x`.",
    outputFormat: "`true` or `false`.",
    constraints: "-2^31 <= x <= 2^31 - 1",
    examples: [
      { input: "121", output: "true", explanation: "121 reads as 121 from both directions." },
      { input: "-121", output: "false", explanation: "Reads as -121 from left and 121- from right — not a palindrome." },
      { input: "10", output: "false", explanation: "Reads as 01 from right — not a palindrome." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isPalindrome(int x) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isPalindrome(int x) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isPalindrome(x) {\n        // Write code here\n    }\n}",
      go: "func isPalindrome(x int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "121", expectedOutput: "true", isPublic: true },
      { input: "-121", expectedOutput: "false", isPublic: true },
      { input: "10", expectedOutput: "false", isPublic: false },
      { input: "0", expectedOutput: "true", isPublic: false }
    ]
  },
  {
    problemId: "restoring-three-numbers",
    problemNumber: 7,
    title: "Restoring Three Numbers",
    difficulty: "Easy",
    topic: "Mathematics",
    companies: ["Codeforces"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Vasya had three integers `a`, `b`, `c`. He added all pairwise sums and recorded them. Given these sums, restore `a`, `b`, `c` in ascending order.",
    inputFormat: "A single line containing three integers — the three pairwise sums.",
    outputFormat: "Three space-separated integers `a b c` in ascending order.",
    constraints: "0 <= each sum <= 10^9",
    examples: [
      { input: "3 5 6", output: "1 2 4", explanation: "Total sum = 7. a=7-6=1, b=7-5=2, c=7-3=4." },
      { input: "2 4 6", output: "0 2 4", explanation: "Total = 6. a=0, b=2, c=4." }
    ],
    starterCode: {
      cpp: "#include <iostream>\nusing namespace std;\nint main() {\n    long long x, y, z;\n    cin >> x >> y >> z;\n    // Write code here\n    return 0;\n}",
      java: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long x = sc.nextLong(), y = sc.nextLong(), z = sc.nextLong();\n        // Write code here\n    }\n}",
      python: "x, y, z = map(int, input().split())\n# Write code here",
      javascript: "const [x, y, z] = require(\'fs\').readFileSync(\'/dev/stdin\',\'utf8\').trim().split(\' \').map(Number);\n// Write code here",
      go: "package main\nimport \"fmt\"\nfunc main() {\n    var x, y, z int64\n    fmt.Scan(&x, &y, &z)\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 5 6", expectedOutput: "1 2 4", isPublic: true },
      { input: "2 4 6", expectedOutput: "0 2 4", isPublic: true }
    ]
  },
  {
    problemId: "anton-and-danik",
    problemNumber: 8,
    title: "Anton and Danik",
    difficulty: "Easy",
    topic: "Mathematics",
    companies: ["Codeforces"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Anton and Danik play `n` rounds. `A` means Anton wins, `D` means Danik wins. Determine who wins overall. Print `Anton`, `Danik`, or `Friendship`.",
    inputFormat: "First line: integer `n`. Second line: string of length `n` with `A` and `D`.",
    outputFormat: "Print `Anton`, `Danik`, or `Friendship`.",
    constraints: "1 <= n <= 100",
    examples: [
      { input: "3\nADA", output: "Anton", explanation: "Anton wins 2, Danik wins 1." },
      { input: "2\nDD", output: "Danik", explanation: "Danik wins both." },
      { input: "4\nADAD", output: "Friendship", explanation: "Both win 2 rounds." }
    ],
    starterCode: {
      cpp: "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int n; string s;\n    cin >> n >> s;\n    // Write code here\n    return 0;\n}",
      java: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(); String s = sc.next();\n        // Write code here\n    }\n}",
      python: "n = int(input())\ns = input()\n# Write code here",
      javascript: "const lines = require(\'fs\').readFileSync(\'/dev/stdin\',\'utf8\').trim().split(\'\\n\');\nconst n = parseInt(lines[0]), s = lines[1];\n// Write code here",
      go: "package main\nimport \"fmt\"\nfunc main() {\n    var n int; var s string\n    fmt.Scan(&n, &s)\n    // Write code here\n}"
    },
    testCases: [
      { input: "3\nADA", expectedOutput: "Anton", isPublic: true },
      { input: "2\nDD", expectedOutput: "Danik", isPublic: true },
      { input: "4\nADAD", expectedOutput: "Friendship", isPublic: false }
    ]
  },
  {
    problemId: "difference-element-sum-digit-sum",
    problemNumber: 9,
    title: "Difference Between Element Sum and Digit Sum of an Array",
    difficulty: "Easy",
    topic: "Mathematics",
    companies: ["Amazon", "Google"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given a positive integer array `nums`, return the absolute difference between the element sum and the digit sum of `nums`.",
    inputFormat: "A single line containing space-separated integers.",
    outputFormat: "A single integer — the absolute difference.",
    constraints: "1 <= nums.length <= 2000\n1 <= nums[i] <= 2000",
    examples: [
      { input: "1 15 6 3", output: "9", explanation: "Element sum = 25. Digit sum = 1+1+5+6+3 = 16. |25-16| = 9." },
      { input: "1 2 3 4", output: "0", explanation: "Element sum = 10. Digit sum = 10. Difference = 0." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int differenceOfSum(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int differenceOfSum(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def differenceOfSum(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    differenceOfSum(nums) {\n        // Write code here\n    }\n}",
      go: "func differenceOfSum(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 15 6 3", expectedOutput: "9", isPublic: true },
      { input: "1 2 3 4", expectedOutput: "0", isPublic: true },
      { input: "10 20 30", expectedOutput: "51", isPublic: false }
    ]
  },
  {
    problemId: "find-number-even-digits",
    problemNumber: 10,
    title: "Find the Number With Even Number of Digits",
    difficulty: "Easy",
    topic: "Mathematics",
    companies: ["Amazon", "Microsoft"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given an array `nums` of integers, return how many of them contain an **even number** of digits.",
    inputFormat: "A single line containing space-separated integers.",
    outputFormat: "A single integer count.",
    constraints: "1 <= nums.length <= 500\n1 <= nums[i] <= 10^5",
    examples: [
      { input: "12 345 2 6 7896", output: "2", explanation: "12 (2 digits) and 7896 (4 digits) have even digit counts." },
      { input: "555 901 482 1771", output: "1", explanation: "Only 1771 has 4 digits (even)." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int findNumbers(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int findNumbers(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def findNumbers(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    findNumbers(nums) {\n        // Write code here\n    }\n}",
      go: "func findNumbers(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "12 345 2 6 7896", expectedOutput: "2", isPublic: true },
      { input: "555 901 482 1771", expectedOutput: "1", isPublic: true }
    ]
  },

  // =====================================================================
  // === ARRAYS (11 Problems) ===
  // =====================================================================
  {
    problemId: "largest-element-in-array",
    problemNumber: 11,
    title: "Largest Element in the Array",
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Amazon", "Microsoft", "Google"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given an array of `n` integers, find and return the **largest element** in the array.",
    inputFormat: "A single line containing space-separated integers.",
    outputFormat: "A single integer — the largest element.",
    constraints: "1 <= n <= 10^5\n-10^9 <= nums[i] <= 10^9",
    examples: [
      { input: "3 1 4 1 5 9 2 6", output: "9", explanation: "9 is the largest element." },
      { input: "-1 -5 -3", output: "-1", explanation: "Among negatives, -1 is largest." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int largest(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int largest(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def largest(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    largest(nums) {\n        // Write code here\n    }\n}",
      go: "func largest(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 1 4 1 5 9 2 6", expectedOutput: "9", isPublic: true },
      { input: "-1 -5 -3", expectedOutput: "-1", isPublic: true },
      { input: "42", expectedOutput: "42", isPublic: false }
    ]
  },
  {
    problemId: "second-largest-element",
    problemNumber: 12,
    title: "Second Largest Element in the Array",
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Amazon", "Microsoft", "Flipkart"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given an array of `n` integers, find the **second largest** distinct element. If no such element exists, return `-1`.",
    inputFormat: "A single line containing space-separated integers.",
    outputFormat: "A single integer — the second largest element, or -1.",
    constraints: "1 <= n <= 10^5\n-10^9 <= nums[i] <= 10^9",
    examples: [
      { input: "12 35 1 10 34 1", output: "34", explanation: "Distinct sorted: 1,10,12,34,35. Second largest is 34." },
      { input: "10 10", output: "-1", explanation: "All same, no distinct second largest." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int secondLargest(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int secondLargest(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def secondLargest(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    secondLargest(nums) {\n        // Write code here\n    }\n}",
      go: "func secondLargest(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "12 35 1 10 34 1", expectedOutput: "34", isPublic: true },
      { input: "10 10", expectedOutput: "-1", isPublic: true },
      { input: "5 4 3 2 1", expectedOutput: "4", isPublic: false }
    ]
  },
  {
    problemId: "check-if-sorted-and-rotated",
    problemNumber: 13,
    title: "Check if Array is Sorted and Rotated",
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given an array `nums`, return `true` if the array was originally sorted in non-decreasing order, then rotated some number of positions. Otherwise, return `false`.",
    inputFormat: "A single line containing space-separated integers.",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= nums.length <= 100\n1 <= nums[i] <= 100",
    examples: [
      { input: "3 4 5 1 2", output: "true", explanation: "[1,2,3,4,5] rotated 3 positions gives [3,4,5,1,2]." },
      { input: "2 1 3 4", output: "false", explanation: "No rotation of a sorted array gives this." },
      { input: "1 2 3", output: "true", explanation: "Already sorted, 0 rotations." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool check(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean check(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def check(self, nums: List[int]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    check(nums) {\n        // Write code here\n    }\n}",
      go: "func check(nums []int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 4 5 1 2", expectedOutput: "true", isPublic: true },
      { input: "2 1 3 4", expectedOutput: "false", isPublic: true },
      { input: "1 2 3", expectedOutput: "true", isPublic: false }
    ]
  },
  {
    problemId: "richest-customer-wealth",
    problemNumber: 14,
    title: "Richest Customer Wealth",
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Amazon", "Google"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given an `m x n` grid `accounts` where `accounts[i][j]` is the money the `i-th` customer has in the `j-th` bank, return the wealth of the richest customer.",
    inputFormat: "First line: `m` and `n`. Next `m` lines: `n` space-separated integers.",
    outputFormat: "A single integer — the maximum wealth.",
    constraints: "1 <= m, n <= 50\n1 <= accounts[i][j] <= 100",
    examples: [
      { input: "2 3\n1 2 3\n3 2 1", output: "6", explanation: "Both customers have wealth 6. Max = 6." },
      { input: "3 2\n1 5\n7 3\n3 5", output: "10", explanation: "Customer 2 has wealth 7+3=10 — richest." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int maximumWealth(vector<vector<int>>& accounts) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int maximumWealth(int[][] accounts) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def maximumWealth(self, accounts: List[List[int]]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    maximumWealth(accounts) {\n        // Write code here\n    }\n}",
      go: "func maximumWealth(accounts [][]int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "2 3\n1 2 3\n3 2 1", expectedOutput: "6", isPublic: true },
      { input: "3 2\n1 5\n7 3\n3 5", expectedOutput: "10", isPublic: true }
    ]
  },
  {
    problemId: "kids-with-greatest-candies",
    problemNumber: 15,
    title: "Kids With The Greatest Number of Candies",
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given integer array `candies` and integer `extraCandies`, return a boolean array where `result[i]` is `true` if giving the `i-th` kid all `extraCandies` makes them have the greatest or equal to greatest candies among all kids.",
    inputFormat: "First line: space-separated integers (candies). Second line: `extraCandies`.",
    outputFormat: "Space-separated `true`/`false` values.",
    constraints: "2 <= n <= 100\n1 <= candies[i] <= 100\n1 <= extraCandies <= 50",
    examples: [
      { input: "2 3 5 1 3\n3", output: "true true true false true", explanation: "Max = 5. Kids become 5,6,8,4,6. All >= 5 except kid 4." },
      { input: "4 2 1 1 2\n1", output: "true false false false false", explanation: "Only first kid reaches max 4+1=5." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<bool> kidsWithCandies(vector<int>& candies, int extraCandies) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<Boolean> kidsWithCandies(int[] candies, int extraCandies) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:\n        # Write code here",
      javascript: "class Solution {\n    kidsWithCandies(candies, extraCandies) {\n        // Write code here\n    }\n}",
      go: "func kidsWithCandies(candies []int, extraCandies int) []bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "2 3 5 1 3\n3", expectedOutput: "true true true false true", isPublic: true },
      { input: "4 2 1 1 2\n1", expectedOutput: "true false false false false", isPublic: true }
    ]
  },
  {
    problemId: "contains-duplicate",
    problemNumber: 16,
    title: "Contains Duplicate",
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given an integer array `nums`, return `true` if any value appears **at least twice**, and `false` if every element is distinct.",
    inputFormat: "A single line containing integers separated by spaces.",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
    examples: [
      { input: "1 2 3 1", output: "true", explanation: "1 appears twice." },
      { input: "1 2 3 4", output: "false", explanation: "All unique." },
      { input: "1 1 1 3 3 4 3 2 4 2", output: "true", explanation: "Multiple duplicates." }
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
      { input: "1 1 1 3 3 4 3 2 4 2", expectedOutput: "true", isPublic: false }
    ]
  },
  {
    problemId: "helpful-maths",
    problemNumber: 17,
    title: "Helpful Maths",
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Codeforces"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given a string expression like `a+b+c+...` where each value is 1, 2, or 3, rearrange the numbers in non-decreasing order.",
    inputFormat: "A string of the form `a+b+c+...`.",
    outputFormat: "The sorted expression.",
    constraints: "1 to 10^5 values, each 1, 2, or 3.",
    examples: [
      { input: "3+2+1", output: "1+2+3", explanation: "Sort 3,2,1." },
      { input: "1+1+1+2+1", output: "1+1+1+1+2", explanation: "Sort gives four 1s then one 2." }
    ],
    starterCode: {
      cpp: "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string s;\n    cin >> s;\n    // Write code here\n    return 0;\n}",
      java: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // Write code here\n    }\n}",
      python: "s = input()\n# Write code here",
      javascript: "const s = require(\'fs\').readFileSync(\'/dev/stdin\',\'utf8\').trim();\n// Write code here",
      go: "package main\nimport \"fmt\"\nfunc main() {\n    var s string\n    fmt.Scan(&s)\n    // Write code here\n}"
    },
    testCases: [
      { input: "3+2+1", expectedOutput: "1+2+3", isPublic: true },
      { input: "1+1+1+2+1", expectedOutput: "1+1+1+1+2", isPublic: true }
    ]
  },
  {
    problemId: "minimum-increments-subarray-target",
    problemNumber: 18,
    title: "Minimum Number of Increments on Subarray to Form a Target Array",
    difficulty: "Hard",
    topic: "Arrays",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 50,
    estimatedTime: 40,
    statement: "Given an integer array `target` and an all-zero `initial` array of the same size, in one operation you can choose any subarray and increment each value by one. Return the minimum number of operations to form `target`.",
    inputFormat: "A single line containing space-separated integers representing `target`.",
    outputFormat: "A single integer — the minimum number of operations.",
    constraints: "1 <= target.length <= 10^5\n1 <= target[i] <= 10^5",
    examples: [
      { input: "1 2 3 2 1", output: "3", explanation: "3 operations: [0..4], [1..3], [2..2]." },
      { input: "3 1 1 2", output: "4", explanation: "Key insight: sum of positive differences from left." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int minNumberOperations(vector<int>& target) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int minNumberOperations(int[] target) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def minNumberOperations(self, target: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    minNumberOperations(target) {\n        // Write code here\n    }\n}",
      go: "func minNumberOperations(target []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 2 1", expectedOutput: "3", isPublic: true },
      { input: "3 1 1 2", expectedOutput: "4", isPublic: true }
    ]
  },
  {
    problemId: "maximum-consecutive-ones",
    problemNumber: 19,
    title: "Maximum Consecutive Ones",
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Amazon", "Microsoft", "Facebook"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given a binary array `nums`, return the **maximum** number of consecutive 1s in the array.",
    inputFormat: "A single line of space-separated 0s and 1s.",
    outputFormat: "A single integer — the maximum consecutive ones.",
    constraints: "1 <= nums.length <= 10^5\nnums[i] is 0 or 1.",
    examples: [
      { input: "1 1 0 1 1 1", output: "3", explanation: "Longest consecutive 1s is at the end: [1,1,1]." },
      { input: "1 0 1 1 0 1", output: "2", explanation: "Max consecutive 1s group is length 2." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int findMaxConsecutiveOnes(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int findMaxConsecutiveOnes(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    findMaxConsecutiveOnes(nums) {\n        // Write code here\n    }\n}",
      go: "func findMaxConsecutiveOnes(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 1 0 1 1 1", expectedOutput: "3", isPublic: true },
      { input: "1 0 1 1 0 1", expectedOutput: "2", isPublic: true }
    ]
  },
  {
    problemId: "longest-continuous-increasing-subsequence",
    problemNumber: 20,
    title: "Longest Continuous Increasing Subsequence",
    difficulty: "Easy",
    topic: "Arrays",
    companies: ["Google", "Amazon", "Microsoft"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given an unsorted array `nums`, return the length of the longest **continuous strictly increasing** subarray.",
    inputFormat: "A single line of space-separated integers.",
    outputFormat: "A single integer — the length.",
    constraints: "1 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9",
    examples: [
      { input: "1 3 5 4 7", output: "3", explanation: "[1,3,5] is the longest increasing subarray." },
      { input: "2 2 2 2 2", output: "1", explanation: "No two consecutive elements are strictly increasing." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int findLengthOfLCIS(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int findLengthOfLCIS(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def findLengthOfLCIS(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    findLengthOfLCIS(nums) {\n        // Write code here\n    }\n}",
      go: "func findLengthOfLCIS(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 3 5 4 7", expectedOutput: "3", isPublic: true },
      { input: "2 2 2 2 2", expectedOutput: "1", isPublic: true }
    ]
  },
  {
    problemId: "longest-mountain-in-array",
    problemNumber: 21,
    title: "Longest Mountain in the Array",
    difficulty: "Medium",
    topic: "Arrays",
    companies: ["Amazon", "Google"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "An array `arr` is a mountain if `arr.length >= 3` and there exists `i` where elements strictly increase up to `arr[i]` then strictly decrease. Return the length of the longest mountain subarray, or `0` if no mountain exists.",
    inputFormat: "A single line of space-separated integers.",
    outputFormat: "A single integer — the length.",
    constraints: "1 <= arr.length <= 10^4\n0 <= arr[i] <= 10^4",
    examples: [
      { input: "2 1 4 7 3 2 5", output: "5", explanation: "[1,4,7,3,2] is a mountain of length 5." },
      { input: "2 2 2", output: "0", explanation: "No mountain exists." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int longestMountain(vector<int>& arr) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int longestMountain(int[] arr) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def longestMountain(self, arr: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    longestMountain(arr) {\n        // Write code here\n    }\n}",
      go: "func longestMountain(arr []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "2 1 4 7 3 2 5", expectedOutput: "5", isPublic: true },
      { input: "2 2 2", expectedOutput: "0", isPublic: true }
    ]
  },

  // =====================================================================
  // === PREFIX SUM (7 Problems) ===
  // =====================================================================
  {
    problemId: "running-sum-1d-array",
    problemNumber: 22,
    title: "Running Sum of 1D Array",
    difficulty: "Easy",
    topic: "Prefix Sum",
    companies: ["Amazon", "Google"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given an array `nums`, return the running sum where `runningSum[i] = sum(nums[0]...nums[i])`.",
    inputFormat: "A single line containing space-separated integers.",
    outputFormat: "Space-separated running sums.",
    constraints: "1 <= nums.length <= 1000\n-10^6 <= nums[i] <= 10^6",
    examples: [
      { input: "1 2 3 4", output: "1 3 6 10", explanation: "[1, 1+2, 1+2+3, 1+2+3+4] = [1, 3, 6, 10]." },
      { input: "1 1 1 1 1", output: "1 2 3 4 5", explanation: "Each step adds 1." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> runningSum(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int[] runningSum(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def runningSum(self, nums: List[int]) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    runningSum(nums) {\n        // Write code here\n    }\n}",
      go: "func runningSum(nums []int) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 4", expectedOutput: "1 3 6 10", isPublic: true },
      { input: "1 1 1 1 1", expectedOutput: "1 2 3 4 5", isPublic: true }
    ]
  },
  {
    problemId: "find-the-highest-altitude",
    problemNumber: 23,
    title: "Find the Highest Altitude",
    difficulty: "Easy",
    topic: "Prefix Sum",
    companies: ["Amazon", "Google"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "A biker starts at altitude 0 and rides through points with net altitude `gain[i]`. Return the highest altitude reached.",
    inputFormat: "A single line of space-separated integers (gain array).",
    outputFormat: "A single integer — the highest altitude.",
    constraints: "1 <= n <= 100\n-100 <= gain[i] <= 100",
    examples: [
      { input: "-5 1 5 0 -7", output: "1", explanation: "Altitudes: [0,-5,-4,1,1,-6]. Highest = 1." },
      { input: "-4 -3 -2 -1 4 3 2", output: "0", explanation: "All altitudes are <= 0." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int largestAltitude(vector<int>& gain) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int largestAltitude(int[] gain) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def largestAltitude(self, gain: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    largestAltitude(gain) {\n        // Write code here\n    }\n}",
      go: "func largestAltitude(gain []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "-5 1 5 0 -7", expectedOutput: "1", isPublic: true },
      { input: "-4 -3 -2 -1 4 3 2", expectedOutput: "0", isPublic: true }
    ]
  },
  {
    problemId: "find-the-pivot-index",
    problemNumber: 24,
    title: "Find the Pivot Index",
    difficulty: "Easy",
    topic: "Prefix Sum",
    companies: ["Amazon", "Google", "Facebook"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Return the leftmost pivot index where the sum of all numbers to the left equals the sum of all numbers to the right. Return `-1` if no such index exists.",
    inputFormat: "A single line containing space-separated integers.",
    outputFormat: "A single integer — the pivot index or -1.",
    constraints: "1 <= nums.length <= 10^4\n-1000 <= nums[i] <= 1000",
    examples: [
      { input: "1 7 3 6 5 6", output: "3", explanation: "Left sum = 1+7+3 = 11, right sum = 5+6 = 11." },
      { input: "1 2 3", output: "-1", explanation: "No valid pivot." },
      { input: "2 1 -1", output: "0", explanation: "Left sum = 0, right sum = 0." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int pivotIndex(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int pivotIndex(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def pivotIndex(self, nums: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    pivotIndex(nums) {\n        // Write code here\n    }\n}",
      go: "func pivotIndex(nums []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 7 3 6 5 6", expectedOutput: "3", isPublic: true },
      { input: "1 2 3", expectedOutput: "-1", isPublic: true },
      { input: "2 1 -1", expectedOutput: "0", isPublic: false }
    ]
  },
  {
    problemId: "range-sum-query-immutable",
    problemNumber: 25,
    title: "Range Sum Query - Immutable",
    difficulty: "Easy",
    topic: "Prefix Sum",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Handle multiple queries of the type: calculate the sum of elements in `nums` between indices `left` and `right` inclusive. Implement using prefix sums for O(1) per query.",
    inputFormat: "First line: space-separated integers. Second line: q. Next q lines: left right.",
    outputFormat: "For each query, print the range sum on a new line.",
    constraints: "1 <= nums.length <= 10^4\n-10^5 <= nums[i] <= 10^5\n0 <= left <= right < nums.length",
    examples: [
      { input: "-2 0 3 -5 2 -1\n3\n0 2\n2 5\n0 5", output: "1\n-1\n-3", explanation: "sumRange(0,2)=1, sumRange(2,5)=-1, sumRange(0,5)=-3." }
    ],
    starterCode: {
      cpp: "class NumArray {\npublic:\n    NumArray(vector<int>& nums) {\n        // Write code here\n    }\n    int sumRange(int left, int right) {\n        // Write code here\n    }\n};",
      java: "class NumArray {\n    public NumArray(int[] nums) {\n        // Write code here\n    }\n    public int sumRange(int left, int right) {\n        // Write code here\n    }\n}",
      python: "class NumArray:\n    def __init__(self, nums: List[int]):\n        # Write code here\n    def sumRange(self, left: int, right: int) -> int:\n        # Write code here",
      javascript: "class NumArray {\n    constructor(nums) {\n        // Write code here\n    }\n    sumRange(left, right) {\n        // Write code here\n    }\n}",
      go: "type NumArray struct {}\nfunc Constructor(nums []int) NumArray {\n    return NumArray{}\n}\nfunc (this *NumArray) SumRange(left int, right int) int {\n    // Write code here\n    return 0\n}"
    },
    testCases: [
      { input: "-2 0 3 -5 2 -1\n3\n0 2\n2 5\n0 5", expectedOutput: "1\n-1\n-3", isPublic: true }
    ]
  },
  {
    problemId: "product-of-array-except-self",
    problemNumber: 26,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    topic: "Prefix Sum",
    companies: ["Facebook", "Amazon", "Microsoft", "Netflix"],
    xpReward: 30,
    estimatedTime: 35,
    statement: "Given array `nums`, return array `answer` where `answer[i]` equals the product of all elements except `nums[i]`, without using division. Must run in O(N).",
    inputFormat: "A single line of space-separated integers.",
    outputFormat: "Space-separated product array.",
    constraints: "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30",
    examples: [
      { input: "1 2 3 4", output: "24 12 8 6", explanation: "[2*3*4, 1*3*4, 1*2*4, 1*2*3]." },
      { input: "-1 1 0 -3 3", output: "0 0 9 0 0", explanation: "Zeros propagate in product." }
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
    problemId: "car-pooling",
    problemNumber: 27,
    title: "Car Pooling",
    difficulty: "Medium",
    topic: "Prefix Sum",
    companies: ["Amazon", "Google", "Lyft"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "A car with `capacity` seats drives east. Given trips `[numPassengers, from, to]`, return `true` if all passengers can be picked up and dropped off without exceeding capacity.",
    inputFormat: "First line: capacity. Second line: n. Next n lines: numPassengers from to.",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= trips.length <= 1000\n1 <= numPassengers <= 100\n0 <= from < to <= 1000\n1 <= capacity <= 10^5",
    examples: [
      { input: "4\n3\n2 1 5\n3 3 7\n1 0 4", output: "false", explanation: "At location 3, passengers = 2+3=5 > capacity 4." },
      { input: "5\n3\n2 1 5\n3 3 7\n1 0 4", output: "true", explanation: "Max concurrent = 4 <= capacity 5." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool carPooling(vector<vector<int>>& trips, int capacity) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean carPooling(int[][] trips, int capacity) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def carPooling(self, trips: List[List[int]], capacity: int) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    carPooling(trips, capacity) {\n        // Write code here\n    }\n}",
      go: "func carPooling(trips [][]int, capacity int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "4\n3\n2 1 5\n3 3 7\n1 0 4", expectedOutput: "false", isPublic: true },
      { input: "5\n3\n2 1 5\n3 3 7\n1 0 4", expectedOutput: "true", isPublic: true }
    ]
  },
  {
    problemId: "corporate-flight-bookings",
    problemNumber: 28,
    title: "Corporate Flight Bookings",
    difficulty: "Medium",
    topic: "Prefix Sum",
    companies: ["Amazon", "Google"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "There are `n` flights. Bookings `[first, last, seats]` reserve `seats` seats for flights `first` through `last`. Return an array of total seats for each flight.",
    inputFormat: "First line: n. Second line: m. Next m lines: first last seats.",
    outputFormat: "Space-separated total seats per flight.",
    constraints: "1 <= n <= 2*10^4\n1 <= bookings.length <= 2*10^4\n1 <= first <= last <= n\n1 <= seats <= 10^4",
    examples: [
      { input: "5\n3\n1 2 10\n2 3 20\n2 5 25", output: "10 55 45 25 25", explanation: "Flight 1:10, 2:10+20+25=55, 3:20+25=45, 4:25, 5:25." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int[] corpFlightBookings(int[][] bookings, int n) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def corpFlightBookings(self, bookings: List[List[int]], n: int) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    corpFlightBookings(bookings, n) {\n        // Write code here\n    }\n}",
      go: "func corpFlightBookings(bookings [][]int, n int) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "5\n3\n1 2 10\n2 3 20\n2 5 25", expectedOutput: "10 55 45 25 25", isPublic: true }
    ]
  },

  // =====================================================================
  // === SLIDING WINDOW (5 Problems) ===
  // =====================================================================
  {
    problemId: "two-sum-ii-sorted",
    problemNumber: 29,
    title: "Two Sum II - Input Array Is Sorted",
    difficulty: "Medium",
    topic: "Sliding Window",
    companies: ["Amazon", "Microsoft", "Facebook"],
    xpReward: 20,
    estimatedTime: 20,
    statement: "Given a 1-indexed sorted array `numbers` and a `target`, find two numbers that sum to `target`. Return their 1-indexed positions.",
    inputFormat: "First line: sorted integers. Second line: target.",
    outputFormat: "Two space-separated 1-indexed integers.",
    constraints: "2 <= numbers.length <= 3*10^4\n-1000 <= numbers[i] <= 1000\nExactly one solution.",
    examples: [
      { input: "2 7 11 15\n9", output: "1 2", explanation: "2+7=9. Return [1,2]." },
      { input: "2 3 4\n6", output: "1 3", explanation: "2+4=6." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def twoSum(self, numbers: List[int], target: int) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    twoSum(numbers, target) {\n        // Write code here\n    }\n}",
      go: "func twoSum(numbers []int, target int) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "2 7 11 15\n9", expectedOutput: "1 2", isPublic: true },
      { input: "2 3 4\n6", expectedOutput: "1 3", isPublic: true }
    ]
  },
  {
    problemId: "container-with-most-water",
    problemNumber: 30,
    title: "Container With Most Water",
    difficulty: "Medium",
    topic: "Sliding Window",
    companies: ["Google", "Amazon", "Apple", "Uber"],
    xpReward: 30,
    estimatedTime: 35,
    statement: "Given `height` array, find two lines that form a container holding the most water. Return the maximum amount.",
    inputFormat: "A single line of space-separated integers.",
    outputFormat: "A single integer.",
    constraints: "2 <= n <= 10^5\n0 <= height[i] <= 10^4",
    examples: [
      { input: "1 8 6 2 5 4 8 3 7", output: "49", explanation: "Between height[1]=8 and height[8]=7: min(8,7)*7=49." },
      { input: "1 1", output: "1", explanation: "Only one container, holds 1 unit." }
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
  {
    problemId: "max-sum-distinct-subarrays-length-k",
    problemNumber: 31,
    title: "Maximum Sum of Distinct Subarrays With Length K",
    difficulty: "Medium",
    topic: "Sliding Window",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Find the maximum sum subarray of length `k` where all elements are distinct. Return `0` if no such subarray exists.",
    inputFormat: "First line: space-separated integers. Second line: k.",
    outputFormat: "A single integer — the maximum sum.",
    constraints: "1 <= k <= nums.length <= 10^5\n1 <= nums[i] <= 10^5",
    examples: [
      { input: "1 5 4 2 9 9 9\n3", output: "15", explanation: "[4,2,9] has distinct elements and sum 15." },
      { input: "4 4 4\n3", output: "0", explanation: "Only subarray has duplicates." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    long long maximumSubarraySum(vector<int>& nums, int k) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public long maximumSubarraySum(int[] nums, int k) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def maximumSubarraySum(self, nums: List[int], k: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    maximumSubarraySum(nums, k) {\n        // Write code here\n    }\n}",
      go: "func maximumSubarraySum(nums []int, k int) int64 {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 5 4 2 9 9 9\n3", expectedOutput: "15", isPublic: true },
      { input: "4 4 4\n3", expectedOutput: "0", isPublic: true }
    ]
  },
  {
    problemId: "sliding-window-maximum",
    problemNumber: 32,
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    topic: "Sliding Window",
    companies: ["Amazon", "Google", "Microsoft", "Bloomberg"],
    xpReward: 50,
    estimatedTime: 45,
    statement: "Given array `nums` and window size `k`, return the max value for each window position as it slides from left to right.",
    inputFormat: "First line: space-separated integers. Second line: k.",
    outputFormat: "Space-separated max values.",
    constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\n1 <= k <= nums.length",
    examples: [
      { input: "1 3 -1 -3 5 3 6 7\n3", output: "3 3 5 5 6 7", explanation: "Max of each window of size 3." },
      { input: "1\n1", output: "1", explanation: "Single element." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    maxSlidingWindow(nums, k) {\n        // Write code here\n    }\n}",
      go: "func maxSlidingWindow(nums []int, k int) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 3 -1 -3 5 3 6 7\n3", expectedOutput: "3 3 5 5 6 7", isPublic: true },
      { input: "1\n1", expectedOutput: "1", isPublic: true }
    ]
  },
  {
    problemId: "max-consecutive-ones-iii",
    problemNumber: 33,
    title: "Maximum Consecutive Ones III",
    difficulty: "Medium",
    topic: "Sliding Window",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Given binary array `nums` and integer `k`, return the maximum consecutive 1s if you can flip at most `k` 0s.",
    inputFormat: "First line: binary integers. Second line: k.",
    outputFormat: "A single integer.",
    constraints: "1 <= nums.length <= 10^5\n0 <= k <= nums.length",
    examples: [
      { input: "1 1 1 0 0 0 1 1 1 1 0\n2", output: "6", explanation: "Flip positions 5 and 10 to get 6 consecutive 1s." },
      { input: "0 0 1 1 0 0 1 1 1 0 1 1 0 0 0 1 1 1 1\n3", output: "10", explanation: "Flip 3 zeros optimally." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int longestOnes(vector<int>& nums, int k) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int longestOnes(int[] nums, int k) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def longestOnes(self, nums: List[int], k: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    longestOnes(nums, k) {\n        // Write code here\n    }\n}",
      go: "func longestOnes(nums []int, k int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 1 1 0 0 0 1 1 1 1 0\n2", expectedOutput: "6", isPublic: true },
      { input: "0 0 1 1 0 0 1 1 1 0 1 1 0 0 0 1 1 1 1\n3", expectedOutput: "10", isPublic: true }
    ]
  },

  // =====================================================================
  // === BINARY SEARCH (13 Problems) ===
  // =====================================================================
  {
    problemId: "binary-search",
    problemNumber: 34,
    title: "Binary Search",
    difficulty: "Easy",
    topic: "Binary Search",
    companies: ["Amazon", "Google", "Microsoft", "Facebook"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given sorted array `nums` and `target`, return the index of `target` or `-1` if not found. Must run in O(log n).",
    inputFormat: "First line: sorted integers. Second line: target.",
    outputFormat: "A single integer — index or -1.",
    constraints: "1 <= nums.length <= 10^4\nAll values unique, sorted ascending.",
    examples: [
      { input: "-1 0 3 5 9 12\n9", output: "4", explanation: "9 exists at index 4." },
      { input: "-1 0 3 5 9 12\n2", output: "-1", explanation: "2 not in array." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int search(int[] nums, int target) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    search(nums, target) {\n        // Write code here\n    }\n}",
      go: "func search(nums []int, target int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "-1 0 3 5 9 12\n9", expectedOutput: "4", isPublic: true },
      { input: "-1 0 3 5 9 12\n2", expectedOutput: "-1", isPublic: true }
    ]
  },
  {
    problemId: "search-insert-position",
    problemNumber: 35,
    title: "Search Insert Position",
    difficulty: "Easy",
    topic: "Binary Search",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given a sorted array and target, return the index if found, else the position where it would be inserted. Must be O(log n).",
    inputFormat: "First line: sorted distinct integers. Second line: target.",
    outputFormat: "A single integer — index or insertion position.",
    constraints: "1 <= nums.length <= 10^4\nDistinct values sorted ascending.",
    examples: [
      { input: "1 3 5 6\n5", output: "2", explanation: "5 found at index 2." },
      { input: "1 3 5 6\n2", output: "1", explanation: "2 would be inserted at index 1." },
      { input: "1 3 5 6\n7", output: "4", explanation: "7 goes at end." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int searchInsert(int[] nums, int target) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def searchInsert(self, nums: List[int], target: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    searchInsert(nums, target) {\n        // Write code here\n    }\n}",
      go: "func searchInsert(nums []int, target int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 3 5 6\n5", expectedOutput: "2", isPublic: true },
      { input: "1 3 5 6\n2", expectedOutput: "1", isPublic: true },
      { input: "1 3 5 6\n7", expectedOutput: "4", isPublic: false }
    ]
  },
  {
    problemId: "guess-number-higher-or-lower",
    problemNumber: 36,
    title: "Guess Number Higher or Lower",
    difficulty: "Easy",
    topic: "Binary Search",
    companies: ["Google", "Amazon"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Pick a number from 1 to n. Use the `guess(num)` API (-1: too high, 1: too low, 0: correct) to find the picked number.",
    inputFormat: "First line: n. Second line: picked number.",
    outputFormat: "A single integer — the picked number.",
    constraints: "1 <= pick <= n <= 2^31-1",
    examples: [
      { input: "10\n6", output: "6", explanation: "Picked number is 6." },
      { input: "1\n1", output: "1", explanation: "Only option." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int guessNumber(int n) {\n        // Write code here — use guess(mid) API\n    }\n};",
      java: "public class Solution extends GuessGame {\n    public int guessNumber(int n) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def guessNumber(self, n: int) -> int:\n        # Write code here — use self.guess(mid)",
      javascript: "class Solution {\n    guessNumber(n) {\n        // Write code here\n    }\n}",
      go: "func guessNumber(n int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "10\n6", expectedOutput: "6", isPublic: true },
      { input: "1\n1", expectedOutput: "1", isPublic: true }
    ]
  },
  {
    problemId: "first-bad-version",
    problemNumber: 37,
    title: "First Bad Version",
    difficulty: "Easy",
    topic: "Binary Search",
    companies: ["Amazon", "Facebook", "Microsoft"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given n versions and a `bad` first bad version, find the first bad version using the `isBadVersion(v)` API while minimizing API calls.",
    inputFormat: "First line: n. Second line: bad (first bad version).",
    outputFormat: "A single integer — the first bad version.",
    constraints: "1 <= bad <= n <= 2^31-1",
    examples: [
      { input: "5\n4", output: "4", explanation: "Versions 4 and 5 are bad. First bad = 4." },
      { input: "1\n1", output: "1", explanation: "First version is bad." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int firstBadVersion(int n) {\n        // Write code here — use isBadVersion(v)\n    }\n};",
      java: "public class Solution extends VersionControl {\n    public int firstBadVersion(int n) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def firstBadVersion(self, n: int) -> int:\n        # Write code here — use self.isBadVersion(v)",
      javascript: "class Solution {\n    firstBadVersion(n) {\n        // Write code here\n    }\n}",
      go: "func firstBadVersion(n int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "5\n4", expectedOutput: "4", isPublic: true },
      { input: "1\n1", expectedOutput: "1", isPublic: true }
    ]
  },
  {
    problemId: "search-in-rotated-sorted-array",
    problemNumber: 38,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Google", "Facebook", "Amazon", "Directi"],
    xpReward: 35,
    estimatedTime: 40,
    statement: "A sorted array `nums` was rotated at an unknown pivot. Given the rotated array and `target`, return the index of `target` or `-1`. Must be O(log n).",
    inputFormat: "First line: rotated sorted integers. Second line: target.",
    outputFormat: "A single integer — index or -1.",
    constraints: "1 <= nums.length <= 5000\nAll values unique.",
    examples: [
      { input: "4 5 6 7 0 1 2\n0", output: "4", explanation: "0 is at index 4." },
      { input: "4 5 6 7 0 1 2\n3", output: "-1", explanation: "3 not in array." }
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
      { input: "4 5 6 7 0 1 2\n3", expectedOutput: "-1", isPublic: true }
    ]
  },
  {
    problemId: "sqrtx",
    problemNumber: 39,
    title: "Sqrt(x)",
    difficulty: "Easy",
    topic: "Binary Search",
    companies: ["Amazon", "Microsoft", "Google", "Apple"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given non-negative integer `x`, return the integer square root rounded down. Do not use built-in exponent functions.",
    inputFormat: "A single integer `x`.",
    outputFormat: "A single integer — integer square root.",
    constraints: "0 <= x <= 2^31 - 1",
    examples: [
      { input: "4", output: "2", explanation: "sqrt(4) = 2 exactly." },
      { input: "8", output: "2", explanation: "sqrt(8) = 2.828..., floor = 2." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int mySqrt(int x) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int mySqrt(int x) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def mySqrt(self, x: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    mySqrt(x) {\n        // Write code here\n    }\n}",
      go: "func mySqrt(x int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "4", expectedOutput: "2", isPublic: true },
      { input: "8", expectedOutput: "2", isPublic: true },
      { input: "0", expectedOutput: "0", isPublic: false }
    ]
  },
  {
    problemId: "koko-eating-bananas",
    problemNumber: 40,
    title: "Koko Eating Bananas",
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Facebook", "Amazon", "Google", "Uber"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "Koko eats `k` bananas/hour from piles. Find minimum `k` to eat all bananas within `h` hours.",
    inputFormat: "First line: pile sizes. Second line: h.",
    outputFormat: "A single integer — minimum eating speed.",
    constraints: "1 <= piles.length <= h <= 10^9\n1 <= piles[i] <= 10^9",
    examples: [
      { input: "3 6 7 11\n8", output: "4", explanation: "At speed 4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4)=1+2+2+3=8 hours." },
      { input: "30 11 23 4 20\n5", output: "30", explanation: "Must eat at speed 30 to finish in 5 hours." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int minEatingSpeed(int[] piles, int h) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def minEatingSpeed(self, piles: List[int], h: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    minEatingSpeed(piles, h) {\n        // Write code here\n    }\n}",
      go: "func minEatingSpeed(piles []int, h int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 6 7 11\n8", expectedOutput: "4", isPublic: true },
      { input: "30 11 23 4 20\n5", expectedOutput: "30", isPublic: true }
    ]
  },
  {
    problemId: "capacity-to-ship-packages",
    problemNumber: 41,
    title: "Capacity To Ship Packages Within N Days",
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 35,
    estimatedTime: 35,
    statement: "Given package weights and `days`, find the minimum ship capacity to deliver all packages within `days` days in order.",
    inputFormat: "First line: package weights. Second line: days.",
    outputFormat: "A single integer — minimum capacity.",
    constraints: "1 <= days <= weights.length <= 5*10^4\n1 <= weights[i] <= 500",
    examples: [
      { input: "1 2 3 4 5 6 7 8 9 10\n5", output: "15", explanation: "Capacity 15 ships all in 5 days." },
      { input: "3 2 2 4 1 4\n3", output: "6", explanation: "Capacity 6 ships in 3 days." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int shipWithinDays(vector<int>& weights, int days) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int shipWithinDays(int[] weights, int days) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def shipWithinDays(self, weights: List[int], days: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    shipWithinDays(weights, days) {\n        // Write code here\n    }\n}",
      go: "func shipWithinDays(weights []int, days int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 4 5 6 7 8 9 10\n5", expectedOutput: "15", isPublic: true },
      { input: "3 2 2 4 1 4\n3", expectedOutput: "6", isPublic: true }
    ]
  },
  {
    problemId: "split-array-largest-sum",
    problemNumber: 42,
    title: "Split Array Largest Sum",
    difficulty: "Hard",
    topic: "Binary Search",
    companies: ["Amazon", "Google", "Facebook"],
    xpReward: 50,
    estimatedTime: 45,
    statement: "Split integer array `nums` into `k` non-empty subarrays to minimize the largest subarray sum.",
    inputFormat: "First line: integers. Second line: k.",
    outputFormat: "A single integer — minimized largest sum.",
    constraints: "1 <= nums.length <= 1000\n0 <= nums[i] <= 10^6\n1 <= k <= 50",
    examples: [
      { input: "7 2 5 10 8\n2", output: "18", explanation: "[7,2,5] and [10,8]. Max = max(14,18) = 18." },
      { input: "1 2 3 4 5\n2", output: "9", explanation: "[1,2,3] and [4,5]. Max = max(6,9) = 9." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int splitArray(vector<int>& nums, int k) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int splitArray(int[] nums, int k) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def splitArray(self, nums: List[int], k: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    splitArray(nums, k) {\n        // Write code here\n    }\n}",
      go: "func splitArray(nums []int, k int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "7 2 5 10 8\n2", expectedOutput: "18", isPublic: true },
      { input: "1 2 3 4 5\n2", expectedOutput: "9", isPublic: true }
    ]
  },
  {
    problemId: "minimum-days-to-make-m-bouquets",
    problemNumber: 43,
    title: "Minimum Number of Days to Make M Bouquets",
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Amazon", "Google"],
    xpReward: 35,
    estimatedTime: 30,
    statement: "Given bloom days, `m` bouquets, `k` adjacent flowers per bouquet, find minimum days needed. Return `-1` if impossible.",
    inputFormat: "First line: bloom days. Second line: m. Third line: k.",
    outputFormat: "A single integer — minimum days or -1.",
    constraints: "1 <= n <= 10^5\n1 <= bloomDay[i] <= 10^9\n1 <= m, k",
    examples: [
      { input: "1 10 3 10 2\n3\n1", output: "3", explanation: "After 3 days, 3 single-flower bouquets possible." },
      { input: "1 10 3 10 2\n3\n2", output: "-1", explanation: "Need 6 flowers for 3 bouquets of 2 but only 5 available." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int minDays(vector<int>& bloomDay, int m, int k) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int minDays(int[] bloomDay, int m, int k) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def minDays(self, bloomDay: List[int], m: int, k: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    minDays(bloomDay, m, k) {\n        // Write code here\n    }\n}",
      go: "func minDays(bloomDay []int, m int, k int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 10 3 10 2\n3\n1", expectedOutput: "3", isPublic: true },
      { input: "1 10 3 10 2\n3\n2", expectedOutput: "-1", isPublic: true }
    ]
  },
  {
    problemId: "maximum-candies-allocated",
    problemNumber: 44,
    title: "Maximum Candies Allocated to K Children",
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Amazon", "Google"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Split candy piles so each of `k` children gets equal max candies. Return the maximum amount each child can receive.",
    inputFormat: "First line: candy pile sizes. Second line: k.",
    outputFormat: "A single integer.",
    constraints: "1 <= candies.length <= 10^5\n1 <= candies[i] <= 10^7\n1 <= k <= 10^12",
    examples: [
      { input: "5 8 6\n3", output: "5", explanation: "Give 5 candies to each of 3 children." },
      { input: "2 5\n11", output: "0", explanation: "Cannot give 1 candy to 11 children with total=7<11." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int maximumCandies(vector<int>& candies, long long k) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int maximumCandies(int[] candies, long k) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def maximumCandies(self, candies: List[int], k: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    maximumCandies(candies, k) {\n        // Write code here\n    }\n}",
      go: "func maximumCandies(candies []int, k int64) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "5 8 6\n3", expectedOutput: "5", isPublic: true },
      { input: "2 5\n11", expectedOutput: "0", isPublic: true }
    ]
  },
  {
    problemId: "aggressive-cows",
    problemNumber: 45,
    title: "Aggressive Cows",
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Amazon", "SPOJ", "Codeforces"],
    xpReward: 35,
    estimatedTime: 35,
    statement: "Given `n` stall positions and `c` cows, place cows so the minimum distance between any two is maximized. Return the largest minimum distance.",
    inputFormat: "First line: n and c. Second line: stall positions.",
    outputFormat: "A single integer — largest minimum distance.",
    constraints: "2 <= n <= 10^5\n2 <= c <= n\n0 <= stalls[i] <= 10^9",
    examples: [
      { input: "5 3\n1 2 8 4 9", output: "3", explanation: "Cows at 1, 4, 9. Min distance = min(3,5) = 3." },
      { input: "6 4\n0 3 4 7 10 9", output: "3", explanation: "Optimal placement gives min gap of 3." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int aggressiveCows(vector<int>& stalls, int c) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int aggressiveCows(int[] stalls, int c) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def aggressiveCows(self, stalls: List[int], c: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    aggressiveCows(stalls, c) {\n        // Write code here\n    }\n}",
      go: "func aggressiveCows(stalls []int, c int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "5 3\n1 2 8 4 9", expectedOutput: "3", isPublic: true },
      { input: "6 4\n0 3 4 7 10 9", expectedOutput: "3", isPublic: true }
    ]
  },
  {
    problemId: "allocate-minimum-pages",
    problemNumber: 46,
    title: "Allocate Minimum Pages",
    difficulty: "Hard",
    topic: "Binary Search",
    companies: ["Amazon", "Flipkart", "Google", "Microsoft"],
    xpReward: 50,
    estimatedTime: 40,
    statement: "Allocate books to `m` students contiguously. Minimize the maximum pages any student reads. Return `-1` if impossible.",
    inputFormat: "First line: page counts. Second line: m.",
    outputFormat: "A single integer — minimum maximum pages or -1.",
    constraints: "1 <= pages.length <= 10^5\n1 <= pages[i] <= 10^6\n1 <= m",
    examples: [
      { input: "12 34 67 90\n2", output: "113", explanation: "[12,34,67] and [90]. Max = max(113,90) = 113." },
      { input: "15 17 20\n5", output: "-1", explanation: "Cannot allocate 3 books to 5 students." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int allocatePages(vector<int>& pages, int m) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int allocatePages(int[] pages, int m) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def allocatePages(self, pages: List[int], m: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    allocatePages(pages, m) {\n        // Write code here\n    }\n}",
      go: "func allocatePages(pages []int, m int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "12 34 67 90\n2", expectedOutput: "113", isPublic: true },
      { input: "15 17 20\n5", expectedOutput: "-1", isPublic: true }
    ]
  },

  // =====================================================================
  // === DYNAMIC PROGRAMMING (13 Problems) ===
  // =====================================================================
  {
    problemId: "climb-stairs",
    problemNumber: 47,
    title: "Climb Stairs",
    difficulty: "Easy",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Apple"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "You climb a staircase of `n` steps, taking 1 or 2 steps at a time. In how many distinct ways can you reach the top?",
    inputFormat: "A single integer `n`.",
    outputFormat: "A single integer — number of distinct ways.",
    constraints: "1 <= n <= 45",
    examples: [
      { input: "2", output: "2", explanation: "Two ways: 1+1 and 2." },
      { input: "3", output: "3", explanation: "Three ways: 1+1+1, 1+2, 2+1." }
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
      { input: "10", expectedOutput: "89", isPublic: false }
    ]
  },
  {
    problemId: "house-robber",
    problemNumber: 48,
    title: "House Robber",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Adobe"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Houses in a line, each with money. Cannot rob adjacent houses. Return the maximum money you can rob.",
    inputFormat: "A single line of space-separated integers (house values).",
    outputFormat: "A single integer — maximum robbed amount.",
    constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 400",
    examples: [
      { input: "1 2 3 1", output: "4", explanation: "Rob house 1 and 3: 1+3=4." },
      { input: "2 7 9 3 1", output: "12", explanation: "Rob house 1, 3, 5: 2+9+1=12." }
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
    companies: ["Amazon", "Microsoft", "LinkedIn"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "Houses arranged in a **circle**. Cannot rob adjacent houses. Return the maximum money you can rob.",
    inputFormat: "A single line of space-separated integers.",
    outputFormat: "A single integer — maximum robbed amount.",
    constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 1000",
    examples: [
      { input: "2 3 2", output: "3", explanation: "Cannot rob house 1 and 3 (circular adjacency)." },
      { input: "1 2 3 1", output: "4", explanation: "Rob house 1 and 3: 1+3=4." }
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
    problemId: "coin-change",
    problemNumber: 50,
    title: "Coin Change",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Google", "Facebook", "Microsoft"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "Given coins of different denominations and an amount, return the fewest coins needed to make the amount. Return `-1` if impossible.",
    inputFormat: "First line: coin denominations. Second line: amount.",
    outputFormat: "A single integer — fewest coins or -1.",
    constraints: "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31-1\n0 <= amount <= 10^4",
    examples: [
      { input: "1 5 6 9\n11", output: "2", explanation: "5+6=11, 2 coins." },
      { input: "2\n3", output: "-1", explanation: "Cannot make 3 with coin 2." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    coinChange(coins, amount) {\n        // Write code here\n    }\n}",
      go: "func coinChange(coins []int, amount int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 5 6 9\n11", expectedOutput: "2", isPublic: true },
      { input: "2\n3", expectedOutput: "-1", isPublic: true }
    ]
  },
  {
    problemId: "coin-change-ii",
    problemNumber: 51,
    title: "Coin Change II",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Microsoft", "Facebook"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "Return the number of combinations of coins that sum to the given amount. Infinite supply of each coin.",
    inputFormat: "First line: coin denominations. Second line: amount.",
    outputFormat: "A single integer — number of combinations.",
    constraints: "1 <= coins.length <= 300\n1 <= coins[i] <= 5000\n0 <= amount <= 5000",
    examples: [
      { input: "1 2 5\n5", output: "4", explanation: "5, 2+2+1, 2+1+1+1, 1+1+1+1+1." },
      { input: "2\n3", output: "0", explanation: "Cannot make 3 with coin 2." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int change(int amount, vector<int>& coins) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int change(int amount, int[] coins) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def change(self, amount: int, coins: List[int]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    change(amount, coins) {\n        // Write code here\n    }\n}",
      go: "func change(amount int, coins []int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 5\n5", expectedOutput: "4", isPublic: true },
      { input: "2\n3", expectedOutput: "0", isPublic: true }
    ]
  },
  {
    problemId: "01-knapsack",
    problemNumber: 52,
    title: "0/1 Knapsack Problem",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Flipkart"],
    xpReward: 35,
    estimatedTime: 35,
    statement: "Given `n` items with weights and values, and a knapsack of capacity `W`, find the maximum value that can be put in the knapsack (each item can be picked or not).",
    inputFormat: "First line: n and W. Second line: values. Third line: weights.",
    outputFormat: "A single integer — maximum value.",
    constraints: "1 <= n <= 1000\n1 <= W <= 1000\n1 <= values[i], weights[i] <= 1000",
    examples: [
      { input: "3 50\n60 100 120\n10 20 30", output: "220", explanation: "Items 2 and 3: 100+120=220, weight 20+30=50." },
      { input: "4 8\n1 2 3 5\n1 3 4 5", output: "5", explanation: "Best item that fits: value 5, weight 5." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int knapsack(int W, vector<int>& weights, vector<int>& values, int n) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int knapsack(int W, int[] weights, int[] values, int n) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def knapsack(self, W: int, weights: List[int], values: List[int], n: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    knapsack(W, weights, values, n) {\n        // Write code here\n    }\n}",
      go: "func knapsack(W int, weights []int, values []int, n int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 50\n60 100 120\n10 20 30", expectedOutput: "220", isPublic: true },
      { input: "4 8\n1 2 3 5\n1 3 4 5", expectedOutput: "5", isPublic: true }
    ]
  },
  {
    problemId: "subset-sum-equals-k",
    problemNumber: 53,
    title: "Subset Sum Equals K",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Given array `nums` and target `k`, return `true` if any subset sums to exactly `k`.",
    inputFormat: "First line: space-separated integers. Second line: k.",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= nums.length <= 20\n1 <= nums[i] <= 1000\n1 <= k <= 10^4",
    examples: [
      { input: "3 34 4 12 5 2\n9", output: "true", explanation: "{4,5} sums to 9." },
      { input: "3 34 4 12 5 2\n30", output: "false", explanation: "No subset sums to 30." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isSubsetSum(vector<int>& nums, int k) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isSubsetSum(int[] nums, int k) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isSubsetSum(self, nums: List[int], k: int) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isSubsetSum(nums, k) {\n        // Write code here\n    }\n}",
      go: "func isSubsetSum(nums []int, k int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 34 4 12 5 2\n9", expectedOutput: "true", isPublic: true },
      { input: "3 34 4 12 5 2\n30", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "partition-equal-subset-sum",
    problemNumber: 54,
    title: "Partition Equal Subset Sum",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Facebook", "Google", "Microsoft"],
    xpReward: 35,
    estimatedTime: 30,
    statement: "Return `true` if you can partition array `nums` into two subsets with equal sum.",
    inputFormat: "A single line of space-separated integers.",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= nums.length <= 200\n1 <= nums[i] <= 100",
    examples: [
      { input: "1 5 11 5", output: "true", explanation: "[1,5,5] and [11] both sum to 11." },
      { input: "1 2 3 5", output: "false", explanation: "Sum=11 (odd), partition impossible." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean canPartition(int[] nums) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def canPartition(self, nums: List[int]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    canPartition(nums) {\n        // Write code here\n    }\n}",
      go: "func canPartition(nums []int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 5 11 5", expectedOutput: "true", isPublic: true },
      { input: "1 2 3 5", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "unique-paths",
    problemNumber: 55,
    title: "Unique Paths",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "A robot on an `m x n` grid starts top-left and must reach bottom-right, moving only right or down. Return the number of unique paths.",
    inputFormat: "A single line with two integers m and n.",
    outputFormat: "A single integer — unique path count.",
    constraints: "1 <= m, n <= 100",
    examples: [
      { input: "3 7", output: "28", explanation: "28 unique paths for a 3x7 grid." },
      { input: "3 2", output: "3", explanation: "3 unique paths." }
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
  },
  {
    problemId: "minimum-path-sum",
    problemNumber: 56,
    title: "Minimum Path Sum",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Given an `m x n` grid of non-negative integers, find the path from top-left to bottom-right that minimizes the sum, moving only right or down.",
    inputFormat: "First line: m and n. Next m lines: n space-separated integers.",
    outputFormat: "A single integer — minimum path sum.",
    constraints: "1 <= m, n <= 200\n0 <= grid[i][j] <= 200",
    examples: [
      { input: "3 3\n1 3 1\n1 5 1\n4 2 1", output: "7", explanation: "Path 1→3→1→1→1 = 7." },
      { input: "2 3\n1 2 3\n4 5 6", output: "12", explanation: "Path 1→2→3→6 = 12." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int minPathSum(vector<vector<int>>& grid) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int minPathSum(int[][] grid) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def minPathSum(self, grid: List[List[int]]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    minPathSum(grid) {\n        // Write code here\n    }\n}",
      go: "func minPathSum(grid [][]int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 3\n1 3 1\n1 5 1\n4 2 1", expectedOutput: "7", isPublic: true },
      { input: "2 3\n1 2 3\n4 5 6", expectedOutput: "12", isPublic: true }
    ]
  },
  {
    problemId: "longest-common-subsequence",
    problemNumber: 57,
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Facebook"],
    xpReward: 35,
    estimatedTime: 35,
    statement: "Return the length of the longest common subsequence of `text1` and `text2`. Return `0` if none exists.",
    inputFormat: "First line: text1. Second line: text2.",
    outputFormat: "A single integer — LCS length.",
    constraints: "1 <= text1.length, text2.length <= 1000",
    examples: [
      { input: "abcde\nace", output: "3", explanation: "LCS is 'ace', length 3." },
      { input: "abc\ndef", output: "0", explanation: "No common subsequence." }
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
      { input: "abc\ndef", expectedOutput: "0", isPublic: true }
    ]
  },
  {
    problemId: "edit-distance",
    problemNumber: 58,
    title: "Edit Distance",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    companies: ["Google", "Amazon", "Microsoft", "Uber"],
    xpReward: 50,
    estimatedTime: 40,
    statement: "Return the minimum number of insert, delete, or replace operations to convert `word1` to `word2`.",
    inputFormat: "First line: word1. Second line: word2.",
    outputFormat: "A single integer — minimum edit distance.",
    constraints: "0 <= word1.length, word2.length <= 500",
    examples: [
      { input: "horse\nros", output: "3", explanation: "horse→rorse(replace h→r)→rose(remove r)→ros(remove e)." },
      { input: "intention\nexecution", output: "5", explanation: "5 operations needed." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int minDistance(String word1, String word2) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        # Write code here",
      javascript: "class Solution {\n    minDistance(word1, word2) {\n        // Write code here\n    }\n}",
      go: "func minDistance(word1 string, word2 string) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "horse\nros", expectedOutput: "3", isPublic: true },
      { input: "intention\nexecution", expectedOutput: "5", isPublic: true }
    ]
  },
  {
    problemId: "longest-increasing-subsequence",
    problemNumber: 59,
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    companies: ["Amazon", "Microsoft", "Google", "Facebook"],
    xpReward: 35,
    estimatedTime: 30,
    statement: "Return the length of the longest **strictly increasing** subsequence of array `nums`.",
    inputFormat: "A single line of space-separated integers.",
    outputFormat: "A single integer — LIS length.",
    constraints: "1 <= nums.length <= 2500\n-10^4 <= nums[i] <= 10^4",
    examples: [
      { input: "10 9 2 5 3 7 101 18", output: "4", explanation: "LIS is [2,3,7,101], length 4." },
      { input: "7 7 7 7 7 7 7", output: "1", explanation: "All same, LIS = 1." }
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
      { input: "7 7 7 7 7 7 7", expectedOutput: "1", isPublic: true }
    ]
  },

  // =====================================================================
  // === GRAPHS (14 Problems) ===
  // =====================================================================
  {
    problemId: "dfs-graph",
    problemNumber: 60,
    title: "Depth First Search (DFS)",
    difficulty: "Easy",
    topic: "Graphs",
    companies: ["Google", "Amazon", "Microsoft"],
    xpReward: 15,
    estimatedTime: 20,
    statement: "Given undirected graph with `n` nodes and edges, perform DFS from node `0` and return visit order. Process neighbors in ascending order.",
    inputFormat: "First line: n and e. Next e lines: u v (undirected edge).",
    outputFormat: "Space-separated DFS visit order.",
    constraints: "1 <= n <= 1000\n0 <= e <= 5000",
    examples: [
      { input: "5 4\n0 1\n0 2\n1 3\n1 4", output: "0 1 3 4 2", explanation: "DFS from 0 visits 0,1,3,4 then backtracks to visit 2." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> dfsOrder(int n, vector<vector<int>>& edges) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<Integer> dfsOrder(int n, int[][] edges) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def dfsOrder(self, n: int, edges: List[List[int]]) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    dfsOrder(n, edges) {\n        // Write code here\n    }\n}",
      go: "func dfsOrder(n int, edges [][]int) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "5 4\n0 1\n0 2\n1 3\n1 4", expectedOutput: "0 1 3 4 2", isPublic: true },
      { input: "3 2\n0 1\n1 2", expectedOutput: "0 1 2", isPublic: true }
    ]
  },
  {
    problemId: "bfs-graph",
    problemNumber: 61,
    title: "Breadth First Search (BFS)",
    difficulty: "Easy",
    topic: "Graphs",
    companies: ["Google", "Amazon", "Microsoft"],
    xpReward: 15,
    estimatedTime: 20,
    statement: "Given undirected graph, perform BFS from node `0` and return visit order. Process neighbors in ascending order.",
    inputFormat: "First line: n and e. Next e lines: u v (undirected edge).",
    outputFormat: "Space-separated BFS visit order.",
    constraints: "1 <= n <= 1000\n0 <= e <= 5000",
    examples: [
      { input: "5 4\n0 1\n0 2\n1 3\n1 4", output: "0 1 2 3 4", explanation: "BFS from 0: visit 0, then neighbors 1,2, then 1's neighbors 3,4." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> bfsOrder(int n, vector<vector<int>>& edges) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<Integer> bfsOrder(int n, int[][] edges) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def bfsOrder(self, n: int, edges: List[List[int]]) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    bfsOrder(n, edges) {\n        // Write code here\n    }\n}",
      go: "func bfsOrder(n int, edges [][]int) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "5 4\n0 1\n0 2\n1 3\n1 4", expectedOutput: "0 1 2 3 4", isPublic: true },
      { input: "3 2\n0 1\n1 2", expectedOutput: "0 1 2", isPublic: true }
    ]
  },
  {
    problemId: "undirected-graph-cycle",
    problemNumber: 62,
    title: "Undirected Graph Cycle Detection",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Detect if there is a cycle in an undirected graph with `n` nodes and `e` edges.",
    inputFormat: "First line: n and e. Next e lines: u v (undirected edge).",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= n <= 10^5\n0 <= e <= 10^5",
    examples: [
      { input: "5 5\n0 1\n1 2\n2 0\n1 3\n3 4", output: "true", explanation: "Cycle 0-1-2-0 exists." },
      { input: "4 3\n0 1\n1 2\n2 3", output: "false", explanation: "Path graph, no cycle." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool hasCycle(int n, vector<vector<int>>& edges) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean hasCycle(int n, int[][] edges) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def hasCycle(self, n: int, edges: List[List[int]]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    hasCycle(n, edges) {\n        // Write code here\n    }\n}",
      go: "func hasCycle(n int, edges [][]int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "5 5\n0 1\n1 2\n2 0\n1 3\n3 4", expectedOutput: "true", isPublic: true },
      { input: "4 3\n0 1\n1 2\n2 3", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "directed-graph-cycle",
    problemNumber: 63,
    title: "Directed Graph Cycle Detection",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Detect if there is a cycle in a directed graph with `n` nodes and `e` directed edges.",
    inputFormat: "First line: n and e. Next e lines: u v (directed edge from u to v).",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= n <= 10^5\n0 <= e <= 10^5",
    examples: [
      { input: "4 4\n0 1\n1 2\n2 3\n3 1", output: "true", explanation: "Cycle: 1→2→3→1." },
      { input: "3 3\n0 1\n1 2\n0 2", output: "false", explanation: "DAG, no cycle." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool hasCycle(int n, vector<vector<int>>& edges) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean hasCycle(int n, int[][] edges) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def hasCycle(self, n: int, edges: List[List[int]]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    hasCycle(n, edges) {\n        // Write code here\n    }\n}",
      go: "func hasCycle(n int, edges [][]int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "4 4\n0 1\n1 2\n2 3\n3 1", expectedOutput: "true", isPublic: true },
      { input: "3 3\n0 1\n1 2\n0 2", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "course-schedule",
    problemNumber: 64,
    title: "Course Schedule",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Amazon", "Google", "Facebook", "Microsoft"],
    xpReward: 35,
    estimatedTime: 30,
    statement: "Given `numCourses` and prerequisites `[ai, bi]` (must take bi before ai), return `true` if all courses can be finished.",
    inputFormat: "First line: numCourses and p. Next p lines: a b.",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000",
    examples: [
      { input: "2 1\n1 0", output: "true", explanation: "Take course 0 then 1." },
      { input: "2 2\n1 0\n0 1", output: "false", explanation: "Cycle: 0 depends on 1 and vice versa." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    canFinish(numCourses, prerequisites) {\n        // Write code here\n    }\n}",
      go: "func canFinish(numCourses int, prerequisites [][]int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "2 1\n1 0", expectedOutput: "true", isPublic: true },
      { input: "2 2\n1 0\n0 1", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "topological-sort",
    problemNumber: 65,
    title: "Topological Sort",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Given a DAG with `n` nodes and directed edges, return a valid topological ordering.",
    inputFormat: "First line: n and e. Next e lines: u v (directed edge from u to v).",
    outputFormat: "Space-separated topological order.",
    constraints: "2 <= n <= 10^4\n1 <= e <= 10^4",
    examples: [
      { input: "6 6\n5 2\n5 0\n4 0\n4 1\n2 3\n3 1", output: "4 5 2 3 1 0", explanation: "One valid topological order." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> topoSort(int n, vector<vector<int>>& edges) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<Integer> topoSort(int n, int[][] edges) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def topoSort(self, n: int, edges: List[List[int]]) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    topoSort(n, edges) {\n        // Write code here\n    }\n}",
      go: "func topoSort(n int, edges [][]int) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "6 6\n5 2\n5 0\n4 0\n4 1\n2 3\n3 1", expectedOutput: "4 5 2 3 1 0", isPublic: true },
      { input: "4 3\n0 1\n1 2\n2 3", expectedOutput: "0 1 2 3", isPublic: true }
    ]
  },
  {
    problemId: "course-schedule-ii",
    problemNumber: 66,
    title: "Course Schedule II",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Amazon", "Google", "Facebook", "Microsoft"],
    xpReward: 35,
    estimatedTime: 35,
    statement: "Return an ordering of courses to finish all, or empty if impossible (cyclic dependencies).",
    inputFormat: "First line: numCourses and p. Next p lines: a b (a depends on b).",
    outputFormat: "Space-separated course order, or empty if impossible.",
    constraints: "1 <= numCourses <= 2000",
    examples: [
      { input: "4 4\n1 0\n2 0\n3 1\n3 2", output: "0 2 1 3", explanation: "Valid topological order." },
      { input: "2 2\n1 0\n0 1", output: "[]", explanation: "Cycle exists, no valid ordering. Return empty array." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int[] findOrder(int numCourses, int[][] prerequisites) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:\n        // Write code here",
      javascript: "class Solution {\n    findOrder(numCourses, prerequisites) {\n        // Write code here\n    }\n}",
      go: "func findOrder(numCourses int, prerequisites [][]int) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "4 4\n1 0\n2 0\n3 1\n3 2", expectedOutput: "0 2 1 3", isPublic: true },
      { input: "2 2\n1 0\n0 1", expectedOutput: "[]", isPublic: true }
    ]
  },
  {
    problemId: "bipartite-graph",
    problemNumber: 67,
    title: "Bipartite Graph Check",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Determine if an undirected graph is bipartite (nodes can be split into two independent sets where all edges go between them).",
    inputFormat: "First line: n and e. Next e lines: u v (undirected edge).",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= n <= 100",
    examples: [
      { input: "4 4\n0 1\n1 2\n2 3\n3 0", output: "true", explanation: "{0,2} and {1,3} are valid sets." },
      { input: "3 3\n0 1\n1 2\n2 0", output: "false", explanation: "Odd cycle — not bipartite." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isBipartite(vector<vector<int>>& graph) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isBipartite(int[][] graph) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isBipartite(self, graph: List[List[int]]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isBipartite(graph) {\n        // Write code here\n    }\n}",
      go: "func isBipartite(graph [][]int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "4 4\n0 1\n1 2\n2 3\n3 0", expectedOutput: "true", isPublic: true },
      { input: "3 3\n0 1\n1 2\n2 0", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "possible-bipartition",
    problemNumber: 68,
    title: "Possible Bipartition",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Amazon", "Google"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Split `n` people into two groups where no two people who dislike each other are in the same group. Return `true` if possible.",
    inputFormat: "First line: n and d. Next d lines: a b (a and b dislike each other).",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= n <= 2000\n0 <= dislikes.length <= 10^4",
    examples: [
      { input: "4 2\n1 2\n1 3", output: "true", explanation: "Group 1: [1,4], Group 2: [2,3]." },
      { input: "3 3\n1 2\n1 3\n2 3", output: "false", explanation: "Triangle of dislikes — impossible." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool possibleBipartition(int n, vector<vector<int>>& dislikes) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean possibleBipartition(int n, int[][] dislikes) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    possibleBipartition(n, dislikes) {\n        // Write code here\n    }\n}",
      go: "func possibleBipartition(n int, dislikes [][]int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "4 2\n1 2\n1 3", expectedOutput: "true", isPublic: true },
      { input: "3 3\n1 2\n1 3\n2 3", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "number-of-provinces",
    problemNumber: 69,
    title: "Number of Provinces",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Amazon", "Google", "Microsoft", "Facebook"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Given `n x n` adjacency matrix `isConnected`, return the number of connected provinces (components).",
    inputFormat: "First line: n. Next n lines: n space-separated 0/1 values.",
    outputFormat: "A single integer — number of provinces.",
    constraints: "1 <= n <= 200\nisConnected[i][i] == 1",
    examples: [
      { input: "3\n1 1 0\n1 1 0\n0 0 1", output: "2", explanation: "Cities 0,1 form province 1. City 2 forms province 2." },
      { input: "3\n1 0 0\n0 1 0\n0 0 1", output: "3", explanation: "All isolated." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int findCircleNum(vector<vector<int>>& isConnected) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int findCircleNum(int[][] isConnected) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def findCircleNum(self, isConnected: List[List[int]]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    findCircleNum(isConnected) {\n        // Write code here\n    }\n}",
      go: "func findCircleNum(isConnected [][]int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3\n1 1 0\n1 1 0\n0 0 1", expectedOutput: "2", isPublic: true },
      { input: "3\n1 0 0\n0 1 0\n0 0 1", expectedOutput: "3", isPublic: true }
    ]
  },
  {
    problemId: "number-of-islands",
    problemNumber: 70,
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Amazon", "Google", "Microsoft", "Bloomberg"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Given binary grid with 1s (land) and 0s (water), return the number of islands (connected land regions).",
    inputFormat: "First line: m and n. Next m lines: n space-separated 0/1 values.",
    outputFormat: "A single integer — number of islands.",
    constraints: "1 <= m, n <= 300\ngrid[i][j] is 0 or 1.",
    examples: [
      { input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", output: "1", explanation: "All 1s connected — 1 island." },
      { input: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", output: "3", explanation: "3 separate islands." }
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
    problemId: "dijkstra-algorithm",
    problemNumber: 71,
    title: "Dijkstra Algorithm",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Amazon", "Google", "Microsoft", "Uber"],
    xpReward: 35,
    estimatedTime: 35,
    statement: "Find shortest paths from node `0` to all other nodes in a weighted undirected graph. Return `-1` for unreachable nodes.",
    inputFormat: "First line: n and e. Next e lines: u v w (edge with weight w).",
    outputFormat: "Space-separated shortest distances from node 0.",
    constraints: "1 <= n <= 10^4\n1 <= e <= 10^5\n1 <= w <= 10^4",
    examples: [
      { input: "5 6\n0 1 4\n0 2 1\n2 1 2\n1 3 1\n2 3 5\n3 4 3", output: "0 3 1 4 7", explanation: "Shortest paths: 0=0, 1=3, 2=1, 3=4, 4=7." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& adj) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int[] dijkstra(int n, List<List<int[]>> adj) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def dijkstra(self, n: int, adj: List[List[List[int]]]) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    dijkstra(n, adj) {\n        // Write code here\n    }\n}",
      go: "func dijkstra(n int, adj [][][2]int) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "5 6\n0 1 4\n0 2 1\n2 1 2\n1 3 1\n2 3 5\n3 4 3", expectedOutput: "0 3 1 4 7", isPublic: true }
    ]
  },
  {
    problemId: "shortest-path-1-to-n",
    problemNumber: 72,
    title: "Shortest Path from 1 to N",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Amazon", "Google"],
    xpReward: 30,
    estimatedTime: 20,
    statement: "Starting from 1, reach `n` using two operations: add 1 or multiply by 3. Find the minimum number of operations.",
    inputFormat: "A single integer `n`.",
    outputFormat: "A single integer — minimum operations.",
    constraints: "1 <= n <= 10^6",
    examples: [
      { input: "9", output: "2", explanation: "1 → 3 (×3) → 9 (×3). 2 operations." },
      { input: "5", output: "3", explanation: "1 → 3 → 4 → 5. 3 operations." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int minOps(int n) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int minOps(int n) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def minOps(self, n: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    minOps(n) {\n        // Write code here\n    }\n}",
      go: "func minOps(n int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "9", expectedOutput: "2", isPublic: true },
      { input: "5", expectedOutput: "3", isPublic: true }
    ]
  },
  {
    problemId: "network-delay-time",
    problemNumber: 73,
    title: "Network Delay Time",
    difficulty: "Medium",
    topic: "Graphs",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 35,
    estimatedTime: 35,
    statement: "Send signal from node `k` in a weighted directed network. Return the minimum time for all `n` nodes to receive it, or `-1` if impossible.",
    inputFormat: "First line: n, e, k. Next e lines: u v w.",
    outputFormat: "A single integer — time or -1.",
    constraints: "1 <= k <= n <= 100\n1 <= times.length <= 6000",
    examples: [
      { input: "4 4 2\n2 1 1\n2 3 1\n3 4 1\n1 4 4", output: "2", explanation: "From node 2: all nodes reached within 2 units." },
      { input: "2 1 1\n1 2 1", output: "1", explanation: "Node 1 reaches node 2 in 1." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int networkDelayTime(vector<vector<int>>& times, int n, int k) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int networkDelayTime(int[][] times, int n, int k) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:\n        # Write code here",
      javascript: "class Solution {\n    networkDelayTime(times, n, k) {\n        // Write code here\n    }\n}",
      go: "func networkDelayTime(times [][]int, n int, k int) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "4 4 2\n2 1 1\n2 3 1\n3 4 1\n1 4 4", expectedOutput: "2", isPublic: true },
      { input: "2 1 1\n1 2 1", expectedOutput: "1", isPublic: true }
    ]
  },

  // =====================================================================
  // === TREES (22 Problems) ===
  // =====================================================================
  {
    problemId: "root-equals-sum-of-children",
    problemNumber: 74,
    title: "Root Equals Sum of Children",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Google"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given a binary tree with exactly 3 nodes (root, left child, right child), check if root value equals the sum of its two children.",
    inputFormat: "A single line with three integers: root left right.",
    outputFormat: "`true` or `false`.",
    constraints: "-100 <= Node.val <= 100",
    examples: [
      { input: "10 4 6", output: "true", explanation: "4+6=10." },
      { input: "5 3 1", output: "false", explanation: "3+1=4 ≠ 5." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool checkTree(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean checkTree(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def checkTree(self, root: Optional[TreeNode]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    checkTree(root) {\n        // Write code here\n    }\n}",
      go: "func checkTree(root *TreeNode) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "10 4 6", expectedOutput: "true", isPublic: true },
      { input: "5 3 1", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "inorder-traversal",
    problemNumber: 75,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Return the **inorder traversal** (Left → Root → Right) of a binary tree.",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "Space-separated inorder values.",
    constraints: "0 <= nodes <= 100\n-100 <= Node.val <= 100",
    examples: [
      { input: "1 -1 2 3", output: "1 3 2", explanation: "Inorder: 1, then left of 2 = 3, then 2." },
      { input: "1 2 3 4 5", output: "4 2 5 1 3", explanation: "Standard inorder." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> inorderTraversal(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    inorderTraversal(root) {\n        // Write code here\n    }\n}",
      go: "func inorderTraversal(root *TreeNode) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 -1 2 3", expectedOutput: "1 3 2", isPublic: true },
      { input: "1 2 3 4 5", expectedOutput: "4 2 5 1 3", isPublic: true }
    ]
  },
  {
    problemId: "preorder-traversal",
    problemNumber: 76,
    title: "Binary Tree Preorder Traversal",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Return the **preorder traversal** (Root → Left → Right) of a binary tree.",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "Space-separated preorder values.",
    constraints: "0 <= nodes <= 100",
    examples: [
      { input: "1 -1 2 3", output: "1 2 3", explanation: "Preorder: 1, then right subtree (2→3)." },
      { input: "1 2 3 4 5", output: "1 2 4 5 3", explanation: "Standard preorder." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> preorderTraversal(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<Integer> preorderTraversal(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    preorderTraversal(root) {\n        // Write code here\n    }\n}",
      go: "func preorderTraversal(root *TreeNode) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 -1 2 3", expectedOutput: "1 2 3", isPublic: true },
      { input: "1 2 3 4 5", expectedOutput: "1 2 4 5 3", isPublic: true }
    ]
  },
  {
    problemId: "postorder-traversal",
    problemNumber: 77,
    title: "Binary Tree Postorder Traversal",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Return the **postorder traversal** (Left → Right → Root) of a binary tree.",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "Space-separated postorder values.",
    constraints: "0 <= nodes <= 100",
    examples: [
      { input: "1 -1 2 3", output: "3 2 1", explanation: "Postorder: left=none, right subtree = 3 then 2, root = 1." },
      { input: "1 2 3 4 5", output: "4 5 2 3 1", explanation: "Standard postorder." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> postorderTraversal(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<Integer> postorderTraversal(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    postorderTraversal(root) {\n        // Write code here\n    }\n}",
      go: "func postorderTraversal(root *TreeNode) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 -1 2 3", expectedOutput: "3 2 1", isPublic: true },
      { input: "1 2 3 4 5", expectedOutput: "4 5 2 3 1", isPublic: true }
    ]
  },
  {
    problemId: "level-order-traversal",
    problemNumber: 78,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Amazon", "Google", "Microsoft", "Facebook"],
    xpReward: 20,
    estimatedTime: 20,
    statement: "Return level order traversal with each level on a separate line.",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "Each level values on a new line, space-separated.",
    constraints: "0 <= nodes <= 2000\n-1000 <= Node.val <= 1000",
    examples: [
      { input: "3 9 20 -1 -1 15 7", output: "3\n9 20\n15 7", explanation: "Level 0: 3, Level 1: 9,20, Level 2: 15,7." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        # Write code here",
      javascript: "class Solution {\n    levelOrder(root) {\n        // Write code here\n    }\n}",
      go: "func levelOrder(root *TreeNode) [][]int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 9 20 -1 -1 15 7", expectedOutput: "3\n9 20\n15 7", isPublic: true }
    ]
  },
  {
    problemId: "level-order-traversal-ii",
    problemNumber: 79,
    title: "Binary Tree Level Order Traversal II",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Amazon", "Google", "Microsoft"],
    xpReward: 20,
    estimatedTime: 20,
    statement: "Return **bottom-up** level order traversal (leaf level first).",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "Each level values from bottom to top, space-separated per line.",
    constraints: "0 <= nodes <= 2000",
    examples: [
      { input: "3 9 20 -1 -1 15 7", output: "15 7\n9 20\n3", explanation: "Deepest level first." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<vector<int>> levelOrderBottom(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<List<Integer>> levelOrderBottom(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def levelOrderBottom(self, root: Optional[TreeNode]) -> List[List[int]]:\n        # Write code here",
      javascript: "class Solution {\n    levelOrderBottom(root) {\n        // Write code here\n    }\n}",
      go: "func levelOrderBottom(root *TreeNode) [][]int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 9 20 -1 -1 15 7", expectedOutput: "15 7\n9 20\n3", isPublic: true }
    ]
  },
  {
    problemId: "zigzag-level-order",
    problemNumber: 80,
    title: "Binary Tree Zigzag Level Order Traversal",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Amazon", "Google", "Facebook", "Microsoft"],
    xpReward: 25,
    estimatedTime: 25,
    statement: "Return zigzag level order traversal — alternating left-to-right and right-to-left between levels.",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "Each level on a new line, alternating direction.",
    constraints: "0 <= nodes <= 2000",
    examples: [
      { input: "3 9 20 -1 -1 15 7", output: "3\n20 9\n15 7", explanation: "Level 0 L→R: 3. Level 1 R→L: 20,9. Level 2 L→R: 15,7." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        # Write code here",
      javascript: "class Solution {\n    zigzagLevelOrder(root) {\n        // Write code here\n    }\n}",
      go: "func zigzagLevelOrder(root *TreeNode) [][]int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 9 20 -1 -1 15 7", expectedOutput: "3\n20 9\n15 7", isPublic: true }
    ]
  },
  {
    problemId: "deepest-leaves-sum",
    problemNumber: 81,
    title: "Deepest Leaves Sum",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Amazon", "Google"],
    xpReward: 20,
    estimatedTime: 20,
    statement: "Return the sum of values of the deepest leaves.",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "A single integer — sum of deepest leaves.",
    constraints: "1 <= nodes <= 10^4\n1 <= Node.val <= 100",
    examples: [
      { input: "1 2 3 4 5 -1 6 7 -1 -1 -1 -1 8", output: "15", explanation: "Deepest leaves: 7, 8. Sum = 15." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int deepestLeavesSum(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int deepestLeavesSum(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def deepestLeavesSum(self, root: Optional[TreeNode]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    deepestLeavesSum(root) {\n        // Write code here\n    }\n}",
      go: "func deepestLeavesSum(root *TreeNode) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 4 5 -1 6 7 -1 -1 -1 -1 8", expectedOutput: "15", isPublic: true }
    ]
  },
  {
    problemId: "left-view-binary-tree",
    problemNumber: 82,
    title: "Left View of Binary Tree",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Amazon", "Google", "Microsoft", "Flipkart"],
    xpReward: 20,
    estimatedTime: 20,
    statement: "Return the values visible from the **left side** of the binary tree, ordered top to bottom.",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "Space-separated left view values.",
    constraints: "0 <= nodes <= 10^4",
    examples: [
      { input: "1 2 3 -1 5 -1 4", output: "1 2 5", explanation: "Leftmost at each level: 1, 2, 5." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> leftView(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<Integer> leftView(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def leftView(self, root) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    leftView(root) {\n        // Write code here\n    }\n}",
      go: "func leftView(root *TreeNode) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 -1 5 -1 4", expectedOutput: "1 2 5", isPublic: true }
    ]
  },
  {
    problemId: "right-view-binary-tree",
    problemNumber: 83,
    title: "Right View of Binary Tree",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Amazon", "Facebook", "Google", "Microsoft"],
    xpReward: 20,
    estimatedTime: 20,
    statement: "Return the values visible from the **right side** of the binary tree, ordered top to bottom.",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "Space-separated right view values.",
    constraints: "0 <= nodes <= 100",
    examples: [
      { input: "1 2 3 -1 5 -1 4", output: "1 3 4", explanation: "Rightmost at each level: 1, 3, 4." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> rightSideView(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<Integer> rightSideView(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    rightSideView(root) {\n        // Write code here\n    }\n}",
      go: "func rightSideView(root *TreeNode) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 -1 5 -1 4", expectedOutput: "1 3 4", isPublic: true }
    ]
  },
  {
    problemId: "top-view-binary-tree",
    problemNumber: 84,
    title: "Top View of Binary Tree",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Amazon", "Flipkart", "Microsoft"],
    xpReward: 25,
    estimatedTime: 25,
    statement: "Return the nodes visible from the **top** of the binary tree, from leftmost to rightmost horizontal distance.",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "Space-separated top view from left to right.",
    constraints: "1 <= nodes <= 10^5",
    examples: [
      { input: "1 2 3 4 5 6 7", output: "4 2 1 3 7", explanation: "At each horizontal distance, pick topmost node." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> topView(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<Integer> topView(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def topView(self, root) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    topView(root) {\n        // Write code here\n    }\n}",
      go: "func topView(root *TreeNode) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 4 5 6 7", expectedOutput: "4 2 1 3 7", isPublic: true }
    ]
  },
  {
    problemId: "bottom-view-binary-tree",
    problemNumber: 85,
    title: "Bottom View of Binary Tree",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Amazon", "Flipkart", "Microsoft"],
    xpReward: 25,
    estimatedTime: 25,
    statement: "Return the nodes visible from the **bottom** (deepest node at each horizontal distance).",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "Space-separated bottom view from leftmost to rightmost HD.",
    constraints: "1 <= nodes <= 10^5",
    examples: [
      { input: "20 8 22 5 3 4 25 -1 -1 10 14", output: "5 10 4 14 25", explanation: "Bottom-most node at each HD." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> bottomView(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<Integer> bottomView(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def bottomView(self, root) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    bottomView(root) {\n        // Write code here\n    }\n}",
      go: "func bottomView(root *TreeNode) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "20 8 22 5 3 4 25 -1 -1 10 14", expectedOutput: "5 10 4 14 25", isPublic: true }
    ]
  },
  {
    problemId: "boundary-traversal",
    problemNumber: 86,
    title: "Boundary Traversal of Binary Tree",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Amazon", "Flipkart", "Microsoft"],
    xpReward: 30,
    estimatedTime: 30,
    statement: "Return boundary traversal anticlockwise: left boundary (excl. leaves) + all leaves (L→R) + right boundary reversed (excl. leaves).",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "Space-separated boundary node values.",
    constraints: "1 <= nodes <= 10^4",
    examples: [
      { input: "1 2 3 4 5 6 7 -1 -1 8 9 -1 -1 -1 -1", output: "1 2 4 8 9 6 7 3", explanation: "Left: 1,2,4. Leaves: 8,9,6,7. Right reversed: 3." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    vector<int> boundary(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public List<Integer> boundary(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def boundary(self, root) -> List[int]:\n        # Write code here",
      javascript: "class Solution {\n    boundary(root) {\n        // Write code here\n    }\n}",
      go: "func boundary(root *TreeNode) []int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 4 5 6 7 -1 -1 8 9 -1 -1 -1 -1", expectedOutput: "1 2 4 8 9 6 7 3", isPublic: true }
    ]
  },
  {
    problemId: "maximum-depth-binary-tree",
    problemNumber: 87,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Google", "Amazon", "Microsoft", "Spotify"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Return the maximum depth (number of nodes along the longest root-to-leaf path).",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "A single integer.",
    constraints: "0 <= nodes <= 10^4\n-100 <= Node.val <= 100",
    examples: [
      { input: "3 9 20 -1 -1 15 7", output: "3", explanation: "Deepest path: 3→20→15 or 3→20→7, depth = 3." },
      { input: "1 -1 2", output: "2", explanation: "Path 1→2." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public int maxDepth(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        # Write code here",
      javascript: "class Solution {\n    maxDepth(root) {\n        // Write code here\n    }\n}",
      go: "func maxDepth(root *TreeNode) int {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 9 20 -1 -1 15 7", expectedOutput: "3", isPublic: true },
      { input: "1 -1 2", expectedOutput: "2", isPublic: true }
    ]
  },
  {
    problemId: "balanced-binary-tree",
    problemNumber: 88,
    title: "Balanced Binary Tree",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Microsoft", "Google", "Facebook"],
    xpReward: 15,
    estimatedTime: 20,
    statement: "Determine if the binary tree is **height-balanced** (subtree heights differ by at most 1 at every node).",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "`true` or `false`.",
    constraints: "0 <= nodes <= 5000",
    examples: [
      { input: "3 9 20 -1 -1 15 7", output: "true", explanation: "Height difference at every node is at most 1." },
      { input: "1 2 2 3 3 -1 -1 4 4", output: "false", explanation: "Height difference > 1 at root." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isBalanced(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isBalanced(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isBalanced(self, root: Optional[TreeNode]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isBalanced(root) {\n        // Write code here\n    }\n}",
      go: "func isBalanced(root *TreeNode) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 9 20 -1 -1 15 7", expectedOutput: "true", isPublic: true },
      { input: "1 2 2 3 3 -1 -1 4 4", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "invert-binary-tree",
    problemNumber: 89,
    title: "Invert Binary Tree",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Google", "Amazon", "Apple"],
    xpReward: 15,
    estimatedTime: 10,
    statement: "Invert the binary tree (swap left and right subtrees at every node) and return root.",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "Level-order output of inverted tree.",
    constraints: "0 <= nodes <= 100",
    examples: [
      { input: "4 2 7 1 3 6 9", output: "4 7 2 9 6 3 1", explanation: "All left and right children swapped." },
      { input: "2 1 3", output: "2 3 1", explanation: "Children swapped." }
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
    problemId: "mirror-tree",
    problemNumber: 90,
    title: "Mirror Tree",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Microsoft"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Check if a binary tree is a mirror of itself (i.e., left subtree is mirror image of right subtree).",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "`true` if mirror, `false` otherwise.",
    constraints: "1 <= nodes <= 1000",
    examples: [
      { input: "1 2 2 3 4 4 3", output: "true", explanation: "Left and right subtrees are mirror images." },
      { input: "1 2 2 -1 3 -1 3", output: "false", explanation: "Not symmetric." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isMirror(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isMirror(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isMirror(self, root) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isMirror(root) {\n        // Write code here\n    }\n}",
      go: "func isMirror(root *TreeNode) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 2 3 4 4 3", expectedOutput: "true", isPublic: true },
      { input: "1 2 2 -1 3 -1 3", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "same-tree",
    problemNumber: 91,
    title: "Same Tree",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Microsoft", "Apple"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Check if two binary trees `p` and `q` are structurally identical with the same node values.",
    inputFormat: "First line: level-order tree p. Second line: level-order tree q.",
    outputFormat: "`true` or `false`.",
    constraints: "0 <= nodes <= 100\n-10^4 <= Node.val <= 10^4",
    examples: [
      { input: "1 2 3\n1 2 3", output: "true", explanation: "Both trees identical." },
      { input: "1 2\n1 -1 2", output: "false", explanation: "Different structure." }
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
      { input: "1 2\n1 -1 2", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "symmetric-tree",
    problemNumber: 92,
    title: "Symmetric Tree",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Microsoft", "Apple", "Google"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Check whether a binary tree is **symmetric** around its center.",
    inputFormat: "A single line with level-order representation (-1 for null).",
    outputFormat: "`true` or `false`.",
    constraints: "1 <= nodes <= 1000",
    examples: [
      { input: "1 2 2 3 4 4 3", output: "true", explanation: "Tree is symmetric." },
      { input: "1 2 2 -1 3 -1 3", output: "false", explanation: "Not symmetric." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isSymmetric(TreeNode* root) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isSymmetric(TreeNode root) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isSymmetric(self, root: Optional[TreeNode]) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isSymmetric(root) {\n        // Write code here\n    }\n}",
      go: "func isSymmetric(root *TreeNode) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 2 3 4 4 3", expectedOutput: "true", isPublic: true },
      { input: "1 2 2 -1 3 -1 3", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "delete-leaves-given-value",
    problemNumber: 93,
    title: "Delete Leaves With Given Value",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Amazon", "Google"],
    xpReward: 25,
    estimatedTime: 25,
    statement: "Given binary tree and target, repeatedly delete all leaf nodes with the target value until no more exist.",
    inputFormat: "First line: level-order tree. Second line: target.",
    outputFormat: "Level-order output of resulting tree.",
    constraints: "1 <= nodes <= 3000\n1 <= target <= 1000",
    examples: [
      { input: "1 2 3 2 -1 2 4\n2", output: "1 -1 3 -1 4", explanation: "Delete leaf 2s; node 2 becoming a leaf is also removed." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    TreeNode* removeLeafNodes(TreeNode* root, int target) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public TreeNode removeLeafNodes(TreeNode root, int target) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def removeLeafNodes(self, root: Optional[TreeNode], target: int) -> Optional[TreeNode]:\n        # Write code here",
      javascript: "class Solution {\n    removeLeafNodes(root, target) {\n        // Write code here\n    }\n}",
      go: "func removeLeafNodes(root *TreeNode, target int) *TreeNode {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 2 -1 2 4\n2", expectedOutput: "1 -1 3 -1 4", isPublic: true }
    ]
  },
  {
    problemId: "path-sum",
    problemNumber: 94,
    title: "Path Sum",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Google", "Microsoft", "Apple"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Return `true` if the tree has a root-to-leaf path summing to `targetSum`.",
    inputFormat: "First line: level-order tree. Second line: targetSum.",
    outputFormat: "`true` or `false`.",
    constraints: "0 <= nodes <= 5000\n-1000 <= Node.val, targetSum <= 1000",
    examples: [
      { input: "5 4 8 11 -1 13 4 7 2 -1 -1 -1 -1 -1 1\n22", output: "true", explanation: "Path 5→4→11→2 = 22." },
      { input: "1 2 3\n5", output: "false", explanation: "No path sums to 5." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool hasPathSum(TreeNode* root, int targetSum) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean hasPathSum(TreeNode root, int targetSum) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    hasPathSum(root, targetSum) {\n        // Write code here\n    }\n}",
      go: "func hasPathSum(root *TreeNode, targetSum int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "5 4 8 11 -1 13 4 7 2 -1 -1 -1 -1 -1 1\n22", expectedOutput: "true", isPublic: true },
      { input: "1 2 3\n5", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "identical-tree",
    problemNumber: 95,
    title: "Identical Tree",
    difficulty: "Easy",
    topic: "Trees",
    companies: ["Amazon", "Microsoft", "Google"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Check if two binary trees are **identical** in both structure and node values.",
    inputFormat: "First line: level-order tree 1. Second line: level-order tree 2.",
    outputFormat: "`true` if identical, `false` otherwise.",
    constraints: "0 <= nodes <= 100",
    examples: [
      { input: "1 2 3\n1 2 3", output: "true", explanation: "Identical structure and values." },
      { input: "1 2\n1 2 3", output: "false", explanation: "Different structure." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isIdentical(TreeNode* root1, TreeNode* root2) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isIdentical(TreeNode root1, TreeNode root2) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isIdentical(self, root1, root2) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isIdentical(root1, root2) {\n        // Write code here\n    }\n}",
      go: "func isIdentical(root1 *TreeNode, root2 *TreeNode) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3\n1 2 3", expectedOutput: "true", isPublic: true },
      { input: "1 2\n1 2 3", expectedOutput: "false", isPublic: true }
    ]
  },

  // =====================================================================
  // === STRINGS (3 Problems) ===
  // =====================================================================
  {
    problemId: "valid-anagram",
    problemNumber: 96,
    title: "Valid Anagram",
    difficulty: "Easy",
    topic: "Strings",
    companies: ["Google", "Amazon", "Facebook", "Microsoft"],
    xpReward: 10,
    estimatedTime: 10,
    statement: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    inputFormat: "A single line containing two space-separated strings `s` and `t`.",
    outputFormat: "`true` if t is an anagram of s, otherwise `false`.",
    constraints: "1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters.",
    examples: [
      { input: "anagram nagaram", output: "true", explanation: "All characters in 'anagram' can be rearranged to form 'nagaram'." },
      { input: "rat car", output: "false", explanation: "The characters do not match." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean isAnagram(String s, String t) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    isAnagram(s, t) {\n        // Write code here\n    }\n}",
      go: "func isAnagram(s string, t string) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "anagram nagaram", expectedOutput: "true", isPublic: true },
      { input: "rat car", expectedOutput: "false", isPublic: true },
      { input: "a b", expectedOutput: "false", isPublic: false },
      { input: "ab ba", expectedOutput: "true", isPublic: false }
    ]
  },
  {
    problemId: "group-anagrams",
    problemNumber: 97,
    title: "Group Anagrams",
    difficulty: "Medium",
    topic: "Strings",
    companies: ["Amazon", "Google", "Microsoft", "eBay"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Given an array of strings `strs`, group the **anagrams** together. You can return the answer in any order.",
    inputFormat: "A single line containing space-separated strings.",
    outputFormat: "Groups of anagrams. Each group should have its words space-separated on a new line. The groups and the words inside them should be sorted alphabetically.",
    constraints: "1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100\nstrs[i] consists of lowercase English letters.",
    examples: [
      { input: "eat tea tan ate nat bat", output: "ate eat tea\nbat\nnat tan", explanation: "Grouping anagrams: {ate, eat, tea}, {bat}, {nat, tan}." }
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
      { input: "a", expectedOutput: "a", isPublic: true },
      { input: "", expectedOutput: "", isPublic: false }
    ]
  },
  {
    problemId: "longest-palindromic-substring",
    problemNumber: 98,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topic: "Strings",
    companies: ["Amazon", "Google", "Microsoft", "Adobe"],
    xpReward: 35,
    estimatedTime: 30,
    statement: "Given a string `s`, return the **longest palindromic substring** in `s`.",
    inputFormat: "A single line containing the string `s`.",
    outputFormat: "A single line containing the longest palindromic substring.",
    constraints: "1 <= s.length <= 1000\ns consists of only digits and English letters.",
    examples: [
      { input: "babad", output: "bab", explanation: "'aba' is also a valid answer." },
      { input: "cbbd", output: "bb", explanation: "'bb' is the longest palindromic substring." }
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
      { input: "cbbd", expectedOutput: "bb", isPublic: true },
      { input: "a", expectedOutput: "a", isPublic: false }
    ]
  },

  // =====================================================================
  // === LINKED LIST (4 Problems) ===
  // =====================================================================
  {
    problemId: "reverse-linked-list",
    problemNumber: 99,
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    companies: ["Amazon", "Google", "Microsoft", "Apple"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    inputFormat: "A single line containing space-separated integers representing the node values of the linked list.",
    outputFormat: "A single line containing space-separated integers representing the reversed linked list.",
    constraints: "The number of nodes in the list is the range [0, 5000].\n-5000 <= Node.val <= 5000",
    examples: [
      { input: "1 2 3 4 5", output: "5 4 3 2 1", explanation: "Reversing 1->2->3->4->5 yields 5->4->3->2->1." },
      { input: "1 2", output: "2 1", explanation: "Reversing 1->2 yields 2->1." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Write code here",
      javascript: "class Solution {\n    reverseList(head) {\n        // Write code here\n    }\n}",
      go: "func reverseList(head *ListNode) *ListNode {\n    // Write code here\n}"
    },
    testCases: [
      { input: "1 2 3 4 5", expectedOutput: "5 4 3 2 1", isPublic: true },
      { input: "1 2", expectedOutput: "2 1", isPublic: true },
      { input: "", expectedOutput: "", isPublic: false }
    ]
  },
  {
    problemId: "merge-two-sorted-lists",
    problemNumber: 100,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    topic: "Linked List",
    companies: ["Amazon", "Google", "Microsoft", "TCS"],
    xpReward: 15,
    estimatedTime: 15,
    statement: "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.",
    inputFormat: "First line: space-separated integers representing list1.\nSecond line: space-separated integers representing list2.",
    outputFormat: "A single line containing space-separated integers representing the merged list.",
    constraints: "The number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100\nBoth lists are sorted in non-decreasing order.",
    examples: [
      { input: "1 2 4\n1 3 4", output: "1 1 2 3 4 4", explanation: "Merging [1,2,4] and [1,3,4] yields [1,1,2,3,4,4]." }
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
    problemId: "linked-list-cycle",
    problemNumber: 101,
    title: "Linked List Cycle",
    difficulty: "Easy",
    topic: "Linked List",
    companies: ["Amazon", "Microsoft", "Goldman Sachs"],
    xpReward: 20,
    estimatedTime: 15,
    statement: "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer.",
    inputFormat: "First line: space-separated integers representing list values.\nSecond line: index to cycle back to (-1 if no cycle).",
    outputFormat: "`true` if there is a cycle, otherwise `false`.",
    constraints: "The number of nodes in the list is in the range [0, 10^4].\n-10^5 <= Node.val <= 10^5",
    examples: [
      { input: "3 2 0 -4\n1", output: "true", explanation: "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed)." },
      { input: "1 2\n-1", output: "false", explanation: "No cycle in the list." }
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
      { input: "1 2\n-1", expectedOutput: "false", isPublic: true }
    ]
  },
  {
    problemId: "remove-nth-node-from-end",
    problemNumber: 102,
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    topic: "Linked List",
    companies: ["Amazon", "Google", "Microsoft", "Adobe"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Given the `head` of a linked list, remove the `n-th` node from the end of the list and return its head.",
    inputFormat: "First line: space-separated integers representing the list values.\nSecond line: integer `n`.",
    outputFormat: "Space-separated integers representing the resulting list.",
    constraints: "The number of nodes in the list is sz.\n1 <= sz <= 30\n0 <= Node.val <= 100\n1 <= n <= sz",
    examples: [
      { input: "1 2 3 4 5\n2", output: "1 2 3 5", explanation: "Removing the 2nd node from the end (4) yields 1->2->3->5." },
      { input: "1\n1", output: "[]", explanation: "Removing the 1st node from the end yields an empty list." }
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
      { input: "1\n1", expectedOutput: "", isPublic: true },
      { input: "1 2\n1", expectedOutput: "1", isPublic: false }
    ]
  },

  // =====================================================================
  // === TREES (2 More Problems) ===
  // =====================================================================
  {
    problemId: "lowest-common-ancestor-binary-tree",
    problemNumber: 103,
    title: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Google", "Amazon", "Microsoft", "Facebook"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes, `p` and `q`.\n\nAccording to the definition of LCA: “The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants.”",
    inputFormat: "First line: level-order tree representation (-1 for null).\nSecond line: two integers representing node values p and q.",
    outputFormat: "A single integer representing the value of the LCA node.",
    constraints: "The number of nodes in the tree is in the range [2, 10^5].\n-10^9 <= Node.val <= 10^9\nAll Node.val are unique.\np and q will exist in the tree.",
    examples: [
      { input: "3 5 1 6 2 0 8 -1 -1 7 4\n5 1", output: "3", explanation: "The LCA of nodes 5 and 1 is 3." },
      { input: "3 5 1 6 2 0 8 -1 -1 7 4\n5 4", output: "5", explanation: "The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def lowestCommonAncestor(self, root: \'TreeNode\', p: \'TreeNode\', q: \'TreeNode\') -> \'TreeNode\':\n        # Write code here",
      javascript: "class Solution {\n    lowestCommonAncestor(root, p, q) {\n        // Write code here\n    }\n}",
      go: "func lowestCommonAncestor(root *TreeNode, p *TreeNode, q *TreeNode) *TreeNode {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 5 1 6 2 0 8 -1 -1 7 4\n5 1", expectedOutput: "3", isPublic: true },
      { input: "3 5 1 6 2 0 8 -1 -1 7 4\n5 4", expectedOutput: "5", isPublic: true }
    ]
  },
  {
    problemId: "validate-binary-search-tree",
    problemNumber: 104,
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    topic: "Trees",
    companies: ["Amazon", "Google", "Microsoft", "Bloomberg"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA **valid BST** is defined as follows:\n- The left subtree of a node contains only nodes with keys **less than** the node's key.\n- The right subtree of a node contains only nodes with keys **greater than** the node's key.\n- Both the left and right subtrees must also be binary search trees.",
    inputFormat: "A single line containing level-order tree representation (-1 for null).",
    outputFormat: "`true` if valid BST, otherwise `false`.",
    constraints: "The number of nodes in the tree is in the range [1, 10^4].\n-2^31 <= Node.val <= 2^31 - 1",
    examples: [
      { input: "2 1 3", output: "true", explanation: "Root 2 has left child 1 and right child 3." },
      { input: "5 1 4 -1 -1 3 6", output: "false", explanation: "The root node's value is 5 but its right child's value is 4." }
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
      { input: "5 1 4 -1 -1 3 6", expectedOutput: "false", isPublic: true }
    ]
  },

  // =====================================================================
  // === SLIDING WINDOW (2 More Problems) ===
  // =====================================================================
  {
    problemId: "longest-substring-without-repeating-characters",
    problemNumber: 105,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Sliding Window",
    companies: ["Amazon", "Google", "Microsoft", "Uber"],
    xpReward: 30,
    estimatedTime: 25,
    statement: "Given a string `s`, find the length of the **longest substring** without repeating characters.",
    inputFormat: "A single line containing string `s`.",
    outputFormat: "A single integer representing the length of the longest substring without repeating characters.",
    constraints: "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
    examples: [
      { input: "abcabcbb", output: "3", explanation: "The answer is 'abc', with the length of 3." },
      { input: "bbbbb", output: "1", explanation: "The answer is 'b', with the length of 1." },
      { input: "pwwkew", output: "3", explanation: "The answer is 'wke', with the length of 3. Note that 'pwke' is a subsequence, not a substring." }
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
      { input: "pwwkew", expectedOutput: "3", isPublic: false }
    ]
  },
  {
    problemId: "minimum-window-substring",
    problemNumber: 106,
    title: "Minimum Window Substring",
    difficulty: "Hard",
    topic: "Sliding Window",
    companies: ["Facebook", "Google", "Amazon", "LinkedIn"],
    xpReward: 50,
    estimatedTime: 40,
    statement: "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `\"\"`.",
    inputFormat: "First line: string `s`.\nSecond line: string `t`.",
    outputFormat: "A single line containing the minimum window substring.",
    constraints: "1 <= s.length, t.length <= 10^5\ns and t consist of uppercase and lowercase English letters.",
    examples: [
      { input: "ADOBECODEBANC\nABC", output: "BANC", explanation: "The minimum window substring 'BANC' includes 'A', 'B', and 'C' from string t." },
      { input: "a\na", output: "a", explanation: "The entire string s is the minimum window." }
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
      { input: "a\naa", expectedOutput: "", isPublic: false }
    ]
  },

  // =====================================================================
  // === BINARY SEARCH (1 More Problem) ===
  // =====================================================================
  {
    problemId: "search-a-2d-matrix",
    problemNumber: 107,
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    topic: "Binary Search",
    companies: ["Amazon", "Google", "Microsoft", "Visa"],
    xpReward: 25,
    estimatedTime: 20,
    statement: "You are given an `m x n` integer matrix `matrix` with the following two properties:\n- Each row is sorted in non-decreasing order.\n- The first integer of each row is greater than the last integer of the previous row.\n\nGiven an integer `target`, return `true` if `target` is in `matrix` or `false` otherwise.\n\nYou must write a solution in `O(log(m * n))` time complexity.",
    inputFormat: "First line: m and n.\nNext m lines: each contains n space-separated integers.\nLast line: target.",
    outputFormat: "`true` if target is in matrix, otherwise `false`.",
    constraints: "m == matrix.length, n == matrix[i].length\n1 <= m, n <= 100\n-10^4 <= matrix[i][j], target <= 10^4",
    examples: [
      { input: "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n3", output: "true", explanation: "3 exists in the matrix." },
      { input: "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n13", output: "false", explanation: "13 does not exist in the matrix." }
    ],
    starterCode: {
      cpp: "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        // Write code here\n    }\n};",
      java: "class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        // Write code here\n    }\n}",
      python: "class Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        # Write code here",
      javascript: "class Solution {\n    searchMatrix(matrix, target) {\n        // Write code here\n    }\n}",
      go: "func searchMatrix(matrix [][]int, target int) bool {\n    // Write code here\n}"
    },
    testCases: [
      { input: "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n3", expectedOutput: "true", isPublic: true },
      { input: "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n13", expectedOutput: "false", isPublic: true }
    ]
  }

];

const seedDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
    await Problem.deleteMany({});
    console.log("Cleared existing Problem catalog.");
    const createdProblems = await Problem.insertMany(problems);
    console.log(`Successfully seeded ${createdProblems.length} DSA Problems!`);
    const topicMap = {};
    problems.forEach(p => { topicMap[p.topic] = (topicMap[p.topic] || 0) + 1; });
    console.log("\nTopic Breakdown:");
    Object.entries(topicMap).forEach(([topic, count]) => console.log(`  ${topic}: ${count} problems`));
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedDB();
