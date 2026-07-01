import Problem from "../../Models/problem.js";

function parseCpp(code) {
  const regex = /(?:public|private|protected)?\s*([\w<>:&*]+)\s+(\w+)\s*\(([^)]*)\)/;
  const match = code.match(regex);
  if (!match) return null;
  const returnType = match[1].trim();
  const methodName = match[2].trim();
  const paramsStr = match[3].trim();
  const params = paramsStr.split(',').map(p => {
    p = p.trim();
    if (!p) return null;
    const lastSpace = p.lastIndexOf(' ');
    if (lastSpace === -1) return null;
    let type = p.substring(0, lastSpace).trim();
    let name = p.substring(lastSpace + 1).trim();
    if (name.startsWith('&') || name.startsWith('*')) {
      type += name[0];
      name = name.substring(1);
    }
    return { type, name };
  }).filter(Boolean);
  return { returnType, methodName, params };
}

function parsePython(code) {
  const regex = /def\s+(\w+)\s*\(\s*self\s*(?:,\s*([^)]*))?\)\s*(?:->\s*([\w\[\],\'\" ]+))?\s*:/;
  const match = code.match(regex);
  if (!match) return null;
  const methodName = match[1].trim();
  const paramsStr = match[2] ? match[2].trim() : '';
  const returnType = match[3] ? match[3].trim() : 'None';
  const params = paramsStr.split(',').map(p => {
    p = p.trim();
    if (!p) return null;
    const colon = p.indexOf(':');
    let name = p;
    let type = 'Any';
    if (colon !== -1) {
      name = p.substring(0, colon).trim();
      type = p.substring(colon + 1).trim();
    }
    return { type, name };
  }).filter(Boolean);
  return { returnType, methodName, params };
}

function parseJs(code) {
  const regex = /(\w+)\s*\(([^)]*)\)\s*\{/;
  const match = code.match(regex);
  if (!match) return null;
  const methodName = match[1].trim();
  const paramsStr = match[2].trim();
  const params = paramsStr.split(',').map(p => {
    p = p.trim();
    if (!p) return null;
    return { type: 'any', name: p };
  }).filter(Boolean);
  return { returnType: 'any', methodName, params };
}

function parseJava(code) {
  const regex = /(?:public|private|protected|static)?\s+([\w<>\[\]]+)\s+(\w+)\s*\(([^)]*)\)\s*\{/;
  const match = code.match(regex);
  if (!match) return null;
  const returnType = match[1].trim();
  const methodName = match[2].trim();
  const paramsStr = match[3].trim();
  const params = paramsStr.split(',').map(p => {
    p = p.trim();
    if (!p) return null;
    const lastSpace = p.lastIndexOf(' ');
    if (lastSpace === -1) return null;
    const type = p.substring(0, lastSpace).trim();
    const name = p.substring(lastSpace + 1).trim();
    return { type, name };
  }).filter(Boolean);
  return { returnType, methodName, params };
}

function parseGo(code) {
  const regex = /func\s+(\w+)\s*\(([^)]*)\)\s*([\w\[\]*]+)?\s*\{/;
  const match = code.match(regex);
  if (!match) return null;
  const methodName = match[1].trim();
  const paramsStr = match[2].trim();
  const returnType = match[3] ? match[3].trim() : 'void';
  const params = paramsStr.split(',').map(p => {
    p = p.trim();
    if (!p) return null;
    const lastSpace = p.lastIndexOf(' ');
    if (lastSpace === -1) return null;
    const name = p.substring(0, lastSpace).trim();
    const type = p.substring(lastSpace + 1).trim();
    return { type, name };
  }).filter(Boolean);
  return { returnType, methodName, params };
}

export function parseSignature(starterCode, language) {
  if (language === "cpp") return parseCpp(starterCode);
  if (language === "python") return parsePython(starterCode);
  if (language === "javascript") return parseJs(starterCode);
  if (language === "java") return parseJava(starterCode);
  if (language === "go") return parseGo(starterCode);
  return null;
}

export async function getDynamicDriver(problemId, language, studentCode) {
  try {
    const problem = await Problem.findOne({ problemId });
    if (!problem) return null;

    const starterCode = problem.starterCode[language];
    if (!starterCode) return null;

    const sig = parseSignature(starterCode, language);
    if (!sig) {
      // Standalone script, no Solution class or function wrapping required
      return studentCode;
    }

    if (language === "cpp") {
      return buildCppDriver(sig, studentCode);
    }
    if (language === "python") {
      return buildPythonDriver(sig, studentCode);
    }
    if (language === "javascript") {
      return buildJsDriver(sig, studentCode);
    }
    if (language === "java") {
      return buildJavaDriver(sig, studentCode);
    }
    if (language === "go") {
      return buildGoDriver(sig, studentCode);
    }

    return null;
  } catch (err) {
    console.error("Error generating dynamic driver:", err.message);
    return null;
  }
}

// --- C++ DRIVER BUILDER ---
function buildCppDriver(sig, studentCode) {
  const needsListNode = studentCode.includes("ListNode");
  const needsTreeNode = studentCode.includes("TreeNode");

  let helpers = "";
  if (needsListNode) {
    helpers += `
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

ListNode* parseLinkedList(string line) {
    stringstream ss(line);
    int val;
    ListNode* head = nullptr;
    ListNode* tail = nullptr;
    while (ss >> val) {
        ListNode* node = new ListNode(val);
        if (!head) {
            head = node;
            tail = node;
        } else {
            tail->next = node;
            tail = node;
        }
    }
    return head;
}

void printLinkedList(ListNode* head) {
    ListNode* curr = head;
    while (curr) {
        cout << curr->val << (curr->next ? " " : "");
        curr = curr->next;
    }
    cout << endl;
}
`;
  }

  if (needsTreeNode) {
    helpers += `
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

TreeNode* parseBinaryTree(string line) {
    stringstream ss(line);
    vector<int> vals;
    int val;
    while (ss >> val) {
        vals.push_back(val);
    }
    if (vals.empty() || vals[0] == -1) return nullptr;
    TreeNode* root = new TreeNode(vals[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < vals.size()) {
        TreeNode* curr = q.front();
        q.pop();
        if (i < vals.size() && vals[i] != -1) {
            curr->left = new TreeNode(vals[i]);
            q.push(curr->left);
        }
        i++;
        if (i < vals.size() && vals[i] != -1) {
            curr->right = new TreeNode(vals[i]);
            q.push(curr->right);
        }
        i++;
    }
    return root;
}

void printBinaryTreeLevelOrder(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    vector<int> ans;
    while (!q.empty()) {
        TreeNode* curr = q.front();
        q.pop();
        if (curr) {
            ans.push_back(curr->val);
            q.push(curr->left);
            q.push(curr->right);
        } else {
            ans.push_back(-1);
        }
    }
    while (!ans.empty() && ans.back() == -1) ans.pop_back();
    for (size_t i = 0; i < ans.size(); i++) {
        if (ans[i] == -1) cout << "-1";
        else cout << ans[i];
        cout << (i == ans.size() - 1 ? "" : " ");
    }
    cout << endl;
}
`;
  }

  // Generate input reading parameters code
  let readingCode = "";
  const callArgs = [];
  sig.params.forEach((p, idx) => {
    const isVector = p.type.includes("vector");
    const is2DVector = p.type.includes("vector<vector");
    const isList = p.type.includes("ListNode");
    const isTree = p.type.includes("TreeNode");

    if (is2DVector) {
      readingCode += `
    int rows_${idx}, cols_${idx};
    if (!(cin >> rows_${idx} >> cols_${idx})) return 0;
    ${p.type.replace(/&/g, '')} ${p.name}(rows_${idx}, vector<int>(cols_${idx}));
    for (int r = 0; r < rows_${idx}; r++) {
        for (int c = 0; c < cols_${idx}; c++) {
            cin >> ${p.name}[r][c];
        }
    }
`;
    } else if (isVector) {
      readingCode += `
    string line_${idx};
    while(line_${idx}.empty()) { if(!getline(cin, line_${idx})) break; }
    stringstream ss_${idx}(line_${idx});
    ${p.type.replace(/&/g, '')} ${p.name};
    ${p.type.includes("string") ? "string" : p.type.includes("bool") ? "bool" : "int"} temp_${idx};
    while(ss_${idx} >> temp_${idx}) ${p.name}.push_back(temp_${idx});
`;
    } else if (isList) {
      readingCode += `
    string line_${idx};
    while(line_${idx}.empty()) { if(!getline(cin, line_${idx})) break; }
    ListNode* ${p.name} = parseLinkedList(line_${idx});
`;
    } else if (isTree) {
      readingCode += `
    string line_${idx};
    while(line_${idx}.empty()) { if(!getline(cin, line_${idx})) break; }
    TreeNode* ${p.name} = parseBinaryTree(line_${idx});
`;
    } else {
      // Scalar
      readingCode += `
    ${p.type} ${p.name};
    if (!(cin >> ${p.name})) return 0;
`;
    }
    callArgs.push(p.name);
  });

  // Print output code
  let outputCode = "";
  const isVectorRet = sig.returnType.includes("vector");
  const isListRet = sig.returnType.includes("ListNode");
  const isTreeRet = sig.returnType.includes("TreeNode");

  if (isListRet) {
    outputCode = `
    ListNode* ans = solver.${sig.methodName}(${callArgs.join(", ")});
    printLinkedList(ans);
`;
  } else if (isTreeRet) {
    outputCode = `
    TreeNode* ans = solver.${sig.methodName}(${callArgs.join(", ")});
    printBinaryTreeLevelOrder(ans);
`;
  } else if (isVectorRet) {
    outputCode = `
    auto ans = solver.${sig.methodName}(${callArgs.join(", ")});
    for(size_t i=0; i<ans.size(); i++) {
        \n#ifdef _MSC_VER\n#else\n#endif\n        ${sig.returnType.includes("bool") ? 'cout << (ans[i] ? "true" : "false")' : 'cout << ans[i]'} << (i == ans.size()-1 ? "" : " ");
    }
    cout << endl;
`;
  } else if (sig.returnType === "bool") {
    outputCode = `
    cout << (solver.${sig.methodName}(${callArgs.join(", ")}) ? "true" : "false") << endl;
`;
  } else {
    outputCode = `
    cout << solver.${sig.methodName}(${callArgs.join(", ")}) << endl;
`;
  }

  return `
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

${helpers}

${studentCode}

int main() {
    ${readingCode}
    Solution solver;
    ${outputCode}
    return 0;
}
`;
}

// --- PYTHON DRIVER BUILDER ---
function buildPythonDriver(sig, studentCode) {
  const needsListNode = studentCode.includes("ListNode");
  const needsTreeNode = studentCode.includes("TreeNode");

  let helpers = "";
  if (needsListNode) {
    helpers += `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def parse_linked_list(tokens):
    if not tokens:
        return None
    head = ListNode(int(tokens[0]))
    curr = head
    for v in tokens[1:]:
        curr.next = ListNode(int(v))
        curr = curr.next
    return head

def print_linked_list(head):
    res = []
    curr = head
    while curr:
        res.append(str(curr.val))
        curr = curr.next
    print(" ".join(res))
`;
  }

  if (needsTreeNode) {
    helpers += `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def parse_binary_tree(tokens):
    if not tokens or tokens[0] == "-1" or tokens[0] == "null":
        return None
    root = TreeNode(int(tokens[0]))
    q = [root]
    i = 1
    while q and i < len(tokens):
        curr = q.pop(0)
        if i < len(tokens) and tokens[i] != "-1" and tokens[i] != "null":
            curr.left = TreeNode(int(tokens[i]))
            q.append(curr.left)
        i += 1
        if i < len(tokens) and tokens[i] != "-1" and tokens[i] != "null":
            curr.right = TreeNode(int(tokens[i]))
            q.append(curr.right)
        i += 1
    return root

def print_binary_tree_level_order(root):
    if not root:
        return
    q = [root]
    ans = []
    while q:
        curr = q.pop(0)
        if curr:
            ans.append(curr.val)
            q.append(curr.left)
            q.append(curr.right)
        else:
            ans.append(-1)
    while ans and ans[-1] == -1:
        ans.pop()
    print(" ".join(str(x) if x != -1 else "-1" for x in ans))
`;
  }

  // Tokenizer read code
  let readingCode = "";
  const callArgs = [];
  sig.params.forEach((p, idx) => {
    const isList = p.type.includes("List");
    const isListNode = p.type.includes("ListNode");
    const isTreeNode = p.type.includes("TreeNode");

    if (p.type.includes("List[List")) {
      readingCode += `
    rows_${idx} = int(tokenizer.next_token())
    cols_${idx} = int(tokenizer.next_token())
    ${p.name} = []
    for _ in range(rows_${idx}):
        ${p.name}.append(list(map(int, tokenizer.next_line_tokens())))
`;
    } else if (isList) {
      readingCode += `
    ${p.name} = tokenizer.next_line_tokens()
    if len(${p.name}) > 0:
        if "${p.type}".find("int") != -1:
            ${p.name} = list(map(int, ${p.name}))
        elif "${p.type}".find("float") != -1:
            ${p.name} = list(map(float, ${p.name}))
`;
    } else if (isListNode) {
      readingCode += `
    ${p.name} = parse_linked_list(tokenizer.next_line_tokens())
`;
    } else if (isTreeNode) {
      readingCode += `
    ${p.name} = parse_binary_tree(tokenizer.next_line_tokens())
`;
    } else {
      // Scalar
      if (p.type.includes("int")) {
        readingCode += `    ${p.name} = int(tokenizer.next_token())\n`;
      } else if (p.type.includes("float")) {
        readingCode += `    ${p.name} = float(tokenizer.next_token())\n`;
      } else if (p.type.includes("bool")) {
        readingCode += `    ${p.name} = tokenizer.next_token().lower() in ('true', '1')\n`;
      } else {
        readingCode += `    ${p.name} = tokenizer.next_token()\n`;
      }
    }
    callArgs.push(p.name);
  });

  // Print output code
  let outputCode = "";
  if (needsListNode && sig.returnType.includes("ListNode")) {
    outputCode = `print_linked_list(ans)`;
  } else if (needsTreeNode && sig.returnType.includes("TreeNode")) {
    outputCode = `print_binary_tree_level_order(ans)`;
  } else if (sig.returnType.includes("List")) {
    outputCode = `
    if isinstance(ans, list):
        if len(ans) > 0 and isinstance(ans[0], bool):
            print(" ".join(str(x).lower() for x in ans))
        else:
            print(" ".join(map(str, ans)))
    else:
        print(ans)
`;
  } else if (sig.returnType.includes("bool")) {
    outputCode = `print(str(ans).lower())`;
  } else {
    outputCode = `print(ans)`;
  }

  return `
import sys
import math
import collections
import heapq
import bisect
from typing import List, Dict, Tuple, Set, Optional, Deque

class Tokenizer:
    def __init__(self):
        self.tokens = []
        self.idx = 0
    def next_token(self):
        while self.idx >= len(self.tokens):
            line = sys.stdin.readline()
            if not line:
                return None
            self.tokens = line.split()
            self.idx = 0
        val = self.tokens[self.idx]
        self.idx += 1
        return val
    def next_line_tokens(self):
        line = sys.stdin.readline()
        if not line:
            return []
        return line.split()

tokenizer = Tokenizer()

${helpers}

${studentCode}

if __name__ == '__main__':
${readingCode}
    solver = Solution()
    ans = solver.${sig.methodName}(${callArgs.join(", ")})
    ${outputCode}
`;
}

// --- JAVASCRIPT DRIVER BUILDER ---
function buildJsDriver(sig, studentCode) {
  const needsListNode = studentCode.includes("ListNode");
  const needsTreeNode = studentCode.includes("TreeNode");

  let helpers = "";
  if (needsListNode) {
    helpers += `
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function parseLinkedList(tokens) {
    if (!tokens || tokens.length === 0) return null;
    const head = new ListNode(Number(tokens[0]));
    let curr = head;
    for (let i = 1; i < tokens.length; i++) {
        curr.next = new ListNode(Number(tokens[i]));
        curr = curr.next;
    }
    return head;
}

function printLinkedList(head) {
    const res = [];
    let curr = head;
    while (curr) {
        res.push(curr.val);
        curr = curr.next;
    }
    console.log(res.join(" "));
}
`;
  }

  if (needsTreeNode) {
    helpers += `
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function parseBinaryTree(tokens) {
    if (!tokens || tokens.length === 0 || tokens[0] === "-1" || tokens[0] === "null") return null;
    const root = new TreeNode(Number(tokens[0]));
    const q = [root];
    let i = 1;
    while (q.length > 0 && i < tokens.length) {
        const curr = q.shift();
        if (i < tokens.length && tokens[i] !== "-1" && tokens[i] !== "null") {
            curr.left = new TreeNode(Number(tokens[i]));
            q.push(curr.left);
        }
        i++;
        if (i < tokens.length && tokens[i] !== "-1" && tokens[i] !== "null") {
            curr.right = new TreeNode(Number(tokens[i]));
            q.push(curr.right);
        }
        i++;
    }
    return root;
}

function printBinaryTreeLevelOrder(root) {
    if (!root) return;
    const q = [root];
    const ans = [];
    while (q.length > 0) {
        const curr = q.shift();
        if (curr) {
            ans.push(curr.val);
            q.push(curr.left);
            q.push(curr.right);
        } else {
            ans.push(-1);
        }
    }
    while (ans.length > 0 && ans[ans.length - 1] === -1) ans.pop();
    console.log(ans.join(" "));
}
`;
  }

  let readingCode = "";
  const callArgs = [];
  sig.params.forEach((p, idx) => {
    readingCode += `
    let line_${idx} = nextLine();
    let ${p.name};
    if (line_${idx} !== null) {
        let tokens_${idx} = line_${idx}.trim().split(/\\s+/).filter(Boolean);
        if (${needsListNode} && idx === 0) {
            ${p.name} = parseLinkedList(tokens_${idx});
        } else if (${needsTreeNode} && idx === 0) {
            ${p.name} = parseBinaryTree(tokens_${idx});
        } else {
            if (tokens_${idx}.length === 2 && !isNaN(tokens_${idx}[0]) && !isNaN(tokens_${idx}[1]) && idx === 0) {
                const rows = Number(tokens_${idx}[0]);
                const cols = Number(tokens_${idx}[1]);
                ${p.name} = [];
                for(let r=0; r<rows; r++) {
                    ${p.name}.push(nextLine().trim().split(/\\s+/).map(Number));
                }
            } else if (tokens_${idx}.length === 1 && !isNaN(tokens_${idx}[0])) {
                ${p.name} = Number(tokens_${idx}[0]);
            } else {
                ${p.name} = tokens_${idx}.map(x => isNaN(x) ? x : Number(x));
                if (${p.name}.length === 1) ${p.name} = ${p.name}[0];
            }
        }
    }
`;
    callArgs.push(p.name);
  });

  let outputCode = "";
  if (needsListNode) {
    outputCode = `printLinkedList(ans);`;
  } else if (needsTreeNode) {
    outputCode = `printBinaryTreeLevelOrder(ans);`;
  } else {
    outputCode = `
    if (Array.isArray(ans)) {
        console.log(ans.join(" "));
    } else {
        console.log(ans);
    }
`;
  }

  return `
const fs = require('fs');

${helpers}

${studentCode}

const inputLines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
let lineIdx = 0;
function nextLine() {
    if (lineIdx >= inputLines.length) return null;
    return inputLines[lineIdx++];
}

const solver = new Solution();
const idx = 0;
${readingCode}
const ans = solver.${sig.methodName}(${callArgs.join(", ")});
${outputCode}
`;
}

// --- JAVA DRIVER BUILDER ---
function buildJavaDriver(sig, studentCode) {
  const needsListNode = studentCode.includes("ListNode");
  const needsTreeNode = studentCode.includes("TreeNode");

  let helpers = "";
  if (needsListNode) {
    helpers += `
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}
`;
  }
  if (needsTreeNode) {
    helpers += `
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
`;
  }

  let parsingHelpers = "";
  if (needsListNode) {
    parsingHelpers += `
    public static ListNode parseLinkedList(String line) {
        if (line == null || line.trim().isEmpty()) return null;
        String[] parts = line.trim().split("\\\\s+");
        ListNode head = new ListNode(Integer.parseInt(parts[0]));
        ListNode curr = head;
        for (int i = 1; i < parts.length; i++) {
            curr.next = new ListNode(Integer.parseInt(parts[i]));
            curr = curr.next;
        }
        return head;
    }

    public static void printLinkedList(ListNode head) {
        ListNode curr = head;
        while (curr != null) {
            System.out.print(curr.val + (curr.next != null ? " " : ""));
            curr = curr.next;
        }
        System.out.println();
    }
`;
  }

  if (needsTreeNode) {
    parsingHelpers += `
    public static TreeNode parseBinaryTree(String line) {
        if (line == null || line.trim().isEmpty() || line.trim().equals("-1") || line.trim().equals("null")) return null;
        String[] parts = line.trim().split("\\\\s+");
        TreeNode root = new TreeNode(Integer.parseInt(parts[0]));
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < parts.length) {
            TreeNode curr = q.poll();
            if (i < parts.length && !parts[i].equals("-1") && !parts[i].equals("null")) {
                curr.left = new TreeNode(Integer.parseInt(parts[i]));
                q.add(curr.left);
            }
            i++;
            if (i < parts.length && !parts[i].equals("-1") && !parts[i].equals("null")) {
                curr.right = new TreeNode(Integer.parseInt(parts[i]));
                q.add(curr.right);
            }
            i++;
        }
        return root;
    }

    public static void printBinaryTreeLevelOrder(TreeNode root) {
        if (root == null) return;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        List<Integer> ans = new ArrayList<>();
        while (!q.isEmpty()) {
            TreeNode curr = q.poll();
            if (curr != null) {
                ans.add(curr.val);
                q.add(curr.left);
                q.add(curr.right);
            } else {
                ans.add(-1);
            }
        }
        while (!ans.isEmpty() && ans.get(ans.size() - 1) == -1) ans.remove(ans.size() - 1);
        for (int i = 0; i < ans.size(); i++) {
            System.out.print(ans.get(i) + (i == ans.size() - 1 ? "" : " "));
        }
        System.out.println();
    }
`;
  }

  let readingCode = "";
  const callArgs = [];
  sig.params.forEach((p, idx) => {
    const isArray = p.type.includes("[]");
    const is2DArray = p.type.includes("[][]");
    const isList = p.type.includes("List");
    const isListNode = p.type.includes("ListNode");
    const isTreeNode = p.type.includes("TreeNode");

    if (is2DArray) {
      readingCode += `
        int rows_${idx} = sc.nextInt();
        int cols_${idx} = sc.nextInt();
        int[][] ${p.name} = new int[rows_${idx}][cols_${idx}];
        for (int r = 0; r < rows_${idx}; r++) {
            for (int c = 0; c < cols_${idx}; c++) {
                ${p.name}[r][c] = sc.nextInt();
            }
        }
`;
    } else if (isArray || isList) {
      readingCode += `
        if (sc.hasNextLine()) sc.nextLine();
        String line_${idx} = sc.hasNextLine() ? sc.nextLine().trim() : "";
        String[] parts_${idx} = line_${idx}.isEmpty() ? new String[0] : line_${idx}.split("\\\\s+");
        int[] ${p.name} = new int[parts_${idx}.length];
        for(int i=0; i<parts_${idx}.length; i++) ${p.name}[i] = Integer.parseInt(parts_${idx}[i]);
`;
    } else if (isListNode) {
      readingCode += `
        if (sc.hasNextLine()) sc.nextLine();
        ListNode ${p.name} = parseLinkedList(sc.hasNextLine() ? sc.nextLine().trim() : "");
`;
    } else if (isTreeNode) {
      readingCode += `
        if (sc.hasNextLine()) sc.nextLine();
        TreeNode ${p.name} = parseBinaryTree(sc.hasNextLine() ? sc.nextLine().trim() : "");
`;
    } else {
      if (p.type.includes("int")) {
        readingCode += `        int ${p.name} = sc.nextInt();\n`;
      } else if (p.type.includes("double")) {
        readingCode += `        double ${p.name} = sc.nextDouble();\n`;
      } else if (p.type.includes("boolean")) {
        readingCode += `        boolean ${p.name} = sc.nextBoolean();\n`;
      } else {
        readingCode += `        String ${p.name} = sc.next();\n`;
      }
    }
    callArgs.push(p.name);
  });

  let outputCode = "";
  if (needsListNode) {
    outputCode = `printLinkedList(ans);`;
  } else if (needsTreeNode) {
    outputCode = `printBinaryTreeLevelOrder(ans);`;
  } else if (sig.returnType.includes("[]")) {
    outputCode = `
        for(int i=0; i<ans.length; i++) {
            System.out.print(ans[i] + (i == ans.length - 1 ? "" : " "));
        }
        System.out.println();
`;
  } else {
    outputCode = `System.out.println(ans);`;
  }

  return `
import java.util.*;
import java.io.*;

${helpers}

${studentCode}

public class SolutionMain {
    ${parsingHelpers}

    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        ${readingCode}
        Solution solver = new Solution();
        var ans = solver.${sig.methodName}(${callArgs.join(", ")});
        ${outputCode}
    }
}
`;
}

// --- GO DRIVER BUILDER ---
function buildGoDriver(sig, studentCode) {
  return studentCode + `
package main

import (
    "fmt"
    "os"
    "bufio"
    "strings"
)

func main() {
    // Basic main implementation fallback for Go syntax
}
`;
}
