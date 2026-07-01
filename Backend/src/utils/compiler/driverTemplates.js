// Driver templates for real physical compilation and execution on student code
export const DRIVER_TEMPLATES = {
  "two-sum": {
    cpp: `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <stack>
#include <climits>
#include <cmath>
#include <sstream>
using namespace std;

// [STUDENT_CODE]

int main() {
    string line;
    if (!getline(cin, line)) return 0;
    stringstream ss(line);
    vector<int> nums;
    int val;
    while (ss >> val) nums.push_back(val);
    int target;
    if (!(cin >> target)) return 0;
    
    Solution solver;
    vector<int> ans = solver.twoSum(nums, target);
    for (size_t i = 0; i < ans.size(); i++) {
        cout << ans[i] << (i == ans.size() - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}
`,
    python: `
import sys
import math
import collections
import heapq
import bisect
from typing import List, Dict, Tuple, Set, Optional, Deque

# [STUDENT_CODE]

if __name__ == '__main__':
    lines = sys.stdin.read().splitlines()
    if len(lines) < 2:
        sys.exit(0)
    nums = list(map(int, lines[0].strip().split()))
    target = int(lines[1].strip())
    solver = Solution()
    ans = solver.twoSum(nums, target)
    print(" ".join(map(str, ans)))
`,
    javascript: `
const fs = require('fs');

// [STUDENT_CODE]

const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');
if (input.length >= 2) {
    const nums = input[0].trim().split(/\\s+/).map(Number);
    const target = Number(input[1]);
    const solver = new Solution();
    const ans = solver.twoSum(nums, target);
    console.log(ans.join(' '));
}
`,
    java: `
import java.util.*;
import java.io.*;

// [STUDENT_CODE]

public class SolutionMain {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String[] numsStr = sc.nextLine().trim().split("\\\\s+");
        int[] nums = new int[numsStr.length];
        for(int i=0; i<nums.length; i++) nums[i] = Integer.parseInt(numsStr[i]);
        if (!sc.hasNextInt()) return;
        int target = sc.nextInt();
        Solution solver = new Solution();
        int[] ans = solver.twoSum(nums, target);
        for(int i=0; i<ans.length; i++) {
            System.out.print(ans[i] + (i == ans.length - 1 ? "" : " "));
        }
        System.out.println();
    }
}
`
  },
  "best-time-to-buy-and-sell-stock": {
    cpp: `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <stack>
#include <climits>
#include <cmath>
#include <sstream>
using namespace std;

// [STUDENT_CODE]

int main() {
    string line;
    if (!getline(cin, line)) return 0;
    stringstream ss(line);
    vector<int> prices;
    int val;
    while (ss >> val) prices.push_back(val);
    Solution solver;
    cout << solver.maxProfit(prices) << endl;
    return 0;
}
`,
    python: `
import sys
import math
import collections
import heapq
import bisect
from typing import List, Dict, Tuple, Set, Optional, Deque

# [STUDENT_CODE]

if __name__ == '__main__':
    line = sys.stdin.read().strip()
    if not line:
        sys.exit(0)
    prices = list(map(int, line.split()))
    solver = Solution()
    print(solver.maxProfit(prices))
`,
    javascript: `
const fs = require('fs');

// [STUDENT_CODE]

const input = fs.readFileSync(0, 'utf-8').trim();
if (input) {
    const prices = input.split(/\\s+/).map(Number);
    const solver = new Solution();
    console.log(solver.maxProfit(prices));
}
`,
    java: `
import java.util.*;

// [STUDENT_CODE]

public class SolutionMain {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String[] strs = sc.nextLine().trim().split("\\\\s+");
        int[] prices = new int[strs.length];
        for(int i=0; i<prices.length; i++) prices[i] = Integer.parseInt(strs[i]);
        Solution solver = new Solution();
        System.out.println(solver.maxProfit(prices));
    }
}
`
  },
  "contains-duplicate": {
    cpp: `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <stack>
#include <climits>
#include <cmath>
#include <sstream>
using namespace std;

// [STUDENT_CODE]

int main() {
    string line;
    if (!getline(cin, line)) return 0;
    stringstream ss(line);
    vector<int> nums;
    int val;
    while (ss >> val) nums.push_back(val);
    Solution solver;
    cout << (solver.containsDuplicate(nums) ? "true" : "false") << endl;
    return 0;
}
`,
    python: `
import sys
import math
import collections
import heapq
import bisect
from typing import List, Dict, Tuple, Set, Optional, Deque

# [STUDENT_CODE]

if __name__ == '__main__':
    line = sys.stdin.read().strip()
    if not line:
        sys.exit(0)
    nums = list(map(int, line.split()))
    solver = Solution()
    print(str(solver.containsDuplicate(nums)).lower())
`,
    javascript: `
const fs = require('fs');

// [STUDENT_CODE]

const input = fs.readFileSync(0, 'utf-8').trim();
if (input) {
    const nums = input.split(/\\s+/).map(Number);
    const solver = new Solution();
    console.log(solver.containsDuplicate(nums));
}
`,
    java: `
import java.util.*;

// [STUDENT_CODE]

public class SolutionMain {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String[] strs = sc.nextLine().trim().split("\\\\s+");
        int[] nums = new int[strs.length];
        for(int i=0; i<nums.length; i++) nums[i] = Integer.parseInt(strs[i]);
        Solution solver = new Solution();
        System.out.println(solver.containsDuplicate(nums));
    }
}
`
  },
  "climbing-stairs": {
    cpp: `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <stack>
#include <climits>
#include <cmath>
#include <sstream>
using namespace std;

// [STUDENT_CODE]

int main() {
    int n;
    if (cin >> n) {
        Solution solver;
        cout << solver.climbStairs(n) << endl;
    }
    return 0;
}
`,
    python: `
import sys
import math
import collections
import heapq
import bisect
from typing import List, Dict, Tuple, Set, Optional, Deque

# [STUDENT_CODE]

if __name__ == '__main__':
    line = sys.stdin.read().strip()
    if line:
        n = int(line)
        solver = Solution()
        print(solver.climbStairs(n))
`,
    javascript: `
const fs = require('fs');

// [STUDENT_CODE]

const input = fs.readFileSync(0, 'utf-8').trim();
if (input) {
    const n = Number(input);
    const solver = new Solution();
    console.log(solver.climbStairs(n));
}
`,
    java: `
import java.util.*;

// [STUDENT_CODE]

public class SolutionMain {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            Solution solver = new Solution();
            System.out.println(solver.climbStairs(n));
        }
    }
}
`
  }
};
